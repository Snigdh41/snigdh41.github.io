'use client';

import { useEffect, useRef } from 'react';
import { Mail, ArrowDown, Download, Eye } from 'lucide-react';
import { personalInfo } from '@/data/content';
import { useMouseGlow } from '@/hooks/useMouseGlow';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/BrandIcons';
import styles from './Hero.module.css';

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
        <div className={styles.greeting} ref={(el) => { contentRefs.current[0] = el; }}>
          <span className={styles.greetingLine} />
          Hello, I&apos;m
        </div>

        <h1 className={styles.name} ref={(el) => { contentRefs.current[1] = el; }}>
          Snigdh <span className={styles.highlight}>Sharma</span>
        </h1>

        <p className={styles.tagline} ref={(el) => { contentRefs.current[2] = el; }}>
          {personalInfo.tagline}
        </p>

        <p className={styles.role} ref={(el) => { contentRefs.current[3] = el; }}>
          <strong>{personalInfo.title}</strong> at <strong>{personalInfo.company}</strong>
        </p>

        <div className={styles.ctas} ref={(el) => { contentRefs.current[4] = el; }}>
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

        <div className={styles.socials} ref={(el) => { contentRefs.current[5] = el; }}>
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
