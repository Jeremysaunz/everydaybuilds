export const siteConfig = {name:"Everyday Builds",url:"https://everyday-builds.actslim.chatgpt.site",contactEmail:"",owner:"Jeremy"};
export type Locale = "ko" | "en";
export function isLocale(value: string): value is Locale { return value === "ko" || value === "en"; }
export const text = (locale: Locale, ko: string, en: string) => locale === "ko" ? ko : en;
