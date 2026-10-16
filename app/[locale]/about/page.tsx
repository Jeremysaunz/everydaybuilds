import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, text, siteConfig } from "@/lib/site-config";
import { completedCount } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
import { landingCopy } from "@/lib/landing-copy";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/about", text(locale, "소개", "About"), text(locale,
    `한 사람의 필요에서 시작해, AI로 작은 도구를 만들고 확인하는 기록. ${siteConfig.owner.ko}(${siteConfig.owner.en})가 Everyday Builds를 시작한 이유와 만드는 과정을 소개합니다.`,
    `${siteConfig.owner.en} shares why he started Everyday Builds, how he makes small tools with AI, and what he records about the process.`));
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const count = completedCount();
  return (
    <main id="main-content" className="container about-page">
      <div className="about-intro">
        <div><p className="eyebrow">PEOPLE FIRST. SMALL BUILDS.</p><h1>{text(locale, "작은 도구의 시작은,", "Every small tool starts")}<br /><span>{text(locale, "한 사람의 하루입니다.", "with someone’s day.")}</span></h1></div>
        <p>{text(locale, "누가 언제 쓸 도구일까 생각하고, AI와 함께 만들어 봅니다. 처음 건넨 말부터 고친 화면까지 이곳에 남깁니다.", "I think about who might use a tool and when, then try making it with AI. Here I share the first request, the screens it led to, and what I changed.")}</p>
      </div>
      <div className="about-grid">
        <aside className="author-card">
          <Image className="author-portrait" src="/images/author/ireoke.webp" width={384} height={384} sizes="(max-width: 720px) 65px, 96px" alt={text(locale, "모자와 안경을 쓴 이러케 캐릭터", "Ireoke’s character wearing a cap and glasses")} />
          <h2>{text(locale, `${siteConfig.owner.ko} · ${siteConfig.owner.en}`, `${siteConfig.owner.en} · ${siteConfig.owner.ko}`)}</h2>
          <p>{text(locale, "배움과 성장을 돕는 코치", "Helping people learn and grow")}</p>
          <div className="author-caption">EVERYDAY BUILDS<br />EST. 2026</div>
        </aside>
        <div className="about-copy">
          <section><h2>{text(locale, `안녕하세요, ${siteConfig.owner.ko}입니다.`, `Hello, I’m ${siteConfig.owner.en}.`)}</h2>{landingCopy[locale].authorParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
          <section><h2>{text(locale, "사람이 먼저, 도구는 그다음.", "People first. Tools second.")}</h2><p>{text(locale, "제가 쓸 수도 있고, 가까운 사람에게 필요할 수도 있습니다. 누가 언제 쓸지 떠올리고, 먼저 작은 화면부터 만들어 봅니다.", "A tool might be for me or for someone close to me. I picture when they would use it, then start with a small version.")}</p></section>
          <section><h2>{text(locale, "잘된 결과만 남기지 않습니다.", "What happened along the way.")}</h2><p>{text(locale, "처음 부탁한 말, 나온 화면, 아쉬워서 다시 고친 부분을 함께 남깁니다. 직접 실행해 확인한 내용과 아직 써보지 못한 부분도 구분해 적습니다.", "I share the first request, what came back, and the parts I wanted to change. I also distinguish what I checked by running a tool from what I have not tried yet.")}</p><p>{text(locale, "공개한 도구는 직접 열어볼 수 있도록 링크를 둡니다. 공개하기 어려운 것은 화면과 예시로 설명하고, 기능을 덜어내거나 작업을 멈췄다면 그 이유도 적어두려 합니다.", "I link to the tools I can share so you can open them yourself. For private work, I use screenshots and examples. If I remove a feature or stop working on something, I plan to write about why.")}</p></section>
          <section><h2>{text(locale, "매일 하나씩 만들지는 않습니다.", "Everyday does not mean every single day.")}</h2><p>{text(locale, "이름은 Everyday Builds지만, 매일 하나를 완성하는 규칙은 없습니다. 일상에서 생각나는 게 있으면 만들어 보고, 고칠 게 생기면 다시 열어보는 식입니다.", "The name is Everyday Builds, but there is no rule about finishing something every day. When an idea comes up in everyday life, I try making it. When something needs changing, I open it again.")}</p></section>
          <section className="goal-block"><div><span className="eyebrow">THE FIRST CHAPTER</span><h2>{text(locale, "작은 프로그램 20개", "20 small tools")}</h2><p>{text(locale, "첫 연습 목표입니다. 글의 수와는 별개로, 실제로 만들어 쓴 도구만 셉니다.", "My first goal is to build and try 20 small tools. The count is for tools, not posts.")}</p></div><strong>{count}<span> / 20</span></strong><div className="goal-track" aria-label={text(locale, `20개 목표 중 ${count}개 실제 제작 완료`, `${count} of 20 tools actually built`)}>{Array.from({ length: 20 }, (_, index) => <span key={index} className={index < count ? "done" : ""} />)}</div><small>{text(locale, "기획 예시는 제작 완료 수에 포함하지 않습니다.", "Ideas and plans do not count as completed tools.")}</small></section>
          <section><h2>{text(locale, "한국어와 영어로 씁니다.", "Writing in Korean and English.")}</h2><p>{text(locale, "두 언어로 같은 과정을 기록합니다. 표현은 달라도 실제 요청과 결과는 같게 맞추고, 내용을 고치면 두 글에 함께 반영합니다.", "Both versions cover the same work. The wording may differ, but the requests and results stay the same. When the content changes, I update both versions.")}</p><p>{text(locale, "자료 정리와 글 다듬기, 번역에는 AI의 도움을 받습니다. 실제 화면과 맞는지는 제가 확인합니다. 설명을 위해 든 예시는 직접 겪은 일과 구분해 표시합니다.", "AI helps me organize notes, edit, and translate. I check the writing against the actual screens. When I use an example to explain something, I label it separately from my own experience.")}</p></section>
          <Link href={`/${locale}/builds`} className="button button-dark">{text(locale, "만든 이야기 읽기", "Read the journal")}</Link>
        </div>
      </div>
    </main>
  );
}
