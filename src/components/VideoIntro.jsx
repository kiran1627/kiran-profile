'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

/**
 * VideoIntro — cinematic hero: full-bleed background video, warm/blue
 * glow scrim, and a GSAP power-eased intro reveal for the headline.
 * Replaces the previous canvas-driven cine-hero-engine Hero.
 */
const VideoIntro = () => {
  const videoRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = rootRef.current;
    if (!root) return;

    const targets = [
      root.querySelector(`.${styles.eyebrow}`),
      root.querySelector(`.${styles.title}`),
      root.querySelector(`.${styles.subtitle}`),
      root.querySelector(`.${styles.ctaRow}`),
    ].filter(Boolean);

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 24 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.18,
      ease: 'power3.out',
    });

    return () => tl.kill();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className={styles.hero} ref={rootRef}>
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/hero-v2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <span className={styles.eyebrow}>AI / ML Engineer &middot; GenAI &amp; RAG Systems</span>
        <h1 className={styles.title}>
          Kiran Babu Bandela<br />
          <span className={styles.titleAccent}>Builds Intelligent Systems</span>
        </h1>
        <p className={styles.subtitle}>
          I design retrieval, orchestration, and serving layers for production LLM
          systems &mdash; from hybrid RAG pipelines to real-time multi-agent coordination.
        </p>
        <div className={styles.ctaRow}>
          <a className={styles.ctaPrimary} href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>
            View Projects
          </a>
          <a className={styles.ctaSecondary} href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
            Get In Touch
          </a>
        </div>
      </div>

      <button
        className={styles.scrollHint}
        onClick={() => scrollTo('about')}
        aria-label="Scroll to explore"
        type="button"
      >
        <span className={styles.scrollLine} />
        SCROLL
      </button>
    </section>
  );
};

export default VideoIntro;
