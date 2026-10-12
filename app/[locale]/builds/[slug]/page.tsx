import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download } from "lucide-react";
import { isLocale, text } from "@/lib/site-config";
import { getPost, copyFor, toolFor, posts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import { readArticleContent } from "@/lib/article-content";
import MarkdownArticle from "@/components/markdown-article";
import "../../../article.css";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  const copy = copyFor(post, locale);
  return {
    ...pageMetadata(locale, "/builds/" + slug, copy.title, copy.excerpt),
    robots: { index: true, follow: true },
  };
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
          <span>Jeremy</span><span>{text(locale, "작성", "Written")} {post.updatedAt.replaceAll("-", ".")}</span><span>{text(locale, "한국어 · English", "English · 한국어")}</span>
        </div>
      </header>
      <div className="article-grid">
        <article className="article-content">
          {tool.publicUrl && (
            <aside className="article-tool-card" aria-label={text(locale, "이 글에서 만든 도구", "The tool made in this post")}>
              <div>
                <p className="eyebrow">{text(locale, "이 글에서 만든 게임", "THE GAME")}</p>
                <h2>{post.toolTitle?.[locale] ?? copy.title}</h2>
                <p>{text(locale, "바로 열어서 해보거나, HTML 파일을 받아 사용해 보세요.", "Play in your browser, or download the HTML file to use offline.")}</p>
              </div>
              <div className="article-tool-actions">
                <a className="button button-dark" href={tool.publicUrl} target="_blank" rel="noopener noreferrer">{text(locale, "게임 직접 해보기", "Try the game")}<ArrowUpRight size={16} aria-hidden="true" /></a>
                {tool.downloadUrl && <a className="article-download" href={tool.downloadUrl} download={tool.downloadFileName}><Download size={15} aria-hidden="true" />{text(locale, "HTML 파일 받기", "Download HTML")}</a>}
              </div>
            </aside>
          )}
          <MarkdownArticle markdown={article.markdown} headings={article.headings} />
          {next && <Link className="next-note" href={"/" + locale + "/builds/" + next.slug}>
            <span className="eyebrow">{text(locale, "다른 이야기", "ANOTHER BUILD NOTE")}</span>
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
