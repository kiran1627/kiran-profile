'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo">
                    <div className="logo-icon">
                        <div className="logo-inner">
                            <span className="logo-symbol">K</span>
                        </div>
                    </div>
                    <span>AI / ML ENGINEER</span>
                </div>

                <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                <ul className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
                    <li><a href="/" className="active" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
                    <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
                    <li><a href="#blog" onClick={() => setMobileMenuOpen(false)}>Blog</a></li>
                    <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a></li>
                    <li className="mobile-only-cv">
                        <a href="/Kiran_Resume.pdf" className="btn-cv" target="_blank">
                            <ArrowUpRight size={16} /> <span>Download CV</span>
                        </a>
                    </li>
                </ul>

                <div className="nav-actions">
                    <a href="/Kiran_Resume.pdf" className="btn-cv" target="_blank">
                        <div className="icon-circle">
                            <ArrowUpRight size={16} />
                        </div>
                        <span>Download CV</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
