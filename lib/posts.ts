import { text, type Locale } from "./site-config";

export type PostCopy = { title: string; seoTitle?: string; excerpt: string; summary?: string; category: string };
export type PostImage = { src: string; width: number; height: number; alt: string };
export type ToolLinks = { publicUrl?: string; downloadUrl?: string; downloadFileName?: string };
export type Post = {
  slug: string;
  programId: string;
  number: string;
  kind: "experience";
  status: "building" | "built" | "using" | "improving" | "stopped";
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
  updatedAt: "2026-10-16", verifiedAt: "2026-10-15",
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
    excerpt: "ChatGPT에 카페 교육 게임을 부탁했습니다. 음료 순서를 고르는 화면으로 시작해 컵에 재료를 넣고 색감까지 바꿨습니다. 실제 프롬프트와 수정 과정을 담은 첫 바이브코딩 기록입니다.",
    summary: "ChatGPT에 게임을 부탁했다가 컵도 채우고 색깔까지 고쳤습니다. 처음 만들어 보며 조금씩 알아간 이야기.",
    category: "일과 배움",
  },
  en: {
    title: "Vibe coding with ChatGPT: building a café training game",
    seoTitle: "Vibe coding with ChatGPT: building a café training game",
    excerpt: "I asked ChatGPT for a café training game. Choosing drink-making steps led to filling cups and changing colors. Here are the prompts and revisions from my first vibe coding project.",
    summary: "I asked ChatGPT for a game and ended up filling cups and changing colors. A few things I learned along the way.",
    category: "Work & learning",
  },
}, {
  slug: "where-was-it", programId: "where-was-it", number: "02",
  kind: "experience", status: "built", completed: true, toolKind: "tool", coverFit: "contain",
  updatedAt: "2026-10-16", verifiedAt: "2026-10-15",
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
    excerpt: "AI에 사진으로 물건 위치를 찾는 HTML 도구를 부탁했습니다. 위치만 찾으려다 캐릭터와 여러 공간, 찾기 놀이까지 더했습니다. 실제 요청문과 수정 과정, 저장에 대해 알게 된 점을 적었습니다.",
    summary: "충전기 위치를 찾는 지도를 부탁했는데, 캐릭터도 생기고 찾기 놀이까지 붙었습니다. 이번에도 일이 조금 커졌습니다.",
    category: "생활과 정리",
  },
  en: {
    title: "I built a photo map to find things at home",
    seoTitle: "Vibe coding: building a photo map to find things at home",
    excerpt: "I asked AI for an HTML tool to find things in photos. It grew into a map with a character, multiple rooms, and a finding game. Here are the prompts, revisions, and what I learned about saving photos.",
    summary: "A map for finding a charger gained a character and a finding game. This small idea grew a little, too.",
    category: "Home & organization",
  },
}, {
  slug: "ireonna-build-log", programId: "ireonna", number: "03",
  kind: "experience", status: "building", completed: false,
  updatedAt: "2026-10-16",
  tools: ["Codex", "Apps in Toss"],
  cover: {
    ko: { src: "/images/ireonna-build-log/03-cover.jpg", width: 1280, height: 720, alt: "이런나의 초기 홈과 예시 대화 카드를 담은 개발기 1편 표지" },
    en: { src: "/images/ireonna-build-log/en/03-cover.jpg", width: 1280, height: 720, alt: "English reading copies of Ireonna’s early Korean home screen and example conversation card" },
  },
  ko: {
    title: "이런나 개발기 01: AI와 기질 테스트 앱을 만들기 시작했습니다",
    seoTitle: "앱인토스 개발기: Codex로 시작한 기질 테스트 앱 이런나",
    excerpt: "앱인토스가 뭔지 몰라 AI에게 물어봤습니다. 가이드 링크를 보내고 뭘 만들면 좋을지 의논하다가, 기질 테스트 앱의 첫 화면까지 만들었습니다.",
    summary: "앱인토스가 뭔지도 몰랐습니다. AI에게 가이드 링크를 보내고 뭘 만들면 좋을지 물어보다가, 기질 테스트 앱을 만들기 시작했습니다.",
    category: "앱 개발",
  },
  en: {
    title: "Ireonna build diary 01: starting a temperament test app with AI",
    seoTitle: "Building an app for Apps in Toss with Codex: Ireonna 01",
    excerpt: "I didn’t know what Apps in Toss was, so I asked AI. I sent it the guide, talked through what I could make, and ended up trying the first screens of a temperament test app.",
    summary: "I didn’t even know what Apps in Toss was. I sent AI the guide, asked what I could make, and started building a temperament test app.",
    category: "Building an app",
  },
}];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
export const copyFor = (post: Post, locale: Locale) => post[locale];
export const toolFor = (post: Post, locale: Locale): ToolLinks => ({ publicUrl: post.publicUrl, downloadUrl: post.downloadUrl, downloadFileName: post.downloadFileName, ...post.localizedTools?.[locale] });
export const completedCount = () => new Set(posts.filter((post) => post.completed).map((post) => post.programId)).size;
export const orderedPosts = () => [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.number.localeCompare(a.number, undefined, { numeric: true }));
export const recentPosts = () => orderedPosts().slice(0, 3);
export const statusLabel = (status: Post["status"], locale: Locale) => ({
  building: text(locale, "개발 중", "In development"),
  built: text(locale, "제작 완료", "Built"),
  using: text(locale, "계속 사용", "In use"),
  improving: text(locale, "개선 예정", "Improvements planned"),
  stopped: text(locale, "사용 중단", "No longer in use"),
})[status];
