import assert from "node:assert/strict";
const base = (process.env.SEO_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const canonicalBase = (process.env.SEO_CANONICAL_URL || "https://everydaybuilds.blog").replace(/\/$/, "");
const response = async path => {
  const res = await fetch(base + path, { signal: AbortSignal.timeout(20000) });
  assert.equal(res.status, 200, `${path}: HTTP ${res.status}`);
  assert.ok(!res.headers.get("x-robots-tag")?.includes("noindex"), `${path}: blocked by header`);
  return res.text();
};
const attribute = (tag, name) => tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1];
const tags = (html, tag) => html.match(new RegExp(`<${tag}\\b[^>]*>`, "g")) || [];
const meta = (html, key) => tags(html, "meta").find(tag => attribute(tag, "name") === key || attribute(tag, "property") === key);
let pages = 0;
for (const locale of ["ko", "en"]) {
  for (const path of ["", "/builds", "/about", "/privacy", "/contact", "/builds/cafe-first-day", "/builds/where-was-it", "/builds/ireonna-build-log", "/tools/cafe-first-day"]) {
    const url = `/${locale}${path}`;
    const html = await response(url);
    assert.equal(attribute(tags(html, "html")[0] || "", "lang"), locale, `${url}: lang`);
    assert.ok(/<title>[^<]+<\/title>/.test(html), `${url}: title`);
    assert.ok(attribute(meta(html, "description") || "", "content")?.length > 20, `${url}: description`);
    assert.equal(attribute(tags(html, "link").find(tag => attribute(tag, "rel") === "canonical") || "", "href"), canonicalBase + url, `${url}: canonical`);
    for (const language of ["ko", "en", "x-default"]) {
      assert.equal(attribute(tags(html, "link").find(tag => attribute(tag, "hrefLang") === language || attribute(tag, "hreflang") === language) || "", "href"), `${canonicalBase}/${language === "x-default" ? "ko" : language}${path}`, `${url}: hreflang ${language}`);
    }
    assert.ok(meta(html, "og:image") && meta(html, "twitter:card"), `${url}: social image`);
    assert.ok(!attribute(meta(html, "robots") || "", "content")?.includes("noindex"), `${url}: robots`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => JSON.parse(match[1])["@graph"] || []);
    assert.ok(schemas.some(item => item["@type"] === "WebSite"));
    assert.ok(schemas.some(item => item["@type"] === "Person"));
    if (path.includes("/builds/")) {
      assert.equal(attribute(meta(html, "og:type"), "content"), "article");
      const article = schemas.find(item => item["@type"] === "BlogPosting");
      assert.equal(article?.url, canonicalBase + url);
      assert.equal(article?.dateModified, "2026-10-16");
      assert.ok(schemas.some(item => item["@type"] === "BreadcrumbList"));
    }
    if (path.includes("/tools/")) {
      assert.ok(schemas.some(item => item["@type"] === "SoftwareApplication"));
      assert.ok(html.includes(locale === "ko" ? "자주 묻는 질문" : "Frequently asked questions"));
    }
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.equal((visible.match(/<h1\b/g) || []).length, 1, `${url}: one main heading`);
    pages++;
  }
  const feed = await response(`/${locale}/feed.xml`);
  assert.ok(feed.includes('<rss version="2.0"') && feed.includes(`${canonicalBase}/${locale}/builds/cafe-first-day`));
  assert.equal((feed.match(/<item>/g) || []).length, 3);
  assert.ok(feed.indexOf(`/builds/ireonna-build-log`) < feed.indexOf(`/builds/where-was-it`), "Ireonna part 1 leads the feed");
  assert.ok(feed.indexOf(`/builds/where-was-it`) < feed.indexOf(`/builds/cafe-first-day`), "Newest story leads the feed");
  const gamePath = locale === "ko" ? "/tools/cafe-first-day.html" : "/tools/cafe-first-day-en.html";
  const game = await response(gamePath);
  assert.equal(attribute(tags(game, "link").find(tag => attribute(tag, "rel") === "canonical"), "href"), canonicalBase + gamePath);
  assert.ok(/<div id="cafe-app"><main/.test(game), "Game has readable initial content without JS");
  assert.ok(game.includes(`${canonicalBase}/${locale}/tools/cafe-first-day`));
  const mapPath = locale === "ko" ? "/tools/where-was-it.html" : "/tools/where-was-it-en.html";
  const map = await response(mapPath);
  assert.equal(attribute(tags(map, "link").find(tag => attribute(tag, "rel") === "canonical"), "href"), canonicalBase + mapPath);
  assert.equal(attribute(tags(map, "html")[0], "lang"), locale);
  assert.ok(map.includes('<div id="map-app">') && map.includes("data-map-language"));
  assert.ok(attribute(meta(map, "og:image"), "content").includes("/images/where-was-it/"));
  const article = await response(`/${locale}/builds/where-was-it`);
  assert.ok(article.includes(`href="${mapPath}"`), "Article opens the matching-language map");
  for (const tag of tags(article, "img")) {
    const src = attribute(tag, "src");
    if (!src?.startsWith("/images/where-was-it/")) continue;
    const image = await fetch(base + src);
    assert.equal(image.status, 200, src);
    assert.ok(image.headers.get("content-type")?.includes("image/jpeg"), src);
  }
  const ireonna = await response(`/${locale}/builds/ireonna-build-log`);
  assert.ok(ireonna.includes(locale === "ko" ? "이야기" : "STORY") && ireonna.includes("03"));
  assert.ok(ireonna.includes(locale === "ko" ? "개발 중" : "In development"));
  assert.ok(!ireonna.includes('class="article-tool-card"'), "Unreleased app has no demo or download card");
  assert.ok(!ireonna.includes("02-기질이름과설명") && !ireonna.includes("발행 전 초안"), "Draft part 2 has no public link");
  assert.ok(!ireonna.includes("/Users/"), "No local workspace paths in the public page");
  if (locale === "en") assert.ok(ireonna.includes("English reading copy"), "Translated images are identified");
  const ireonnaImages = tags(ireonna, "img").filter(tag => attribute(tag, "src")?.startsWith("/images/ireonna-build-log/"));
  assert.equal(ireonnaImages.length, 2, "Part 1 has its two article images");
  for (const tag of ireonnaImages) {
    const src = attribute(tag, "src");
    assert.equal(src.includes("/en/"), locale === "en", "Article uses matching-language images");
    const image = await fetch(base + src);
    assert.equal(image.status, 200, src);
    assert.ok(image.headers.get("content-type")?.includes(src.endsWith(".png") ? "image/png" : "image/jpeg"), src);
  }
  const home = await response(`/${locale}`);
  assert.ok(home.indexOf('/builds/ireonna-build-log') < home.indexOf('/builds/where-was-it'), "Third story leads the home page");
}
const robots = await response("/robots.txt");
assert.ok(robots.includes("User-Agent: OAI-SearchBot\nAllow: /"));
assert.ok(robots.includes(`Sitemap: ${canonicalBase}/sitemap.xml`));
const sitemap = await response("/sitemap.xml");
assert.equal((sitemap.match(/<url>/g) || []).length, 22);
assert.ok(sitemap.includes("/en/builds/where-was-it") && sitemap.includes("/tools/where-was-it-en.html"));
assert.ok(sitemap.includes("/ko/builds/ireonna-build-log") && sitemap.includes("/en/builds/ireonna-build-log"));
assert.ok(sitemap.includes("2026-10-13") && sitemap.includes("2026-10-16"));
const llms = await response("/llms.txt");
assert.ok(llms.includes("Store adoption and training outcomes have not been verified"));
for (const path of ["/ko/builds/missing", "/ko/tools/missing", "/fr/feed.xml"]) {
  assert.equal((await fetch(base + path)).status, 404, `${path}: genuine 404`);
}
console.log(`PASS: ${pages} bilingual pages, metadata, structured data, game fallback, feeds, sitemap, robots, AI navigation and 404s at ${base}`);
