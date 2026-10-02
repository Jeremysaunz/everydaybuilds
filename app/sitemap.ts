import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/posts";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","/builds","/about","/privacy",...(siteConfig.contactEmail ? ["/contact"] : []),...posts.filter(p=>p.kind==="experience").map(p=>`/builds/${p.slug}`)];return paths.flatMap(path=>["ko","en"].map(locale=>({url:`${siteConfig.url}/${locale}${path}`,alternates:{languages:{ko:`${siteConfig.url}/ko${path}`,en:`${siteConfig.url}/en${path}`}}})));}
