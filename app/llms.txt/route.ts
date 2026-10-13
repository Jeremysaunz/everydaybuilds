import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/posts";
export function GET() {
  const body = `# ${siteConfig.name}\n\n> A bilingual journal by Jeremy about building small tools with AI, trying them and documenting changes.\n\n## Site\n- [한국어](${siteConfig.url}/ko)\n- [English](${siteConfig.url}/en)\n- [About the author and editorial principles](${siteConfig.url}/en/about)\n- [Sitemap](${siteConfig.url}/sitemap.xml)\n\n## Build notes\n${posts.flatMap(post => (["ko", "en"] as const).map(locale => `- [${post[locale].title}](${siteConfig.url}/${locale}/builds/${post.slug}): ${post[locale].excerpt}`)).join("\n")}\n\n## Tool instructions\n- [카페 첫날: 기능과 사용법](${siteConfig.url}/ko/tools/cafe-first-day)\n- [Café First Day: features and instructions](${siteConfig.url}/en/tools/cafe-first-day)\n\n## Scope\nThe café game is a working prototype. Store adoption and training outcomes have not been verified. Example recipes and visual cup levels are not universal store standards. Korean and English pages describe the same work.\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
