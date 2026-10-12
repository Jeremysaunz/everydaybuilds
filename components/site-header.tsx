"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { text, type Locale } from "@/lib/site-config";

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(ko|en)(?=\/|$)/, "");
  const nav = [{ path: "/builds", label: text(locale, "만든 이야기", "Journal") }, { path: "/about", label: text(locale, "소개", "About") }];
  return (
    <header className="site-header simplified-header">
      <div className="container header-inner">
        <Link className="brand" href={`/${locale}`}><BrandMark /><span>Everyday<span className="brand-light"> Builds</span><span className="brand-period">.</span></span></Link>
        <nav className="main-nav" aria-label={text(locale, "주 메뉴", "Main navigation")}>
          {nav.map((item) => <Link key={item.path} href={`/${locale}${item.path}`} aria-current={suffix === item.path || suffix.startsWith(item.path + "/") ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-actions"><div className="language-switch" aria-label={text(locale, "언어 선택", "Language")}><a href={`/ko${suffix}`} lang="ko" aria-label="한국어로 읽기" aria-current={locale === "ko" ? "true" : undefined}>KO</a><a href={`/en${suffix}`} lang="en" aria-label="Read in English" aria-current={locale === "en" ? "true" : undefined}>EN</a></div></div>
      </div>
    </header>
  );
}
