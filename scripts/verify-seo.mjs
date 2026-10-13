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
  for (const path of ["", "/builds", "/about", "/privacy", "/contact", "/builds/cafe-first-day", "/tools/cafe-first-day"]) {
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
      assert.equal(article?.dateModified, "2026-10-12");
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
  const gamePath = locale === "ko" ? "/tools/cafe-first-day.html" : "/tools/cafe-first-day-en.html";
  const game = await response(gamePath);
  assert.equal(attribute(tags(game, "link").find(tag => attribute(tag, "rel") === "canonical"), "href"), canonicalBase + gamePath);
  assert.ok(/<div id="cafe-app"><main/.test(game), "Game has readable initial content without JS");
  assert.ok(game.includes(`${canonicalBase}/${locale}/tools/cafe-first-day`));
}
const robots = await response("/robots.txt");
assert.ok(robots.includes("User-Agent: OAI-SearchBot\nAllow: /"));
assert.ok(robots.includes(`Sitemap: ${canonicalBase}/sitemap.xml`));
const sitemap = await response("/sitemap.xml");
assert.equal((sitemap.match(/<url>/g) || []).length, 16);
assert.ok(sitemap.includes("2026-10-13") && sitemap.includes("2026-10-12"));
const llms = await response("/llms.txt");
assert.ok(llms.includes("Store adoption and training outcomes have not been verified"));
for (const path of ["/ko/builds/missing", "/ko/tools/missing", "/fr/feed.xml"]) {
  assert.equal((await fetch(base + path)).status, 404, `${path}: genuine 404`);
}
console.log(`PASS: ${pages} bilingual pages, metadata, structured data, game fallback, feeds, sitemap, robots, AI navigation and 404s at ${base}`);
