'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer, scaleUp } from '../hooks/useScrollAnimation';
import Globe from './Globe';
import './Contact.css';
import { Mail, MessageCircle } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const { ref, controls } = useScrollAnimation(0.2);

    return (
        <motion.section
            id="contact"
            className="section-container contact-section"
            style={{ position: 'relative' }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
        >
            <motion.h2 className="heading-secondary" variants={fadeInUp}>Get in Touch</motion.h2>
            <motion.div
                className="contact-container"
                variants={staggerContainer}
            >
                <div className="contact-content glass">
                    <h3 className="contact-heading">Let's Work Together</h3>
                    <p className="contact-text">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <motion.a
                        href="mailto:kiranbabubandela6@gmail.com"
                        className="btn-primary contact-btn"
                        variants={scaleUp}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="btn-icon-img" /> Email Me
                    </motion.a>

                    <motion.div className="social-links" variants={staggerContainer}>
                        <motion.a href="https://github.com/kiran1627" className="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer" variants={scaleUp}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="real-social-icon" />
                        </motion.a>
                        <motion.a href="https://linkedin.com/in/kiranbabu18" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" variants={scaleUp}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="real-social-icon" />
                        </motion.a>
                        <motion.a href="https://wa.me/919381342247" className="social-icon" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" variants={scaleUp}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="real-social-icon" />
                        </motion.a>
                    </motion.div>
                </div>

                <div className="contact-globe-wrapper">
                    <Globe />
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Contact;
