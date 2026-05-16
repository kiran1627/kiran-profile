'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer, scaleUp } from '../hooks/useScrollAnimation';
import { use3DTilt } from '../hooks/use3DTilt';
import { 
    SiPython, SiPytorch, SiTensorflow, SiHuggingface, SiOpenai, 
    SiFastapi, SiStreamlit, SiReact, 
    SiGithub, SiMongodb, SiPostgresql, SiOpencv,
    SiGooglecloud, SiMysql
} from 'react-icons/si';
import { FaBrain, FaRobot, FaSearch, FaTerminal, FaInfinity, FaDatabase, FaAws, FaNodeJs, FaChartBar } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { HiSparkles } from 'react-icons/hi';
import { GiCircuitry } from 'react-icons/gi';
import './Skills.css';

const skillsData = [
    { name: 'Python', desc: 'Core language for AI scripting, automation, and ML model development.', Icon: SiPython, color: '#3776AB' },
    { name: 'PyTorch', desc: 'Training deep learning models, GANs, and custom LLMs.', Icon: SiPytorch, color: '#EE4C2C' },
    { name: 'TensorFlow', desc: 'End-to-end deep learning workflows for GenAI applications.', Icon: SiTensorflow, color: '#FF6F00' },
    { name: 'Hugging Face', desc: 'Transformers, tokenization, fine-tuning, and deployment.', Icon: SiHuggingface, color: '#FFD21E' },
    { name: 'OpenAI', desc: 'Working with GPT-4, DALL-E, and advanced API integrations.', Icon: SiOpenai, color: '#00A67E' },
    { name: 'Google Gemini', desc: 'Expertise in building multimodal AI applications using Gemini Pro and Flash.', Icon: HiSparkles, color: '#8E75FF' },
    { name: 'LLM Fine-tuning', desc: 'Expertise in LoRA, QLoRA, and instruction tuning for custom models.', Icon: FaBrain, color: '#3B82F6' },
    { name: 'Vector Databases', desc: 'Working with Pinecone, ChromaDB, and Milvus for RAG systems.', Icon: FaDatabase, color: '#3B82F6' },
    { name: 'LangChain', desc: 'Building complex AI agents, tools, and RAG pipelines.', Icon: GiCircuitry, color: '#00A67E' },
    { name: 'RAG Pipelines', desc: 'Advanced semantic search, chunking strategies, and retrieval grounding.', Icon: FaSearch, color: '#3B82F6' },
    { name: 'AI Agents', desc: 'Developing autonomous agents using frameworks like CrewAI and AutoGen.', Icon: FaRobot, color: '#3B82F6' },
    { name: 'Computer Vision', desc: 'YOLOv10, OpenCV, and vision transformers for real-time detection.', Icon: SiOpencv, color: '#5C3EE8' },
    { name: 'FastAPI', desc: 'High-performance API development for serving ML models.', Icon: SiFastapi, color: '#05998B' },
    { name: 'Prompt Engineering', desc: 'Advanced techniques like Chain-of-Thought and Few-shot prompting.', Icon: FaTerminal, color: '#3B82F6' },
    { name: 'MLOps', desc: 'CI/CD for ML, model monitoring, and lifecycle management.', Icon: FaInfinity, color: '#3B82F6' },
    { name: 'Streamlit', desc: 'Rapid prototyping for AI/ML dashboards and demos.', Icon: SiStreamlit, color: '#FF4B4B' },
    { name: 'React', desc: 'Building modern, interactive UIs for AI applications.', Icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', desc: 'Scalable backend development for AI-integrated web services.', Icon: FaNodeJs, color: '#339933' },
    { name: 'Azure Cloud', desc: 'Deploying and managing AI services on Microsoft Azure platform.', Icon: VscAzure, color: '#0078D4' },
    { name: 'AWS Cloud', desc: 'Deploying models on AWS Bedrock and enterprise cloud infrastructure.', Icon: FaAws, color: '#FF9900' },
    { name: 'Power BI', desc: 'Advanced data visualization and business intelligence reporting.', Icon: FaChartBar, color: '#F2C811' },
    { name: 'PostgreSQL', desc: 'Structured data management for relational datasets.', Icon: SiPostgresql, color: '#336791' },
    { name: 'MySQL', desc: 'Managing and optimizing relational databases for scalable applications.', Icon: SiMysql, color: '#4479A1' },
    { name: 'MongoDB', desc: 'NoSQL database for flexible, document-based data storage.', Icon: SiMongodb, color: '#47A248' },
    { name: 'GCP Cloud', desc: 'Expertise in Google Cloud Platform services, Vertex AI, and cloud scaling.', Icon: SiGooglecloud, color: '#4285F4' },
    { name: 'GitHub', desc: 'Collaborative development and source code management.', Icon: SiGithub, color: '#FFFFFF' }
];

const SkillCard = ({ skill }) => {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt(15);
    
    return (
        <motion.div 
            className="skill-card glass hover-glow" 
            variants={scaleUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
            <div className="skill-icon-container" style={{ transform: "translateZ(30px)" }}>
                <skill.Icon 
                    className="real-skill-icon-svg" 
                    style={{ color: skill.color }}
                />
            </div>
            <div className="skill-content" style={{ transform: "translateZ(20px)" }}>
                <h3 className="skill-title">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { ref, controls } = useScrollAnimation(0.1);

    return (
        <motion.section
            id="skills"
            className="section-container skills-section"
            style={{ position: 'relative', perspective: "1500px" }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
        >
            <motion.h2 className="heading-secondary" variants={fadeInUp}>Core Strengths & Technical Skills</motion.h2>
            <motion.div
                className="skills-grid"
                variants={staggerContainer}
            >
                {skillsData.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                ))}
            </motion.div>
        </motion.section>
    );
};

export default Skills;
