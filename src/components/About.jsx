'use client';

import React, { useEffect, useRef, useState } from 'react';
import useScrollReveal from './useScrollReveal';
import styles from './About.module.css';

const STORY_PARAGRAPHS = [
  "I own the AI microservice behind SurakshaGrid, a public-safety platform running live across 5 Telangana government departments. It runs a hybrid retrieval pipeline — BM25 keyword search fused with Qdrant vector search via reciprocal rank fusion, then reranked with a BGE cross-encoder — serving a self-hosted Qwen3-8B model for grounded, low-hallucination responses.",
  "Alongside the retrieval layer, I built SETU GRID, a real-time WebSocket coordination layer that keeps department dashboards in sync as incidents update, without polling.",
  "Currently targeting an entry-level AI/ML or GenAI/RAG Engineer role, with a long-term trajectory toward AI Architect — designing the retrieval, orchestration, and serving layers that production LLM systems run on, not just prototyping against an API.",
];

const FOCUS_AREAS = ['Generative AI', 'RAG Systems', 'Multi-Agent Systems', 'Backend Engineering', 'AI Application Architecture'];

const STATS = [
  { target: 5, suffix: '', label: 'Govt. Departments Served' },
  { target: 2, suffix: '', label: 'Retrieval Stages (BM25+Vector)' },
  { target: 8, suffix: 'B', label: 'Param Model Self-Hosted' },
];

function useCountUp(target, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

const StatCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const value = useCountUp(target, active);
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statNumber}>{value}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

const About = () => {
  const sectionRef = useScrollReveal({ selector: '[data-reveal]', y: 32, stagger: 0.15 });

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.card} data-reveal>
          <div>
            <span className={styles.eyebrow}>Scene 02 — The AI Stack</span>
            <h2 className={styles.heading}>About</h2>
            {STORY_PARAGRAPHS.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
            <div className={styles.focusTags}>
              {FOCUS_AREAS.map((a) => (
                <span key={a} className={styles.tag}>{a}</span>
              ))}
            </div>
          </div>

          <div className={styles.visual}>
            <img
              src="/profile-fixed.png"
              alt="Portrait of Kiran Babu Bandela"
              className={styles.visualImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500';
              }}
            />
            <div className={styles.visualGlow} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.stats} data-reveal>
          {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
};

export default About;
