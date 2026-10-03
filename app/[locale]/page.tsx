import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Clapperboard, Coffee, Music2, Users } from "lucide-react";
import { isLocale, siteConfig, text } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";
import { landingCopy } from "@/lib/landing-copy";
import { posts } from "@/lib/posts";
import PostCard from "@/components/post-card";
import "../landing.css";

type Props = { params: Promise<{ locale: string }> };
const peopleIcons = [Users, Coffee, Music2, Clapperboard];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = landingCopy[locale];
  return pageMetadata(locale, "", copy.title, copy.description);
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = landingCopy[locale];
  const experiences = posts
    .filter((post) => post.kind === "experience")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);
  const hasExamples = posts.some((post) => post.kind === "example");

  return (
    <main id="main-content" className="landing-page">
      <section className="landing-hero container" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-kicker"><span aria-hidden="true">+</span> PEOPLE FIRST. SMALL BUILDS.</p>
          <h1 id="landing-title">
            {copy.headline[0]}<br />
            <span>{copy.headline[1]}</span><br />
            {copy.headline[2]}
          </h1>
          <p className="landing-lead">{copy.intro}</p>
          <div className="landing-actions">
            <Link className="button landing-primary" href={experiences.length ? `/${locale}/builds` : "#approach"}>
              {experiences.length ? copy.journalLink : copy.primary}<ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="landing-text-link" href="#people">{copy.secondary}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <p className="landing-hero-note">{copy.note}</p>
        </div>
        <figure className="landing-workbench">
          <div className="landing-art-caption"><span>THE EVERYDAY WORKBENCH</span><span>FIG. 01</span></div>
          <Image src="/workbench.jpg" alt={copy.artwork} width={1200} height={800} priority unoptimized />
          <figcaption><span>{copy.artworkCaption}</span><span className="landing-art-plus" aria-hidden="true">+</span></figcaption>
        </figure>
      </section>

      <section className="landing-values container" aria-label={text(locale, "이 블로그에서 얻을 수 있는 것", "What you can take from the journal")}>
        {copy.values.map((value, index) => (
          <div key={value.title} className="landing-value">
            <span className="landing-value-number" aria-hidden="true">0{index + 1}</span>
            <div><h2>{value.title}</h2><p>{value.description}</p></div>
          </div>
        ))}
      </section>

      <section id="people" className="landing-people container" aria-labelledby="people-title">
        <div className="landing-section-intro">
          <p className="landing-kicker">01 / PEOPLE &amp; PROBLEMS</p>
          <h2 id="people-title">{copy.peopleTitle}</h2>
          <p>{copy.peopleIntro}</p>
          <div className="landing-margin-note"><span aria-hidden="true">↳</span>{text(locale, "사람이 먼저, 도구는 그다음.", "A person first. A tool second.")}</div>
        </div>
        <div className="landing-idea-board">
          <p className="landing-idea-label">{copy.ideaLabel}</p>
          <ul className="landing-people-grid">
            {copy.people.map((person, index) => {
              const Icon = peopleIcons[index];
              return (
                <li className="landing-person" key={person.person}>
                  <div className="landing-person-top"><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
                  <h3>{person.person}</h3>
                  <p>{person.need}</p>
                  <div className="landing-tool-idea"><span aria-hidden="true">↳</span>{person.tool}</div>
                </li>
              );
            })}
          </ul>
          <p className="landing-idea-disclosure">{copy.ideaNote}</p>
        </div>
      </section>

      <section id="approach" className="landing-approach" aria-labelledby="approach-title">
        <div className="container landing-approach-inner">
          <div className="landing-section-intro">
            <p className="landing-kicker">02 / THE BUILD NOTES</p>
            <h2 id="approach-title">{copy.approachTitle}</h2>
            <p>{copy.approachIntro}</p>
            {hasExamples && <Link className="landing-text-link" href={`/${locale}/builds`}>{copy.examplesLink}<ArrowUpRight size={17} aria-hidden="true" /></Link>}
          </div>
          <ol className="landing-steps">
            {copy.steps.map((step, index) => (
              <li key={step.title}><span className="landing-step-number">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
            ))}
          </ol>
        </div>
      </section>

      {experiences.length > 0 && (
        <section className="container landing-journal" aria-labelledby="journal-title">
          <div className="section-heading"><div><p className="landing-kicker">FROM THE JOURNAL</p><h2 id="journal-title">{copy.latestTitle}</h2></div><Link className="landing-text-link" href={`/${locale}/builds`}>{copy.journalLink}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          <p className="landing-journal-intro">{copy.latestIntro}</p>
          <div className="posts-grid">{experiences.map((post) => <PostCard key={post.slug} post={post} locale={locale} />)}</div>
        </section>
      )}

      <section className="landing-author container" aria-labelledby="author-title">
        <div className="landing-author-intro"><p className="landing-kicker">03 / A NOTE FROM JEREMY</p><div className="landing-author-identity"><div className="landing-monogram" aria-hidden="true">J<span>+</span></div><h2 id="author-title">{copy.authorTitle}</h2></div><p className="landing-author-role">{copy.authorRole}</p></div>
        <div className="landing-author-copy">{copy.authorParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link className="landing-text-link" href={`/${locale}/about`}>{copy.authorLink}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </section>

      {siteConfig.contactEmail && <section className="landing-closing container" aria-labelledby="closing-title"><div><h2 id="closing-title">{copy.closingTitle}</h2><p>{copy.closingDescription}</p></div><Link className="button button-outline" href={`/${locale}/contact`}>{copy.contactLink}<ArrowUpRight size={17} aria-hidden="true" /></Link></section>}
    </main>
  );
}
