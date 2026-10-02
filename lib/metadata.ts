import type { Metadata } from "next";
import { siteConfig, type Locale } from "./site-config";
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
 return {title,description,alternates:{canonical:`${siteConfig.url}/${locale}${path}`,languages:{ko:`${siteConfig.url}/ko${path}`,en:`${siteConfig.url}/en${path}`,"x-default":`${siteConfig.url}/ko${path}`}},openGraph:{title:`${title} | Everyday Builds`,description,url:`${siteConfig.url}/${locale}${path}`,siteName:siteConfig.name,locale:locale === "ko" ? "ko_KR" : "en_US",type:"website"}};
}
