'use client';

import { personalInfo } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useScrollReveal({ duration: 800 });
  const codeRef = useScrollReveal({ duration: 800, delay: 200 });

  return (
    <section className={`section ${styles.about}`} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.textContent} ref={sectionRef}>
            <span className="section-label">About</span>
            <h2 className="section-title">
              Crafting <span className="gradient-text">Enterprise Solutions</span>
            </h2>
            <p className={styles.bio}>{personalInfo.bio}</p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>3</span>
                <span className={styles.statLabel}>Enterprise Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>

          <div className={styles.codeBlock} ref={codeRef}>
            <div className={styles.codeDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.codeContent}>
              <span className={styles.codeLine}>
                <span className={styles.codeComment}>{'// about.config.js'}</span>
              </span>
              <span className={styles.codeLine}>
                <span className={styles.codeKeyword}>const </span>
                <span className={styles.codeProperty}>developer</span>
                <span className={styles.codePunctuation}>{' = {'}</span>
              </span>
              <span className={styles.codeLine}>
                {'  '}
                <span className={styles.codeProperty}>name</span>
                <span className={styles.codePunctuation}>{': '}</span>
                <span className={styles.codeString}>&quot;Snigdh Sharma&quot;</span>
                <span className={styles.codePunctuation}>,</span>
              </span>
              <span className={styles.codeLine}>
                {'  '}
                <span className={styles.codeProperty}>role</span>
                <span className={styles.codePunctuation}>{': '}</span>
                <span className={styles.codeString}>&quot;Full-Stack Engineer&quot;</span>
                <span className={styles.codePunctuation}>,</span>
              </span>
              <span className={styles.codeLine}>
                {'  '}
                <span className={styles.codeProperty}>stack</span>
                <span className={styles.codePunctuation}>{': ['}</span>
                <span className={styles.codeString}>&quot;Azure&quot;</span>
                <span className={styles.codePunctuation}>{', '}</span>
                <span className={styles.codeString}>&quot;React&quot;</span>
                <span className={styles.codePunctuation}>{', '}</span>
                <span className={styles.codeString}>&quot;.NET&quot;</span>
                <span className={styles.codePunctuation}>{'],'}</span>
              </span>
              <span className={styles.codeLine}>
                {'  '}
                <span className={styles.codeProperty}>passion</span>
                <span className={styles.codePunctuation}>{': '}</span>
                <span className={styles.codeString}>&quot;Building at scale&quot;</span>
                <span className={styles.codePunctuation}>,</span>
              </span>
              <span className={styles.codeLine}>
                {'  '}
                <span className={styles.codeProperty}>available</span>
                <span className={styles.codePunctuation}>{': '}</span>
                <span className={styles.codeKeyword}>true</span>
                <span className={styles.codePunctuation}>,</span>
              </span>
              <span className={styles.codeLine}>
                <span className={styles.codePunctuation}>{'};'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
