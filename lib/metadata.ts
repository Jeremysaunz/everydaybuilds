import type { Metadata } from "next";
import { siteConfig, type Locale } from "./site-config";
import { posts, type PostImage } from "./posts";

export function pageMetadata(locale: Locale, path: string, title: string, description: string, image?: PostImage): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const cover = image ?? posts[0]?.cover?.[locale];
  const images = cover ? [{ url: `${siteConfig.url}${cover.src}`, width: cover.width, height: cover.height, alt: cover.alt }] : undefined;
  return {
    title, description,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    alternates: {
      canonical: url,
      languages: { ko: `${siteConfig.url}/ko${path}`, en: `${siteConfig.url}/en${path}`, "x-default": `${siteConfig.url}/ko${path}` },
      types: { "application/rss+xml": `${siteConfig.url}/${locale}/feed.xml` },
    },
    openGraph: { title: `${title} | ${siteConfig.name}`, description, url, siteName: siteConfig.name, locale: locale === "ko" ? "ko_KR" : "en_US", alternateLocale: locale === "ko" ? "en_US" : "ko_KR", type: "website", images },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description, images: cover ? [{ url: `${siteConfig.url}${cover.src}`, alt: cover.alt }] : undefined },
  };
}
