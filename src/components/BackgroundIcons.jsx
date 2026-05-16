'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './BackgroundIcons.css';

const techIcons = [
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', size: 50 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', size: 50 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apollo/apollo-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg', size: 45 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', size: 40 },
    { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', size: 40 },
];

const BackgroundIcons = ({ count = 60 }) => {
    const [icons, setIcons] = React.useState([]);

    React.useEffect(() => {
        // Generate random icons only once on mount
        const shuffled = [...techIcons].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, Math.min(count, techIcons.length)).map((item) => ({
            ...item,
            randomTop: `${Math.random() * 100}%`,
            randomLeft: `${Math.random() * 100}%`,
            randomDuration: 15 + Math.random() * 20,
            randomDelay: -Math.random() * 20,
            pathX: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, 0],
            pathY: [0, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150, 0],
            rot: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            rotX: [0, 360 * Math.random()],
            rotY: [0, 360 * Math.random()]
        }));
        setIcons(selected);
    }, [count]);

    return (
        <div className="tech-icons-bg-container">
            {icons.map((item, index) => (
                <motion.div
                    key={index}
                    className="tech-icon-img-continuous"
                    animate={{
                        x: item.pathX,
                        y: item.pathY,
                        rotate: item.rot,
                        rotateX: item.rotX,
                        rotateY: item.rotY
                    }}
                    style={{ 
                        top: item.randomTop, 
                        left: item.randomLeft,
                        width: item.size,
                        height: item.size,
                        transformStyle: "preserve-3d"
                    }}
                    transition={{
                        duration: item.randomDuration,
                        repeat: Infinity,
                        delay: item.randomDelay,
                        ease: "linear" // Linear for continuous, non-stopping movement
                    }}
                >
                    <img src={item.url} alt="tech icon" />
                </motion.div>
            ))}
        </div>
    );
};

export default BackgroundIcons;
