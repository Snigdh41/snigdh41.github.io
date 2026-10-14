import { insights, personalInfo, siteUrl } from "@/data/content";
export const dynamic = "force-static";
const escapeXml = (value) =>
  String(value).replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
export function GET() {
  const items = insights
    .map((post) => {
      const url = `${siteUrl}/insights/${post.slug}`;
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${post.dateISO}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category></item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(personalInfo.name)} — Engineering Notes</title><link>${siteUrl}/insights</link><description>Practical notes on data engineering, cloud platforms, and production AI.</description><language>en</language><atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
