'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const SKILL_GROUPS = [
  {
    label: 'AI / GenAI',
    skills: ['LLMs', 'RAG', 'LangChain', 'LangGraph', 'Hybrid Retrieval (BM25 + Vector)', 'Reranking (BGE)', 'Prompt Engineering', 'AI Agents'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'JWT Auth'],
  },
  {
    label: 'Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Computer Vision', 'NLP', 'Scikit-learn'],
  },
  {
    label: 'Data & Infra',
    skills: ['Qdrant', 'SQLite', 'SQLAlchemy', 'Docker', 'AWS', 'MLflow', 'Prometheus'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-orbit-section">
      <div className="section-container skills-flow-container">
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

        <div className="skills-groups">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              className="skills-group-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <h3 className="skills-group-label">{group.label}</h3>
              <div className="skills-tag-list">
                {group.skills.map((skill) => (
                  <span key={skill} className="skills-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="skills-gradient-bottom" />
    </section>
  );
};

export default Skills;
