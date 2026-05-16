'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Cpu, Sparkles, LineChart } from 'lucide-react';
import './Services.css';

const services = [
    {
        icon: <Brain size={32} />,
        title: 'LLM Fine-tuning',
        desc: 'Specialized in fine-tuning Large Language Models for domain-specific tasks and performance optimization.'
    },
    {
        icon: <Database size={32} />,
        title: 'RAG Development',
        desc: 'Building robust Retrieval-Augmented Generation pipelines for intelligent document search and Q&A.'
    },
    {
        icon: <Code size={32} />,
        title: 'AI Agents',
        desc: 'Designing autonomous AI agents capable of complex task execution and tool interaction.'
    },
    {
        icon: <Cpu size={32} />,
        title: 'MLOps',
        desc: 'Implementing end-to-end Machine Learning pipelines, from data preprocessing to model deployment.'
    },
    {
        icon: <Sparkles size={32} />,
        title: 'Prompt Engineering',
        desc: 'Crafting advanced prompt strategies to enhance LLM reliability and output quality.'
    },
    {
        icon: <LineChart size={32} />,
        title: 'Data Analytics',
        desc: 'Leveraging AI/ML to uncover insights and drive data-informed decision making.'
    }
];

const Services = () => {
    return (
        <section id="services" className="services-section">
            <div className="section-header">
                <span className="subtitle">Our Services</span>
                <h2 className="title">What I Can Do For You</h2>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div 
                        key={index}
                        className="service-card glass"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-desc">{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
