import Link from "next/link";
import { siteConfig, text, type Locale } from "@/lib/site-config";

export default function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="compact-footer">
      <div className="container compact-footer-inner">
        <p>© 2026 Everyday Builds <span>by Jeremy</span></p>
        <nav aria-label={text(locale, "하단 메뉴", "Footer navigation")}><Link href={`/${locale}/about`}>{text(locale, "소개", "About")}</Link>{siteConfig.contactEmail && <Link href={`/${locale}/contact`}>{text(locale, "문의", "Contact")}</Link>}<Link href={`/${locale}/privacy`}>{text(locale, "개인정보처리방침", "Privacy")}</Link></nav>
      </div>
    </footer>
  );
}
