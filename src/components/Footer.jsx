'use client';

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-content">
                <p className="copyright">
                    &copy; {new Date().getFullYear()} B. Kiran Babu. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
