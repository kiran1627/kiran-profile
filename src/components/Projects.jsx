'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import './Projects.css';

// Only the 4 real projects. Glow color + arc position vary per card so the
// arc reads as ~6 "screens" worth of visual rhythm without inventing fake
// project content.
const projectsData = [
  {
    id: 'finpilot',
    index: '01',
    title: 'FinPilot',
    tagline: 'Autonomous Finance',
    summary: 'Multi-agent LangGraph decision cycle for portfolio advisory, with run tracking and state replay.',
    tech: ['Next.js 15', 'FastAPI', 'LangGraph'],
    impact: '88% decision accuracy',
    videoSrc: '/Finpilot.mp4',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'gold',
    arc: { rotateY: -34, translateZ: 60, translateX: -430, translateY: -10, scale: 0.86 }
  },
  {
    id: 'proact-safe',
    index: '02',
    title: 'PROACT-SAFE',
    tagline: 'Firearm Threat CCTV',
    summary: 'CPU-optimized YOLOv8 vision pipeline detecting weapon threats across live camera feeds in under 50ms.',
    tech: ['YOLOv8', 'FastAPI', 'WebSockets'],
    impact: '99.8% weapon accuracy',
    videoSrc: '/Proact.mp4',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'red',
    arc: { rotateY: -14, translateZ: 150, translateX: -170, translateY: 20, scale: 1 }
  },
  {
    id: 'blood-donation',
    index: '03',
    title: 'Blood Donation Matcher',
    tagline: 'ML Geolocation Routing',
    summary: 'Random Forest compatibility scoring paired with geocoding and blockchain-verified donor matching.',
    tech: ['Scikit-learn', 'Flask', 'Blockchain'],
    impact: '95% donor match rate',
    videoSrc: '/BloodDonation-demo-compressed.mp4',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'white',
    arc: { rotateY: 14, translateZ: 150, translateX: 170, translateY: 20, scale: 1 }
  },
  {
    id: 'genai-chatbot',
    index: '04',
    title: 'Multimodal GenAI Chatbot',
    tagline: 'Conversational Agent',
    summary: 'CLIP visual embeddings, Whisper transcription, and gTTS synthesis unified into one voice-first assistant.',
    tech: ['PyTorch', 'CLIP', 'Whisper'],
    impact: '98% context accuracy',
    videoSrc: '/chatbot-demo.mp4',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'gold',
    arc: { rotateY: 34, translateZ: 60, translateX: 430, translateY: -10, scale: 0.86 }
  }
];

const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((e) => {
    if (prefersReducedMotion) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * -10, y: py * 6 });
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback(() => setParallax({ x: 0, y: 0 }), []);

  return (
    <section id="projects" className="projects-cinematic-section">

      {/* HUD corner labels */}
      <div className="g-label g-label--ideas" aria-hidden="true">
        <span className="g-label-heading">Projects</span>
        <span className="g-label-rule" />
        Ideas<br />Interfaces<br />Experiences<br /><b>Real Impact</b>
      </div>
      <p className="g-label g-label--scroll" aria-hidden="true">
        Scroll<br />Explore<br />Interact
      </p>
      <p className="g-label g-label--real" aria-hidden="true">
        Real<br />Projects<br />Real<br />Stories
      </p>
      <p className="g-label g-label--tomorrow" aria-hidden="true">
        Designing<br />A Brighter<br />Tomorrow
      </p>

      <div
        className="projects-arc-stage"
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="projects-floor" aria-hidden="true">
          <span className="floor-ring floor-ring--1" />
          <span className="floor-ring floor-ring--2" />
          <span className="floor-ring floor-ring--3" />
        </div>

        <motion.div
          className="projects-arc"
          style={{
            transform: prefersReducedMotion
              ? undefined
              : `rotateX(${8 + parallax.y}deg) rotateY(${parallax.x}deg)`
          }}
        >
          {projectsData.map((project, idx) => {
            const { rotateY, translateZ, translateX, translateY, scale } = project.arc;
            return (
              <div
                key={project.id}
                className="arc-card-position"
                style={{
                  transform: prefersReducedMotion
                    ? undefined
                    : `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale})`
                }}
              >
                <motion.article
                  className={`arc-card arc-card--${project.glow}`}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 120, rotateY: rotateY * 1.6 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateY }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                >
                  <span className="arc-card-index">{project.index}</span>

                  <div className="arc-card-media">
                    <video
                      src={project.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="arc-card-video"
                    />
                    <div className="arc-card-media-scrim" />
                  </div>

                  <div className="arc-card-body">
                    <h3 className="arc-card-title">{project.title}</h3>
                    <p className="arc-card-tagline">{project.tagline}</p>
                    <p className="arc-card-summary">{project.summary}</p>

                    <ul className="arc-card-tech" aria-label={`${project.title} tech stack`}>
                      {project.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    <p className="arc-card-impact">{project.impact}</p>

                    <div className="arc-card-actions">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="arc-card-explore"
                      >
                        Explore <ExternalLink size={12} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="arc-card-repo"
                        aria-label={`${project.title} source repository`}
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
