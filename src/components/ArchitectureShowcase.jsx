'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ArrowRight, Layers, FileCode, CheckCircle, Database, HelpCircle, Eye, ShieldAlert } from 'lucide-react';
import './ArchitectureShowcase.css';

const PROJECTS_ARCH = [
  {
    id: 'finpilot',
    title: 'FinPilot: Autonomous Finance System',
    subtitle: 'Multi-Agent Autonomous Portfolio Advisory',
    image: '/finpilot_architecture_1780035965751.png',
    apis: ['OpenRouter API', 'Yahoo Finance REST', 'JWT / Google OAuth'],
    services: ['FastAPI Backend', 'LangGraph Multi-Agent Loop', 'SQLite / SQLAlchemy Persistence', 'Next.js 15 Client'],
    aiPipeline: 'LangGraph Router -> Profile Analyst Agent -> Market Analyzer Agent -> LLM Advisor (GPT-4o) -> Execution Manager',
    systemDescription: 'An advanced full-stack financial command center running a multi-agent decision cycle. It operates as an autonomous feedback loop tracking market data and optimizing personal assets.',
    dataFlow: [
      { step: '1', title: 'Session Handshake', desc: 'Next.js client authenticates with FastAPI via JWT or OAuth, loading secure user config.' },
      { step: '2', title: 'Agent Loop Trigger', desc: 'LangGraph triggers the autonomous multi-agent cycle. The Profile Analyst reviews financial targets.' },
      { step: '3', title: 'Market Validation', desc: 'The Market Analyzer calls Yahoo Finance APIs for current tickers, generating market context.' },
      { step: '4', title: 'LLM Orchestration', desc: 'OpenRouter coordinates LLM reasoning (GPT-4o/Claude) to evaluate decisions and create allocation changes.' },
      { step: '5', title: 'Persistence & Log', desc: 'Decisions are committed to SQLite via SQLAlchemy, generating structured execution histories.' }
    ],
    nodes: [
      { id: 'n1', label: 'Next.js Frontend', type: 'ui', x: 100, y: 150, info: 'Renders dashboard panels, real-time investment logs, and configures user profiles.' },
      { id: 'n2', label: 'FastAPI Gateway', type: 'service', x: 300, y: 150, info: 'Manages API endpoints, authenticates tokens, and serves request routing.' },
      { id: 'n3', label: 'LangGraph Engine', type: 'ai', x: 500, y: 150, info: 'Coordinates the multi-agent execution cycles and manages memory between steps.' },
      { id: 'n4', label: 'OpenRouter LLM', type: 'ai', x: 700, y: 80, info: 'Evaluates financial goals against live market indices using GPT-4o.' },
      { id: 'n5', label: 'SQLite DB', type: 'db', x: 500, y: 270, info: 'Persists user profiles, historical recommendations, and execution reports.' },
      { id: 'n6', label: 'Exec Manager', type: 'service', x: 700, y: 220, info: 'Dispatches simulated portfolio changes and returns system logs.' }
    ],
    connections: [
      { from: 'n1', to: 'n2', label: 'HTTPS / WSS' },
      { from: 'n2', to: 'n3', label: 'Trigger State' },
      { from: 'n3', to: 'n4', label: 'Reasoning Query' },
      { from: 'n4', to: 'n3', label: 'Advisory Weights' },
      { from: 'n3', to: 'n5', label: 'Commit State' },
      { from: 'n3', to: 'n6', label: 'Run Dispatch' }
    ]
  },
  {
    id: 'proact_safe',
    title: 'PROACT-SAFE: Threat Monitoring',
    subtitle: 'CPU-Optimized YOLOv8 Real-time Vision Matrix',
    image: '/proact_safe_architecture_1780035982390.png',
    apis: ['WebSocket Live Streams', 'MJPEG Video Streaming Endpoint', 'Native Notification API'],
    services: ['FastAPI WebSocket Manager', 'YOLOv8 Inference Pipeline', 'React Alert Feed', 'Simulation Matrix API'],
    aiPipeline: 'Video Frames Stream -> OpenCV MJPEG Preprocessing -> YOLOv8n Object Detection (<50ms) -> Intelligent Risk Threat Scoring -> Alert Dispatcher',
    systemDescription: 'A high-speed autonomous security infrastructure using light, CPU-optimized YOLOv8 neural network inference to detect weapon anomalies within dynamic city feeds.',
    dataFlow: [
      { step: '1', title: 'Stream Ingestion', desc: 'FastAPI pulls camera frames at designated intervals, preprocessing feeds via OpenCV.' },
      { step: '2', title: 'YOLOv8 Inference', desc: 'Frames are routed to YOLOv8n. Inference executes on standard CPU in less than 50 milliseconds.' },
      { step: '3', title: 'Intelligent Scoring', desc: 'An analytics pipeline scores threats based on model confidence, spatial zones, and detection persistence.' },
      { step: '4', title: 'WebSocket Alert', desc: 'High-hazard detections trigger WebSocket packages carrying the active alert metadata and raw base64 frame snapshots.' },
      { step: '5', title: 'React Broadcast', desc: 'The client-side command center intercepts WS packets, sound alarms, updates threat logs, and inserts frames in the snap gallery.' }
    ],
    nodes: [
      { id: 'n1', label: 'Video Streams', type: 'service', x: 80, y: 150, info: 'Simulated 4-camera CCTV matrix sending raw frames.' },
      { id: 'n2', label: 'FastAPI Server', type: 'service', x: 260, y: 150, info: 'Ingests frames, scales them, and manages WebSocket connections.' },
      { id: 'n3', label: 'YOLOv8 Engine', type: 'ai', x: 440, y: 80, info: 'Runs real-time neural network inference to extract bounding boxes.' },
      { id: 'n4', label: 'Threat Scorer', type: 'service', x: 440, y: 220, info: 'Filters false positives, weights persistence, and triggers warning dispatch.' },
      { id: 'n5', label: 'WebSocket Push', type: 'ui', x: 620, y: 150, info: 'Pushes alert triggers, confidence scores, and snapshots to active clients.' }
    ],
    connections: [
      { from: 'n1', to: 'n2', label: 'Video Ingest' },
      { from: 'n2', to: 'n3', label: 'Frame Stream' },
      { from: 'n3', to: 'n4', label: 'Detections' },
      { from: 'n4', to: 'n5', label: 'Verified Threat' },
      { from: 'n5', to: 'n2', label: 'UI Sync' }
    ]
  },
  {
    id: 'blood_donation',
    title: 'Smart Blood Donation Matcher',
    subtitle: 'Intelligent ML Geolocation Matcher & Blockchain Registry',
    image: '/blood_donation_architecture_1780035932279.png',
    apis: ['Positionstack Geocoding API', 'Web3 Ethereum Sandbox Ledger', 'REST endpoints'],
    services: ['Scikit-learn Prediction Service', 'Flask/FastAPI Integration API', 'React Portal', 'Secure Verification Protocol'],
    aiPipeline: 'Compatibility Data & Coordinates -> Random Forest Classifier (Donor Score Matching) -> Optimal Match List Routing',
    systemDescription: 'A humanitarian platform integrating geographical routing, Random Forest classification algorithms, and blockchain records to create optimal donor-recipient links in emergency states.',
    dataFlow: [
      { step: '1', title: 'Request Dispatch', desc: 'Hospital submits emergency request through the React client with blood details.' },
      { step: '2', title: 'Coordinates Check', desc: 'Flask calls Positionstack API to geocode address data into latitude and longitude variables.' },
      { step: '3', title: 'Random Forest Match', desc: 'The Scikit-learn Classifier evaluates matched histories, proximity indices, and type compatibility.' },
      { step: '4', title: 'Verification Commitment', desc: 'Verified donations are submitted to a secure mock blockchain ledger, preventing record alterations.' },
      { step: '5', title: 'Dynamic Route Map', desc: 'Optimal matches are returned to the client dashboard displaying interactive routes and status monitors.' }
    ],
    nodes: [
      { id: 'n1', label: 'React Client', type: 'ui', x: 80, y: 150, info: 'Donor registry, emergency intake cards, and matching dashboards.' },
      { id: 'n2', label: 'Flask Server', type: 'service', x: 260, y: 150, info: 'Exposes matching APIs, verifies geocodes, and connects modules.' },
      { id: 'n3', label: 'Geocoding API', type: 'service', x: 260, y: 270, info: 'Positionstack mapping translates addresses into literal latitude and longitude vectors.' },
      { id: 'n4', label: 'Scikit-learn Model', type: 'ai', x: 440, y: 150, info: 'Evaluates type availability, distance metrics, and history to generate a score.' },
      { id: 'n5', label: 'Blockchain', type: 'db', x: 620, y: 150, info: 'Secures and records verified donations immutably.' }
    ],
    connections: [
      { from: 'n1', to: 'n2', label: 'Match Request' },
      { from: 'n2', to: 'n3', label: 'Geocode Query' },
      { from: 'n3', to: 'n2', label: 'Coordinates' },
      { from: 'n2', to: 'n4', label: 'Features Vector' },
      { from: 'n4', to: 'n5', label: 'Log Verified' }
    ]
  },
  {
    id: 'chatbot',
    title: 'Multimodal GenAI Chatbot',
    subtitle: 'Voice, Image & Conversational Processing Center',
    image: '/chatbot_architecture_1780035950296.png',
    apis: ['OpenAI LLM API', 'Hugging Face CLIP Vision', 'Google TTS Synthesizer'],
    services: ['Streamlit Conversational Frame', 'Whisper Speech Engine', 'CLIP Embedding Core', 'PyTorch Inference Agent'],
    aiPipeline: 'Voice Audio -> Whisper STT / Image Upload -> Hugging Face CLIP Vectorization -> GPT Conversational Loop -> gTTS Speech Synthesis',
    systemDescription: 'A multi-modal AI voice-and-image assistant mapping complex media structures into consolidated conversational prompt flows.',
    dataFlow: [
      { step: '1', title: 'Input Ingest', desc: 'Operator submits queries using text, vocal microphone signals, or image files.' },
      { step: '2', title: 'Voice Conversion', desc: 'Whisper STT parses speech inputs into clean alphanumeric instruction logs.' },
      { step: '3', title: 'Visual Vectoring', desc: 'CLIP Vision encoders analyze raw image pixels, yielding conceptual semantic context coordinates.' },
      { step: '4', title: 'Cognitive LLM', desc: 'Merged context passes to the GPT reasoning backend to synthesize appropriate answers.' },
      { step: '5', title: 'Vocal Return', desc: 'The response is read back to the operator utilizing synthesized gTTS audio feeds.' }
    ],
    nodes: [
      { id: 'n1', label: 'Multimodal Input', type: 'ui', x: 80, y: 150, info: 'Operator uploads image, speaks into microphone, or types prompt.' },
      { id: 'n2', label: 'Whisper STT', type: 'service', x: 260, y: 70, info: 'Transforms dynamic acoustic inputs into standard textual formats.' },
      { id: 'n3', label: 'CLIP Encoder', type: 'ai', x: 260, y: 230, info: 'Injects visual content into semantic coordinates using Hugging Face models.' },
      { id: 'n4', label: 'LLM Orchestration', type: 'ai', x: 440, y: 150, info: 'Processes unified input tokens and generates answers.' },
      { id: 'n5', label: 'gTTS Synthesizer', type: 'service', x: 620, y: 150, info: 'Translates generated responses into vocal audio wave outputs.' }
    ],
    connections: [
      { from: 'n1', to: 'n2', label: 'Acoustic Feed' },
      { from: 'n1', to: 'n3', label: 'Visual Pixel' },
      { from: 'n2', to: 'n4', label: 'Text Tokens' },
      { from: 'n3', to: 'n4', label: 'Embeddings' },
      { from: 'n4', to: 'n5', label: 'Aural Waves' }
    ]
  }
];

