import { text, type Locale } from "./site-config";

export type PostCopy = { title: string; seoTitle?: string; excerpt: string; summary?: string; category: string };
export type PostImage = { src: string; width: number; height: number; alt: string };
export type ToolLinks = { publicUrl?: string; downloadUrl?: string; downloadFileName?: string };
export type Post = {
  slug: string;
  programId: string;
  number: string;
  kind: "experience";
  status: "built" | "using" | "improving" | "stopped";
  completed: boolean;
  cover?: Record<Locale, PostImage>;
  updatedAt: string;
  verifiedAt?: string;
  publicUrl?: string;
  downloadUrl?: string;
  downloadFileName?: string;
  localizedTools?: Partial<Record<Locale, ToolLinks>>;
  toolTitle?: Record<Locale, string>;
  tools: string[];
  ko: PostCopy;
  en: PostCopy;
};

export const posts: Post[] = [{
  slug: "cafe-first-day", programId: "cafe-first-day", number: "01",
  kind: "experience", status: "built", completed: true,
  updatedAt: "2026-10-12", verifiedAt: "2026-10-12",
  publicUrl: "/tools/cafe-first-day.html", downloadUrl: "/tools/cafe-first-day.html",
  downloadFileName: "카페-첫날.html", toolTitle: { ko: "카페 첫날", en: "Café First Day" },
  localizedTools: { en: { publicUrl: "/tools/cafe-first-day-en.html", downloadUrl: "/tools/cafe-first-day-en.html", downloadFileName: "cafe-first-day-en.html" } },
  tools: ["AI", "HTML", "CSS", "JavaScript"],
  cover: {
    ko: { src: "/images/cafe-first-day/06-interactive-cup.png", width: 1280, height: 1268, alt: "카페 첫날 게임에서 컵에 얼음, 우유와 샷을 넣어 만든 카페라떼" },
    en: { src: "/images/cafe-first-day/en/06-interactive-cup-v2.png", width: 1262, height: 1246, alt: "A Café First Day screenshot adapted with English labels, showing an iced latte" },
  },
  ko: {
    title: "카페 신입 교육 게임을 말로 부탁해 만들었어요",
    seoTitle: "AI로 카페 신입 교육 게임 만들기: HTML 음료 제조 연습",
    excerpt: "AI에게 말로 부탁해 카페 신입 교육 게임을 만들었어요. 직접 해보며 필요한 내용을 더하고, 컵에 재료를 넣는 화면으로 바꿔 봤어요.",
    summary: "AI에게 말로 부탁해 음료 교육 게임을 만들고, 컵에 재료를 넣는 기능을 더했어요.",
    category: "일과 배움",
  },
  en: {
    title: "I asked AI to build a café training game",
    seoTitle: "Build a café training game with AI and HTML",
    excerpt: "I asked AI to make a game for new café staff. As I tried it out, I asked for changes—including a cup you can fill with ingredients.",
    summary: "I asked AI to build a drink-making game, then added a cup you can fill with ingredients.",
    category: "Work & learning",
  },
}];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
export const copyFor = (post: Post, locale: Locale) => post[locale];
export const toolFor = (post: Post, locale: Locale): ToolLinks => ({ publicUrl: post.publicUrl, downloadUrl: post.downloadUrl, downloadFileName: post.downloadFileName, ...post.localizedTools?.[locale] });
export const completedCount = () => new Set(posts.filter((post) => post.completed).map((post) => post.programId)).size;
export const recentPosts = () => [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);
export const statusLabel = (status: Post["status"], locale: Locale) => ({
  built: text(locale, "제작 완료", "Built"),
  using: text(locale, "계속 사용", "In use"),
  improving: text(locale, "개선 예정", "Improvements planned"),
  stopped: text(locale, "사용 중단", "No longer in use"),
})[status];
