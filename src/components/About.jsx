'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, scaleUp } from '../hooks/useScrollAnimation';
import './About.css';

const About = () => {
    const { ref, controls } = useScrollAnimation(0.2);

    return (
        <motion.section
            id="about"
            className="section-container about-section"
            style={{ position: 'relative' }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
        >
            <motion.h2 className="heading-secondary" variants={fadeInUp}>About Me</motion.h2>
            <motion.div className="about-content glass" variants={scaleUp}>
                <p className="about-text">
                    I am a dedicated **Generative AI Engineer** and **ML Developer** with a passion for building intelligent systems that solve real-world challenges. My expertise lies in fine-tuning large language models (LLMs), architecting RAG (Retrieval-Augmented Generation) pipelines, and developing autonomous agents that bridge the gap between cutting-edge research and scalable production applications.
                </p>
                <p className="about-text" style={{ marginTop: '1.5rem' }}>
                    With a background in deep learning and natural language processing, I focus on creating efficient, impactful AI solutions. Whether it's optimizing model performance, designing robust prompt engineering strategies, or building full-stack AI-driven platforms, I strive for excellence in every line of code. My goal is to empower products with the latest advancements in AI to create more intuitive and powerful user experiences.
                </p>
            </motion.div>
        </motion.section>
    );
};

export default About;
