'use client';

import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Work',     href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const Navbar = () => {
  const [ready, setReady]           = useState(false);
  const [activeSection, setActive]  = useState('hero');
  const [menuOpen, setMenuOpen]     = useState(false);

  // Trigger entrance animation shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href.replace('#', ''));
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [menuOpen]);

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Main header ── */}
      <header className={`hdr${ready ? ' is-header' : ''}`} id="hdr" aria-label="Primary navigation">
        {/* Animated rule line */}
        <svg className="hdr__rule" aria-hidden="true" preserveAspectRatio="none">
          <polyline className="hdr__rulePath" fill="none" stroke="currentColor" strokeWidth="1.25"
                    vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Wordmark */}
        <a className="hdr__mark" href="#hero" aria-label="Kiran, home" onClick={() => scrollTo('#hero')}>
          <span className="mark-word">KIRAN</span>
        </a>

        <span className="hdr__div" aria-hidden="true" />

        {/* Roles */}
        <p className="hdr__roles">
          <span>AI/ML Engineer</span>
          <span>RAG</span>
          <span>GenAI</span>
        </p>

        {/* Desktop nav */}
        <nav className="hdr__nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} style={{ '--i': i }}>
                <a
                  href={item.href}
                  className={activeSection === item.href.replace('#', '') ? 'is-active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Meta + pips */}
        <div className="hdr__meta">
          <span className="hdr__metaLabel">Portfolio — MMXXVI</span>
          <span className="hdr__pips" aria-hidden="true"><i/><i/><i/></span>
        </div>

        {/* Burger (mobile) */}
        <button
          className="hdr__burger"
          id="burger"
          aria-expanded={menuOpen}
          aria-controls="mobileMenu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
      </header>

      {/* ── Full-screen mobile menu ── */}
      <nav
        className={`cine-menu${menuOpen ? ' is-menu' : ''}`}
        id="mobileMenu"
        aria-label="Primary, expanded"
        aria-hidden={!menuOpen}
        hidden={!menuOpen}
      >
        <ul>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                style={{ '--i': i }}
                className={activeSection === item.href.replace('#', '') ? 'is-active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="cine-menu__tag">••• Welcome to my world •••</p>
      </nav>
    </>
  );
};

export default Navbar;
