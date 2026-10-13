import type { Locale } from "./site-config";

export const cafeGuideUpdatedAt = "2026-10-13";
export const cafeGuide: Record<Locale, {
  title: string; description: string; intro: string;
  features: { title: string; body: string }[];
  steps: string[]; questions: { question: string; answer: string }[];
  limits: string; storage: string;
}> = {
  ko: {
    title: "카페 첫날: 카페 신입 교육·음료 제조 연습 게임",
    description: "카페 첫날은 주문 확인, 컵 선택, 계량과 음료 제조 순서를 연습하는 무료 HTML 게임입니다. 한국어·영어로 바로 체험하고, 파일을 내려받거나 매장 레시피를 입력해 보세요.",
    intro: "카페 첫날은 카페 신입 직원이나 카페 알바를 시작하는 사람이 주문을 읽고 음료 만드는 순서를 연습해 볼 수 있는 브라우저 게임입니다. AI와 만든 제작 실험으로, 회원 가입이나 설치 없이 무료로 열어볼 수 있어요.",
    features: [
      { title: "주문 확인부터 음료 제공까지", body: "주문표를 읽고 컵을 고른 다음, 재료의 양과 제조 순서를 선택해요. 얼음·우유·샷을 누르거나 컵으로 끌어 넣으면 컵 안에 재료가 쌓이는 모습이 보여요." },
      { title: "따라 배우기와 혼자 풀기", body: "처음에는 레시피 길잡이를 보며 따라 하고, 익숙해지면 혼자 풀기로 바꿀 수 있어요. 틀린 단계는 피드백을 보고 다시 연습해요." },
      { title: "매장 레시피와 기본기 확인", body: "예시 메뉴를 살펴보고 매장에서 사용하는 레시피를 직접 입력할 수 있어요. 주문 확인·위생·실수 대응에 관한 기본기 문제와 체크리스트도 포함돼요." },
      { title: "한국어·영어와 HTML 파일", body: "오른쪽 위 언어 버튼으로 한국어와 영어를 바꿀 수 있어요. HTML 파일 하나에 게임이 들어 있어, 내려받은 파일은 브라우저로 열어 사용할 수 있어요." },
    ],
    steps: ["‘게임 시작하기’를 눌러 카페 첫날을 열어요. 처음에는 예시 레시피를 살펴보세요.", "기본기와 체크리스트를 확인하고, 연습할 메뉴와 ‘따라 배우기’를 선택해요.", "주문 확인 → 컵 선택 → 계량 → 제조 → 제공 순서로 문제를 풀어요. 재료는 누르거나 컵으로 끌어 넣을 수 있어요.", "혼자 풀기로 같은 메뉴를 다시 연습해요. 매장 교육에 쓰려면 담당자가 레시피와 안내를 먼저 검토하고 실제 매장 기준에 맞게 수정하세요."],
    questions: [
      { question: "카페 알바 레시피를 외우는 데 사용할 수 있나요?", answer: "매장 레시피를 입력하고 제조 순서를 반복해서 살펴보는 보조 도구로 써볼 수 있어요. 들어 있는 메뉴는 예시이며, 매장마다 재료의 양과 순서가 달라요. 암기나 교육 효과를 측정한 결과는 아직 없어요." },
      { question: "휴대폰에서도 사용할 수 있나요?", answer: "공개 링크는 휴대폰 브라우저로 열 수 있어요. 재료는 끌어 넣는 대신 눌러서 선택할 수도 있어요. 내려받은 HTML 파일은 휴대폰 앱마다 여는 방식이 달라서, 휴대폰에서는 링크로 여는 것이 편해요." },
      { question: "인터넷 없이도 되나요?", answer: "HTML 파일을 먼저 내려받으면 브라우저에서 오프라인으로 열 수 있어요. 블로그 글과 온라인 링크를 새로 열 때는 인터넷이 필요해요." },
      { question: "언어를 바꾸면 기록이 사라지나요?", answer: "같은 파일에서 언어를 바꿔도 진행 상태와 작성 중인 레시피가 유지돼요. 직접 입력한 이름, 메모와 제조 단계는 자동 번역되지 않아요." },
      { question: "AI에게 어떻게 부탁해서 만들었나요?", answer: "카페 신입 직원이 음료 만드는 순서를 연습하도록 HTML 파일 하나로 만들어 달라고 요청했어요. 이후 교육 흐름을 보완하고 컵에 재료를 넣는 화면을 추가했어요. 아래 제작기에 요청문과 실제 화면을 남겼어요." },
    ],
    limits: "이 게임은 실제 매장의 교육을 대신하지 않아요. 음료 제조, 위생 관리와 기계 사용은 매장 담당자에게 직접 배우고 확인하세요. 컵에 보이는 양과 색은 시각적 표현이며 실제 계량 기준이 아니에요. 매장 도입이나 교육 효과는 아직 검증하지 않았어요.",
    storage: "진행 상태와 레시피는 사용 중인 브라우저의 저장 공간에 보관돼요. 계정이나 서버 동기화가 없으므로 다른 기기로 자동 이동하지 않으며, 브라우저 데이터를 지우면 기록이 사라질 수 있어요. 필요한 레시피는 게임의 JSON 내보내기로 백업하세요.",
  },
  en: {
    title: "Café First Day: café staff training game",
    description: "Try Café First Day, a free browser game for reading orders, choosing cups and practicing drink-making steps. Switch between Korean and English or download one HTML file to use offline.",
    intro: "Café First Day is a browser game for new café staff to practice reading orders and following drink-making steps. It is an experiment built with AI. You can try it for free without an account or installation.",
    features: [
      { title: "From order to handoff", body: "Read an order, choose a cup, and work through ingredient quantities and preparation steps. Click ingredients or drag them into the cup to see ice, milk and espresso build up." },
      { title: "Guided and independent practice", body: "Start with a recipe guide, then switch to independent practice. Feedback helps you retry steps you get wrong." },
      { title: "Store recipes and basic skills", body: "Explore example drinks and enter your own store recipes. The game also includes basic questions and checklists on orders, hygiene and handling mistakes." },
      { title: "Korean, English and an HTML download", body: "Use the language buttons at the top right to switch between Korean and English. The game fits in one HTML file that you can download and open in a browser." },
    ],
    steps: ["Open ‘Start the game’ and look through the example recipes.", "Review the basic skills and checklists, then choose drinks and guided practice.", "Work through the order, cup, quantities, preparation and handoff. Click ingredients or drag them into the cup.", "Try the same drinks in independent practice. Before using it for staff training, ask the person responsible to review the content and adapt recipes to your store."],
    questions: [
      { question: "Can I use it to learn café recipes?", answer: "You can enter store recipes and revisit the preparation sequence as a practice aid. Included recipes are examples; amounts and steps vary between stores. We have not measured learning or memorization outcomes." },
      { question: "Does it work on a phone?", answer: "You can open the public link in a mobile browser and tap ingredients instead of dragging them. Apps handle downloaded HTML files differently, so the public link is usually easier on a phone." },
      { question: "Can I use it offline?", answer: "Download the HTML file first, then open it in a browser without an internet connection. Loading the blog or public game link requires internet access." },
      { question: "Will changing the language erase my progress?", answer: "Switching languages within the same file preserves progress and the recipe you are editing. Names, notes and steps you enter yourself are not automatically translated." },
      { question: "How was the game built with AI?", answer: "I asked AI for a single HTML file where new café staff could practice drink-making steps. I then asked for a clearer training flow and a cup that accepts ingredients. The build journal below includes prompts and screenshots." },
    ],
    limits: "This game supports practice; staff still need instruction from their store on drink preparation, hygiene and equipment. Cup colors and levels are visual illustrations, not measurements. Store adoption and training outcomes have not been verified.",
    storage: "Progress and recipes are kept in the current browser’s storage. There is no account or server synchronization, so data does not automatically move between devices and may be lost if browser data is cleared. Back up important recipes with the game’s JSON export.",
  },
};
