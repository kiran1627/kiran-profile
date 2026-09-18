'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './Timeline.css';

/* Real experience data — unchanged content, remapped onto year cards. */
const TIMELINE_DATA = [
  {
    id: 1,
    year: '2024',
    stage: 'Beginning',
    title: 'Innovation Marathon',
    subtitle: 'Finalist — TASK / SAP',
    bullets: ['Finalist for an AI-enabled Smart Blood Donation System'],
  },
  {
    id: 2,
    year: '2025',
    stage: 'Exploration',
    title: 'AI Intern',
    subtitle: 'Placemantra',
    bullets: [
      'Tuned PyTorch & TensorFlow models for a placement-matching pipeline',
      'Improved prediction accuracy by ~12%',
      'Tracked experiments with MLflow',
    ],
  },
  {
    id: 3,
    year: '2025',
    stage: 'Practice',
    title: 'FinPilot',
    subtitle: 'Multi-Agent Finance Platform',
    bullets: [
      'Architected a multi-agent finance platform with LangGraph',
      'Built the FastAPI backend and Next.js client',
    ],
  },
  {
    id: 4,
    year: '2026',
    stage: 'Next Chapter',
    title: 'IT Intern',
    subtitle: 'IKCON Digital IT Services',
    bullets: [
      'Own the AI microservice behind SurakshaGrid, live across 5 Telangana govt depts',
      'Built a hybrid RAG pipeline: BM25 + Qdrant (RRF fusion), BGE reranking, self-hosted Qwen3-8B',
      'Built SETU GRID, a real-time WebSocket coordination layer',
    ],
  },
];

const CLOCK_START_DEG = -35;
const CLOCK_SWEEP_DEG = 113;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
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

const YearCard = ({ item, index, total, active, onSelect }) => {
  const n = total > 1 ? index / (total - 1) : 0;
  // Arc: gentle upward curve, cards grow toward the right/active end.
  const arcY = -Math.sin(n * Math.PI) * 34 + n * -18;
  const rotate = (n - 0.5) * 10;
  const scale = 0.78 + n * 0.34;

  return (
    <div
      className="yr-slot"
      style={{
        transform: `translateY(${arcY}px) rotate(${rotate * 0.15}deg) scale(${scale})`,
        zIndex: 10 + index,
      }}
    >
      <span className="yr-label" aria-hidden="true">{item.year}</span>
      <button
        type="button"
        className={`yr-card${active ? ' is-active' : ''}`}
        onClick={() => onSelect(index)}
        onFocus={() => onSelect(index)}
        onMouseEnter={() => onSelect(index)}
        aria-pressed={active}
        aria-label={`${item.year}: ${item.title}, ${item.subtitle}`}
      >
        <span className="yr-card__shot" aria-hidden="true">
          <span className="yr-card__shot-glow" />
        </span>
        <span className="yr-card__caption">
          <span className="yr-card__stage">{item.stage}</span>
          <strong className="yr-card__title">{item.title}</strong>
          <span className="yr-card__subtitle">{item.subtitle}</span>
        </span>
        {active && (
          <span className="yr-card__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </button>
    </div>
  );
};

const Timeline = () => {
  const [secRef, secVisible] = useReveal(0.05);
  const [activeIndex, setActiveIndex] = useState(TIMELINE_DATA.length - 1);
  const reducedMotion = usePrefersReducedMotion();
  const total = TIMELINE_DATA.length;

  const handleSelect = useCallback((i) => setActiveIndex(i), []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') { setActiveIndex((i) => Math.min(i + 1, total - 1)); }
    if (e.key === 'ArrowLeft') { setActiveIndex((i) => Math.max(i - 1, 0)); }
  }, [total]);

  const n = total > 1 ? activeIndex / (total - 1) : 0;
  const handAngle = CLOCK_START_DEG + n * CLOCK_SWEEP_DEG;
  const beamLeft = total > 1 ? (activeIndex / (total - 1)) * 100 : 50;

  const active = TIMELINE_DATA[activeIndex];

  const clockTicks = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  return (
    <section
      id="experience"
      className={`cine-chrono${secVisible ? ' is-live' : ''}${reducedMotion ? ' no-motion' : ''}`}
      ref={secRef}
      onKeyDown={handleKeyDown}
    >
      {/* Top-left corner UI */}
      <div className="chrono-corner chrono-corner--tl" aria-hidden="true">
        <h2 className="chrono__title">A Journey<br />Through Time</h2>
        <hr className="chrono__rule" />
        <p className="chrono__sub">Ideas<br />Experiences<br />People<br />Projects<br />Me</p>
      </div>

      {/* Top-right corner UI */}
      <p className="chrono-corner chrono-corner--tr" aria-hidden="true">
        Click<br />a year<br />to explore
      </p>

      {/* Bottom-left / bottom-right taglines */}
      <p className="chrono-corner chrono-corner--bl" aria-hidden="true">
        Same<br />curiosity<br />a brighter<br />tomorrow
      </p>
      <p className="chrono-corner chrono-corner--br" aria-hidden="true">
        Still<br />designing<br />what&rsquo;s<br />next
      </p>

      {/* Clock + beam + silhouette scene */}
      <div className="chrono-scene">
        <div className="chrono-clock" aria-hidden="true">
          <svg className="chrono-clock__face" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,170,80,.35)" strokeWidth="1.5" />
            {clockTicks.map((i) => (
              <line
                key={i}
                x1="100" y1="12" x2="100" y2="22"
                stroke="rgba(255,170,80,.5)"
                strokeWidth="2"
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
          </svg>
          <div className="chrono-clock__pivot">
            <div
              className="chrono-hand chrono-hand--primary"
              style={{ transform: `rotate(${handAngle}deg)` }}
            />
            <div
              className="chrono-hand chrono-hand--secondary"
              style={{ transform: `rotate(${handAngle + 6}deg)` }}
            />
          </div>
        </div>

        <div
          className="chrono-beam"
          style={{ left: `${beamLeft}%`, transform: `translateX(-50%) rotate(${handAngle - 90}deg)` }}
          aria-hidden="true"
        />

        <div className="chrono-silhouette" aria-hidden="true">
          <div className="chrono-silhouette__head" />
          <div className="chrono-silhouette__body" />
        </div>
      </div>

      {/* Year arc */}
      <div className="chrono-arc-wrap">
        <div className="chrono-arc" role="group" aria-label="Timeline years">
          {TIMELINE_DATA.map((item, i) => (
            <YearCard
              key={item.id}
              item={item}
              index={i}
              total={total}
              active={i === activeIndex}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Active year detail — real, screen-reader visible content */}
      <div className="chrono-detail" aria-live="polite">
        <span className="chrono-detail__year">{active.year}</span>
        <h3 className="chrono-detail__title">{active.title}</h3>
        <h4 className="chrono-detail__subtitle">{active.subtitle}</h4>
        <ul className="chrono-detail__bullets">
          {active.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
