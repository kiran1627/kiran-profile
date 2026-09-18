'use client';

import React, { useRef, useState, useCallback, useEffect, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, X, Code2 } from 'lucide-react';
import './Projects.css';

// Only the 4 real projects. Glow color + arc position vary per card so the
// arc reads as ~6 "screens" worth of visual rhythm without inventing fake
// project content. Each also carries the fuller case-study copy (problem,
// solution, workflow, results, architecture diagram) shown in the details
// modal when a card is opened.
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
    architecture: '/finpilot_architecture_1780035965751.png',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'gold',
    arc: { rotateY: -34, translateZ: 60, translateX: -430, translateY: -10, scale: 0.86 },
    overview: 'An advanced, autonomous finance command center running a multi-agent decision cycle. It monitors live market variables and automatically compiles personalized asset weight suggestions.',
    problem: 'Personal trading requires reading massive amounts of live feeds, sentiments, and financial sentry indices, which rapidly overwhelms single human operators.',
    solution: 'Designed a stateful orchestration graph where multiple specialized LLM agents (Profile Analyst, Market Advisor, Risk Officer) collaborate autonomously to evaluate tickers and suggest allocations.',
    results: [
      { label: 'Decision Accuracy', value: '88%' },
      { label: 'Simulation Runs', value: '$10k+' },
      { label: 'Inference Latency', value: '<250ms' }
    ],
    workflow: [
      { step: '01', title: 'Data Ingestion', desc: 'Scrapes live ticker logs, financial news feeds, and sentiment indices.' },
      { step: '02', title: 'Debate Session', desc: 'Analyst, Trader, and Risk Manager debate allocations in a stateful loop.' },
      { step: '03', title: 'Risk Verification', desc: 'Validates decisions against static safety limits and volatility margins.' },
      { step: '04', title: 'FastAPI Dispatch', desc: 'Dispatches simulated orders and logs state records to SQLite.' }
    ]
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
    architecture: '/proact_safe_architecture_1780035982390.png',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'red',
    arc: { rotateY: -14, translateZ: 150, translateX: -170, translateY: 20, scale: 1 },
    overview: 'A real-time edge security system that ingests simulated 4-camera CCTV feeds, performs hardware-optimized firearm class inferences, and raises instant alerts.',
    problem: 'Standard CCTV platforms rely entirely on human monitoring focus, resulting in critical delays when weapon hazards emerge in public spaces.',
    solution: 'Built an ingestion pipeline loading camera frames, performing YOLOv8n CPU inference <50ms, scoring threats, and broadcasting security alerts via WebSockets.',
    results: [
      { label: 'Weapon Accuracy', value: '99.8%' },
      { label: 'Processing Speed', value: '<50ms' },
      { label: 'WS Alert Dispatch', value: '<10ms' }
    ],
    workflow: [
      { step: '01', title: 'Frame Ingestion', desc: 'Pulls camera MJPEG frames via high-speed OpenCV routes.' },
      { step: '02', title: 'YOLOv8 Threat Inference', desc: 'Extracts firearm anomaly classes on standard edge hardware.' },
      { step: '03', title: 'Risk Scoring Matrix', desc: 'Applies threshold filters and tracks threat persistence over frames.' },
      { step: '04', title: 'WS Alarm Dispatch', desc: 'Broadcasts alert indicators and frame base64 snapshots instantly.' }
    ]
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
    architecture: '/blood_donation_architecture_1780035932279.png',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'white',
    arc: { rotateY: 14, translateZ: 150, translateX: 170, translateY: 20, scale: 1 },
    overview: 'A smart web portal bridging emergency recipient requests with optimal compatible blood donors, verifying matches via geofencing and logging records securely.',
    problem: 'Hospitals experience fatal delays when matching compatible rare blood groups within narrow emergency timeframes.',
    solution: 'Designed a Random Forest Classifier that scores donor-patient compatibility paired with Positionstack geodes and custom Blockchain logging.',
    results: [
      { label: 'Donor Match Rate', value: '95%' },
      { label: 'Proximity Threshold', value: '<15km' },
      { label: 'Record Encryption', value: 'SHA256' }
    ],
    workflow: [
      { step: '01', title: 'Intake Request', desc: 'Hospital logs compatible rare blood requests on React client.' },
      { step: '02', title: 'Geocode Lookup', desc: 'Positionstack API maps target locations into lat/long coordinates.' },
      { step: '03', title: 'RF ML Inference', desc: 'Models calculate donor matching rates and availability score.' },
      { step: '04', title: 'Immutable Verification', desc: 'Registers verified donor logs securely on blockchain ledger.' }
    ]
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
    architecture: '/chatbot_architecture_1780035950296.png',
    github: 'https://github.com/kiran1627',
    live: '#',
    glow: 'gold',
    arc: { rotateY: 34, translateZ: 60, translateX: 430, translateY: -10, scale: 0.86 },
    overview: 'A full speech-and-image AI portal that resolves audio signals and visual pixel grids into unified prompt contexts before generating conversational returns.',
    problem: 'Classic chatbots remain restricted to text, lacking context retention of image frames and vocal recording streams.',
    solution: 'Engineered an orchestrator combining CLIP visual embeddings, Whisper STT speech translation, and a GPT context buffer to generate audio voice synthesis.',
    results: [
      { label: 'Speech Translation', value: '<200ms' },
      { label: 'Synthesizer Playback', value: '<350ms' },
      { label: 'Context Accuracy', value: '98%' }
    ],
    workflow: [
      { step: '01', title: 'Media Upload Ingest', desc: 'User types prompt, records vocal audio, or uploads image.' },
      { step: '02', title: 'Pipeline Demux', desc: 'Whisper translates audio, CLIP maps image pixels to coordinates.' },
      { step: '03', title: 'Prompt Integration', desc: 'Assembles context logs and builds the finalized LLM instructions.' },
      { step: '04', title: 'Audio Synthesis', desc: 'Pushes token-stream outputs and reads response via gTTS.' }
    ]
  }
];

