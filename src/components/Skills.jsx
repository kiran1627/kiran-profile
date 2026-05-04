import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer, scaleUp } from '../hooks/useScrollAnimation';
import {
    SiPython, SiPytorch, SiTensorflow, SiHuggingface, SiOpenai, SiStreamlit, SiFastapi
} from 'react-icons/si';
import { FaRobot, FaBrain, FaGitAlt, FaCogs, FaUsers, FaLightbulb } from 'react-icons/fa';
import { BsDatabaseCheck, BsKanban, BsChatDots } from 'react-icons/bs';
import { BiMicrochip } from 'react-icons/bi';
import BackgroundIcons from './BackgroundIcons';
import './Skills.css';

const skillsData = [
    { name: 'Python', desc: 'Core language for AI scripting, automation, and ML model development.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PyTorch', desc: 'Training deep learning models, GANs, and custom LLMs.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'TensorFlow', desc: 'End-to-end deep learning workflows for GenAI applications.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'Hugging Face', desc: 'Transformers, tokenization, fine-tuning, and deployment.', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
    { name: 'LangChain', desc: 'Building agents, tools, and RAG pipelines with LLMs.', icon: 'https://cdn.simpleicons.org/langchain' },
    { name: 'RAG', desc: 'Chunking, vector embeddings, and semantic retrieval for grounding LLMs.', icon: 'https://img.icons8.com/ios-filled/100/ffffff/database.png' },
    { name: 'Prompt Engineering', desc: 'Designing effective prompts for zero-shot and CoT tasks.', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' },
    { name: 'Streamlit', desc: 'Deploying interactive GenAI prototypes and demos quickly.', icon: 'https://cdn.simpleicons.org/streamlit' },
    { name: 'FastAPI', desc: 'Serving GenAI models with APIs and webhooks.', icon: 'https://cdn.simpleicons.org/fastapi' },
    { name: 'Google Gemini', desc: 'Hands-on with Google\'s Gemini multimodal LLMs and APIs.', icon: 'https://cdn.simpleicons.org/googlegemini' },
    { name: 'Computer Vision', desc: 'OpenCV, text-to-image models, and vision transformers.', icon: 'https://cdn.simpleicons.org/opencv' },
    { name: 'Git & GitHub', desc: 'CI/CD, version control, and collaborative workflows.', icon: 'https://cdn.simpleicons.org/github' },
    { name: 'MLOps', desc: 'Model deployment, monitoring, and lifecycle management (MLflow).', icon: 'https://cdn.simpleicons.org/mlflow' },
    { name: 'Node.js', desc: 'Backend development and server-side scripting.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MongoDB', desc: 'Database management and unstructured data storage.', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Creative Problem Solving', desc: 'Innovating generative AI use-cases and solving ambiguity.', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103444.png' }
];

const Skills = () => {
    const { ref, controls } = useScrollAnimation(0.1);

    return (
        <motion.section
            id="skills"
            className="section-container skills-section"
            style={{ position: 'relative' }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
        >
            <BackgroundIcons count={6} />
            <motion.h2 className="heading-secondary" variants={fadeInUp}>Core Strengths & Technical Skills</motion.h2>
            <motion.div
                className="skills-grid"
                variants={staggerContainer}
            >
                {skillsData.map((skill, index) => (
                    <motion.div key={index} className="skill-card glass hover-glow" variants={scaleUp}>
                        <div className="skill-icon-container">
                            <img src={skill.icon} alt={skill.name} className="real-skill-icon" />
                        </div>
                        <div className="skill-content">
                            <h3 className="skill-title">{skill.name}</h3>
                            <p className="skill-desc">{skill.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
};

export default Skills;
