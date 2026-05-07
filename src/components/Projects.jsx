'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Play } from 'lucide-react';
import { useScrollAnimation, fadeInUp, staggerContainer, slideInLeft } from '../hooks/useScrollAnimation';
import { projectsInfo } from '../projectsInfo';
import './Projects.css';

const projectsData = [
    {
        title: 'AI-enabled Smart Blood Donation System',
        desc: 'A smart system that uses AI to match blood donors with recipients based on type and location. It optimizes the donation process, improves success rates, and significantly reduces response times during emergencies.',
        tech: ['Python', 'TensorFlow', 'Flask', 'Machine Learning'],
        impact: 'Optimizes donation, improves success rates, and reduces response times.',
        videoSrc: '/BloodDonation-demo.mp4',
        readme: projectsInfo[0].readme,
        demoLink: projectsInfo[0].demoLink
    },
    {
        title: 'Generative AI Chatbot',
        desc: 'An advanced conversational agent powered by Gemini that provides real-time, context-aware responses. Designed to handle complex queries and assist with various interactive tasks seamlessly.',
        tech: ['Gemini', 'Python', 'Streamlit', 'LLMs'],
        impact: 'Real-time customer support, task automation, scalable conversation flow.',
        videoSrc: '/chatbot-demo.mp4',
        readme: projectsInfo[1].readme,
        demoLink: projectsInfo[1].demoLink
    },
    {
        title: 'FinPilot: Autonomous Finance System',
        desc: 'A full-stack autonomous finance platform that uses a multi-agent decision cycle for financial planning and investment management.',
        tech: ['FastAPI', 'Next.js', 'Python', 'SQLite', 'LLMs', 'JWT'],
        impact: 'Automates financial decision-making and provides real-time investment tracking through intelligent agent orchestration.',
        videoSrc: '/Finpilot.mp4',
        readme: projectsInfo[2].readme,
        demoLink: projectsInfo[2].demoLink
    },
    {
        title: 'PROACT-SAFE: Intelligent Firearm Monitoring',
        desc: 'A real-time autonomous security system using YOLOv8 for firearm detection in smart city video streams.',
        tech: ['Python', 'YOLOv8', 'FastAPI', 'React', 'WebSockets'],
        impact: 'Provides immediate threat assessments and situational awareness for security personnel.',
        videoSrc: '/Proact.mp4',
        readme: projectsInfo[3].readme,
        demoLink: projectsInfo[3].demoLink
    }
];

const Projects = () => {
    const { ref, controls } = useScrollAnimation(0.1);
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <motion.section
            id="projects"
            className="section-container projects-section"
            style={{ position: 'relative' }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
        >
            <motion.h2 className="heading-secondary" variants={fadeInUp}>Featured Projects & Demos</motion.h2>
            <motion.div
                className="projects-grid"
                variants={staggerContainer}
            >
                {projectsData.map((project, index) => (
                    <motion.div key={index} className="project-card hover-expand" variants={slideInLeft}>
                        <div className="project-play-icon">
                            <Play fill="currentColor" size={24} />
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">
                                {project.title}
                            </h3>
                            <p className="project-desc">{project.desc}</p>

                            <div className="project-readme glass">
                                <ReactMarkdown>{project.readme}</ReactMarkdown>
                            </div>

                            <div className="project-subsection">
                                <div className="tech-tags">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-subsection impact-section">
                                <h4>Impact:</h4>
                                <p className="impact-text">{project.impact}</p>
                            </div>

                            <div className="project-actions">
                                {project.videoSrc && (
                                    <button 
                                        onClick={() => setSelectedVideo(project.videoSrc)}
                                        className="btn-primary demo-btn"
                                    >
                                        View Demo
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div 
                        className="video-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div 
                            className="video-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedVideo(null)}>×</button>
                            <video
                                key={selectedVideo}
                                className="modal-video"
                                controls
                                autoPlay
                                playsInline
                                preload="auto"
                            >
                                <source src={selectedVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Projects;
