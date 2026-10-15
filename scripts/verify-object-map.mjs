import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const read = name => fs.readFileSync(new URL(`../public/tools/${name}`, import.meta.url), "utf8");
const korean = read("where-was-it.html");
const english = read("where-was-it-en.html");
const scriptOf = html => html.match(/<script>([\s\S]*?)<\/script>/)[1];
for (const html of [korean, english]) {
  new vm.Script(scriptOf(html));
  assert.ok(!/<script\s+src=|<link\s[^>]*stylesheet|@import\s|fetch\s*\(|XMLHttpRequest|new WebSocket/.test(html));
  assert.ok(html.includes("everyday-finds-house-v2") && html.includes("everyday-finds-map-v1") && html.includes("everyday-finds-house"));
  assert.ok(html.includes('data-map-language=\\"ko\\"') && html.includes('data-map-language=\\"en\\"'));
}
const initialEnglish = english.split("<script>")[0].replace(/<nav class="map-language"[\s\S]*?<\/nav>/g, "");
assert.ok(!/[가-힣]/.test(initialEnglish), "English initial UI has no untranslated Korean apart from its language button");

const expose = "globalThis.mapTest={mapPresetItems,mapTranslations,localizeMapPresets,localizeMapGame,mapSearchTexts,mapFactories};";
const context = { URLSearchParams, location: { hash: "" } };
vm.runInNewContext(scriptOf(korean).replace("mountMap(hashLocale==='ko'||hashLocale==='en'?hashLocale:mapDefaultLocale);", expose), context);
const api = context.mapTest;
const sampleItems = api.mapPresetItems.map(([id, name, aliases, note], index) => ({ id, name, aliases, note, x: 15 + index * 7, y: 50 }));
sampleItems[2].note = "사용자가 고친 위치 메모";
const custom = { id: "my-key", name: "내 열쇠", aliases: "spare key, 여분", note: "내가 직접 입력한 메모", x: 41, y: 63 };
const photo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==";
const house = { version: 2, active: "personal", rooms: [
  { id: "study", title: "우리 집 수납장", photo: null, demo: true, items: sampleItems },
  { id: "bedroom", title: "안방", photo: null, demo: false, items: [] },
  { id: "personal", title: "개인 서랍", photo, demo: false, items: [custom] },
] };
const original = JSON.parse(JSON.stringify(house));
api.localizeMapPresets(house, "en");
assert.equal(house.rooms[0].title, "Our storage cabinet");
assert.equal(house.rooms[0].items[2].name, "Phone charger");
assert.equal(house.rooms[0].items[2].note, "사용자가 고친 위치 메모");
assert.deepEqual(house.rooms[2], original.rooms[2]);
assert.ok(api.mapSearchTexts("휴대폰 충전기").includes("Phone charger"));
assert.ok(api.mapSearchTexts("Phone charger").includes("휴대폰 충전기"));
const game = { queue: [{ roomId: "study", id: "d3", name: "휴대폰 충전기" }], found: [], index: 0, mistakes: 1, hints: 1, hint: true, locked: false, feedback: "여기는 아니에요. 천천히 다른 위치를 살펴보세요." };
api.localizeMapGame(game, house, "en");
assert.equal(game.queue[0].name, "Phone charger");
assert.equal(game.feedback, "Not here. Take your time and try another spot.");
assert.equal(game.mistakes, 1);
assert.equal(game.hints, 1);
assert.equal(game.hint, true);
api.localizeMapPresets(house, "ko");
api.localizeMapGame(game, house, "ko");
assert.deepEqual(JSON.parse(JSON.stringify(house)), original);
assert.equal(game.queue[0].name, "휴대폰 충전기");
assert.equal(game.feedback, "여기는 아니에요. 천천히 다른 위치를 살펴보세요.");

for (const locale of ["ko", "en"]) {
  const factory = api.mapFactories[locale].toString();
  const helpers = ["uid", "validate", "roomOf", "validateHouse"].map(name => factory.match(new RegExp(`function ${name}\\([^\\n]+`))[0]).join("\n");
  const validateHouse = vm.runInNewContext(helpers + "\nvalidateHouse");
  const restored = JSON.parse(JSON.stringify(validateHouse(JSON.parse(JSON.stringify(house)))));
  assert.deepEqual(restored, original, `${locale}: version 2 backup preserves rooms, custom text, coordinates and photo`);
  const legacy = { version: 1, title: "이전 내 지도", photo, items: [custom] };
  const migrated = validateHouse(legacy);
  assert.equal(migrated.version, 2);
  assert.equal(migrated.rooms.length, 1);
  assert.equal(migrated.rooms[0].title, legacy.title);
  assert.equal(migrated.rooms[0].photo, photo);
  assert.equal(migrated.rooms[0].items[0].name, custom.name);
}
console.log("PASS: both bilingual map files compile, run offline and retain the existing browser storage keys.");
console.log("PASS: sample labels and game feedback translate both ways; custom photos, names, notes, coordinates and game progress are preserved.");
console.log("PASS: both UI languages accept version 1 and version 2 backups without losing custom map data.");
