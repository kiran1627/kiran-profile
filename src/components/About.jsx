'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../hooks/use3DTilt';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt(15);

    return (
        <section id="about" className="about-section" style={{ perspective: "1500px" }}>
            <div className="about-container">
                {/* Left Content */}
                <div className="about-left">
                    <span className="about-subtitle">About Us</span>
                    <h2 className="about-title">
                        Passion for AI/ML? Let's build something amazing together!
                    </h2>
                    <p className="about-desc">
                        As a motivated AI/ML enthusiast, I specialize in building intelligent solutions
                        using modern frameworks. I am dedicated to continuous learning and solving
                        complex problems through data-driven approaches.
                    </p>

                    <div className="about-checklist">
                        <div className="check-col">
                            <div className="check-item">
                                <CheckCircle2 size={18} className="check-icon" />
                                <span>Generative AI & LLMs</span>
                            </div>
                            <div className="check-item">
                                <CheckCircle2 size={18} className="check-icon" />
                                <span>Machine Learning Models</span>
                            </div>
                        </div>
                        <div className="check-col">
                            <div className="check-item">
                                <CheckCircle2 size={18} className="check-icon" />
                                <span>Data Analysis & Visualization</span>
                            </div>
                            <div className="check-item">
                                <CheckCircle2 size={18} className="check-icon" />
                                <span>Deep Learning (PyTorch/TF)</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-education">
                        <div className="edu-item">
                            <span className="edu-year">2022 - 2026</span>
                            <div className="edu-info">
                                <h4>Bachelor of Technology (B.Tech)</h4>
                                <p>Specializing in AI & ML</p>
                            </div>
                        </div>
                    </div>

                    <a href="#skills" className="btn-more-about">
                        <div className="icon-circle">
                            <ArrowRight size={18} />
                        </div>
                        <span>More About Me</span>
                    </a>
                </div>

                {/* Right Image */}
                <div className="about-right">
                    <motion.div
                        className="image-wrapper"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    >
                        <div className="arch-frame" style={{ transform: "translateZ(50px)" }}>
                            <img src="/profile-fixed.png" alt="About" className="about-img" />
                        </div>

                        <div className="experience-badge" style={{ transform: "translateZ(80px)" }}>
                            <div className="exp-num">AI/ML</div>
                            <div className="exp-text">AI/ML <br /> Enthusiast</div>
                        </div>

                        <div className="decor-circle" style={{ transform: "translateZ(-30px)" }}></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
