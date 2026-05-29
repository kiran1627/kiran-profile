'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import './Timeline.css';

const TIMELINE_DATA = [
  {
    id: 1,
    year: '2022',
    title: 'B.Tech AI & ML',
    subtitle: 'Started Journey',
    description: 'Enrolled in B.Tech focusing on Artificial Intelligence and Machine Learning. Built foundational knowledge in Python, data structures, and algorithms.',
    icon: <GraduationCap size={20} />,
    type: 'edu'
  },
  {
    id: 2,
    year: '2023',
    title: 'First AI Models',
    subtitle: 'Computer Vision & NLP',
    description: 'Developed initial projects in computer vision using OpenCV and YOLO. Began exploring Natural Language Processing and Transformer models.',
    icon: <Briefcase size={20} />,
    type: 'work'
  },
  {
    id: 3,
    year: '2024',
    title: 'Innovation Marathon',
    subtitle: 'Finalist by TASK/SAP',
    description: 'Selected as a finalist in the Innovation Marathon for proposing an AI-enabled Smart Blood Donation System, beating thousands of participants.',
    icon: <Award size={20} />,
    type: 'award'
  },
  {
    id: 4,
    year: '2025',
    title: 'Autonomous Systems',
    subtitle: 'Multi-Agent AI',
    description: 'Architected and built FinPilot, an autonomous multi-agent finance system. Focused on LLM orchestration, RAG pipelines, and full-stack integration.',
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
    <section id="timeline" className="timeline-section" ref={containerRef} style={{ position: 'relative' }}>
      <div className="section-container">

        
        <div className="timeline-header">
          <motion.h2 
            className="heading-secondary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            My Timeline
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
