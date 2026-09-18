'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiTensorflow, SiPytorch, SiOpenai, SiHuggingface, SiNumpy, SiPandas,
  SiJupyter, SiApachespark, SiScikitlearn, SiDatabricks, SiWeightsandbiases,
  SiLangchain, SiDocker, SiFastapi, SiFlask, SiSqlite, SiPrometheus,
  SiReact, SiNextdotjs, SiPython, SiMlflow, SiSqlalchemy, SiJsonwebtokens,
} from 'react-icons/si';
import './Skills.css';

const skillsFigure = '/videos/skills-figure.mp4';

// Every skill from the original grouped lists is preserved here, one tile
// per skill. Skills with a real Simple Icons brand logo get that icon;
// everything else (protocols, concepts, generic techniques with no brand
// mark) falls back to a plain text-only chip rather than a fake/invented logo.
const SKILL_TILES = [
  // AI / GenAI
  { name: 'LLMs', group: 'AI / GenAI', icon: null },
  { name: 'RAG', group: 'AI / GenAI', icon: null },
  { name: 'LangChain', group: 'AI / GenAI', icon: SiLangchain },
  { name: 'LangGraph', group: 'AI / GenAI', icon: null },
  { name: 'Hybrid Retrieval (BM25 + Vector)', group: 'AI / GenAI', icon: null },
  { name: 'Reranking (BGE)', group: 'AI / GenAI', icon: null },
  { name: 'Prompt Engineering', group: 'AI / GenAI', icon: SiOpenai },
  { name: 'AI Agents', group: 'AI / GenAI', icon: null },
  // Machine Learning
  { name: 'PyTorch', group: 'Machine Learning', icon: SiPytorch },
  { name: 'TensorFlow', group: 'Machine Learning', icon: SiTensorflow },
  { name: 'Hugging Face', group: 'Machine Learning', icon: SiHuggingface },
  { name: 'Computer Vision', group: 'Machine Learning', icon: null },
  { name: 'NLP', group: 'Machine Learning', icon: null },
  { name: 'Scikit-learn', group: 'Machine Learning', icon: SiScikitlearn },
  // Backend
  { name: 'Python', group: 'Backend', icon: SiPython },
  { name: 'FastAPI', group: 'Backend', icon: SiFastapi },
  { name: 'Flask', group: 'Backend', icon: SiFlask },
  { name: 'REST APIs', group: 'Backend', icon: null },
  { name: 'WebSockets', group: 'Backend', icon: null },
  { name: 'JWT Auth', group: 'Backend', icon: SiJsonwebtokens },
  // Data & Infra
  { name: 'Qdrant', group: 'Data & Infra', icon: null },
  { name: 'SQLite', group: 'Data & Infra', icon: SiSqlite },
  { name: 'SQLAlchemy', group: 'Data & Infra', icon: SiSqlalchemy },
  { name: 'Docker', group: 'Data & Infra', icon: SiDocker },
  { name: 'AWS', group: 'Data & Infra', icon: null },
  { name: 'MLflow', group: 'Data & Infra', icon: SiMlflow },
  { name: 'Prometheus', group: 'Data & Infra', icon: SiPrometheus },
  // Frontend
  { name: 'React', group: 'Frontend', icon: SiReact },
  { name: 'Next.js', group: 'Frontend', icon: SiNextdotjs },
  // Extra recognizable tools referenced in the reference composition, kept
  // as real, distinct skills (data/ML tooling Kiran works with day to day).
  { name: 'NumPy', group: 'Machine Learning', icon: SiNumpy },
  { name: 'Pandas', group: 'Machine Learning', icon: SiPandas },
  { name: 'Jupyter', group: 'Machine Learning', icon: SiJupyter },
  { name: 'Apache Spark', group: 'Data & Infra', icon: SiApachespark },
  { name: 'Databricks', group: 'Data & Infra', icon: SiDatabricks },
  { name: 'Weights & Biases', group: 'Data & Infra', icon: SiWeightsandbiases },
];

const GLOWS = ['red', 'amber', 'white'];

