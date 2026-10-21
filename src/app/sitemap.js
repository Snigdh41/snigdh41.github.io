import { insights, siteUrl } from "@/data/content";
export const dynamic = "force-static";
export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: insights[0].dateISO,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: insights[0].dateISO,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/labs/agent-security`,
      lastModified: "2026-10-14",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...insights.map((post) => ({
      url: `${siteUrl}/insights/${post.slug}`,
      lastModified: post.updatedISO || post.dateISO,
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];
}
