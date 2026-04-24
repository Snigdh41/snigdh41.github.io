'use client';

import { useState, useRef } from 'react';
import { Mail, Send, Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { personalInfo } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Contact.module.css';

/* ── Brand icons ─────────────────────────────────────────────── */
function LinkedinIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GithubIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

/* ── Contact cards data ──────────────────────────────────────── */
const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@snigdhsharma.in',
    href: 'mailto:contact@snigdhsharma.in',
    isBrand: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'snigdh-sharma',
    href: personalInfo.socials.linkedin,
    isBrand: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'Snigdh41',
    href: personalInfo.socials.github,
    isBrand: true,
  },
];

/* ── Intent options ──────────────────────────────────────────── */
const INTENT_OPTIONS = [
  { value: '', label: 'What brings you here?' },
  { value: 'Job Opportunity', label: '💼 Job Opportunity' },
  { value: 'Collaboration', label: '🤝 Collaboration' },
  { value: 'Just Vibes ☕', label: '☕ Just Vibes' },
];

/* ── API URL ─────────────────────────────────────────────────── */
const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || 'https://api.snigdhsharma.in/contact';

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'; // test key fallback

/* ── Main Component ──────────────────────────────────────────── */
export default function Contact() {
  const headerRef = useScrollReveal({ duration: 800 });
  const formRef = useScrollReveal({ duration: 700, delay: 200 });

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <p className={styles.subtitle}>
          Have a project in mind, a role to discuss, or just want to talk tech?
          Grab a virtual coffee with me ☕
        </p>

        <div className={styles.grid}>
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>

        <div className={styles.formSection} ref={formRef}>
          <div className={styles.formHeader}>
            <Coffee size={20} className={styles.formHeaderIcon} />
            <h3 className={styles.formTitle}>Book a Coffee Chat</h3>
          </div>
          <CoffeeChatForm />
        </div>
      </div>
    </section>
  );
}

/* ── Contact Card ────────────────────────────────────────────── */
function ContactCard({ item, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 100 });
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`glass glass-hover ${styles.contactCard}`}
      ref={ref}
    >
      <div className={styles.contactIcon}>
        {item.isBrand ? <Icon size={24} /> : <Icon size={24} />}
      </div>
      <span className={styles.contactLabel}>{item.label}</span>
      <span className={styles.contactValue}>{item.value}</span>
    </a>
  );
}

/* ── Coffee Chat Form ────────────────────────────────────────── */
function CoffeeChatForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    intent: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.intent || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!turnstileToken) {
      setErrorMsg('Please complete the verification.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', intent: '', message: '' });
        setTurnstileToken(null);
        turnstileRef.current?.reset();

        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        const msg = data.details?.length
          ? data.details.join(' ')
          : data.error || 'Something went wrong. Please try again.';
        setErrorMsg(msg);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  return (
    <form className={`glass ${styles.form}`} onSubmit={handleSubmit} id="coffee-chat-form">
      {/* Success overlay */}
      {status === 'success' && (
        <div className={styles.successOverlay}>
          <CheckCircle size={48} className={styles.successIcon} />
          <p className={styles.successText}>Message sent! ☕</p>
          <p className={styles.successSubtext}>
            Check your inbox — I&apos;ve sent you a confirmation.
          </p>
        </div>
      )}

      {/* Form fields */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={styles.input}
            required
            disabled={status === 'loading'}
            autoComplete="name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={styles.input}
            required
            disabled={status === 'loading'}
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-intent" className={styles.label}>
          What brings you here? <span className={styles.required}>*</span>
        </label>
        <select
          id="contact-intent"
          name="intent"
          value={formData.intent}
          onChange={handleChange}
          className={`${styles.input} ${styles.select} ${!formData.intent ? styles.selectPlaceholder : ''}`}
          required
          disabled={status === 'loading'}
        >
          {INTENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me what's on your mind..."
          className={`${styles.input} ${styles.textarea}`}
          rows={5}
          required
          disabled={status === 'loading'}
          maxLength={2000}
        />
        <span className={styles.charCount}>
          {formData.message.length}/2000
        </span>
      </div>

      {/* Turnstile */}
      <div className={styles.turnstileWrapper}>
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
          options={{
            theme: 'dark',
            size: 'flexible',
          }}
        />
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className={`btn-primary ${styles.submitBtn}`}
        disabled={status === 'loading' || status === 'success'}
        id="coffee-chat-submit"
      >
        {status === 'loading' ? (
          <>
            <span className={styles.spinner} />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Coffee Chat Request
          </>
        )}
      </button>
    </form>
  );
}
