"""Build self-contained Korean/English photo-map files without changing storage keys."""
import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-dir', type=Path)
parser.add_argument('--output-dir', type=Path)
parser.add_argument('--korean-output', default='where-was-it.html', help='Local Korean output filename; public URL stays the same')
parser.add_argument('--capture-v1', type=Path, help='Optional original v1 HTML for an English historical capture')
args = parser.parse_args()
content_dir = args.source_dir or ROOT / 'content/tools'
script_dir = args.source_dir or ROOT / 'scripts'
output_dir = args.output_dir or ROOT / 'public/tools'
output_dir.mkdir(parents=True, exist_ok=True)
source = (content_dir / 'where-was-it.ko.html').read_text()
translations = json.loads((content_dir / 'where-was-it.en.json').read_text())
pattern = re.compile('|'.join(re.escape(key) for key in sorted(translations, key=len, reverse=True)))


def english(text):
    result = pattern.sub(lambda match: translations[match[0]], text)
    remaining = re.findall(r'.{0,45}[가-힣]+.{0,45}', result)
    if remaining:
        raise ValueError('Untranslated Korean: ' + '\n'.join(remaining))
    return result


def payload(value):
    return json.dumps(value, ensure_ascii=False).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')


def replace_once(text, old, new):
    if text.count(old) != 1:
        raise ValueError('Missing or ambiguous source hook: ' + old[:100])
    return text.replace(old, new, 1)


markup, script = source.split('<script>', 1)
body = markup.split('<body>', 1)[1]
code = script.split('</script>', 1)[0].strip()
if not code.startswith("(()=>{'use strict';") or not code.endswith('})();'):
    raise ValueError('Unexpected map script structure')
code = code[len("(()=>{'use strict';"):-len('})();')]
mascot_match = re.search(r"const MASCOT='([^']+)';", code)
if not mascot_match:
    raise ValueError('Missing embedded mascot')
mascot = mascot_match[1]
code = code.replace(mascot_match[0], 'const MASCOT=mapMascot;', 1)


def factory(source_code):
    source_code = "const listen=(target,type,handler)=>target.addEventListener(type,handler,{signal});\n" + source_code
    source_code = re.sub(r"(\$\('[^']+'\)|document)\.addEventListener\(", r'listen(\1,', source_code)
    source_code = replace_once(source_code,
        "[roomTitle,item.name,item.aliases,item.note].join(' ')",
        "[roomTitle,item.name,item.aliases,item.note].flatMap(mapSearchTexts).join(' ')")
    source_code = replace_once(source_code,
        'try{if(saved)house=validateHouse(saved);else{',
        "if(signal.aborted){db?.close();return}try{if(restore){house=validateHouse(restore.house);selected=restore.selected;placing=restore.placing;draft=restore.draft;undoState=restore.undoState;game=restore.game;$('#search').value=restore.ui.query;$('#scope').value=restore.ui.scope}else if(saved)house=validateHouse(saved);else{")
    source_code = replace_once(source_code,
        "render();if(storageOK)persist();else $('#storage-warning').classList.remove('hidden')}",
        "localizeMapPresets(house,locale);localizeMapPresets(undoState,locale);localizeMapGame(game,house,locale);render();if(storageOK)await persist();else $('#storage-warning').classList.remove('hidden');if(restore)window.scrollTo(0,restore.ui.scroll)}")
    source_code = replace_once(source_code, 'init();', """const ready=init();
return {ready,
 snapshot:async()=>{await saveQueue;return clone({house,selected,placing,draft,undoState,game,ui:{query:$('#search').value,scope:$('#scope').value,scroll:window.scrollY}})},
 destroy:()=>{clearTimeout(toastTimer);db?.close()}
};""")
    return source_code


