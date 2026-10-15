import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download } from "lucide-react";
import JsonLd from "@/components/json-ld";
import { breadcrumbs } from "@/lib/structured-data";
import { isLocale, text, siteConfig } from "@/lib/site-config";
import { getPost, copyFor, toolFor, posts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import { readArticleContent } from "@/lib/article-content";
import MarkdownArticle from "@/components/markdown-article";
import "../../../article.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() { return posts.map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  const copy = copyFor(post, locale);
  const base = pageMetadata(locale, "/builds/" + slug, copy.seoTitle ?? copy.title, copy.excerpt, post.cover?.[locale]);
  return { ...base, openGraph: { ...base.openGraph, type: "article" as const, modifiedTime: post.updatedAt, authors: [`${siteConfig.url}/${locale}/about`] } };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) notFound();
  const copy = copyFor(post, locale);
  const tool = toolFor(post, locale);
  const article = await readArticleContent(post.slug, locale);
  const headings = article.headings;
  const next = posts.find((candidate) => candidate.slug !== post.slug);

  return (
    <main id="main-content" className="container article-page">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "BlogPosting", "@id": `${siteConfig.url}/${locale}/builds/${slug}#article`, headline: copy.title, description: copy.excerpt, url: `${siteConfig.url}/${locale}/builds/${slug}`, mainEntityOfPage: `${siteConfig.url}/${locale}/builds/${slug}`, inLanguage: locale, dateModified: post.updatedAt, author: { "@id": `${siteConfig.url}/#author` }, publisher: { "@id": `${siteConfig.url}/#author` }, isPartOf: { "@id": `${siteConfig.url}/#website` }, image: post.cover?.[locale] ? `${siteConfig.url}${post.cover[locale].src}` : undefined },
        breadcrumbs([{ name: siteConfig.name, url: `${siteConfig.url}/${locale}` }, { name: text(locale, "만든 이야기", "Journal"), url: `${siteConfig.url}/${locale}/builds` }, { name: copy.title, url: `${siteConfig.url}/${locale}/builds/${slug}` }]),
      ] }} />
      <Link href={"/" + locale + "/builds"} className="back-link">{text(locale, "만든 이야기로 돌아가기", "Back to the journal")}</Link>
      <header className="article-header">
        <div className="card-meta">
          <span>{copy.category}</span>
          <span className="example-badge">{text(locale, "만든 이야기", "Journal")}</span>
          <span className="card-no">{text(locale, "이야기", "STORY")} {post.number}</span>
        </div>
        <h1>{copy.title}</h1>
        <p className="article-lead">{copy.excerpt}</p>
        <div className="article-meta">
          <Link href={`/${locale}/about`}>Jeremy</Link><span>{text(locale, "수정", "Updated")} <time dateTime={post.updatedAt}>{post.updatedAt.replaceAll("-", ".")}</time></span><span>{text(locale, "한국어 · English", "English · 한국어")}</span>
        </div>
      </header>
      <div className="article-grid">
        <article className="article-content">
          {tool.publicUrl && (
            <aside className="article-tool-card" aria-label={text(locale, "이 글에서 만든 도구", "The tool made in this post")}>
              <div>
                <p className="eyebrow">{post.toolKind === "tool" ? text(locale, "이 글에서 만든 도구", "THE TOOL") : text(locale, "이 글에서 만든 게임", "THE GAME")}</p>
                <h2>{post.toolTitle?.[locale] ?? copy.title}</h2>
                <p>{text(locale, "바로 열어서 써보거나, HTML 파일을 받아 사용해 보세요.", "Try it in your browser, or download the HTML file to use offline.")}</p>
              </div>
              <div className="article-tool-actions">
                <a className="button button-dark" href={tool.publicUrl} target="_blank" rel="noopener noreferrer">{post.toolKind === "tool" ? text(locale, "물건 지도 열기", "Open the map") : text(locale, "게임 직접 해보기", "Try the game")}<ArrowUpRight size={16} aria-hidden="true" /></a>
                {post.programId === "cafe-first-day" && <Link className="article-download" href={`/${locale}/tools/cafe-first-day`}>{text(locale, "게임 기능과 사용법", "Game features and instructions")}</Link>}
                {tool.downloadUrl && <a className="article-download" href={tool.downloadUrl} download={tool.downloadFileName}><Download size={15} aria-hidden="true" />{text(locale, "HTML 파일 받기", "Download HTML")}</a>}
              </div>
            </aside>
          )}
          <MarkdownArticle markdown={article.markdown} headings={article.headings} />
          {next && <Link className="next-note" href={"/" + locale + "/builds/" + next.slug}>
            <span className="eyebrow">{text(locale, "다른 이야기", "ANOTHER STORY")}</span>
            <strong>{copyFor(next, locale).title}</strong>
          </Link>}
        </article>
        <aside className="article-sidebar">
          <nav className="table-of-contents" aria-label={text(locale, "글 목차", "Table of contents")}>
            <h2>{text(locale, "이 글에서", "IN THIS POST")}</h2>
            {headings.map((heading, i) => <a key={heading.id} href={"#" + heading.id}><span>0{i + 1}</span>{heading.title.split(" · ")[0]}</a>)}
          </nav>
          <div className="sidebar-note"><span>SMALL, BUT USEFUL.</span><p>{text(locale, "한 사람의 필요에서 시작해, 직접 눌러보고 확인합니다.", "Start with a real need. Build something small, then try it out.")}</p></div>
        </aside>
      </div>
    </main>
  );
}
