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
  coverFit?: "cover" | "contain";
  updatedAt: string;
  verifiedAt?: string;
  publicUrl?: string;
  downloadUrl?: string;
  downloadFileName?: string;
  localizedTools?: Partial<Record<Locale, ToolLinks>>;
  toolTitle?: Record<Locale, string>;
  toolKind?: "game" | "tool";
  tools: string[];
  ko: PostCopy;
  en: PostCopy;
};

export const posts: Post[] = [{
  slug: "cafe-first-day", programId: "cafe-first-day", number: "01",
  kind: "experience", status: "built", completed: true,
  updatedAt: "2026-10-15", verifiedAt: "2026-10-15",
  publicUrl: "/tools/cafe-first-day.html", downloadUrl: "/tools/cafe-first-day.html",
  downloadFileName: "카페-첫날.html", toolTitle: { ko: "카페 첫날", en: "Café First Day" },
  localizedTools: { en: { publicUrl: "/tools/cafe-first-day-en.html", downloadUrl: "/tools/cafe-first-day-en.html", downloadFileName: "cafe-first-day-en.html" } },
  tools: ["ChatGPT", "HTML", "CSS", "JavaScript"],
  cover: {
    ko: { src: "/images/cafe-first-day/09-color-cover.jpg", width: 1707, height: 960, alt: "주황색과 파란색, 노란색으로 꾸민 카페 첫날 게임의 시작 화면" },
    en: { src: "/images/cafe-first-day/en/09-color-cover.jpg", width: 1707, height: 960, alt: "The Café First Day home screen with orange, blue, and yellow colors" },
  },
  ko: {
    title: "바이브코딩 입문: ChatGPT로 카페 교육 게임 만들기",
    seoTitle: "바이브코딩 입문: ChatGPT로 카페 교육 게임 만들기",
    excerpt: "ChatGPT로 HTML 카페 교육 게임을 만든 바이브코딩 입문 사례입니다. 실제 프롬프트와 제작 화면, 직접 실행하며 수정한 내용을 정리했습니다.",
    summary: "ChatGPT로 HTML 카페 교육 게임을 만들고 수정한 첫 바이브코딩 기록입니다.",
    category: "일과 배움",
  },
  en: {
    title: "Vibe coding with ChatGPT: building a café training game",
    seoTitle: "Vibe coding with ChatGPT: building a café training game",
    excerpt: "My first vibe coding project with ChatGPT: a café training game in a single HTML file. Includes the prompts, screenshots, and changes made after testing.",
    summary: "My first vibe coding project: building and testing an HTML café training game with ChatGPT.",
    category: "Work & learning",
  },
}, {
  slug: "where-was-it", programId: "where-was-it", number: "02",
  kind: "experience", status: "built", completed: true, toolKind: "tool", coverFit: "contain",
  updatedAt: "2026-10-15", verifiedAt: "2026-10-15",
  publicUrl: "/tools/where-was-it.html", downloadUrl: "/tools/where-was-it.html",
  downloadFileName: "물건-찾기-지도.html", toolTitle: { ko: "여기 있었네!", en: "Found It!" },
  localizedTools: { en: { publicUrl: "/tools/where-was-it-en.html", downloadUrl: "/tools/where-was-it-en.html", downloadFileName: "where-was-it-en.html" } },
  tools: ["AI", "HTML", "CSS", "JavaScript"],
  cover: {
    ko: { src: "/images/where-was-it/04-cover.jpg", width: 1280, height: 720, alt: "보라색 캐릭터와 공간별 사진 카드가 있는 물건찾기지도" },
    en: { src: "/images/where-was-it/en/04-cover.jpg", width: 1280, height: 720, alt: "The English Found It! photo map with a purple explorer and room cards" },
  },
  ko: {
    title: "사진으로 찾는 물건 지도를 만들었습니다",
    seoTitle: "바이브코딩: AI로 물건 위치를 찾는 사진 지도 만들기",
    excerpt: "사진에 물건 위치를 표시하고 이름으로 찾는 HTML 도구를 AI로 만들었습니다. 실제 요청문과 화면을 보며 디자인·여러 공간·찾기 놀이를 추가한 과정을 정리했습니다.",
    summary: "사진과 물건 이름을 넣어 검색하는 도구. 캐릭터와 여러 공간, 찾기 놀이를 더한 과정을 기록했습니다.",
    category: "생활과 정리",
  },
  en: {
    title: "I built a photo map to find things at home",
    seoTitle: "Vibe coding: building a photo map to find things at home",
    excerpt: "I used AI to build an HTML tool for marking items on photos and finding them by name. Here are the prompts, screenshots, and changes that added brighter colors, multiple rooms, and a finding game.",
    summary: "A photo map for finding things by name, with notes on adding a character, multiple rooms, and a finding game.",
    category: "Home & organization",
  },
}];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
export const copyFor = (post: Post, locale: Locale) => post[locale];
export const toolFor = (post: Post, locale: Locale): ToolLinks => ({ publicUrl: post.publicUrl, downloadUrl: post.downloadUrl, downloadFileName: post.downloadFileName, ...post.localizedTools?.[locale] });
export const completedCount = () => new Set(posts.filter((post) => post.completed).map((post) => post.programId)).size;
export const orderedPosts = () => [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.number.localeCompare(a.number, undefined, { numeric: true }));
export const recentPosts = () => orderedPosts().slice(0, 3);
export const statusLabel = (status: Post["status"], locale: Locale) => ({
  built: text(locale, "제작 완료", "Built"),
  using: text(locale, "계속 사용", "In use"),
  improving: text(locale, "개선 예정", "Improvements planned"),
  stopped: text(locale, "사용 중단", "No longer in use"),
})[status];
