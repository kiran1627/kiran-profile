'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { use3DTilt } from '../hooks/use3DTilt';
import { Facebook, Twitter, Instagram, Linkedin, Play, MessageCircle, Star, ArrowRight } from 'lucide-react';
import BackgroundIcons from './BackgroundIcons';
import './Hero.css';

const Hero = () => {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt(10);

    return (
        <section 
            id="hero" 
            className="hero-section"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
        >
            <BackgroundIcons count={25} />
            {/* Background Image Container */}
            <motion.div 
                className="hero-bg-image"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                <img src="/kiran.jpg" alt="Background" className="bg-img" />
            </motion.div>

            <div className="hero-container">
                {/* Left Content */}
                <div className="hero-content">
                    <motion.span 
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        WE CREATE AI SOLUTIONS FOR YOU
                    </motion.span>
                    
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        AI / ML <br /> ENGINEER
                    </motion.h1>

                    <motion.p 
                        className="hero-desc"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        It is a long established fact that a reader will be distracted by 
                        the readable content of a page when looking at its layout
                    </motion.p>
                    
                    <motion.div 
                        className="hero-btns"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <a href="#contact" className="btn-contact">
                            <div className="icon-circle">
                                <ArrowRight size={20} />
                            </div>
                            <span>Contact Us</span>
                        </a>
                    </motion.div>
                </div>

            </div>

            {/* Vertical Social Sidebar */}
            <div className="social-sidebar">
                <a href="#" className="social-link"><Twitter size={18} /></a>
                <a href="#" className="social-link active"><div className="dot"></div></a>
                <a href="#" className="social-link"><span className="be-icon">Be</span></a>
                <a href="#" className="social-link"><Instagram size={18} /></a>
            </div>

            {/* Bottom Stats Bar */}
            <div className="stats-bar">
                <div className="stats-inner">
                    <div className="stat-box">
                        <div className="stat-icon"><MessageCircle size={24} /></div>
                        <div className="stat-info">
                            <h3>20+</h3>
                            <p>Open Source</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon"><Star size={24} /></div>
                        <div className="stat-info">
                            <h3>15+</h3>
                            <p>Projects Done</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon"><MessageCircle size={24} /></div>
                        <div className="stat-info">
                            <h3>500+</h3>
                            <p>Solved Problems</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon"><Star size={24} /></div>
                        <div className="stat-info">
                            <h3>10+</h3>
                            <p>Certifications</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-icon"><ArrowRight size={24} /></div>
                        <div className="stat-info">
                            <h3>24/7</h3>
                            <p>Quick Learner</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
