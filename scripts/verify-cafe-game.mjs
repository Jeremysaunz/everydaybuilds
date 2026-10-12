import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const korean = read("public/tools/cafe-first-day.html");
const english = read("public/tools/cafe-first-day-en.html");
const scriptOf = (html) => html.match(/<script>([\s\S]*?)<\/script>/)[1];
for (const html of [korean, english]) {
  new vm.Script(scriptOf(html));
  assert.equal((html.match(/<script>/g) || []).length, 1);
  assert.ok(!/<script\s+src=|<link\s[^>]*stylesheet|@import\s|fetch\s*\(|XMLHttpRequest|new WebSocket/.test(html));
  assert.ok(html.includes('data-language=\\"ko\\"') && html.includes('data-language=\\"en\\"'));
}

// Exercise the code actually bundled in the downloadable file, without a browser.
const context = {URLSearchParams, location: {hash: ""}, document: {addEventListener() {}}, window: {addEventListener() {}}};
vm.runInNewContext(scriptOf(korean).replace("mountCafeLanguage(cafeLocale,readCafeSnapshot());", "globalThis.cafeTest={transferCafeState,translateCafeText,cafeFactories};"), context);
const api = context.cafeTest;
const parseCatalog = (factory, name) => {
  const declaration = factory.toString().match(new RegExp(`const ${name}\\s*=\\s*\\[[\\s\\S]*?\\n\\s*\\];`))[0];
  return JSON.parse(vm.runInNewContext(`${declaration}\nJSON.stringify(${name})`));
};
const koDefaults = parseCatalog(api.cafeFactories.ko, "defaults");
const enDefaults = parseCatalog(api.cafeFactories.en, "defaults");
const koQuestions = parseCatalog(api.cafeFactories.ko, "questions");
const enQuestions = parseCatalog(api.cafeFactories.en, "questions");
const normalize = (recipe) => ({...recipe, size: "", notes: "", ingredients: [], confirmed: false});
const preset = normalize(koDefaults[0]);
const custom = {...normalize(koDefaults[2]), id: "custom", name: "내가 입력한 라떼", notes: "사용자 메모 그대로", steps: ["컵에 얼음을 담는다", "내 방식으로 마무리"], ingredients: [{name: "직접 적은 재료", amount: 2, unit: "샷"}]};
const state = {
  recipes: [preset, custom], recipeBackup: [preset], pendingImport: [custom],
  record: {sessions: 3, best: 100, last: 88, history: []},
  basicRecord: {seen: ["order"], firstCorrect: ["order"], missed: []}, checks: [0, 2],
  session: {queue: [preset], index: 0, stage: "steps", step: 1, scores: [], mistakes: 0, logs: [], choices: [{key: "step-0", index: 0, label: preset.steps[0]}], drink: {spoiled: false, actions: [{kind: "ice", name: "얼음 넣기", label: preset.steps[0]}]}},
  quiz: {queue: [koQuestions[0]], index: 0, answers: [{id: "order", correct: true}], chosen: 0},
  view: "settings", selected: preset.id, editing: preset.id,
};
const snapshot = {locale: "ko", defaults: koDefaults, state, ui: {scroll: 320, draft: {name: "아직 저장하지 않은 이름", steps: preset.steps.join("\n"), ingredients: [{name: "입력 그대로", amount: "2", unit: "샷"}], dirty: true}}};
const transferred = api.transferCafeState(snapshot, "en", enDefaults, enQuestions);
assert.equal(transferred.state.recipes[0].name, enDefaults[0].name);
assert.equal(transferred.state.recipes[0].steps[0], enDefaults[0].steps[0]);
assert.equal(transferred.state.recipes[1].name, custom.name);
assert.equal(transferred.state.recipes[1].notes, custom.notes);
assert.equal(transferred.state.recipes[1].steps.join("|"), custom.steps.join("|"));
assert.equal(transferred.state.recipes[1].ingredients[0].unit, "shots");
assert.equal(transferred.state.session.step, 1);
assert.equal(transferred.state.session.drink.actions[0].kind, "ice");
assert.equal(transferred.state.session.drink.actions[0].label, enDefaults[0].steps[0]);
assert.equal(transferred.state.quiz.chosen, 0);
assert.equal(transferred.state.quiz.queue[0].title, enQuestions[0].title);
assert.equal(transferred.state.checks.join(), "0,2");
assert.equal(transferred.state.record.last, 88);
assert.equal(transferred.ui.draft.name, snapshot.ui.draft.name);
assert.equal(transferred.ui.draft.ingredients[0].name, "입력 그대로");
assert.equal(transferred.ui.draft.steps, enDefaults[0].steps.join("\n"));
const roundTrip = api.transferCafeState({locale: "en", defaults: enDefaults, ...transferred}, "ko", koDefaults, koQuestions);
assert.deepEqual(JSON.parse(JSON.stringify(roundTrip.state)), state);
assert.deepEqual(JSON.parse(JSON.stringify(roundTrip.ui)), snapshot.ui);

for (const locale of ["ko", "en"]) {
  const factory = api.cafeFactories[locale].toString();
  const classifierCode = ["classifyKorean", "classifyEnglish", "stepAction"].map(name => factory.match(new RegExp(`function ${name}\\(label\\)\\{[\\s\\S]*?\\n\\}`))[0]).join("\n");
  const classifier = vm.runInNewContext(`${classifierCode}\nstepAction`, {locale, translateCafeText: api.translateCafeText});
  for (const [label, kind] of [["컵에 얼음을 담는다", "ice"], ["Add ice to the cup", "ice"], ["에스프레소를 추출한다", "extract"], ["Pull the espresso shot", "extract"], ["스팀 우유를 컵에 붓는다", "milk"], ["Pour steamed milk into the cup", "milk"], ["섞는다", "mix"], ["Mix", "mix"]]) {
    const result = classifier(label);
    assert.equal(result.kind, kind);
    assert.equal(/[가-힣]/.test(result.name), locale === "ko");
  }
}
console.log("PASS: both HTML files compile and contain both languages without external runtime assets.");
console.log("PASS: preset translation, custom recipes, drafts, units, cup state, scores, quiz and checklist survive a language round trip.");
console.log("PASS: ingredient actions accept Korean and English recipes in either UI language.");
