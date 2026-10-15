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
  updatedAt: "2026-10-15", verifiedAt: "2026-10-12",
  publicUrl: "/tools/cafe-first-day.html", downloadUrl: "/tools/cafe-first-day.html",
  downloadFileName: "카페-첫날.html", toolTitle: { ko: "카페 첫날", en: "Café First Day" },
  localizedTools: { en: { publicUrl: "/tools/cafe-first-day-en.html", downloadUrl: "/tools/cafe-first-day-en.html", downloadFileName: "cafe-first-day-en.html" } },
  tools: ["ChatGPT", "HTML", "CSS", "JavaScript"],
  cover: {
    ko: { src: "/images/cafe-first-day/06-interactive-cup.png", width: 1280, height: 1268, alt: "카페 첫날 게임에서 컵에 얼음, 우유와 샷을 넣어 만든 카페라떼" },
    en: { src: "/images/cafe-first-day/en/06-interactive-cup-v2.png", width: 1262, height: 1246, alt: "A Café First Day screenshot adapted with English labels, showing an iced latte" },
  },
  ko: {
    title: "코딩 몰라도, ChatGPT에 말로 부탁해 카페 교육 게임을 만들었어요",
    seoTitle: "바이브 코딩 첫 도전: 코딩 없이 ChatGPT로 카페 교육 게임 만들기",
    excerpt: "코딩을 몰라도 ChatGPT에 말로 부탁하면 직접 눌러 쓰는 게임을 만들 수 있어요. 짬 날 때 한 시간 안에, 대화 서너 번으로 만든 과정과 실제 요청문, 따라 해 볼 첫 요청문 예시까지 정리했어요.",
    summary: "ChatGPT에 말로 부탁해 한 시간 안에 카페 교육 게임을 만들고, 써 보며 고쳐 간 과정이에요.",
    category: "일과 배움",
  },
  en: {
    title: "No coding needed: I asked ChatGPT to build a café training game",
    seoTitle: "Vibe coding for beginners: a café training game made with ChatGPT",
    excerpt: "You don’t need to code to build a small tool with ChatGPT. In under an hour and three or four messages, I made a training game for new café staff. Here are my real requests, the screens, and prompts you can try today.",
    summary: "I asked ChatGPT to build a café training game in under an hour, then improved it by trying it out.",
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
