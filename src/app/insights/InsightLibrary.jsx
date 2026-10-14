"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./library.module.css";
export default function InsightLibrary({ posts }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All topics");
  const topics = ["All topics", ...new Set(posts.map((post) => post.category))];
  const filtered = posts.filter(
    (post) =>
      (topic === "All topics" || post.category === topic) &&
      `${post.title} ${post.excerpt} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className={styles.controls}>
        <label>
          Search notes
          <input
            type="search"
            placeholder="Try agents, Databricks, or governance"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Topic
          <select
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            {topics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className={styles.count} role="status">
        {filtered.length} {filtered.length === 1 ? "note" : "notes"}
      </p>
      <div>
        {filtered.map((post) => (
          <article key={post.slug} className={styles.post}>
            <div className={styles.meta}>
              {post.category} <span>·</span>{" "}
              <time dateTime={post.dateISO}>{post.date}</time> <span>·</span>{" "}
              {post.readTime}
            </div>
            <h2>
              <Link href={`/insights/${post.slug}`}>
                {post.title} <span aria-hidden="true">↗</span>
              </Link>
            </h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <p>No notes match these filters.</p>
          <button
            className="btn-secondary"
            onClick={() => {
              setQuery("");
              setTopic("All topics");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
