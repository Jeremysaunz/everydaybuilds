import { notFound } from "next/navigation";
import { isLocale, text } from "@/lib/site-config";
import { posts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import PostCard from "@/components/post-card";
import "../../landing.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/builds", text(locale, "AI로 작은 도구와 HTML 게임 만들기 — 제작 기록", "Building small tools and HTML games with AI — journal"), text(locale,
    "AI로 작은 도구를 만들고, 써보고, 고쳐 가는 기록입니다.",
    "Notes on building small tools with AI, trying them out, and making them better."));
}

export default async function Builds({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const published = [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return (
    <main id="main-content" className="container simple-home simple-builds">
      <header className="simple-list-heading">
        <div><p className="simple-kicker">{text(locale, "만들고, 써보고, 고치는 이야기", "Making, trying, and improving")}</p><h1>{text(locale, "만든 이야기", "The build journal")}</h1></div>
        <p>{text(locale, `${published.length}편의 글`, `${published.length} ${published.length === 1 ? "note" : "notes"}`)}</p>
      </header>
      <section aria-label={text(locale, "전체 글", "All notes")} className="simple-posts"><h2 className="sr-only">{text(locale, "전체 글", "All notes")}</h2>{published.map((post, index) => <PostCard key={post.slug} post={post} locale={locale} priority={index === 0} />)}</section>
    </main>
  );
}
