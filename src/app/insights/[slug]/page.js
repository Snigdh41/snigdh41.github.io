import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { insights, personalInfo, siteUrl } from "@/data/content";
import styles from "./article.module.css";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

function getPost(slug) {
  return insights.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${siteUrl}/insights/${post.slug}`;
  const description = post.metaDescription || post.excerpt;

  return {
    title: `${post.title} — Snigdh Sharma`,
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      siteName: "Snigdh Sharma",
      publishedTime: post.dateISO,
      authors: [personalInfo.name],
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

function headingId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case "link":
      return (
        <p>
          <Link href={block.href} className="btn-secondary">
            {block.text}
          </Link>
        </p>
      );
    case "code":
      return (
        <figure className={styles.code}>
          <figcaption>{block.language} · Illustrative example</figcaption>
          <pre>
            <code>{block.text}</code>
          </pre>
        </figure>
      );
    case "quote":
      return <blockquote className={styles.quote}>{block.text}</blockquote>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "p":
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${siteUrl}/insights/${post.slug}`;
  const description = post.metaDescription || post.excerpt;
  const related = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    datePublished: post.dateISO,
    dateModified: post.updatedISO || post.dateISO,
    inLanguage: "en",
    ...(post.sources
      ? { citation: post.sources.map((source) => source.url) }
      : {}),
    articleSection: post.category,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: siteUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${siteUrl}/og-image.png`,
    url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className={styles.wrapper}>
        <article id="main-content" className={styles.article}>
          <Link href="/insights" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Insights
          </Link>

          <div className={styles.meta}>
            <span className="tech-tag">{post.category}</span>
            <span className={styles.metaDot} />
            <time dateTime={post.dateISO}>{post.date}</time>
            <span className={styles.metaDot} />
            <span>{post.readTime}</span>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.byline}>
            By <Link href="/#about">{personalInfo.name}</Link> · Software
            engineering, cloud &amp; data
          </p>
          <p className={styles.excerpt}>{post.excerpt}</p>

          {post.summary && (
            <aside className={styles.takeaway}>
              <strong>At a glance</strong>
              <p>{post.summary}</p>
            </aside>
          )}
          {post.editorialNote && (
            <p className={styles.editorial}>{post.editorialNote}</p>
          )}
          <nav className={styles.toc} aria-label="On this page">
            <strong>On this page</strong>
            <ol>
              {post.content
                .filter((block) => block.type === "h2")
                .map((block) => (
                  <li key={block.text}>
                    <a href={`#${headingId(block.text)}`}>{block.text}</a>
                  </li>
                ))}
            </ol>
          </nav>

          <div className={styles.body}>
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {post.sources && (
            <section className={styles.sources} aria-labelledby="sources-title">
              <h2 id="sources-title">Sources &amp; further reading</h2>
              <p>
                Sources checked on {post.sourcesChecked || "October 14, 2026"}. Product capabilities may
                change; consult the linked documentation before implementation.
              </p>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url}>{source.title} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {related.length > 0 && (
          <nav className={styles.footerNav} aria-label="Related insights">
            <p className={styles.related}>More insights</p>
            <div className={styles.relatedGrid}>
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className={`glass glass-hover ${styles.relatedCard}`}
                >
                  <span className={styles.relatedCategory}>
                    {post.category}
                  </span>
                  <h3 className={styles.relatedTitle}>{post.title}</h3>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
      <Footer />
    </>
  );
}
