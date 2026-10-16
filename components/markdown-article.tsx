import Image from "next/image";
import Markdown, { type Components } from "react-markdown";
import type { ArticleHeading } from "@/lib/article-content";

const imageSizes: Record<string, { width: number; height: number }> = {
  "/images/cafe-first-day/01-first-result.png": { width: 1280, height: 1089 },
  "/images/cafe-first-day/03-training-flow.png": { width: 1280, height: 1399 },
  "/images/cafe-first-day/05-before-cup.png": { width: 1280, height: 1088 },
  "/images/cafe-first-day/06-interactive-cup.png": { width: 1280, height: 1268 },
  "/images/cafe-first-day/07-color-home.jpg": { width: 1280, height: 1422 },
  "/images/cafe-first-day/08-color-cup.jpg": { width: 1280, height: 1130 },
  "/images/cafe-first-day/en/01-first-result-v2.png": { width: 1360, height: 1157 },
  "/images/cafe-first-day/en/03-training-flow-v2.png": { width: 1200, height: 1311 },
  "/images/cafe-first-day/en/05-before-cup-v2.png": { width: 1360, height: 1156 },
  "/images/cafe-first-day/en/06-interactive-cup-v2.png": { width: 1262, height: 1246 },
  "/images/cafe-first-day/en/07-color-home.jpg": { width: 1280, height: 1456 },
  "/images/cafe-first-day/en/08-color-cup.jpg": { width: 1280, height: 1209 },
  "/images/where-was-it/01-first-map.jpg": { width: 1280, height: 1231 },
  "/images/where-was-it/02-rooms-and-search.jpg": { width: 1280, height: 1517 },
  "/images/where-was-it/03-finding-game.jpg": { width: 1280, height: 1762 },
  "/images/where-was-it/en/01-first-map.jpg": { width: 1280, height: 1229 },
  "/images/where-was-it/en/02-rooms-and-search.jpg": { width: 1280, height: 1541 },
  "/images/where-was-it/en/03-finding-game.jpg": { width: 1280, height: 1781 },
  "/images/ireonna-build-log/2026-10-15_01_home-initial.jpg": { width: 360, height: 780 },
  "/images/ireonna-build-log/2026-10-15_02_conversation-card.png": { width: 1280, height: 1108 },
  "/images/ireonna-build-log/en/01-home-reading.jpg": { width: 440, height: 1022 },
  "/images/ireonna-build-log/en/02-conversation-card-reading.jpg": { width: 1280, height: 1108 },
};

const sharedComponents: Components = {
  img({ src, alt }) {
    if (typeof src !== "string" || !src.startsWith("/images/")) return null;
    const size = imageSizes[src] ?? { width: 1280, height: 800 };
    const portrait = size.height > size.width * 1.6;
    return (
      <a href={src} target="_blank" rel="noopener noreferrer" className={`article-image-link${portrait ? " article-image-link--portrait" : ""}`}>
        <Image src={src} alt={alt ?? ""} {...size} sizes={portrait ? "(max-width: 400px) calc(100vw - 48px), 360px" : "(max-width: 720px) 100vw, 780px"} unoptimized />
      </a>
    );
  },
  a({ href, children }) {
    const download = href?.startsWith("/tools/");
    return <a href={href} download={download ? href?.split("/").at(-1) : undefined}>{children}</a>;
  },
};

export default function MarkdownArticle({ markdown, headings }: { markdown: string; headings: ArticleHeading[] }) {
  const headingIds = new Map(headings.map((heading) => [heading.line, heading.id]));
  return (
    <div className="markdown-article">
      <Markdown
        components={{
          ...sharedComponents,
          h2({ node, children }) {
            return <h2 id={headingIds.get(node?.position?.start.line ?? 0)}>{children}</h2>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
