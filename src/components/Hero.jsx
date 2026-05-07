'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Brain, Code, Cpu, Database, Sparkles, MessageSquare } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../hooks/useScrollAnimation';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="section-container hero-section">

            <motion.div
                className="hero-content"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.div className="hero-image-container" variants={fadeInUp}>
                    <div className="image-glow"></div>
                    <img
                        src="/profile-fixed.png"
                        alt="B. Kiran Babu"
                        className="hero-image"
                    />
                </motion.div>

                <motion.h1 className="heading-primary" variants={fadeInUp}>
                    Hi, I am <span className="gradient-text">B. Kiran Babu</span>
                </motion.h1>

                <motion.div className="typewriter-container" variants={fadeInUp}>
                    <TypeAnimation
                        sequence={[
                            'Generative AI Engineer',
                            1500,
                            'ML Developer',
                            1500,
                            'Prompt Engineer',
                            1500
                        ]}
                        wrapper="h2"
                        speed={50}
                        className="typewriter-text"
                        repeat={Infinity}
                    />
                </motion.div>

                <motion.p className="hero-description text-sub" variants={fadeInUp}>
                    Specialized in developing and optimizing large language models, creating intelligent AI systems, and designing effective prompt engineering solutions for enterprise applications.
                </motion.p>

                <motion.a
                    href="/Kiran_Resume.pdf"
                    className="btn-primary"
                    download="Kiran_Babu_Resume.pdf"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Download size={20} /> Download Resume
                </motion.a>

                <motion.div className="floating-cards" variants={staggerContainer}>
                    <motion.div className="glass float-card" variants={fadeInUp}>
                        <h4>Machine Learning</h4>
                        <p>Expertise in training, optimizing, and deploying state-of-the-art ML models.</p>
                    </motion.div>
                    <motion.div className="glass float-card" variants={fadeInUp}>
                        <h4>Prompt Engineering</h4>
                        <p>Crafting effective prompts for high performance and reliability in LLMs.</p>
                    </motion.div>
                    <motion.div className="glass float-card" variants={fadeInUp}>
                        <h4>AI Development</h4>
                        <p>Designing smart, autonomous systems using modern deep learning tools.</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
