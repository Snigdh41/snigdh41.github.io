import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { insights, siteUrl } from "@/data/content";
import InsightLibrary from "./InsightLibrary";
import styles from "./library.module.css";
const title = "Engineering Notes — Data, Cloud & AI | Snigdh Sharma";
const description =
  "Practical guides to production AI agents, Databricks data quality, cloud governance, and analytics. Engineering notes by Snigdh Sharma.";
export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/insights`,
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/insights`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};
export default function InsightsPage() {
  const posts = insights.map(({ content, ...post }) => post);
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.library}>
        <span className="section-label">THE ENGINEERING NOTEBOOK</span>
        <h1>
          Notes for people
          <br />
          building useful things.
        </h1>
        <p className={styles.intro}>
          Practical thinking on data platforms, cloud engineering, and AI that
          earns its place in production.
        </p>
        <a className={styles.feed} href="/feed.xml">
          Subscribe with RSS ↗
        </a>
        <InsightLibrary posts={posts} />
      </main>
      <Footer />
    </>
  );
}
