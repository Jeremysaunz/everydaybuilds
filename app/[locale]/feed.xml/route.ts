import { isLocale, siteConfig } from "@/lib/site-config";
import { orderedPosts } from "@/lib/posts";
import { landingCopy } from "@/lib/landing-copy";
const xml = (value: string) => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  const items = orderedPosts().map(post => {
    const url = `${siteConfig.url}/${locale}/builds/${post.slug}`;
    return `<item><title>${xml(post[locale].title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(post[locale].excerpt)}</description></item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(siteConfig.name)}</title><link>${xml(`${siteConfig.url}/${locale}`)}</link><description>${xml(landingCopy[locale].description)}</description><language>${locale}</language><atom:link href="${xml(`${siteConfig.url}/${locale}/feed.xml`)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
