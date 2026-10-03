import type { Locale } from "./site-config";

type LandingCopy = {
  title: string;
  description: string;
  headline: [string, string, string];
  intro: string;
  note: string;
  primary: string;
  journalLink: string;
  secondary: string;
  artwork: string;
  artworkCaption: string;
  values: { title: string; description: string }[];
  peopleTitle: string;
  peopleIntro: string;
  ideaLabel: string;
  people: { person: string; need: string; tool: string }[];
  ideaNote: string;
  approachTitle: string;
  approachIntro: string;
  steps: { title: string; description: string }[];
  examplesLink: string;
  latestTitle: string;
  latestIntro: string;
  authorTitle: string;
  authorRole: string;
  authorParagraphs: string[];
  authorLink: string;
  closingTitle: string;
  closingDescription: string;
  contactLink: string;
};

export const landingCopy: Record<Locale, LandingCopy> = {
  ko: {
    title: "누군가에게 필요한 작은 도구를, AI로",
    description: "한 사람의 하루를 떠올리고, 그 사람에게 필요한 작은 도구를 AI와 만들어 봅니다. 처음 보낸 요청부터 막힌 부분, 고친 과정과 한계를 남기는 Everyday Builds의 제작 기록입니다.",
    headline: ["누군가에게 꼭 필요한", "작은 도구를,", "AI로 만들어 봅니다."],
    intro: "한 사람의 하루를 떠올립니다. 반복되는 일, 조금 번거로운 순간. 그 일에 꼭 맞는 도구를 AI와 함께 만들고, 어디까지 쓸 만한지 확인해 봅니다.",
    note: "만드는 이유부터, 막힌 부분과 다시 고친 과정까지.",
    primary: "어떻게 만드는지 보기",
    journalLink: "제작 기록 읽기",
    secondary: "어떤 도구를 떠올릴까요?",
    artwork: "초록색 타이머, 기록 노트와 작은 블록이 놓인 작업대 일러스트",
    artworkCaption: "한 사람의 필요에서 시작하는 작은 제작",
    values: [
      { title: "내 일에 가져올 아이디어", description: "다른 사람의 작은 불편에서, 내 일에 필요한 도구의 실마리를 찾습니다." },
      { title: "AI에게 건넨 요청과 수정", description: "무엇을 부탁했고 어디서 막혔는지, 다시 어떻게 설명했는지 남깁니다." },
      { title: "결과와 솔직한 한계", description: "공개 가능한 도구는 데모로, 그 밖의 도구는 화면과 설명으로 소개합니다." },
    ],
    peopleTitle: "한 사람의 하루가,\n작은 도구의 시작입니다.",
    peopleIntro: "필요한 도구는 사람마다 다릅니다. 누구를 위한 것인지 떠올리면, 만들 일도 조금 더 구체적이 됩니다.",
    ideaLabel: "떠올려 본 도구 아이디어",
    people: [
      { person: "유치부 선생님", need: "아이들 이름을 찾느라 분주한 시간. 오늘의 출석을 한눈에 확인할 수 있다면?", tool: "간단한 출석 체크" },
      { person: "카페 사장님", need: "메뉴마다 다른 비율과 순서. 새 직원이 부담 없이 익히고 연습할 수 있다면?", tool: "레시피 연습 카드" },
      { person: "피아노를 배우는 아이", need: "막연한 ‘연습하기’ 대신, 오늘 할 연습을 작게 정하고 기록할 수 있다면?", tool: "오늘의 피아노 연습 노트" },
      { person: "혼자 촬영하는 크리에이터", need: "촬영하고 돌아온 뒤 빠진 장면을 발견하지 않도록, 미리 확인할 수 있다면?", tool: "촬영 체크리스트" },
    ],
    ideaNote: "사람과 필요를 떠올리기 위한 아이디어 예시입니다. 실제로 만든 도구나 사용 사례는 아닙니다.",
    approachTitle: "처음 보낸 요청부터,\n다시 고친 과정까지.",
    approachIntro: "AI에게 부탁하고 끝내지 않습니다. 처음 보낸 요청, 예상과 달랐던 결과, 다시 고친 이유를 함께 남깁니다.",
    steps: [
      { title: "누구의 어떤 불편인지", description: "도구를 쓸 사람과 상황을 정하고, 해결할 문제를 한 문장으로 적습니다." },
      { title: "AI에게 구체적으로 요청하기", description: "해주길 바라는 일과 빼도 되는 기능을 설명합니다. 처음 요청문부터 보관합니다." },
      { title: "직접 눌러보고 다시 고치기", description: "정상 동작과 오류를 확인합니다. 막힌 부분과 수정 요청도 기록합니다." },
      { title: "쓸모와 한계를 함께 남기기", description: "써보니 무엇이 달라졌는지 살펴봅니다. 계속 쓸지, 더 고칠지, 멈출지도 남깁니다." },
    ],
    examplesLink: "제작 전 기획 예시 읽기",
    latestTitle: "만들고, 써보고, 남긴 기록.",
    latestIntro: "실제로 제작한 도구와 그 뒤의 사용·개선 과정을 읽어보세요.",
    authorTitle: "안녕하세요,\nJeremy입니다.",
    authorRole: "배움과 성장을 돕는 코치 · 이 블로그를 만드는 사람",
    authorParagraphs: [
      "사람들의 배움과 성장을 돕는 코칭을 하고 있습니다. AI로 누군가의 일에 꼭 맞는 작은 도구를 만들 수 있을까? 그 가능성을 직접 확인해 보고 싶어서 Everyday Builds를 시작했습니다.",
      "실제로 필요한 작은 도구를 하나씩. 잘된 일과 막힌 일, 덜어낸 기능도 차근차근 기록하려 합니다.",
    ],
    authorLink: "블로그의 생각 더 읽기",
    closingTitle: "누구의 어떤 불편이 떠오르나요?",
    closingDescription: "나의 일이어도, 가까운 사람의 일이어도 좋습니다. 작게 해결할 수 있는 순간 하나부터 떠올려 보세요.",
    contactLink: "생각난 불편 이야기하기",
  },
  en: {
    title: "Small tools for real people, built with AI",
    description: "Start with someone’s day and build a small tool for their needs with AI. Everyday Builds documents the first request, the things that go wrong, the revisions, and the limits.",
    headline: ["Small tools.", "For real people.", "Built with AI."],
    intro: "Think of someone’s day. A repetitive task. A slightly awkward moment. Build a tool for that need with AI, then find out how useful it really is.",
    note: "The reason, the rough edges, and the revisions along the way.",
    primary: "See the building process",
    journalLink: "Read the build journal",
    secondary: "What could we build?",
    artwork: "An illustrated workbench with a green timer, a notebook and small building blocks",
    artworkCaption: "Small builds that start with someone’s needs",
    values: [
      { title: "Ideas for your own work", description: "Find a starting point for your own tool in someone else’s everyday problem." },
      { title: "Requests and revisions", description: "See what was asked of AI, where things got stuck, and how the request changed." },
      { title: "Results and honest limits", description: "Shareable tools come with demos. Others are explained through screens and notes." },
    ],
    peopleTitle: "Start with a person.\nThen think of a tool.",
    peopleIntro: "Different people need different tools. Thinking about who will use it makes the idea a little more concrete.",
    ideaLabel: "Some tool ideas to explore",
    people: [
      { person: "A preschool teacher", need: "A busy morning spent finding names. What if today’s attendance was easy to see at a glance?", tool: "A simple attendance check" },
      { person: "A café owner", need: "Different ratios and steps for every drink. What if new staff could practice without pressure?", tool: "Recipe practice cards" },
      { person: "A child learning piano", need: "Instead of a vague instruction to practice, what if today’s small practice plan was easy to set and record?", tool: "A daily piano practice note" },
      { person: "A solo creator", need: "What if missing shots could be caught before the shoot, rather than discovered back at home?", tool: "A filming checklist" },
    ],
    ideaNote: "These are ideas for imagining people and their needs, not completed tools or firsthand usage reports.",
    approachTitle: "The first request.\nThe revisions along the way.",
    approachIntro: "A request to AI is only the start. The journal keeps the first prompt, the unexpected results, and the reasons for changing things.",
    steps: [
      { title: "Name the person and the problem", description: "Define who will use the tool, in what situation, and the problem it should solve." },
      { title: "Make a specific request to AI", description: "Describe what the tool should do and what it can leave out. Keep the first prompt." },
      { title: "Try it, then revise it", description: "Check what works and what breaks. Document the problems and the requests that fix them." },
      { title: "Record its usefulness and its limits", description: "Observe what changes through use. Decide whether to keep it, improve it, or stop." },
    ],
    examplesLink: "Read the planning examples",
    latestTitle: "Built, tried, and written about.",
    latestIntro: "Explore tools that were actually built, with notes on their use and improvement.",
    authorTitle: "Hello,\nI’m Jeremy.",
    authorRole: "A coach for learning and growth · The person behind this blog",
    authorParagraphs: [
      "I coach people through learning and growth. Could AI help build a little tool that fits someone’s work? I started Everyday Builds to explore that possibility for myself.",
      "A small tool with a real purpose. I want to document the things that work, the things that get stuck, and the features that are better left out.",
    ],
    authorLink: "More about the journal",
    closingTitle: "Whose everyday problem comes to mind?",
    closingDescription: "It could be yours, or someone close to you. Start with one moment that a small tool might make easier.",
    contactLink: "Share a small problem",
  },
};
