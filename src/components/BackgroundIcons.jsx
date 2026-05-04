import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundIcons.css';

const techIcons = [
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', top: '15%', left: '10%', delay: 0, size: 50 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', top: '25%', left: '85%', delay: 1, size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', top: '70%', left: '15%', delay: 2, size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', top: '65%', left: '80%', delay: 1.5, size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', top: '40%', left: '20%', delay: 0.5, size: 50 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', top: '20%', left: '75%', delay: 2.5, size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', top: '80%', left: '45%', delay: 3, size: 35 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', top: '10%', left: '50%', delay: 1.8, size: 35 },
];

const BackgroundIcons = ({ count = 8 }) => {
    // We can randomize positions for different sections if needed
    return (
        <div className="tech-icons-bg-container">
            {techIcons.slice(0, count).map((item, index) => (
                <motion.div
                    key={index}
                    className="tech-icon-img-bright"
                    style={{ 
                        top: `${Math.random() * 90}%`, 
                        left: `${Math.random() * 90}%`,
                        width: item.size,
                        height: item.size
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        rotate: [0, 25, -25, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                >
                    <img src={item.url} alt="tech icon" />
                </motion.div>
            ))}
        </div>
    );
};

export default BackgroundIcons;
