"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import s from "./Navbar.module.css";
const links = [
  ["Work", "projects"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Writing", "insights"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <header className={s.nav}>
        <div className={s.inner}>
          <a className={s.logo} href="/" aria-label="Snigdh Sharma home">
            snigdh<span>.</span>
          </a>
          <nav className={s.desktop} aria-label="Main navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`/#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <a className={s.contact} href="/#contact">
            Let’s connect <ArrowUpRight size={16} />
          </a>
          <button
            className={s.toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          className={s.mobile}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!open}
        >
          {links.map(([label, id]) => (
            <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="/#contact" onClick={() => setOpen(false)}>
            Let’s connect ↗
          </a>
        </nav>
      </header>
    </>
  );
}
