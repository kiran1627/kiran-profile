import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, scaleUp } from '../hooks/useScrollAnimation';
import BackgroundIcons from './BackgroundIcons';
import './Achievements.css';
import { Award } from 'lucide-react';

const Achievements = () => {
    const { ref, controls } = useScrollAnimation(0.2);

    return (
        <motion.section
            id="achievements"
            className="section-container achievements-section"
            style={{ position: 'relative' }}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={scaleUp}
        >
            <BackgroundIcons count={4} />
            <h2 className="heading-secondary">Milestones</h2>
            <div className="achievement-card glass">
                <div className="achievement-icon">
                    <Award size={32} />
                </div>
                <div className="achievement-content">
                    <h3 className="achievement-title">Innovation Marathon Finalist</h3>
                    <p className="achievement-desc">
                        Selected as one of the top finalists in the Innovation Marathon organized by TASK in partnership with Code Unnati, Edunet Foundation, and SAP.
                    </p>
                </div>
            </div>
        </motion.section>
    );
};

export default Achievements;
