const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://everydaybuilds.blog";

export const siteConfig = {
  name: "Everyday Builds",
  url: siteUrl.replace(/\/+$/, ""),
  contactEmail: "ireokego@gmail.com",
  owner: { ko: "이러케", en: "Ireoke" },
};
export type Locale = "ko" | "en";
export function isLocale(value: string): value is Locale { return value === "ko" || value === "en"; }
export const text = (locale: Locale, ko: string, en: string) => locale === "ko" ? ko : en;
