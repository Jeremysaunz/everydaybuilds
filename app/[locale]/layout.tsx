import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import { isLocale, text, siteConfig } from "@/lib/site-config";
import { siteGraph } from "@/lib/structured-data";
import "../globals.css";
import "../chrome.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      ...(process.env.NAVER_SITE_VERIFICATION ? { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : {}),
    },
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#267b45" };
export function generateStaticParams() { return [{ locale: "ko" }, { locale: "en" }]; }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale}><body>
    <JsonLd data={siteGraph(locale)} />
    <a className="skip-link" href="#main-content">{text(locale, "본문으로 바로가기", "Skip to content")}</a>
    <SiteHeader locale={locale} />{children}<SiteFooter locale={locale} />
  </body></html>;
}
