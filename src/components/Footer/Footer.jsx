'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/content';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/BrandIcons';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} <span>Snigdh Sharma</span>. All rights reserved.
        </p>

        <div className={styles.socials}>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personalInfo.socials.email}
            className={styles.socialLink}
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
