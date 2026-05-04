import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, scaleUp } from '../hooks/useScrollAnimation';
import BackgroundIcons from './BackgroundIcons';
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
            <BackgroundIcons count={4} />
            <motion.h2 className="heading-secondary" variants={fadeInUp}>About Me</motion.h2>
            <motion.div className="about-content glass" variants={scaleUp}>
                <p className="about-text">
                    I am a passionate AI/ML developer and prompt engineer, skilled in designing intelligent systems and building real-world applications using deep learning and natural language processing. With a strong foundation in machine learning, I specialize in creating solutions that are efficient, scalable, and impactful. My work bridges research with application, empowering products with the latest in generative AI technology.
                </p>
            </motion.div>
        </motion.section>
    );
};

export default About;
