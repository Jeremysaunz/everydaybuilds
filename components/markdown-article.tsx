import Image from "next/image";
import Markdown, { type Components } from "react-markdown";
import type { ArticleHeading } from "@/lib/article-content";

const imageSizes: Record<string, { width: number; height: number }> = {
  "/images/cafe-first-day/01-first-result.png": { width: 1280, height: 1089 },
  "/images/cafe-first-day/03-training-flow.png": { width: 1280, height: 1399 },
  "/images/cafe-first-day/05-before-cup.png": { width: 1280, height: 1088 },
  "/images/cafe-first-day/06-interactive-cup.png": { width: 1280, height: 1268 },
  "/images/cafe-first-day/en/01-first-result-v2.png": { width: 1360, height: 1157 },
  "/images/cafe-first-day/en/03-training-flow-v2.png": { width: 1200, height: 1311 },
  "/images/cafe-first-day/en/05-before-cup-v2.png": { width: 1360, height: 1156 },
  "/images/cafe-first-day/en/06-interactive-cup-v2.png": { width: 1262, height: 1246 },
};

const sharedComponents: Components = {
  img({ src, alt }) {
    if (typeof src !== "string" || !src.startsWith("/images/")) return null;
    const size = imageSizes[src] ?? { width: 1280, height: 800 };
    return (
      <a href={src} target="_blank" rel="noopener noreferrer" className="article-image-link">
        <Image src={src} alt={alt ?? ""} {...size} sizes="(max-width: 720px) 100vw, 780px" unoptimized />
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
