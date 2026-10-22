import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { text, type Locale } from "@/lib/site-config";
import { copyFor, toolFor, type Post } from "@/lib/posts";
import "@/app/landing.css";

export default function PostCard({ post, locale, priority = false }: { post: Post; locale: Locale; priority?: boolean }) {
  const copy = copyFor(post, locale);
  const cover = post.cover?.[locale];
  const tool = toolFor(post, locale);
  const href = `/${locale}/builds/${post.slug}`;
  return (
    <article className="journal-card">
      {cover && (
        <Link className={`journal-card-image${post.coverFit === "contain" ? " journal-card-image--contain" : ""}`} href={href} style={post.coverBackground ? { backgroundColor: post.coverBackground } : undefined} tabIndex={-1} aria-hidden="true">
          <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes="(max-width: 720px) calc(100vw - 40px), 520px" priority={priority} unoptimized />
        </Link>
      )}
      <div className="journal-card-copy">
        <div className="journal-card-meta"><span>{copy.category}</span><time dateTime={post.updatedAt}>{post.updatedAt.replaceAll("-", ".")}</time></div>
        <h3><Link href={href}>{copy.title}</Link></h3>
        <p>{copy.summary ?? copy.excerpt}</p>
        <div className="journal-card-actions">
          <Link className="button journal-read" href={href}>{text(locale, "글 읽기", "Read the story")}<ArrowRight size={16} aria-hidden="true" /></Link>
          {tool.publicUrl && <a className="journal-try" href={tool.publicUrl} target="_blank" rel="noopener noreferrer">{post.toolKind === "tool" ? text(locale, "지도 써보기", "Try the map") : text(locale, "게임 해보기", "Try the game")}<ArrowUpRight size={15} aria-hidden="true" /></a>}
        </div>
      </div>
    </article>
  );
}
