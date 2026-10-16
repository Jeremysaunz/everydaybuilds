import { siteConfig, type Locale } from "./site-config";

type LandingCopy = {
  title: string;
  description: string;
  kicker: string;
  headline: [string, string];
  intro: string;
  latestTitle: string;
  journalLink: string;
  authorParagraphs: string[];
};

export const landingCopy: Record<Locale, LandingCopy> = {
  ko: {
    title: "AI로 만드는, 일상에 필요한 작은 도구들",
    description: "AI로 일상에 필요한 작은 도구와 HTML 게임을 만들고, 직접 실행하며 고치는 제작 기록. 카페 신입 교육 게임의 요청문, 제작 화면과 체험 파일을 한국어·영어로 공개합니다.",
    kicker: `${siteConfig.owner.ko}의 작은 도구 이야기`,
    headline: ["AI로 만드는,", "일상에 필요한 작은 도구들."],
    intro: "누군가의 하루에 필요한 도구를 만들고, 써보고, 고쳐 가는 기록입니다.",
    latestTitle: "최근 글",
    journalLink: "모든 글",
    authorParagraphs: [
      "배움과 성장을 돕는 코칭을 하고 있습니다. 일을 하거나 일상을 보내다 ‘이런 도구가 있으면 좋겠다’는 생각이 들면, AI에게 말을 건네 봅니다.",
      "게임을 부탁했다가 컵에 우유를 넣게도 하고, 물건을 찾는 지도에 찾기 놀이를 더하기도 했습니다. Everyday Builds에는 그렇게 만들고 고친 과정을 적습니다.",
    ],
  },
  en: {
    title: "Small tools, built with AI for everyday life",
    description: "Build small tools and HTML games with AI. Read real build notes, prompts and screenshots, and try a café staff training game in Korean or English.",
    kicker: `Small tools, made by ${siteConfig.owner.en}`,
    headline: ["Small tools for everyday life.", "Built with AI."],
    intro: "I build small tools with AI, try them out, and share what I learn along the way.",
    latestTitle: "Latest note",
    journalLink: "All notes",
    authorParagraphs: [
      "I work as a coach, helping people learn and grow. When I think ‘a tool for this would be useful’ at work or in everyday life, I try asking AI to help me make it.",
      "A request for a game led to adding milk to an on-screen cup. A map for finding things grew into a finding game. Everyday Builds is where I write about making those tools and changing them along the way.",
    ],
  },
};
