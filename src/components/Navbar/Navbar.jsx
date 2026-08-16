import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    // In the original, links were anchor tags (#home). In React Router, if we are on the homepage we might want to scroll,
    // but if we are on other pages, we should link to /.
    // For now, let's keep them as a mix or just standard links since it's a SPA.

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">Raymond Ling</Link>
                    <div className="nav-desc">Digital Media Technology</div>
                </div>
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#skills" className="nav-link" onClick={() => setIsOpen(false)}>Skills</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#projects" className="nav-link" onClick={() => setIsOpen(false)}>Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#others" className="nav-link" onClick={() => setIsOpen(false)}>Others</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
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