const ProjectDetailsModal = ({ project, onClose }) => {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>

        <span className="project-modal-index">Project {project.index}</span>
        <h3 id={titleId} className="project-modal-title">{project.title}</h3>
        <p className="project-modal-tagline">{project.tagline}</p>

        <div className="project-modal-video-frame">
          <video src={project.videoSrc} controls muted playsInline className="project-modal-video" />
        </div>

        <div className="project-modal-section">
          <span className="project-modal-label">Overview</span>
          <p>{project.overview}</p>
        </div>

        <div className="project-modal-split">
          <div className="project-modal-section project-modal-card">
            <span className="project-modal-label">The Challenge</span>
            <p>{project.problem}</p>
          </div>
          <div className="project-modal-section project-modal-card project-modal-card--highlight">
            <span className="project-modal-label">The Solution</span>
            <p>{project.solution}</p>
          </div>
        </div>

        <div className="project-modal-section">
          <span className="project-modal-label">
            <Code2 size={13} /> System Architecture
          </span>
          <img
            src={project.architecture}
            alt={`${project.title} architecture diagram`}
            className="project-modal-diagram"
          />
        </div>

        <div className="project-modal-section">
          <span className="project-modal-label">Pipeline Workflow</span>
          <div className="project-modal-workflow">
            {project.workflow.map((item) => (
              <div key={item.step} className="project-modal-workflow-step">
                <span className="project-modal-workflow-num">{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-modal-split">
          <div className="project-modal-section project-modal-card">
            <span className="project-modal-label">Results</span>
            {project.results.map((r) => (
              <div key={r.label} className="project-modal-metric-row">
                <span>{r.label}</span>
                <strong>{r.value}</strong>
              </div>
            ))}
          </div>
          <div className="project-modal-section project-modal-card">
            <span className="project-modal-label">Tech Stack</span>
            <ul className="project-modal-tech" aria-label={`${project.title} tech stack`}>
              {project.tech.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>

        <div className="project-modal-actions">
          <a href={project.github} target="_blank" rel="noreferrer" className="arc-card-explore">
            <Github size={14} /> View Repository
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);

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
                      <button
                        type="button"
                        className="arc-card-explore"
                        onClick={() => setActiveProject(project)}
                      >
                        Explore <ExternalLink size={12} />
                      </button>
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

      <AnimatePresence>
        {activeProject && (
          <ProjectDetailsModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
