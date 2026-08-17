import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavClick = (sectionId) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/" onClick={() => handleNavClick('home')}>Raymond Ling</Link>
                    <div className="nav-desc">Digital Media Technology</div>
                </div>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
                    </li>
                    <li className="nav-item">
                        <a href="#skills" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
                    </li>
                    <li className="nav-item">
                        <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Projects</a>
                    </li>
                    <li className="nav-item">
                        <a href="#others" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('others'); }}>Others</a>
                    </li>
                    <li className="nav-item">
                        <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
                    </li>
                </ul>
                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

