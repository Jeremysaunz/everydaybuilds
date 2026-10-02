import type { Metadata,Viewport } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { isLocale,text } from "@/lib/site-config";
import "../globals.css";
export const metadata: Metadata={title:{default:"Everyday Builds",template:"%s | Everyday Builds"},icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export const viewport: Viewport={width:"device-width",initialScale:1,themeColor:"#267b45"};
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {const {locale}=await params;if(!isLocale(locale)) notFound();return <html lang={locale}><body><a className="skip-link" href="#main-content">{text(locale,"본문으로 바로가기","Skip to content")}</a><SiteHeader locale={locale}/>{children}<SiteFooter locale={locale}/></body></html>;}
