import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, siteConfig, text } from "@/lib/site-config";
import { getPost, toolFor } from "@/lib/posts";
import { cafeGuide, cafeGuideUpdatedAt } from "@/lib/tool-guides";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs } from "@/lib/structured-data";
import JsonLd from "@/components/json-ld";
import "../../../article.css";
import "../../../tool-guide.css";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return [{ slug: "cafe-first-day" }]; }

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || slug !== "cafe-first-day") return {};
  return pageMetadata(locale, `/tools/${slug}`, cafeGuide[locale].title, cafeGuide[locale].description, getPost(slug)?.cover?.[locale]);
}

export default async function ToolGuide({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || slug !== "cafe-first-day" || !post) notFound();
  const copy = cafeGuide[locale];
  const tool = toolFor(post, locale);
  const image = post.cover?.[locale];
  const url = `${siteConfig.url}/${locale}/tools/${slug}`;
  const applicationUrl = new URL(tool.publicUrl!, siteConfig.url).href;
  return <main id="main-content" className="container article-page tool-guide">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${url}#page`, url, name: copy.title, description: copy.description, inLanguage: locale, dateModified: cafeGuideUpdatedAt, isPartOf: { "@id": `${siteConfig.url}/#website` }, author: { "@id": `${siteConfig.url}/#author` }, mainEntity: { "@id": `${applicationUrl}#app` } },
      { "@type": "SoftwareApplication", "@id": `${applicationUrl}#app`, name: post.toolTitle?.[locale], url: applicationUrl, description: copy.description, applicationCategory: "EducationalApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript and a modern browser", inLanguage: ["ko", "en"], isAccessibleForFree: true, author: { "@id": `${siteConfig.url}/#author` }, screenshot: image ? `${siteConfig.url}${image.src}` : undefined },
      breadcrumbs([{ name: siteConfig.name, url: `${siteConfig.url}/${locale}` }, { name: post.toolTitle?.[locale] ?? copy.title, url }]),
    ] }} />
    <Link className="back-link" href={`/${locale}/builds/cafe-first-day`}>{text(locale, "이 게임을 만든 이야기", "Read how the game was built")}</Link>
    <header className="article-header">
      <p className="eyebrow">{text(locale, "직접 써보는 작은 도구", "A SMALL TOOL TO TRY")}</p>
      <h1>{copy.title}</h1><p className="article-lead">{copy.intro}</p>
      <div className="article-meta"><Link href={`/${locale}/about`}>Jeremy</Link><span>{text(locale, "안내 수정", "Guide updated")} <time dateTime={cafeGuideUpdatedAt}>{cafeGuideUpdatedAt}</time></span></div>
    </header>
    <div className="tool-guide-actions"><a className="button button-dark" href={tool.publicUrl}>{text(locale, "게임 시작하기", "Start the game")}</a><a className="article-download" href={tool.downloadUrl} download={tool.downloadFileName}>{text(locale, "HTML 파일 내려받기", "Download the HTML file")}</a></div>
    <div className="markdown-article">
      <h2>{text(locale, "카페 첫날에서 연습할 수 있는 것", "What you can practice")}</h2>
      <div className="tool-feature-grid">{copy.features.map(feature => <section key={feature.title}><h3>{feature.title}</h3><p>{feature.body}</p></section>)}</div>
      {image && <figure className="tool-screenshot"><Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 720px) 92vw, 700px"/><figcaption>{text(locale, "컵에 재료를 넣어 음료 제조 순서를 연습하는 실제 게임 화면", "The game screen: add ingredients to practice drink-making steps")}</figcaption></figure>}
      <h2>{text(locale, "처음 사용하는 순서", "Getting started")}</h2><ol className="tool-steps">{copy.steps.map(step => <li key={step}>{step}</li>)}</ol>
      <h2>{text(locale, "실제 매장에서 사용하기 전에", "Before using it in a store")}</h2><p>{copy.limits}</p>
      <h2>{text(locale, "진행 상태와 레시피는 어디에 저장되나요?", "Where are progress and recipes stored?")}</h2><p>{copy.storage}</p>
      <h2>{text(locale, "자주 묻는 질문", "Frequently asked questions")}</h2>{copy.questions.map(item => <section key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
      <h2>{text(locale, "AI로 HTML 게임을 만든 과정", "How I built an HTML game with AI")}</h2><p>{text(locale, "처음 요청한 말, 교육 흐름을 보완한 이유, 컵에 재료를 넣는 기능을 더한 과정을 실제 화면과 함께 정리했어요.", "The journal shows the initial request, changes to the training flow, and the ingredient-filled cup, with screenshots from the build.")}</p><p><Link href={`/${locale}/builds/cafe-first-day`}>{post[locale].title}</Link></p>
    </div>
  </main>;
}
