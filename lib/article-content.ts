import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./site-config";

export type ArticleHeading = { title: string; id: string; line: number };

export async function readArticleContent(slug: string, locale: Locale) {
  const source = await readFile(
    path.join(process.cwd(), "content", "posts", slug, locale + ".md"),
    "utf8",
  );
  // The page header already displays the title from the post metadata.
  const markdown = source.replace(/^# [^\n]+\r?\n+/, "");
  const headings: ArticleHeading[] = [];
  markdown.split("\n").forEach((line, index) => {
    if (line.startsWith("## ")) {
      headings.push({ title: line.slice(3), id: "section-" + (headings.length + 1), line: index + 1 });
    }
  });
  return { markdown, headings };
}
