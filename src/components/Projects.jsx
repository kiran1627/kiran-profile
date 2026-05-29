'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code2, Github, ExternalLink } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: 'finpilot',
    index: '001',
    title: 'FinPilot: Autonomous Finance',
    subtitle: 'Autonomous Portfolio Advisory',
    shortSummary: 'A stateful full-stack finance ecosystem with a FastAPI backend running a multi-agent decision cycle and a Next.js 15 client with run tracking, investment planning, and state replay logs.',
    overview: 'An advanced, autonomous finance command center running a multi-agent decision cycle. It monitors live market variables and automatically compiles personalized asset weight suggestions.',
    problem: 'Personal trading requires reading massive amounts of live feeds, sentiments, and financial sentry indices, which rapidly overwhelms single human operators.',
    solution: 'Designed a stateful orchestration graph where multiple specialized LLM agents (Profile Analyst, Market Advisor, Risk Officer) collaborate autonomously to evaluate tickers and suggest allocations.',
    tech: ['Next.js 15', 'FastAPI', 'LangGraph', 'Python', 'SQLite', 'SQLAlchemy', 'JWT'],
    features: [
      'Multi-agent financial decision state loop',
      'Volatile risk security validation filters',
      'JWT & Google OAuth dashboard authorization',
      'Interactive run tracking & historical replays'
    ],
    challenges: 'Balancing non-deterministic LLM agent reasoning with deterministic financial compliance thresholds.',
    color: '#00F0FF',
    videoSrc: '/Finpilot.mp4',
    architecture: '/finpilot_architecture_1780035965751.png',
    github: 'https://github.com/kiran1627',
    live: '#',
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
    index: '002',
    title: 'PROACT-SAFE CCTV',
    subtitle: 'Firearm Threat CCTV Monitoring',
    shortSummary: 'A high-speed real-time smart-city safety system deploying CPU-optimized YOLOv8 computer vision to detect weapon threats in live streams with under 50ms latency.',
    overview: 'A real-time edge security system that ingests simulated 4-camera CCTV feeds, performs hardware-optimized firearm class inferences, and raises instant alerts.',
    problem: 'Standard CCTV platforms rely entirely on human monitoring focus, resulting in critical delays when weapon hazards emerge in public spaces.',
    solution: 'Built an ingestion pipeline loading camera frames, performing YOLOv8n CPU inference <50ms, scoring threats, and broadcasting security alerts via WebSockets.',
    tech: ['Python', 'YOLOv8', 'FastAPI', 'React', 'WebSockets', 'OpenCV'],
    features: [
      'CPU-bound YOLOv8n object detection (<50ms)',
      'Intelligent Threat Scoring Matrix algorithms',
      '2x2 Simulated CCTV grid dashboard layouts',
      'WebSocket triggers sending base64 frame snaps'
    ],
    challenges: 'Executing low-latency multi-stream bounding box operations on standard, cost-efficient edge hardware.',
    color: '#8B5CF6',
    videoSrc: '/Proact.mp4',
    architecture: '/proact_safe_architecture_1780035982390.png',
    github: 'https://github.com/kiran1627',
    live: '#',
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
    index: '003',
    title: 'Smart Blood Donation Matcher',
    subtitle: 'ML Geolocation Donor Routing',
    shortSummary: 'An intelligent Matchmaker web platform that connects blood donors, recipients, and hospitals utilizing a Random Forest Classifier and secure geocoding APIs.',
    overview: 'A smart web portal bridging emergency recipient requests with optimal compatible blood donors, verifying matches via geofencing and logging records securely.',
    problem: 'Hospitals experience fatal delays when matching compatible rare blood groups within narrow emergency timeframes.',
    solution: 'Designed a Random Forest Classifier that scores donor-patient compatibility paired with Positionstack geodes and custom Blockchain logging.',
    tech: ['Python', 'Scikit-learn', 'Flask', 'React.js', 'Blockchain', 'Positionstack'],
    features: [
      'Intelligent compatibility scoring model',
      'Proximity geocoding via Positionstack APIs',
      'Immutable blockchain donor match verification',
      'Dynamic SMS & WebSocket alert dispatch logs'
    ],
    challenges: 'Protecting patient identity records while maintaining transparent and rapid geolocation routing variables.',
    color: '#FF006E',
    videoSrc: '/BloodDonation-demo-compressed.mp4',
    architecture: '/blood_donation_architecture_1780035932279.png',
    github: 'https://github.com/kiran1627',
    live: '#',
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
    index: '004',
    title: 'Multimodal GenAI Chatbot',
    subtitle: 'Multimodal Conversational Agent',
    shortSummary: 'A multi-modal conversational AI assistant allowing simultaneous voice recording, text prompts, and visual file uploads to output audio syntheses.',
    overview: 'A full speech-and-image AI portal that resolves audio signals and visual pixel grids into unified prompt contexts before generating conversational returns.',
    problem: 'Classic chatbots remain restricted to text, lacking context retention of image frames and vocal recording streams.',
    solution: 'Engineered an orchestrator combining CLIP visual embeddings, Whisper STT speech translation, and a GPT context buffer to generate audio voice synthesis.',
    tech: ['Python', 'PyTorch', 'CLIP', 'GPT Core', 'Streamlit', 'gTTS'],
    features: [
      'Simultaneous voice, image, & text input ingest',
      'Vocal conversion via Whisper Speech Recognition',
      'CLIP semantic matching from visual files',
      'Voice synthesized outputs using gTTS engines'
    ],
    challenges: 'Orchestrating concurrent visual, vocal, and textual vector inputs without incurring excessive audio lag.',
    color: '#33FFBD',
    videoSrc: '/chatbot-demo.mp4',
    architecture: '/chatbot_architecture_1780035950296.png',
    github: 'https://github.com/kiran1627',
    live: '#',
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

