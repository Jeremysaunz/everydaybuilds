import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { text, type Locale } from "@/lib/site-config";
import { copyFor, seriesPosts, toolFor, type Post } from "@/lib/posts";
import "@/app/landing.css";

type Props = { post: Post; locale: Locale; priority?: boolean; featured?: boolean };

export default function PostCard({ post, locale, priority = false, featured = false }: Props) {
  const copy = copyFor(post, locale);
  const cover = post.cover?.[locale];
  const tool = toolFor(post, locale);
  const href = `/${locale}/builds/${post.slug}`;
  const firstPart = featured ? seriesPosts(post)[0] : undefined;
  const comparison = featured ? post.comparison : undefined;

  return (
    <article className={`journal-card${featured ? " journal-card--featured" : ""}`}>
      <div className="journal-card-copy">
        <div className="journal-card-meta">
          <span>{copy.seriesLabel ?? copy.category}</span>
          <time dateTime={post.updatedAt}>{post.updatedAt.replaceAll("-", ".")}</time>
        </div>
        <h3><Link href={href}>{copy.cardTitle ?? copy.title}</Link></h3>
        <p>{copy.summary ?? copy.excerpt}</p>
        <div className="journal-card-actions">
          <Link className="journal-read" href={href} aria-label={`${text(locale, "이야기 읽기", "Read the story")}: ${copy.cardTitle ?? copy.title}`}>
            {text(locale, "이야기 읽기", "Read the story")}<ArrowRight size={16} aria-hidden="true" />
          </Link>
          {firstPart && firstPart.slug !== post.slug && <Link className="journal-series-start" href={`/${locale}/builds/${firstPart.slug}`}>
            {text(locale, "이 연재의 첫 이야기", "Start this series")}
          </Link>}
          {tool.publicUrl && <a className="journal-try" href={tool.publicUrl} target="_blank" rel="noopener noreferrer">
            {post.toolKind === "tool" ? text(locale, "지도 써보기", "Try the map") : text(locale, "게임 해보기", "Try the game")}<ArrowUpRight size={14} aria-hidden="true" />
          </a>}
        </div>
      </div>
      {comparison ? (
        <figure className="journal-comparison">
          <Link href={href} className="journal-comparison-images" tabIndex={-1} aria-hidden="true">
            {[comparison.before, comparison.after].map((image, index) => <div key={image.src}>
              <span>{index === 0 ? text(locale, "바꾸기 전", "Before") : text(locale, "바꾼 뒤", "After")}</span>
              <Image {...image} alt="" sizes="(max-width: 720px) 135px, 160px" priority={priority} unoptimized />
            </div>)}
          </Link>
          <figcaption>{text(locale, "직접 만들고 고친 첫 화면", "Original Korean screens, before and after")}</figcaption>
        </figure>
      ) : cover && (
        <Link className="journal-card-image" href={href} style={post.coverBackground ? { backgroundColor: post.coverBackground } : undefined} tabIndex={-1} aria-hidden="true">
          <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes={featured ? "(max-width: 720px) calc(100vw - 40px), 460px" : "(max-width: 720px) 88px, 220px"} priority={priority} unoptimized />
        </Link>
      )}
    </article>
  );
}
