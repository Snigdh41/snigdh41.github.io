'use client';

import { useEffect, useRef } from 'react';
import { Mail, ArrowDown, Download, Eye } from 'lucide-react';
import { personalInfo } from '@/data/content';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import styles from './Hero.module.css';

/* Brand SVG icons (lucide-react doesn't include brand icons) */
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  const contentRefs = useRef([]);

  useMouseGlow(heroRef);

  /* anime.js hero animations */
  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      try {
        const { animate, stagger, createTimeline } = await import('animejs');

        /* Floating particles */
        const particleContainer = particlesRef.current;
        if (particleContainer) {
          const colors = ['#818cf8', '#a78bfa', '#c084fc', '#6366f1'];
          for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.className = styles.particle;
            const size = Math.random() * 4 + 2;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.background = colors[Math.floor(Math.random() * colors.length)];
            dot.style.left = `${Math.random() * 100}%`;
            dot.style.top = `${Math.random() * 100}%`;
            dot.style.opacity = '0';
            particleContainer.appendChild(dot);

            animate(dot, {
              opacity: [0, { value: Math.random() * 0.5 + 0.1, duration: 1000 }],
              translateY: [0, { value: () => Math.random() * -80 - 20, duration: () => Math.random() * 4000 + 3000 }],
              translateX: [0, { value: () => Math.random() * 40 - 20, duration: () => Math.random() * 4000 + 3000 }],
              scale: [1, { value: () => Math.random() * 0.5 + 0.5, duration: () => Math.random() * 3000 + 2000 }],
              loop: true,
              alternate: true,
              ease: 'inOutSine',
              delay: () => Math.random() * 2000,
            });
          }
        }

        /* Floating geometric shapes */
        const shapes = heroRef.current?.querySelectorAll(`.${styles.shape}`);
        if (shapes?.length) {
          shapes.forEach((shape, i) => {
            animate(shape, {
              translateY: [0, Math.random() * 30 - 15],
              translateX: [0, Math.random() * 20 - 10],
              rotate: [0, Math.random() * 20 - 10],
              duration: 4000 + i * 1000,
              loop: true,
              alternate: true,
              ease: 'inOutSine',
            });
          });
        }

        /* Staggered content reveal */
        const elements = contentRefs.current.filter(Boolean);
        if (elements.length) {
          const tl = createTimeline({
            defaults: {
              ease: 'outExpo',
            },
          });

          tl.add(elements[0], {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
          }, 200)
          .add(elements[1], {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
          }, 400)
          .add(elements[2], {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
          }, 700)
          .add(elements[3], {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
          }, 900)
          .add(elements[4], {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
          }, 1100)
          .add(elements[5], {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
          }, 1300);
        }
      } catch (err) {
        /* Fallback: just show everything */
        contentRefs.current.forEach((el) => {
          if (el) el.style.opacity = '1';
        });
      }
    })();

    return cleanup;
  }, []);

  const setRef = (i) => (el) => {
    contentRefs.current[i] = el;
  };

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Background effects */}
      <div className={styles.gridOverlay} />
      <div className={styles.particles} ref={particlesRef} />

      {/* Floating shapes */}
      <svg className={styles.shape} style={{ top: '15%', left: '10%', width: 80, height: 80 }} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="35" fill="none" stroke="#818cf8" strokeWidth="1" />
      </svg>
      <svg className={styles.shape} style={{ top: '25%', right: '15%', width: 60, height: 60 }} viewBox="0 0 60 60">
        <rect x="10" y="10" width="40" height="40" fill="none" stroke="#a78bfa" strokeWidth="1" transform="rotate(45 30 30)" />
      </svg>
      <svg className={styles.shape} style={{ bottom: '20%', left: '18%', width: 50, height: 50 }} viewBox="0 0 50 50">
        <polygon points="25,5 45,40 5,40" fill="none" stroke="#c084fc" strokeWidth="1" />
      </svg>
      <svg className={styles.shape} style={{ bottom: '30%', right: '12%', width: 70, height: 70 }} viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="30" fill="none" stroke="#818cf8" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.greeting} ref={setRef(0)}>
          <span className={styles.greetingLine} />
          Hello, I&apos;m
        </div>

        <h1 className={styles.name} ref={setRef(1)}>
          Snigdh <span className={styles.highlight}>Sharma</span>
        </h1>

        <p className={styles.tagline} ref={setRef(2)}>
          {personalInfo.tagline}
        </p>

        <p className={styles.role} ref={setRef(3)}>
          <strong>{personalInfo.title}</strong> at <strong>{personalInfo.company}</strong>
        </p>

        <div className={styles.ctas} ref={setRef(4)}>
          <a href="#projects" className="btn-primary">
            <Eye size={16} />
            View My Work
          </a>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        <div className={styles.socials} ref={setRef(5)}>
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
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollDot} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
