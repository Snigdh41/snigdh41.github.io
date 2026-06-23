'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { insights } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Insights.module.css';

export default function Insights() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.insights}`} id="insights">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Insights</span>
          <h2 className="section-title">
            Writing on Business <span className="gradient-text">&amp; Technology</span>
          </h2>
          <p className={styles.subtitle}>
            Notes on where data, cloud, and AI meet real business outcomes — written for
            engineers and decision-makers alike.
          </p>
        </div>

        <div className={styles.grid}>
          {insights.map((post, i) => (
            <InsightCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard({ post, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 130 });

  return (
    <Link
      href={`/insights/${post.slug}`}
      className={`glass glass-hover ${styles.card}`}
      ref={ref}
      aria-label={`Read: ${post.title}`}
    >
      <div className={styles.cardTop}>
        <span className="tech-tag">{post.category}</span>
        <ArrowUpRight size={18} className={styles.arrow} />
      </div>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={13} />
          {post.readTime}
        </span>
        <span className={styles.date}>{post.date}</span>
      </div>
    </Link>
  );
}
