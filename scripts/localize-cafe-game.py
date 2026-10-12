"""Build two entry points to one self-contained Korean/English game."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
translations = json.loads((ROOT / "content/tools/cafe-first-day.en.json").read_text())
translations["섞기 / 블렌딩"] = "Mix / Blend"
korean = (ROOT / "content/tools/cafe-first-day.ko.html").read_text()
source = korean
source = source.replace('lang="ko"', 'lang="en"').replace("ko-KR", "en-US")
source = source.replace("카페 신입 직원을 위한 주문 및 음료 제조 순서 연습 게임", "Order and drink-making practice for new café staff")
source = source.replace("음료 제조 연습", "Drink preparation practice")

# Ingredient actions depend on recipe text; use English patterns for the English copy.
classifier = """function stepAction(label){
 if(/pull|extract/i.test(label)&&!/cup|pour|add/i.test(label))return {kind:'extract',name:'Pull espresso',tool:true};
 if(/steam/i.test(label)&&!/pour|add|cup/i.test(label))return {kind:'steam',name:'Steam milk',tool:true};
 if(/lid|exterior|finish/i.test(label))return {kind:'lid',name:'Finish cup',tool:true};
 if(/prepare/i.test(label))return {kind:'prepare',name:'Prepare cup',tool:true};
 if(/ice(?!d)/i.test(label))return {kind:'ice',name:'Add ice'};
 if(/milk/i.test(label))return {kind:'milk',name:/steam/i.test(label)?'Pour steamed milk':'Pour milk'};
 if(/espresso|shot/i.test(label))return {kind:'coffee',name:'Pour espresso'};
 if(/syrup/i.test(label))return {kind:'syrup',name:'Add syrup'};
 if(/tea|tea base/i.test(label))return {kind:'tea',name:'Add tea base'};
 if(/water/i.test(label))return {kind:'water',name:/hot/i.test(label)?'Pour hot water':'Pour water'};
 if(/stir|mix|blend/i.test(label))return {kind:'mix',name:'Mix / Blend',tool:true};
 return {kind:'other',name:'Café task',tool:true};
}
"""
source = re.sub(r"function stepAction\(label\)\{.*?\n\}", lambda _: classifier.rstrip(), source, count=1, flags=re.S)
source = source.replace("contents=liquids.map(v=>v.name.replace(/ 넣기| 붓기/g,''))", "contents=liquids.map(v=>({milk:'Milk',water:'Water',coffee:'Espresso',syrup:'Syrup',tea:'Tea'}[v.kind]))")

# One pass prevents short terms from re-translating parts of longer translations.
pattern = re.compile("|".join(re.escape(key) for key in sorted(translations, key=len, reverse=True)))
source = pattern.sub(lambda match: translations[match.group()], source)

# Keep language-specific practice records separate on the shared blog origin.
for key in ["recipes-v1", "record-v1", "record-v2", "session-v2", "recipe-backup-v2", "basics-v2", "checks-v2"]:
    source = source.replace("cafe-first-day-" + key, "cafe-first-day-en-" + key)

source = re.sub(r"500KB\s+or smaller JSON file\.", "Choose a JSON file no larger than 500KB.", source)
source = source.replace("}pieces", "} items")
source = source.replace("Mistakes ${session.roundMistakes} sessions", "Mistakes ${session.roundMistakes}")
source = source.replace("Mistakes ${session.mistakes} sessions", "Mistakes ${session.mistakes}")
source = source.replace("${session.step+1} / ${r.steps.length} task ·", "Step ${session.step+1} of ${r.steps.length} ·")
source = source.replace("${session.amountIndex+1} / ${r.ingredients.length} ingredient ·", "Ingredient ${session.amountIndex+1} / ${r.ingredients.length} ·")
source = source.replace("Mistakes ${session.mistakes} mistakes ·", "Mistakes: ${session.mistakes} ·")
source = source.replace("JSON Export", "Export JSON").replace("JSON Import", "Import JSON")
source = source.replace("${recipes.length} drinks · Verified recipes ${recipes.filter(r=>r.confirmed).length} items", "Drinks: ${recipes.length} · Recipes verified: ${recipes.filter(r=>r.confirmed).length}")
source = source.replace("${v.steps.length} stages ·", "${v.steps.length} steps ·")
remaining = re.findall(r"[가-힣]+", source)
if remaining:
    raise ValueError("Untranslated Korean remains: " + ", ".join(sorted(set(remaining))))

english = source


def json_script(value):
    # Embedded HTML must never be able to close its surrounding script element.
    return json.dumps(value, ensure_ascii=False).replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")


def split_document(document):
    markup, script = document.split("<script>", 1)
    body = markup.split("<body>", 1)[1]
    code = script.split("</script>", 1)[0].strip()
    if not code.startswith("(() => {") or not code.endswith("})();"):
        raise ValueError("Unexpected game script structure")
    return body, code[len("(() => {"): -len("})();")]


ko_body, ko_code = split_document(korean)
en_body, en_code = split_document(english)
ko_classifier = re.search(r"function stepAction\(label\)\{.*?\n\}", ko_code, re.S).group()
en_classifier = re.search(r"function stepAction\(label\)\{.*?\n\}", en_code, re.S).group()
adapter = (ROOT / "scripts/cafe-game-adapter.js.txt").read_text()
runtime = (ROOT / "scripts/cafe-game-runtime.js.txt").read_text()


def game_factory(code, locale):
    # Abort the previous language's handlers when mounting the next language.
    code = code.replace("'use strict';", "'use strict';\nconst listen=(target,type,handler)=>target.addEventListener(type,handler,{signal});")
    code = code.replace("document.addEventListener(", "listen(document,").replace("window.addEventListener(", "listen(window,")
    # Accept recipes written in either language; user-authored recipe text is kept.
    bilingual_classifier = ko_classifier.replace("function stepAction", "function classifyKorean") + "\n" + en_classifier.replace("function stepAction", "function classifyEnglish") + "\n" + """function stepAction(label){
 const action=/[가-힣]/.test(label)?classifyKorean(label):classifyEnglish(label);
 return {...action,name:translateCafeText(action.name,/[가-힣]/.test(action.name)?'ko':'en',locale)};
}
"""
    code = re.sub(r"function stepAction\(label\)\{.*?\n\}", lambda _: bilingual_classifier, code, count=1, flags=re.S)
    # Imports and editable units also work across the two languages.
    code = code.replace("unit:String(v.unit||'')", "unit:cafeUnit(String(v.unit||''),locale)")
    # Migrate by reading legacy records; never overwrite the old standalone files' data.
    legacy_prefix = "cafe-first-day-" if locale == "ko" else "cafe-first-day-en-"
    for key in ["recipes-v1", "record-v1", "record-v2", "session-v2", "recipe-backup-v2", "basics-v2", "checks-v2"]:
        code = code.replace("'" + legacy_prefix + key + "'", "'cafe-first-day-i18n-" + locale + "-" + key + "'")
    code = code.replace("const v=localStorage.getItem(key);", "const legacyKey=key.replace('cafe-first-day-i18n-ko-','cafe-first-day-').replace('cafe-first-day-i18n-en-','cafe-first-day-en-'),v=localStorage.getItem(key)??localStorage.getItem(legacyKey);")
    if code.count("setView('home',false);") != 1:
        raise ValueError("Missing game mount point")
    return code.replace("setView('home',false);", adapter)


switcher = """<div class="topbar-end"><span class="top-note">__NOTE__</span><div class="game-language" role="group" aria-label="Language / 언어"><button type="button" data-language="ko" lang="ko" aria-label="한국어로 사용" aria-pressed="false">한국어</button><button type="button" data-language="en" lang="en" aria-label="Use in English" aria-pressed="false">English</button></div></div>"""


def add_switcher(body):
    return re.sub(r'<span class="top-note">(.*?)</span>', lambda m: switcher.replace("__NOTE__", m.group(1)), body, count=1)


switcher_css = """
.topbar-end{display:flex;align-items:center;gap:20px}.game-language{display:flex;flex:none;gap:3px;padding:4px;background:#e3eadd;border:1px solid #c8d4c4;border-radius:11px}.game-language button{min-height:36px;padding:7px 11px;border:0;border-radius:7px;background:transparent;color:#35513e;font-size:13px;font-weight:750;white-space:nowrap}.game-language button[aria-pressed=true]{background:var(--green);color:#fff}.game-language button:hover{background:#d1decb}.game-language button[aria-pressed=true]:hover{background:#214535}@media(max-width:650px){.topbar{gap:12px;flex-wrap:wrap}.topbar-end{gap:0}.game-language button{min-height:36px;padding:7px 9px;font-size:12px}.brand{font-size:19px;gap:8px}.brand-mark{width:30px;height:30px}.top-note{display:none}}@media print{.game-language{display:none}}
"""
factories = "const cafeFactories={ko:function(locale,signal,restore){\n" + game_factory(ko_code, "ko") + "\n},en:function(locale,signal,restore){\n" + game_factory(en_code, "en") + "\n}};\n"
payload = "const cafeMarkup=" + json_script({"ko": add_switcher(ko_body), "en": add_switcher(en_body)}) + ";\nconst cafeTranslations=" + json_script(translations) + ";\n"
metadata = "const cafeMetadata=" + json_script({"ko": {"title": "카페 첫날 | 음료 제조 연습", "description": "카페 신입 직원을 위한 주문 및 음료 제조 순서 연습 게임"}, "en": {"title": "Café First Day | Drink preparation practice", "description": "Order and drink-making practice for new café staff"}}) + ";\n"
for locale, filename, document in [("ko", "cafe-first-day.html", korean), ("en", "cafe-first-day-en.html", english)]:
    head = document.split("<body>", 1)[0].replace("</style>", switcher_css + "</style>", 1)
    script = "(()=>{\n'use strict';\nconst cafeDefaultLocale=" + json_script(locale) + ";\n" + payload + metadata + factories + runtime + "\n})();"
    if "</script" in script.lower():
        raise ValueError("Unsafe embedded script terminator")
    result = head + '<body>\n<div id="cafe-app"></div>\n<noscript>이 게임을 사용하려면 JavaScript를 켜 주세요. / Enable JavaScript to use this game.</noscript>\n<script>\n' + script + "\n</script>\n</body>\n</html>\n"
    (ROOT / "public/tools" / filename).write_text(result)
print("Built two bilingual, offline HTML entry points with", len(translations), "translations")
