'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import EmberCanvas from './EmberCanvas';
import './Hero.css';

const SOCIAL_LINKS = [
  { name: 'GitHub',   icon: Github,   url: 'https://github.com/kiran1627' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18' },
  { name: 'Email',    icon: Mail,     url: 'mailto:kiranbabubandela6@gmail.com' },
];

/* Arrow triangles rendered as CSS border trick */
const Arrows = ({ side }) => (
  <div className={`cine-arrows cine-arrows--${side}`} aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <i key={i} style={{ '--i': i }} />
    ))}
  </div>
);

/* Bottom-right dot grid */
const DotGrid = () => {
  const dots = Array.from({ length: 40 });
  return (
    <div className="cine-grid-dots cine-grid-dots--br" aria-hidden="true">
      {dots.map((_, i) => <i key={i} style={{ '--i': i }} />)}
    </div>
  );
};

const Hero = () => {
  const [ready, setReady] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [chipsIn, setChipsIn] = useState(false);
  const [arrowsIn, setArrowsIn] = useState(false);
  const [dotsIn, setDotsIn] = useState(false);

  useEffect(() => {
    // Staggered cinematic entrance (matching reference timeline cues)
    const t1 = setTimeout(() => setReady(true),    350);
    const t2 = setTimeout(() => setWelcomed(true), 900);
    const t3 = setTimeout(() => setChipsIn(true),  2400);
    const t4 = setTimeout(() => setArrowsIn(true), 2800);
    const t5 = setTimeout(() => setDotsIn(true),   3200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="cine-hero">
      {/* Background video */}
      <video
        className="cine-hero__video"
        src="/hero.mp4"
        autoPlay loop muted playsInline preload="auto"
        aria-hidden="true"
      />
      <div className="cine-hero__veil" aria-hidden="true" />
      <EmberCanvas color="255,140,70" density={40} className="cine-hero__embers" />

      {/* ── Furniture layer ── */}
      <div className={`cine-furniture${ready ? ' is-ready' : ''}`} aria-hidden="true">

        {/* Welcome strip */}
        <p className={`cine-welcome${welcomed ? ' is-welcome' : ''}`}>
          <b className="cine-welcome__dots">•••</b>
          <span className="cine-welcome__text">Welcome to my world</span>
          <b className="cine-welcome__dots">•••</b>
        </p>

        {/* Chips */}
        <p className={`cine-chip cine-chip--l${chipsIn ? ' is-in' : ''}`}>
          <span>• AI Engineer Kiran •</span>
        </p>
        <p className={`cine-chip cine-chip--r${chipsIn ? ' is-in' : ''}`}>
          <span>• Builder •</span>
        </p>

        {/* Edge arrows */}
        {arrowsIn && <Arrows side="l" />}
        {arrowsIn && <Arrows side="r" />}

        {/* Dot grid */}
        {dotsIn && <DotGrid />}
      </div>

      {/* ── Hero wordmark ── */}
      <div className="cine-hero__center">
        <h1 className="cine-hero__name">KIRAN<br />BABU<br />BANDELA</h1>
        <p className="cine-hero__role">AI / ML Engineer</p>
        <p className="cine-hero__tags">GenAI &middot; RAG &middot; Agentic AI &middot; MCP</p>

        <div className="cine-hero__ctas">
          <button onClick={() => scrollTo('projects')} className="cine-btn-primary">
            View Projects <ArrowRight size={15} />
          </button>
          <a href="/Kiran_Resume.pdf" className="cine-btn-secondary" target="_blank" rel="noopener noreferrer">
            <Download size={14} /> Resume
          </a>
        </div>

        <div className="cine-hero__socials">
          {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} className="cine-hero__social">
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        className="cine-scroll-hint"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to explore"
        type="button"
      >
        <span className="cine-scroll-hint__line" />
        <span>SCROLL</span>
      </button>
    </section>
  );
};

export default Hero;
