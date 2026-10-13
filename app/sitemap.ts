import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { posts, toolFor } from "@/lib/posts";
import { cafeGuideUpdatedAt } from "@/lib/tool-guides";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; modified?: string }[] = [
    { path: "" }, { path: "/builds" }, { path: "/about" }, { path: "/privacy" },
    ...(siteConfig.contactEmail ? [{ path: "/contact" }] : []),
    ...posts.map(post => ({ path: `/builds/${post.slug}`, modified: post.updatedAt })),
    { path: "/tools/cafe-first-day", modified: cafeGuideUpdatedAt },
  ];
  const localized = pages.flatMap(({ path, modified }) => (["ko", "en"] as const).map(locale => ({
    url: `${siteConfig.url}/${locale}${path}`,
    ...(modified ? { lastModified: modified } : {}),
    alternates: { languages: { ko: `${siteConfig.url}/ko${path}`, en: `${siteConfig.url}/en${path}`, "x-default": `${siteConfig.url}/ko${path}` } },
  })));
  const game = posts.find(post => post.slug === "cafe-first-day")!;
  return [...localized, ...(["ko", "en"] as const).map(locale => ({
    url: new URL(toolFor(game, locale).publicUrl!, siteConfig.url).href,
    alternates: { languages: { ko: new URL(toolFor(game, "ko").publicUrl!, siteConfig.url).href, en: new URL(toolFor(game, "en").publicUrl!, siteConfig.url).href } },
  }))];
}
