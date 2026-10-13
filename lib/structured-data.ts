import { siteConfig, type Locale } from "./site-config";

export function siteGraph(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url, inLanguage: ["ko", "en"], publisher: { "@id": `${siteConfig.url}/#author` } },
      { "@type": "Person", "@id": `${siteConfig.url}/#author`, name: siteConfig.owner, url: `${siteConfig.url}/${locale}/about` },
    ],
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return { "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) };
}
