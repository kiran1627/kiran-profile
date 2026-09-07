'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import './Timeline.css';

const TIMELINE_DATA = [
  {
    id: 1,
    year: 'Jan 2025 – Mar 2025',
    title: 'AI Intern',
    subtitle: 'Placemantra',
    description: 'Tuned PyTorch and TensorFlow models for a placement-matching pipeline, improving prediction accuracy by ~12%. Tracked experiments and model versions with MLflow.',
    icon: <Briefcase size={20} />,
    type: 'work'
  },
  {
    id: 2,
    year: 'Jun 2026 – Present',
    title: 'IT Intern',
    subtitle: 'IKCON Digital IT Services',
    description: 'Own the AI microservice behind SurakshaGrid, a public-safety platform live across 5 Telangana government departments. Built the hybrid RAG pipeline (BM25 + Qdrant, RRF fusion, BGE reranking) serving a self-hosted Qwen3-8B, wired in Gemini/OpenRouter as fallback model routes, built SETU GRID (real-time WebSocket coordination layer), and instrumented the service with Prometheus metrics and structured logging.',
    icon: <Briefcase size={20} />,
    type: 'work'
  },
  {
    id: 3,
    year: '2024',
    title: 'Innovation Marathon',
    subtitle: 'Finalist — TASK/SAP',
    description: 'Selected as a finalist for proposing an AI-enabled Smart Blood Donation System.',
    icon: <Award size={20} />,
    type: 'award'
  },
  {
    id: 4,
    year: '2025',
    title: 'FinPilot',
    subtitle: 'Multi-Agent Finance Platform',
    description: 'Architected and built FinPilot, a multi-agent finance platform on LangGraph, with a FastAPI backend and Next.js client.',
    icon: <Briefcase size={20} />,
    type: 'work'
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="timeline-section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="section-container">

        
        <div className="timeline-header">
          <motion.h2 
            className="heading-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience
          </motion.h2>
        </div>

        <div className="timeline-container">
          {/* Progress Line */}
          <div className="timeline-line-bg">
            <motion.div 
              className="timeline-line-fill"
              style={{ scaleY, transformOrigin: "top" }}
            />
          </div>

          <div className="timeline-items">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={item.id} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className={`timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="timeline-content glass-card">
        <span className="timeline-year">{data.year}</span>
        <h3 className="timeline-title">{data.title}</h3>
        <h4 className="timeline-subtitle">{data.subtitle}</h4>
        <p className="timeline-desc">{data.description}</p>
      </div>

      <div className="timeline-node">
        <div className="timeline-icon">
          {data.icon}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
