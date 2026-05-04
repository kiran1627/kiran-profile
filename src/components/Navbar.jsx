import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar glass">
            <div className="nav-brand">B.Kiran Babu</div>
            <ul className="nav-links">
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Work</a></li>
                <li><a href="#achievements">Achievements</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                    <a href="/Kiran_Resume.pdf" className="btn-resume" target="_blank" rel="noopener noreferrer">
                        Resume
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
