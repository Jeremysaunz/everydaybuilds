import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, text } from "@/lib/site-config";
import { completedCount } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import { landingCopy } from "@/lib/landing-copy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/about", text(locale, "소개", "About"), text(locale,
    "한 사람의 필요에서 시작해, AI로 작은 도구를 만들고 확인하는 기록. 코치 Jeremy가 Everyday Builds를 시작한 이유와 기록의 원칙을 소개합니다.",
    "A journal of building and checking small tools with AI, starting with someone’s needs. Why coach Jeremy started Everyday Builds, and how the notes are written."));
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const count = completedCount();
  return (
    <main id="main-content" className="container about-page">
      <div className="about-intro">
        <div><p className="eyebrow">PEOPLE FIRST. SMALL BUILDS.</p><h1>{text(locale, "작은 도구의 시작은,", "Every small tool starts")}<br /><span>{text(locale, "한 사람의 하루입니다.", "with someone’s day.")}</span></h1></div>
        <p>{text(locale, "누가 어떤 순간에 쓸 도구인지부터 생각합니다. AI와 함께 만들어 보고, 만드는 과정과 실제로 확인한 결과를 기록합니다.", "Think about who needs a tool, and in what moment. Build it with AI, then document the process and the results that were actually checked.")}</p>
      </div>
      <div className="about-grid">
        <aside className="author-card"><div className="author-monogram" aria-hidden="true">J<span>+</span></div><h2>Jeremy</h2><p>{text(locale, "배움과 성장을 돕는 코치", "A coach for learning and growth")}</p><div className="author-caption">EVERYDAY BUILDS<br />EST. 2026</div></aside>
        <div className="about-copy">
          <section><h2>{text(locale, "안녕하세요, Jeremy입니다.", "Hello, I’m Jeremy.")}</h2>{landingCopy[locale].authorParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
          <section><h2>{text(locale, "사람이 먼저, 도구는 그다음.", "A person first. A tool second.")}</h2><p>{text(locale, "나에게 필요한 도구에서 출발할 수도 있고, 가까운 사람의 일을 떠올릴 수도 있습니다. 출석을 확인하는 선생님, 레시피를 익히는 카페 직원, 피아노를 연습하는 아이처럼 누가 어떤 상황에서 쓸지 구체적으로 생각합니다.", "A tool might start with your own needs, or with someone close to you. Think about a teacher taking attendance, café staff learning recipes, or a child practicing piano. Be specific about the person and the situation.")}</p><p>{text(locale, "이 사람들에게 필요한 기능을 이미 안다고 가정하지 않습니다. 떠올린 아이디어를 작게 만들고 확인하면서, 실제 필요에 가까워지는 과정을 기록하려 합니다. 홈에 소개한 사람과 도구는 아직 제작 전 아이디어 예시입니다.", "Imagining a person does not mean knowing what they need. The aim is to make small ideas, check them, and document how they become more useful. The people and tools on the homepage are still planning examples.")}</p></section>
          <section><h2>{text(locale, "잘된 결과만 남기지 않습니다.", "The journal includes the rough edges.")}</h2><p>{text(locale, "왜 필요했는지, AI에게 무엇을 요청했는지, 어디서 막혔는지, 어떻게 고쳤는지 순서대로 남깁니다. 완성 화면에서 끝내지 않고 직접 실행해 확인한 내용과 실제로 써본 뒤의 판단도 기록합니다.", "Each note records why a tool was needed, what was asked of AI, where things got stuck, and how they changed. A finished screen is followed by checks and, when used in real life, an honest assessment.")}</p><p>{text(locale, "공개할 수 있는 도구는 직접 눌러볼 수 있는 링크를 함께 소개할 계획입니다. 공개하지 않는 도구는 화면과 예시로 설명합니다. 기능을 덜어낸 이유나 사용을 중단한 실험도 기록할 가치가 있습니다.", "Where a tool can be shared, the plan is to include a link to try it. Private tools can be explained through screens and examples. Removed features and abandoned experiments also deserve a clear record.")}</p></section>
          <section><h2>{text(locale, "매일 완성해야 하는 프로젝트는 아닙니다.", "Everyday does not mean every single day.")}</h2><p>{text(locale, "Everyday Builds는 일상에서 이어가는 제작 활동을 뜻합니다. 매일 글을 쓰거나 매일 프로그램 하나를 완성하는 규칙은 없습니다. 필요한 것부터 작게 만들고, 써보면서 다음 아이디어를 찾습니다.", "Everyday Builds means making things as part of everyday life. There is no rule to publish daily or finish a program every day. Start small with what is needed, and let use guide the next idea.")}</p></section>
          <section className="goal-block"><div><span className="eyebrow">THE FIRST CHAPTER</span><h2>{text(locale, "작은 프로그램 20개", "20 small tools")}</h2><p>{text(locale, "첫 연습 목표입니다. 글의 수와는 별개로, 실제로 만들어 쓴 도구만 셉니다.", "A first practice goal. It counts tools actually built and used, not posts.")}</p></div><strong>{count}<span> / 20</span></strong><div className="goal-track" aria-label={text(locale, `20개 목표 중 ${count}개 실제 제작 완료`, `${count} of 20 tools actually built`)}>{Array.from({ length: 20 }, (_, index) => <span key={index} className={index < count ? "done" : ""} />)}</div><small>{text(locale, "기획 예시는 제작 완료 수에 포함하지 않습니다.", "Planning examples are excluded from the completed count.")}</small></section>
          <section><h2>{text(locale, "하나의 경험, 두 언어의 기록.", "One experience, two languages.")}</h2><p>{text(locale, "한국어와 영어로 같은 경험을 전달합니다. 제목과 표현은 각 언어에서 자연스럽게 다듬되, 실제로 확인한 사실은 같게 유지합니다. 내용이 바뀌면 두 언어에 함께 반영합니다.", "Korean and English tell the same experience. Titles and phrasing are adapted naturally, while verified facts stay the same. Changes are reflected in both languages.")}</p></section>
          <section><h2>{text(locale, "실제 경험과 예시를 구분합니다.", "Experience and examples stay distinct.")}</h2><p>{text(locale, "AI는 자료 정리, 초안, 문장 다듬기, 번역에 활용합니다. 실제 화면과 결과를 대조하는 일은 작성자가 합니다. 확인하지 않은 경험, 수치, 기능을 만들어 넣지 않으며 가상 예시는 명확히 표시합니다.", "AI can help organize material, draft, edit, and translate. The author checks actual screens and results. Unverified experiences, numbers, and features are not invented, and hypothetical examples are explicitly labeled.")}</p></section>
          <Link href={`/${locale}/builds`} className="button button-dark">{text(locale, "제작 기록과 기획 예시 읽기", "Read the journal and planning examples")}</Link>
        </div>
      </div>
    </main>
  );
}
