import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { isLocale } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";
import { landingCopy } from "@/lib/landing-copy";
import { recentPosts } from "@/lib/posts";
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
  const latest = recentPosts();

  return (
    <main id="main-content" className="container simple-home">
      <section className="simple-intro" aria-labelledby="landing-title">
        <p className="simple-kicker">{copy.kicker}</p>
        <div className="simple-intro-heading">
          <h1 id="landing-title"><span>{copy.headline[0]}</span><span className="simple-headline-accent">{copy.headline[1]}</span></h1>
          <p className="simple-lead">{copy.intro}</p>
        </div>
      </section>
      {latest.length > 0 && (
        <section className="simple-journal" aria-labelledby="journal-title">
          <div className="simple-section-heading">
            <h2 id="journal-title">{copy.latestTitle}</h2>
            <Link href={`/${locale}/builds`}>{copy.journalLink}<ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="simple-posts">{latest.map((post, index) => <PostCard key={post.slug} post={post} locale={locale} priority={index === 0} />)}</div>
        </section>
      )}
    </main>
  );
}
