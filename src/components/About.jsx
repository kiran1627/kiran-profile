'use client';

import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const TECH_RIBBON = [
  'Python', 'RAG', 'LangChain', 'LangGraph', 'Qdrant',
  'FastAPI', 'Next.js', 'Docker', 'WebSockets', 'AWS'
];

const METRICS = [
  { number: '5',  label: 'Govt. Departments Served' },
  { number: '2',  label: 'Retrieval Stages (BM25+Vector)' },
  { number: '8B', label: 'Param Model Self-Hosted' },
];

const FOCUS_AREAS = [
  'Generative AI', 'RAG Systems', 'Multi-Agent Systems',
  'Backend Engineering', 'AI Application Architecture',
];

function useReveal(threshold = 0.15) {
  const ref  = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const About = () => {
  const [secRef, secVisible] = useReveal(0.08);
  const [r1, v1] = useReveal(0.1);
  const [r2, v2] = useReveal(0.1);
  const [r3, v3] = useReveal(0.1);

  const story = `I own the AI microservice behind SurakshaGrid, a public-safety platform running live across 5 Telangana government departments. It runs a hybrid retrieval pipeline — BM25 keyword search fused with Qdrant vector search via reciprocal rank fusion, then reranked with a BGE cross-encoder — serving a self-hosted Qwen3-8B model for grounded, low-hallucination responses.

Alongside the retrieval layer, I built SETU GRID, a real-time WebSocket coordination layer that keeps department dashboards in sync as incidents update, without polling.

Currently targeting an entry-level AI/ML or GenAI/RAG Engineer role, with a long-term trajectory toward AI Architect — designing the retrieval, orchestration, and serving layers that production LLM systems run on, not just prototyping against an API.`;

  return (
    <section id="about" className={`cine-universe${secVisible ? ' is-on' : ''}`} ref={secRef}>
      {/* Scene title */}
      <header className="cine-universe__title">
        <p className="cine-universe__over">Scene 02</p>
        <h2 className="cine-universe__name">The AI<br />Stack</h2>
        <p className="cine-universe__sub">Tools · Ideas · Systems · Impact</p>
      </header>

      <div className="cine-universe__body">
        {/* Profile + story */}
        <div className={`about-profile-row cine-reveal${v1 ? ' is-visible' : ''}`} ref={r1}>
          <div className="about-img-frame">
            <img
              src="/profile-fixed.png"
              alt="Portrait of Kiran Babu Bandela"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500';
              }}
            />
          </div>

          <div className="about-story">
            <p className="about-story-text">{story}</p>

            <div className="about-focus">
              <span className="about-focus-label">Currently Focused On</span>
              <div className="about-focus-tags">
                {FOCUS_AREAS.map((a) => (
                  <span key={a} className="about-focus-tag">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className={`about-metrics cine-reveal${v2 ? ' is-visible' : ''}`} ref={r2}>
          {METRICS.map((m) => (
            <div key={m.label} className="about-metric">
              <span className="about-metric__number">{m.number}</span>
              <span className="about-metric__label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Tech ribbon */}
        <div className={`cine-reveal${v3 ? ' is-visible' : ''}`} ref={r3}>
          <div className="about-ribbon-header">
            <span className="about-ribbon-icon">✦</span>
            <span>Core Technologies</span>
          </div>
          <div className="about-tech-pills">
            {TECH_RIBBON.map((t) => (
              <span key={t} className="about-tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