switcher = '<nav class="map-language" aria-label="Language"><button type="button" data-map-language="ko" aria-label="한국어로 사용">한국어</button><button type="button" data-map-language="en" aria-label="Use in English">English</button></nav>'
body = replace_once(body, '<div class="top-actions">', '<div class="top-actions">' + switcher)
en_body = english(body.replace(switcher, '')).replace('<br>', '<br> ')
en_body = replace_once(en_body, '<div class="top-actions">', '<div class="top-actions">' + switcher)
switcher_css = """
.map-language{display:flex;gap:3px;align-items:center;padding:3px;border:1.5px solid #372255;border-radius:12px;background:#fff;box-shadow:2px 2px 0 #372255}.map-language button{min-height:36px;border:0;border-radius:8px;padding:7px 9px;background:transparent;color:#4b3271;font-size:12px;font-weight:800}.map-language button[aria-pressed=true]{background:#6840de;color:#fff}.map-language button:disabled{opacity:1;cursor:wait}.map-language button:focus-visible{outline:3px solid #ff8c42;outline-offset:3px}html[lang=en] h1,html[lang=en] h2,html[lang=en] h3,html[lang=en] .brand{letter-spacing:-.035em}html[lang=en] .hero-speech{max-width:155px}html[lang=en] .room-info{flex-direction:column;align-items:flex-start;gap:5px}html[lang=en] .room-info strong{max-width:100%}html[lang=en] .hero-copy h1{font-size:clamp(26px,3vw,39px)}@media(max-width:740px){.top{flex-wrap:wrap}.top-actions{width:100%;justify-content:flex-start;align-items:center}.map-language{margin-left:auto}.map-language button{min-height:32px;font-size:11px;padding:6px 8px}}@media print{.map-language{display:none}}
"""
metadata = {
    'ko': {'title': '여기 있었네! — 사진으로 찾는 물건 지도', 'description': '사진에 물건 위치를 표시하고 이름으로 검색하는 무료 HTML 도구. 여러 공간과 찾기 놀이, 지도 백업, 한국어·영어 전환을 지원합니다.', 'file': 'where-was-it.html', 'image': '/images/where-was-it/04-cover.jpg'},
    'en': {'title': 'Found It! — A photo map for your stuff', 'description': 'Mark items on photos and search by name. A free HTML tool with multiple rooms, a finding game, map backups, and Korean/English switching.', 'file': 'where-was-it-en.html', 'image': '/images/where-was-it/en/04-cover.jpg'},
}
factory_ko = factory(code)
factory_en = english(factory(code))
runtime = (script_dir / 'where-was-it-runtime.js.txt').read_text()
site_url = 'https://everydaybuilds.blog'
for locale, local_name in [('ko', 'where-was-it.html'), ('en', 'where-was-it-en.html')]:
    head = source.split('<body>', 1)[0]
    head = head.replace('lang="ko"', 'lang="' + locale + '"', 1)
    head = re.sub(r'<title>.*?</title>', '<title>' + escape(metadata[locale]['title']) + '</title>', head, count=1)
    head = head.replace('content="#f5f3ed"', 'content="#f3efff"', 1)
    head = head.replace('</style>', switcher_css + '</style>', 1)
    tags = ['<meta name="description" content="' + escape(metadata[locale]['description'], quote=True) + '">', '<link rel="canonical" href="' + site_url + '/tools/' + local_name + '">']
    for language in ('ko', 'en', 'x-default'):
        tags.append('<link rel="alternate" hreflang="' + language + '" href="' + site_url + '/tools/' + metadata['ko' if language == 'x-default' else language]['file'] + '">')
    for key, value in {'og:title': metadata[locale]['title'], 'og:description': metadata[locale]['description'], 'og:type': 'website', 'og:url': site_url + '/tools/' + local_name, 'og:image': site_url + metadata[locale]['image'], 'og:site_name': 'Everyday Builds', 'og:locale': 'ko_KR' if locale == 'ko' else 'en_US'}.items():
        tags.append('<meta property="' + key + '" content="' + escape(value, quote=True) + '">')
    tags.append('<meta name="twitter:card" content="summary_large_image">')
    head = head.replace('</head>', '\n'.join(tags) + '\n</head>')
    script = "(()=>{'use strict';\nconst mapDefaultLocale=" + payload(locale) + ';\nconst mapMascot=' + payload(mascot) + ';\nconst mapTranslations=' + payload(translations) + ';\nconst mapMetadata=' + payload(metadata) + ';\nconst mapMarkup=' + payload({'ko': body, 'en': en_body}) + ';\nconst mapFactories={ko:function(locale,signal,restore){\n' + factory_ko + '\n},en:function(locale,signal,restore){\n' + factory_en + '\n}};\n' + runtime + '\n})();'
    if '</script' in script.lower():
        raise ValueError('Unsafe embedded script terminator')
    initial_body = body if locale == 'ko' else en_body
    result = head + '<body><div id="map-app">' + initial_body + '</div><noscript>' + ('지도를 사용하려면 JavaScript를 켜 주세요.' if locale == 'ko' else 'Enable JavaScript to use the map.') + '</noscript>\n<script>' + script + '</script>\n</body></html>\n'
    (output_dir / (args.korean_output if locale == 'ko' else local_name)).write_text(result)

if args.capture_v1:
    old = args.capture_v1.read_text()
    old = english(old.replace('lang="ko"', 'lang="en"', 1)).replace('<br>', '<br> ')
    old = old.replace('</style>', 'html[lang=en] .pin-label{min-width:100px}</style>', 1)
    capture = output_dir / '_captures/v1-en.html'
    capture.parent.mkdir(exist_ok=True)
    capture.write_text(old)
print('Built two bilingual offline map files with', len(translations), 'translations')
