import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";
import { landingCopy } from "@/lib/landing-copy";
import { getPost, homePosts } from "@/lib/posts";
import PostCard from "@/components/post-card";
import "../landing.css";

type Props = { params: Promise<{ locale: string }> };

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
  const [latest, ...otherStories] = homePosts();
  const firstStory = getPost("cafe-first-day");

  return (
    <main id="main-content" className="container simple-home">
      <section className="simple-intro" aria-labelledby="landing-title">
        <p className="simple-kicker"><Image src="/images/author/ireoke.webp" alt="" width={28} height={28} />{copy.kicker}</p>
        <div className="simple-intro-heading">
          <div>
            <h1 id="landing-title"><span>{copy.headline[0]}</span><span>{copy.headline[1]}</span></h1>
            <p className="simple-lead">{copy.intro}</p>
          </div>
          {firstStory && <div className="first-story-link">
            <span>{copy.firstStoryLabel}</span>
            <Link href={`/${locale}/builds/${firstStory.slug}`}>{copy.firstStoryLink}<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>}
        </div>
      </section>
      {latest && (
        <section className="simple-journal" aria-labelledby="journal-title">
          <div className="simple-section-heading">
            <h2 id="journal-title">{copy.latestTitle}</h2>
            <Link href={`/${locale}/builds`}>{copy.journalLink}<ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <PostCard post={latest} locale={locale} priority featured />
        </section>
      )}
      {otherStories.length > 0 && <section className="other-stories" aria-labelledby="other-stories-title">
        <div className="simple-section-heading"><h2 id="other-stories-title">{copy.otherStoriesTitle}</h2></div>
        <div className="simple-posts">{otherStories.map(post => <PostCard key={post.slug} post={post} locale={locale} />)}</div>
      </section>}
    </main>
  );
}
