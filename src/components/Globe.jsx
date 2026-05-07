'use client';

import React from 'react';
import './Globe.css';

const Globe = () => {
    return (
        <div className="globe-container">
            <div className="real-globe">
                <div className="globe-texture"></div>
                <div className="globe-atmosphere"></div>
                <div className="globe-overlay"></div>
                <div className="globe-reflection"></div>
            </div>
        </div>
    );
};

export default Globe;
