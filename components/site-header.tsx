"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig, text, type Locale } from "@/lib/site-config";
export function BrandMark() {return <span className="brand-mark" aria-hidden="true"><i/><i/><i/><i/></span>;}
export default function SiteHeader({locale}:{locale:Locale}) {
 const pathname=usePathname(); const [open,setOpen]=useState(false);
 const suffix=pathname.replace(/^\/(ko|en)(?=\/|$)/,"");
 const nav=[{path:"",label:text(locale,"홈","Home")},{path:"/builds",label:text(locale,"제작 기록","Build journal")},{path:"/about",label:text(locale,"소개","About")},...(siteConfig.contactEmail ? [{path:"/contact",label:text(locale,"문의","Contact")}] : [])];
 return <header className="site-header"><div className="container header-inner"><Link className="brand" href={`/${locale}`} onClick={()=>setOpen(false)}><BrandMark/><span>Everyday<span className="brand-light"> Builds</span><span className="brand-period">.</span></span></Link><nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={text(locale,"주 메뉴","Main navigation")}>{nav.map(item=><Link key={item.path} href={`/${locale}${item.path}`} aria-current={suffix===item.path || (item.path && suffix.startsWith(item.path)) ? "page" : undefined} onClick={()=>setOpen(false)}>{item.label}</Link>)}</nav><div className="header-actions"><div className="language-switch" aria-label={text(locale,"언어 선택","Language")}><a href={`/ko${suffix}`} lang="ko" aria-current={locale==="ko" ? "true" : undefined}>KO</a><span>/</span><a href={`/en${suffix}`} lang="en" aria-current={locale==="en" ? "true" : undefined}>EN</a></div><button className="menu-toggle" aria-label={text(locale,open ? "메뉴 닫기" : "메뉴 열기",open ? "Close menu" : "Open menu")} aria-expanded={open} onClick={()=>setOpen(!open)}>{open ? <X size={22}/> : <Menu size={22}/>}</button></div></div></header>;
}
