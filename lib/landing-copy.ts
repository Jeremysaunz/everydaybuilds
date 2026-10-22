import { siteConfig, type Locale } from "./site-config";

type LandingCopy = {
  title: string;
  description: string;
  kicker: string;
  headline: [string, string];
  intro: string;
  latestTitle: string;
  journalLink: string;
  firstStoryLabel: string;
  firstStoryLink: string;
  otherStoriesTitle: string;
  authorParagraphs: string[];
};

export const landingCopy: Record<Locale, LandingCopy> = {
  ko: {
    title: "AI로 만드는, 일상에 필요한 작은 도구들",
    description: "카페 교육 게임부터 물건찾기지도, 앱인토스용 기질 테스트 앱 ‘이런나’까지. AI와 작은 도구를 만들며 보낸 요청문, 직접 써 보고 고친 과정을 한국어와 영어로 기록합니다.",
    kicker: `${siteConfig.owner.ko}의 작은 실험 노트`,
    headline: ["AI랑 만들다 보니,", "할 이야기가 생겼습니다."],
    intro: "카페 게임부터 물건 찾는 지도, 앱인토스에 올릴 앱까지. 직접 만들어 보며 알게 된 것들을 적습니다.",
    latestTitle: "가장 최근에 쓴 글",
    journalLink: "모든 이야기",
    firstStoryLabel: "처음 오셨다면",
    firstStoryLink: "첫 이야기부터 읽기",
    otherStoriesTitle: "이런 것도 만들었습니다",
    authorParagraphs: [
      "배움과 성장을 돕는 코칭을 하고 있습니다. 일을 하거나 일상을 보내다 ‘이런 도구가 있으면 좋겠다’는 생각이 들면, AI에게 말을 건네 봅니다.",
      "게임을 부탁했다가 컵에 우유를 넣게도 하고, 물건을 찾는 지도에 찾기 놀이를 더하기도 했습니다. Everyday Builds에는 그렇게 만들고 고친 과정을 적습니다.",
    ],
  },
  en: {
    title: "Small tools, built with AI for everyday life",
    description: "A café training game, a photo map, and Ireonna, a temperament test app being built for Apps in Toss. Prompts, screenshots, and notes on building with AI, in Korean and English.",
    kicker: `${siteConfig.owner.en}’s notes on building with AI`,
    headline: ["Small ideas.", "Unexpected turns."],
    intro: "A café game, a map for finding things, an app for Apps in Toss. I build them with AI and write about what I learn along the way.",
    latestTitle: "The latest story",
    journalLink: "All stories",
    firstStoryLabel: "New here?",
    firstStoryLink: "Start with my first build",
    otherStoriesTitle: "Other things I’ve made",
    authorParagraphs: [
      "I work as a coach, helping people learn and grow. When I think ‘a tool for this would be useful’ at work or in everyday life, I try asking AI to help me make it.",
      "A request for a game led to adding milk to an on-screen cup. A map for finding things grew into a finding game. Everyday Builds is where I write about making those tools and changing them along the way.",
    ],
  },
};
