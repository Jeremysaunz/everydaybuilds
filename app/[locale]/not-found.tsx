"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NotFound(){const locale=usePathname().startsWith("/en") ? "en" : "ko";return <main id="main-content" className="container not-found"><p className="eyebrow">404 / NOTE NOT FOUND</p><h1>{locale==="ko" ? "이 기록을 찾을 수 없습니다." : "This note could not be found."}</h1><p>{locale==="ko" ? "주소를 다시 확인하거나 제작 기록에서 다른 글을 읽어보세요." : "Check the address or find another note in the build journal."}</p><Link href={`/${locale}/builds`} className="button button-dark">{locale==="ko" ? "제작 기록 보기" : "Explore the journal"}</Link></main>;}
