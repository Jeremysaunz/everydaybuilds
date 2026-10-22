import { text, type Locale } from "./site-config";

export type PostCopy = { title: string; cardTitle?: string; seriesLabel?: string; seoTitle?: string; excerpt: string; summary?: string; category: string };
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
  coverBackground?: string;
  comparison?: { before: PostImage; after: PostImage };
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
    cardTitle: "ChatGPT에 카페 교육 게임을 부탁했습니다",
    seoTitle: "바이브코딩 입문: ChatGPT로 카페 교육 게임 만들기",
    excerpt: "ChatGPT에 카페 교육 게임을 부탁했습니다. 음료 순서를 고르는 화면으로 시작해 컵에 재료를 넣고 색감까지 바꿨습니다. 실제 프롬프트와 수정 과정을 담은 첫 바이브코딩 기록입니다.",
    summary: "ChatGPT에 게임을 부탁했다가 컵도 채우고 색깔까지 고쳤습니다. 처음 만들어 보며 조금씩 알아간 이야기.",
    category: "일과 배움",
  },
  en: {
    title: "Vibe coding with ChatGPT: building a café training game",
    cardTitle: "I asked ChatGPT to make a café training game",
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
  coverFit: "contain", coverBackground: "#edf2e8",
  updatedAt: "2026-10-22",
  tools: ["Codex", "Apps in Toss"],
  cover: {
    ko: { src: "/images/ireonna-build-log/03-cover.jpg", width: 1280, height: 720, alt: "이런나의 초기 홈과 예시 대화 카드를 담은 개발기 1편 표지" },
    en: { src: "/images/ireonna-build-log/en/03-cover.jpg", width: 1280, height: 720, alt: "English reading copies of Ireonna’s early Korean home screen and example conversation card" },
  },
  ko: {
    title: "앱인토스 개발기 01: AI와 기질 테스트 앱 ‘이런나’를 만들기 시작했습니다",
    cardTitle: "무슨 앱을 만들지부터 AI에게 물었습니다",
    seriesLabel: "앱인토스 개발기 · ‘이런나’ 01",
    seoTitle: "앱인토스 개발기 01: AI와 Codex로 기질 테스트 앱 ‘이런나’ 만들기",
    excerpt: "앱인토스가 뭔지부터 AI에게 물어봤습니다. 기질 테스트 앱을 만들기로 정하고, Codex에 기획 문서를 보내 첫 화면을 만들어 봤습니다.",
    summary: "앱인토스가 뭔지, 어떤 앱을 만들면 좋을지 AI에게 물었습니다. 기질 테스트를 골라 첫 화면을 만들고 카드와 검사 결과를 확인했습니다.",
    category: "앱인토스 개발",
  },
  en: {
    title: "Building for Apps in Toss 01: Starting Ireonna, a temperament test app, with AI",
    cardTitle: "I asked AI what I could build",
    seriesLabel: "Ireonna for Apps in Toss · 01",
    seoTitle: "Apps in Toss development 01: Building Ireonna with AI and Codex",
    excerpt: "I asked AI to explain Apps in Toss and suggest app ideas. I chose a temperament test and sent a plan to Codex to make the first screens.",
    summary: "I asked AI about Apps in Toss and what I could build. I chose a temperament test, made the first screens, and tried the cards and test results.",
    category: "Building for Apps in Toss",
  },

}, {
  slug: "ireonna-build-log-02", programId: "ireonna", number: "04",
  kind: "experience", status: "building", completed: false,
  updatedAt: "2026-10-22", coverFit: "contain",
  tools: ["Codex", "Apps in Toss"],
  cover: {
    ko: { src: "/images/ireonna-build-log-02/2026-10-15_10_result-after-names.jpg", width: 582, height: 695, alt: "기질 이름을 함께 표시한 이런나 초기 결과 화면" },
    en: { src: "/images/ireonna-build-log-02/2026-10-15_10_result-after-names.jpg", width: 582, height: 695, alt: "Original Korean result screen showing traditional and descriptive temperament labels" },
  },
  ko: {
    title: "앱인토스 개발기 02: ‘이런나’ 기질 설명과 대화 카드를 고쳤습니다",
    cardTitle: "기질은 알겠는데, 그래서 뭐라고 말하죠?",
    seriesLabel: "앱인토스 개발기 · ‘이런나’ 02",
    seoTitle: "앱인토스 개발기 02: ‘이런나’ 기질 설명과 대화 카드 수정",
    excerpt: "앱인토스에 올릴 기질 테스트 앱 ‘이런나’의 기질 이름과 설명을 고쳤습니다. 일상 예시를 넣고, 대화 카드에서 고를 문장도 더 생각해 봤습니다.",
    summary: "‘추진표현형’이 무슨 뜻인지 저도 잘 모르겠더군요. 이름과 설명에 일상 예시를 붙이고, 대화 카드도 상황에 맞게 고치고 싶었습니다.",
    category: "앱인토스 개발",
  },
  en: {
    title: "Building for Apps in Toss 02: Revising Ireonna’s temperament descriptions and conversation cards",
    cardTitle: "I know my type. What do I say?",
    seriesLabel: "Ireonna for Apps in Toss · 02",
    seoTitle: "Apps in Toss development 02: Ireonna’s descriptions and conversation cards",
    excerpt: "I revised the temperament labels and descriptions in Ireonna, an app I'm building for Apps in Toss. I added everyday examples and worked on sentences people could choose for conversation cards.",
    summary: "I wasn't sure what ‘Driven–Expressive’ meant. I revised the labels and descriptions, then thought about wording for conversations with a manager or friend.",
    category: "Building for Apps in Toss",
  },
}, {
  slug: "ireonna-build-log-03", programId: "ireonna", number: "05",
  kind: "experience", status: "building", completed: false,
  updatedAt: "2026-10-22", coverFit: "contain",
  tools: ["Codex", "Apps in Toss"],
  comparison: {
    before: { src: "/images/ireonna-build-log-03/2026-10-15_home-before.jpg", width: 360, height: 780, alt: "" },
    after: { src: "/images/ireonna-build-log-03/2026-10-21_home-after.jpg", width: 390, height: 844, alt: "" },
  },
  cover: {
    ko: { src: "/images/ireonna-build-log-03/2026-10-21_home-after.jpg", width: 390, height: 844, alt: "카드 미리보기를 먼저 보여주는 이런나의 변경 후 홈" },
    en: { src: "/images/ireonna-build-log-03/2026-10-21_home-after.jpg", width: 390, height: 844, alt: "Original Korean Ireonna home screen with result card previews" },
  },
  ko: {
    title: "앱인토스 개발기 03: ‘이런나’ 결과 카드와 모바일 화면을 고쳤습니다",
    cardTitle: "결과 카드를 꾸미다가 문구와 버튼까지 고쳤습니다",
    seriesLabel: "앱인토스 개발기 · ‘이런나’ 03",
    seoTitle: "앱인토스 개발기 03: ‘이런나’ 카드 디자인·문구와 모바일 화면 수정",
    excerpt: "앱인토스에 올릴 ‘이런나’의 결과 카드와 모바일 검사 화면을 고쳤습니다. 카드 문구가 저도 헷갈리고, 휴대폰에서는 ‘다음’ 버튼이 안 보이더군요.",
    summary: "카드에 쓴 말이 저도 헷갈리고, 휴대폰에서는 ‘다음’ 버튼이 안 보였습니다. 문구와 화면을 고친 과정을 적었습니다.",
    category: "앱인토스 개발",
  },
  en: {
    title: "Building for Apps in Toss 03: Redesigning Ireonna’s cards and fixing the mobile test",
    cardTitle: "I redesigned the cards and fixed the text and buttons, too",
    seriesLabel: "Ireonna for Apps in Toss · 03",
    seoTitle: "Apps in Toss development 03: Ireonna’s card design and mobile test",
    excerpt: "I redesigned the cards and mobile test in Ireonna, an app I'm building for Apps in Toss. Some of the card text confused me, and Next was off-screen, so I fixed those, too.",
    summary: "Some of my own card text confused me, and Next was off-screen on mobile. Here's how I changed the text and layout.",
    category: "Building for Apps in Toss",
  },
}];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
export const copyFor = (post: Post, locale: Locale) => post[locale];
export const toolFor = (post: Post, locale: Locale): ToolLinks => ({ publicUrl: post.publicUrl, downloadUrl: post.downloadUrl, downloadFileName: post.downloadFileName, ...post.localizedTools?.[locale] });
export const completedCount = () => new Set(posts.filter((post) => post.completed).map((post) => post.programId)).size;
export const orderedPosts = () => [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.number.localeCompare(a.number, undefined, { numeric: true }));
export function homePosts() {
  const programs = new Set<string>();
  return orderedPosts().filter((post) => {
    if (programs.has(post.programId)) return false;
    programs.add(post.programId);
    return true;
  }).slice(0, 3);
}
export const seriesPosts = (post: Post) => posts
  .filter((candidate) => candidate.programId === post.programId)
  .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
export function seriesNeighbors(post: Post): { previous?: Post; next?: Post } {
  const series = seriesPosts(post);
  const index = series.findIndex((candidate) => candidate.slug === post.slug);
  if (index < 0) return {};
  return { previous: series[index - 1], next: series[index + 1] };
}
export const statusLabel = (status: Post["status"], locale: Locale) => ({
  building: text(locale, "개발 중", "In development"),
  built: text(locale, "제작 완료", "Built"),
  using: text(locale, "계속 사용", "In use"),
  improving: text(locale, "개선 예정", "Improvements planned"),
  stopped: text(locale, "사용 중단", "No longer in use"),
})[status];
