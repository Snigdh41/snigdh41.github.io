'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/content';
import styles from './Navbar.module.css';

// ⚡ Bolt: Move static nav links mapping outside component to prevent recalculation on render/effect initialization
const sectionIds = navLinks.map((l) => l.href.replace('#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Intersection Observer for active section */
  useEffect(() => {
    // ⚡ Bolt: Batch into a single IntersectionObserver instead of creating one per section
    // This reduces memory overhead and improves performance during scroll events
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <a href="#" className={styles.logo}>
            S<span>.</span>
          </a>

          <div className={styles.links}>
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={`${styles.link} ${
                  activeSection === sectionIds[index] ? styles.active : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary ${styles.resumeBtn}`}
          >
            <Download size={14} />
            Resume
          </a>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={handleNavClick}
          >
            {link.label}
          </a>
        ))}
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          onClick={handleNavClick}
        >
          <Download size={14} />
          Resume
        </a>
      </div>
    </>
  );
}
