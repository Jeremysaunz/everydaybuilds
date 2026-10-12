import type { Locale } from "./site-config";

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
    description: "누군가의 하루에 필요한 작은 도구를 AI와 만들고, 직접 써보고 고치는 기록입니다.",
    kicker: "Jeremy의 작은 도구 이야기",
    headline: ["AI로 만드는,", "일상에 필요한 작은 도구들."],
    intro: "누군가의 하루에 필요한 도구를 만들고, 써보고, 고쳐 가는 기록입니다.",
    latestTitle: "최근 글",
    journalLink: "모든 글",
    authorParagraphs: [
      "사람들의 배움과 성장을 돕는 코칭을 하고 있습니다. AI로 누군가의 일에 꼭 맞는 작은 도구를 만들 수 있을까? 그 가능성을 직접 확인해 보고 싶어서 Everyday Builds를 시작했습니다.",
      "실제로 필요한 작은 도구를 하나씩. 잘된 일과 막힌 일, 덜어낸 기능도 차근차근 기록하려 합니다.",
    ],
  },
  en: {
    title: "Small tools, built with AI for everyday life",
    description: "A journal of building small tools with AI, trying them out, and improving them along the way.",
    kicker: "Small tools, made by Jeremy",
    headline: ["Small tools for everyday life.", "Built with AI."],
    intro: "I build small tools with AI, try them out, and share what I learn along the way.",
    latestTitle: "Latest note",
    journalLink: "All notes",
    authorParagraphs: [
      "I work as a coach, helping people learn and grow. I started Everyday Builds to find out whether AI could help me build small tools that fit the way someone works.",
      "One small tool at a time, with a real need behind it. I share what works, where I get stuck, and which features turn out to be worth leaving out.",
    ],
  },
};