const Projects = () => {
  return (
    <section id="projects" className="projects-cinematic-section">
      <div className="projects-grid-overlay" />
      <div className="projects-glow-orb" />

      <div className="section-container">
        <div className="section-header-cinematic">
          <span className="section-eyebrow">
            <Shield size={12} className="pulse-icon" /> CLASSIFIED MISSIONS
          </span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">PROJECTS</span>
          </h2>
          <p className="section-subtitle-cinematic">
            Product-grade case studies that feel cinematic, technical, and engineered for impact.
          </p>
        </div>

        <div className="project-case-list">
          {projectsData.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.article
                key={project.id}
                className={`project-case ${isReversed ? 'project-case-reverse' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              >
                <div className="project-hero-bar" style={{ borderColor: `${project.color}25` }}>
                  <span className="project-eyebrow">PROJECT {String(idx + 1).padStart(2, '0')}</span>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>

                <div className="project-layout-grid">
                  <div className="project-media-panel">
                    <div className="project-video-frame">
                      <video src={project.videoSrc} controls muted playsInline className="project-video" />
                    </div>

                    <div className="project-architecture-frame glass-panel-premium">
                      <div className="architecture-header">
                        <Code2 size={14} /> SYSTEM ARCHITECTURE
                      </div>
                      <img src={project.architecture} alt={`${project.title} architecture`} className="project-architecture-image" />
                      <div className="architecture-overlay" />
                    </div>
                  </div>

                  <div className="project-copy-panel">
                    <div className="project-summary-card glass-panel-premium">
                      <span className="project-label">OVERVIEW</span>
                      <p>{project.overview}</p>
                    </div>

                    <div className="project-grid-split">
                      <div className="project-detail-card glass-panel-premium">
                        <h4>THE CHALLENGE</h4>
                        <p>{project.problem}</p>
                      </div>
                      <div className="project-detail-card glass-panel-premium highlight-card">
                        <h4>THE SOLUTION</h4>
                        <p>{project.solution}</p>
                      </div>
                    </div>

                    <div className="project-workflow-card glass-panel-premium">
                      <h4>PIPELINE WORKFLOW</h4>
                      <div className="workflow-flow">
                        {project.workflow.map((item) => (
                          <div key={item.step} className="workflow-step">
                            <span className="workflow-step-label">{item.step}</span>
                            <div>
                              <strong>{item.title}</strong>
                              <p>{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="project-footer-grid">
                      <div className="project-metrics-card glass-panel-premium">
                        {project.results.map((result) => (
                          <div key={result.label} className="metric-row">
                            <span>{result.label}</span>
                            <strong>{result.value}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="project-stack-card glass-panel-premium">
                        <span>TECH STACK</span>
                        <div className="project-tech-tags">
                          {project.tech.map((tech) => (
                            <span key={tech} className="project-tech-pill">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="project-action-row">
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-action-btn">
                        <Github size={14} /> View Repository
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer" className="project-action-btn project-action-btn-primary">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