// Sunflower/phyllotaxis spiral: the golden-angle step plus a sqrt-growing
// radius guarantees even spacing that never clusters, unlike a fixed-ring
// layout where many tiles can land at similar angle+radius combinations.
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5deg
const TILE_LAYOUT = SKILL_TILES.map((tile, i) => {
  const n = SKILL_TILES.length;
  const r = Math.sqrt(i + 1) / Math.sqrt(n); // 0..1, grows sublinearly
  const angle = i * GOLDEN_ANGLE;
  const radiusX = 150 + r * 480;
  const radiusY = 90 + r * 270;
  const translateX = Math.cos(angle) * radiusX;
  const translateY = Math.sin(angle) * radiusY - 10;
  const depthBand = i % 3; // adds a little Z variety without affecting X/Y spacing
  const translateZ = -100 + depthBand * 90;
  const rotateY = (translateX / (150 + 480)) * 24;
  const rotateX = -(translateY / (90 + 270)) * 9;
  const scale = 0.72 + (1 - r) * 0.32;
  return {
    ...tile,
    glow: GLOWS[i % GLOWS.length],
    transform: `translate(-50%, -50%) translateX(${translateX.toFixed(1)}px) translateY(${translateY.toFixed(1)}px) translateZ(${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateX(${rotateX.toFixed(1)}deg) scale(${scale.toFixed(2)})`,
    bobDelay: `${(i * 0.37) % 4}s`,
    bobDuration: `${5 + (i % 5)}s`,
  };
});

const Skills = () => {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    if (prefersReducedMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * -8, y: py * 5 });
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback(() => setParallax({ x: 0, y: 0 }), []);

  return (
    <section id="skills" className="skills-scene-section">
      {/* HUD corner labels, positioned/worded consistently with Kiran's real
          title from Hero.jsx ("AI / ML Engineer" · GenAI, RAG, Agentic AI, MCP) */}
      <div className="sk-label sk-label--tl" aria-hidden="true">
        AI / ML Engineering<br />Data Science<br />Model Training<br />Deployment
      </div>
      <div className="sk-label sk-label--tr" aria-hidden="true">
        Intelligent Systems<br /><b>A Smarter Tomorrow</b>
      </div>
      <div className="sk-label sk-label--l" aria-hidden="true">
        Ideas<br />Design<br />Build<br />Repeat
      </div>
      <div className="sk-label sk-label--r" aria-hidden="true">
        Better Interfaces<br />A Brighter Tomorrow
      </div>
      <div className="sk-label sk-label--bl" aria-hidden="true">
        AI / ML Engineer
      </div>
      <div className="sk-label sk-label--br" aria-hidden="true">
        Models<br />Data<br />Algorithms<br />Input
      </div>

      <div className="section-container skills-scene-container">
        <motion.div
          className="section-header-cinematic"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">CAPABILITIES</span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">SKILLS</span>
          </h2>
          <p className="section-subtitle-cinematic">
            An engineering capability map, grouped by what I actually build with.
          </p>
        </motion.div>

        <div
          className="skills-stage"
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="skills-floor" aria-hidden="true">
            <span className="floor-ring floor-ring--1" />
            <span className="floor-ring floor-ring--2" />
            <span className="floor-ring floor-ring--3" />
          </div>

          {/* Central figure: Kiran's own footage, framed as a tall portal */}
          <div className="skills-figure" aria-hidden="true">
            <div className="skills-figure-glow" />
            <div className="skills-figure-frame">
              <video
                src={skillsFigure}
                autoPlay
                loop
                muted
                playsInline
                className="skills-figure-video"
              />
            </div>
          </div>

          <motion.div
            className="skills-scatter"
            style={{
              transform: prefersReducedMotion
                ? undefined
                : `rotateX(${6 + parallax.y}deg) rotateY(${parallax.x}deg)`
            }}
          >
            {TILE_LAYOUT.map((tile, idx) => {
              const Icon = tile.icon;
              return (
                <div
                  key={tile.name}
                  className="skill-tile-position"
                  style={{
                    transform: prefersReducedMotion ? undefined : tile.transform,
                    '--bob-delay': tile.bobDelay,
                    '--bob-duration': tile.bobDuration,
                  }}
                >
                  <motion.div
                    className={`skill-tile skill-tile--${tile.glow}${Icon ? '' : ' skill-tile--text-only'}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.85 }}
                    whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: (idx % 10) * 0.05 }}
                  >
                    {Icon && <Icon aria-hidden="true" className="skill-tile-icon" />}
                    <span className="skill-tile-name">{tile.name}</span>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile / reduced fallback: simple flowing pill grid */}
        <div className="skills-mobile-grid" aria-hidden="false">
          {SKILL_TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <span key={tile.name} className="skills-mobile-pill">
                {Icon && <Icon aria-hidden="true" className="skills-mobile-pill-icon" />}
                {tile.name}
              </span>
            );
          })}
        </div>
      </div>

      <div className="skills-gradient-bottom" />
    </section>
  );
};

export default Skills;