const ArchitectureShowcase = () => {
  const [selectedProj, setSelectedProj] = useState(PROJECTS_ARCH[0]);
  const [viewMode, setViewMode] = useState('diagram'); // 'diagram' | 'blueprint'
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section id="architecture" className="architecture-section">
      <div className="section-container">
        {/* Header Block */}
        <div className="architecture-header">
          <div className="title-area">
            <span className="arch-tag-badge">
              <Layers size={12} /> ENTERPRISE SCHEMA
            </span>
            <h2 className="section-title">
              SYSTEM <span className="text-gradient">ARCHITECTURE</span>
            </h2>
            <p className="section-subtitle">
              Step into the blueprint maps of my production engines. Toggle between custom interactive schematic nodes and fully comprehensive system drawings.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === 'diagram' ? 'active' : ''}`}
              onClick={() => setViewMode('diagram')}
            >
              <Cpu size={14} /> SCHEMATIC NETWORK
            </button>
            <button
              className={`toggle-btn ${viewMode === 'blueprint' ? 'active' : ''}`}
              onClick={() => setViewMode('blueprint')}
            >
              <Eye size={14} /> SYSTEM BLUEPRINTS
            </button>
          </div>
        </div>

        {/* Projects Tab Bar */}
        <div className="project-arch-tabs">
          {PROJECTS_ARCH.map((proj) => (
            <button
              key={proj.id}
              className={`arch-tab-btn ${selectedProj.id === proj.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedProj(proj);
                setHoveredNode(null);
              }}
            >
              <span className="bullet-active" />
              {proj.id === 'finpilot' ? 'FinPilot Advisor' : 
               proj.id === 'proact_safe' ? 'PROACT Threat CV' : 
               proj.id === 'blood_donation' ? 'Smart Blood ML' : 'Multimodal Chatbot'}
            </button>
          ))}
        </div>

        <div className="architecture-main-grid">
          {/* Left Panel: Specifications Details */}
          <div className="architecture-spec-panel glass-panel-premium">
            <div className="panel-header-os">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="panel-title-text">{selectedProj.id.toUpperCase()}_SPECIFICATION.LOG</span>
            </div>

            <div className="panel-body-os">
              <div className="spec-header">
                <h3>{selectedProj.title}</h3>
                <span className="spec-sub">{selectedProj.subtitle}</span>
              </div>

              <div className="description-box">
                <p>{selectedProj.systemDescription}</p>
              </div>

              {/* Data Flow Timeline */}
              <div className="data-flow-container">
                <h4 className="sub-title">PIPELINE DATA FLOW SEQUENCE:</h4>
                <div className="flow-timeline">
                  {selectedProj.dataFlow.map((flow) => (
                    <div key={flow.step} className="flow-step-item">
                      <div className="step-number-node">{flow.step}</div>
                      <div className="step-content">
                        <h5>{flow.title}</h5>
                        <p>{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Breakdown */}
              <div className="tech-stack-details">
                <div className="tech-col">
                  <h4 className="sub-title">INTEGRATED SERVICES:</h4>
                  <ul>
                    {selectedProj.services.map((svc, i) => (
                      <li key={i}><CheckCircle size={12} className="text-cyan" /> {svc}</li>
                    ))}
                  </ul>
                </div>
                <div className="tech-col">
                  <h4 className="sub-title">EXTERNAL APIs:</h4>
                  <ul>
                    {selectedProj.apis.map((api, i) => (
                      <li key={i}><CheckCircle size={12} className="text-purple" /> {api}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Pipeline Segment */}
              <div className="ai-pipeline-box">
                <h4 className="sub-title"><Cpu size={14} className="text-cyan" /> COGNITIVE AI PIPELINE FLOW:</h4>
                <div className="pipeline-string-wrap">
                  <code>{selectedProj.aiPipeline}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Showcase Viewport */}
          <div className="architecture-viewport-panel glass-panel-premium">
            <div className="panel-header-os">
              <span className="viewport-status"><span className="pulse-dot" /> ACTIVE VIEWPORT</span>
              <span className="panel-title-text">VIEWPORT_CONSOLE // {viewMode.toUpperCase()}</span>
            </div>

            <div className="viewport-body">
              <AnimatePresence mode="wait">
                {viewMode === 'diagram' ? (
                  <motion.div
                    key="diagram"
                    className="diagram-canvas-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Interactive SVG Diagram Canvas */}
                    <div className="svg-canvas-wrapper">
                      <svg viewBox="0 0 700 350" width="100%" height="100%" className="schematic-svg">
                        <defs>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Connections */}
                        {selectedProj.connections.map((conn, idx) => {
                          const fromNode = selectedProj.nodes.find(n => n.id === conn.from);
                          const toNode = selectedProj.nodes.find(n => n.id === conn.to);
                          if (!fromNode || !toNode) return null;

                          return (
                            <g key={`conn-${idx}`} className="connection-group">
                              {/* Connection path line */}
                              <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                className="conn-line"
                              />
                              {/* Flowing pulse animation dot along link line */}
                              <circle r="4" fill="#00e5ff" className="flowing-pulse-dot" style={{
                                animationDelay: `${idx * 0.7}s`
                              }}>
                                <animateMotion
                                  dur="3s"
                                  repeatCount="indefinite"
                                  path={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                                />
                              </circle>
                            </g>
                          );
                        })}

                        {/* Nodes */}
                        {selectedProj.nodes.map((node) => {
                          const isHovered = hoveredNode?.id === node.id;
                          const nodeColorClass = 
                            node.type === 'ui' ? 'node-ui' : 
                            node.type === 'ai' ? 'node-ai' : 
                            node.type === 'db' ? 'node-db' : 'node-svc';

                          return (
                            <g
                              key={node.id}
                              className={`node-group ${nodeColorClass} ${isHovered ? 'hovered' : ''}`}
                              onMouseEnter={() => setHoveredNode(node)}
                              onMouseLeave={() => setHoveredNode(null)}
                              transform={`translate(${node.x}, ${node.y})`}
                            >
                              <circle r="18" className="node-circle" />
                              <circle r="23" className="node-ring-glow" />
                              
                              {/* Inner Label icon characters/short labels */}
                              <text y="4" textAnchor="middle" className="node-icon-char">
                                {node.type === 'ui' ? 'UI' : 
                                 node.type === 'ai' ? 'AI' : 
                                 node.type === 'db' ? 'DB' : 'SVC'}
                              </text>

                              {/* Title label block */}
                              <text y="38" textAnchor="middle" className="node-label-title">
                                {node.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      {/* Tooltip Overlay Info Panel */}
                      <div className="node-info-hud">
                        <AnimatePresence mode="wait">
                          {hoveredNode ? (
                            <motion.div
                              key={hoveredNode.id}
                              className="hud-tooltip-box glass-panel-premium"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="hud-header">
                                <Cpu size={12} className="text-cyan" />
                                <span className="type">{hoveredNode.type.toUpperCase()} NODE</span>
                                <span className="latency">LATENCY: &lt;10ms</span>
                              </div>
                              <h4>{hoveredNode.label}</h4>
                              <p>{hoveredNode.info}</p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              className="hud-tooltip-box idle-state"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <div className="idle-content">
                                <HelpCircle size={16} className="text-muted" />
                                <span>Hover over any schematic node to inspect its runtime behavior.</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="blueprint"
                    className="blueprint-canvas-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Technical Blueprint Display Window */}
                    <div className="blueprint-viewport">
                      <img
                        src={selectedProj.image}
                        alt={`${selectedProj.title} blueprint`}
                        className="blueprint-img-viewer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200';
                        }}
                      />
                      <div className="blueprint-grid-mesh" />
                      <div className="blueprint-watermark">
                        <span>CONFIDENTIAL ARCHITECTURAL SCHEMA — KIRAN OS V1.5</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureShowcase;
