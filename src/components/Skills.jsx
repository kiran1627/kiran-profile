'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const SKILL_GROUPS = [
  {
    label: 'GenAI / RAG',
    skills: ['RAG', 'LLMs', 'LangChain', 'LangGraph', 'Prompt Engineering', 'Hybrid Retrieval (BM25 + Vector)', 'Reranking (BGE)'],
  },
  {
    label: 'Infra / Serving',
    skills: ['FastAPI', 'Qdrant', 'FAISS', 'Pinecone', 'Docker', 'MLflow', 'AWS', 'WebSockets', 'Prometheus'],
  },
  {
    label: 'ML Core',
    skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'NLP', 'Computer Vision', 'Scikit-learn'],
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
          <span className="section-eyebrow">AI INFRASTRUCTURE</span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">SKILLS</span>
          </h2>
        </motion.div>

        <div className="skills-groups">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              className="skills-group-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
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
