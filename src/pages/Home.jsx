import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const [projectTab, setProjectTab] = useState('vr');
    const [othersTab, setOthersTab] = useState('software-dev');

    // Handle hash scrolling when routing from other pages
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <main>
            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Hi, I'm Raymond Ling Heng Hua</h1>
                        <p className="hero-subtitle">Digital Media Technology Student</p>
                        <p className="hero-description">
                            Passionate about XR/Game development, I enjoy creating immersive digital experiences that combine creativity with technology. Skilled in Unity, Unreal, Maya, 3D/2D animation, mobile app development, and multimedia production, I aim to innovate and grow as an XR/Game Developer.
                        </p>
                        <div className="hero-buttons">
                            <a href="#projects" className="btn btn-primary">View My Work</a>
                            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="./assets/images/profiles/Profile.jpg" alt="Raymond Ling Heng Hua" className="profile-image" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="container">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>
                                I'm a passionate XR/Game developer with a love for creating immersive digital experiences. 
                                With expertise in Unity, Unreal Engine, and modern XR/Game technologies, I bring virtual 
                                worlds to life through innovative solutions and intuitive user interactions.
                            </p>
                            <p>
                                When I'm not developing XR/Game experiences, you can find me exploring new XR/Game technologies, 
                                contributing to the XR/Game community, or experimenting with the latest immersive hardware.
                            </p>
                            <div className="education-info">
                                <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                                <div className="education-item">
                                    <h4>Bachelor of Engineering in Digital Media Technology (Honours)</h4>
                                    <div className="education-details">
                                        <span className="cgpa">CGPA: 3.1</span>
                                        <span className="university">Xiamen University Malaysia</span>
                                        <span className="duration">September 2022 - September 2026</span>
                                    </div>
                                    <p className="degree-description">The DMT program at Xiamen University Malaysia blends creativity and technology, preparing students for careers in animation, game development, XR, and multimedia.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="skills">
                <div className="container">
                    <h2 className="section-title">Skills & Technologies</h2>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Skills</h3>
                            <div className="skill-items">
                                <div className="skill-item"><i className="fas fa-vr-cardboard"></i><span>XR Development</span></div>
                                <div className="skill-item"><i className="fas fa-gamepad"></i><span>Game Development</span></div>
                                <div className="skill-item"><i className="fas fa-cube"></i><span>3D Modeling</span></div>
                                <div className="skill-item"><i className="fas fa-film"></i><span>2D/3D Animation</span></div>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>Programming</h3>
                            <div className="skill-items">
                                <div className="skill-item"><i className="fas fa-code"></i><span>C#</span></div>
                                <div className="skill-item"><i className="fas fa-code"></i><span>C++</span></div>
                                <div className="skill-item"><i className="fab fa-js"></i><span>JavaScript</span></div>
                                <div className="skill-item"><i className="fab fa-python"></i><span>Python</span></div>
                            </div>
                        </div>
                        <div className="skill-category">
                            <h3>Tools & Platforms</h3>
                            <div className="skill-items">
                                <div className="skill-item"><i className="fab fa-unity"></i><span>Unity Engine</span></div>
                                <div className="skill-item"><i className="fas fa-cube"></i><span>Unreal Engine</span></div>
                                <div className="skill-item"><i className="fas fa-cube"></i><span>Autodesk Maya</span></div>
                                <div className="skill-item"><i className="fas fa-film"></i><span>Adobe Animate</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects">
                <div className="container">
                    <h2 className="section-title">XR & Game Development</h2>
                    
                    <div className="project-tabs">
                        <button className={`tab-button ${projectTab === 'vr' ? 'active' : ''}`} onClick={() => setProjectTab('vr')}>
                            <i className="fas fa-vr-cardboard"></i><span>Virtual Reality</span>
                        </button>
                        <button className={`tab-button ${projectTab === 'ar' ? 'active' : ''}`} onClick={() => setProjectTab('ar')}>
                            <i className="fas fa-mobile-alt"></i><span>Augmented Reality</span>
                        </button>
                        <button className={`tab-button ${projectTab === 'mr' ? 'active' : ''}`} onClick={() => setProjectTab('mr')}>
                            <i className="fas fa-glasses"></i><span>Mixed Reality</span>
                        </button>
                        <button className={`tab-button ${projectTab === 'game-dev' ? 'active' : ''}`} onClick={() => setProjectTab('game-dev')}>
                            <i className="fas fa-gamepad"></i><span>Game Development</span>
                        </button>
                    </div>

                    <div className="project-category active">
                        <div className="category-header">
                            <h3 className="category-title">
                                {projectTab === 'vr' && <><i className="fas fa-vr-cardboard"></i> Virtual Reality (VR)</>}
                                {projectTab === 'ar' && <><i className="fas fa-mobile-alt"></i> Augmented Reality (AR)</>}
                                {projectTab === 'mr' && <><i className="fas fa-glasses"></i> Mixed Reality (MR)</>}
                                {projectTab === 'game-dev' && <><i className="fas fa-gamepad"></i> Game Development</>}
                            </h3>
                        </div>
                        <div className="projects-grid">
                            <p style={{textAlign: 'center', color: '#8892b0'}}>Loading projects from Firebase...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Others Section */}
            <section id="others" className="others">
                <div className="container">
                    <h2 className="section-title">Others</h2>
                    
                    <div className="others-tabs">
                        <button className={`others-tab-button ${othersTab === 'software-dev' ? 'active' : ''}`} onClick={() => setOthersTab('software-dev')}>
                            <i className="fas fa-laptop-code"></i><span>Software Development</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === 'computer-graphics' ? 'active' : ''}`} onClick={() => setOthersTab('computer-graphics')}>
                            <i className="fas fa-image"></i><span>Computer Graphics</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === '3d-modeling' ? 'active' : ''}`} onClick={() => setOthersTab('3d-modeling')}>
                            <i className="fas fa-cube"></i><span>3D Modeling</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === 'animation' ? 'active' : ''}`} onClick={() => setOthersTab('animation')}>
                            <i className="fas fa-film"></i><span>2D/3D Animation</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === 'audio-video' ? 'active' : ''}`} onClick={() => setOthersTab('audio-video')}>
                            <i className="fas fa-video"></i><span>Audio & Video Production</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === 'hci-ux' ? 'active' : ''}`} onClick={() => setOthersTab('hci-ux')}>
                            <i className="fas fa-mouse-pointer"></i><span>HCI/UX</span>
                        </button>
                        <button className={`others-tab-button ${othersTab === 'board-game' ? 'active' : ''}`} onClick={() => setOthersTab('board-game')}>
                            <i className="fas fa-chess"></i><span>Board Game</span>
                        </button>
                    </div>

                    <div className="project-category active">
                        <div className="projects-grid">
                            <p style={{textAlign: 'center', color: '#8892b0'}}>Loading projects from Firebase...</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
