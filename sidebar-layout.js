// Sidebar Layout System
// This script creates a fixed left sidebar with profile and navigation

console.log('📱 Sidebar Layout System Loaded');

// Function to create the sidebar layout
function createSidebarLayout() {
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    
    // Create sidebar content
    sidebar.innerHTML = `
        <div class="sidebar-content">
            <div class="profile-section">
                <div class="profile-image-container">
                    <img src="assets/images/profiles/Profile.jpg" alt="Raymond Ling Heng Hua" class="sidebar-profile-image">
                </div>
                <h2 class="sidebar-name">Raymond Ling Heng Hua</h2>
                <p class="sidebar-cgpa">CGPA 3.07</p>
            </div>
            
            <nav class="sidebar-nav">
                <ul class="sidebar-menu">
                    <li><a href="#introduction" class="sidebar-link"><span class="diamond">◆</span> Introduction</a></li>
                    <li><a href="#xr-projects" class="sidebar-link"><span class="diamond">◆</span> XR Projects</a></li>
                    <li><a href="#game-projects" class="sidebar-link"><span class="diamond">◆</span> Game Projects</a></li>
                    <li><a href="#3d-modeling" class="sidebar-link"><span class="diamond">◆</span> 3D Modeling</a></li>
                    <li><a href="#animation" class="sidebar-link"><span class="diamond">◆</span> 2D/3D Animation</a></li>
                    <li><a href="#audio-video" class="sidebar-link"><span class="diamond">◆</span> Audio/Video Production</a></li>
                    <li><a href="#education" class="sidebar-link"><span class="diamond">◆</span> Education</a></li>
                </ul>
            </nav>
            
            <div class="sidebar-footer">
                <button class="collaborate-btn">Let's Collaborate!</button>
            </div>
        </div>
    `;
    
    // Create main content wrapper
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    mainContent.id = 'main-content';
    
    // Move existing content to main content area
    const existingContent = document.querySelector('body > *:not(.sidebar)');
    if (existingContent) {
        // Move all existing content except the sidebar
        const allContent = Array.from(document.body.children);
        allContent.forEach(child => {
            if (!child.classList.contains('sidebar')) {
                mainContent.appendChild(child);
            }
        });
    }
    
    // Add sidebar and main content to body
    document.body.appendChild(sidebar);
    document.body.appendChild(mainContent);
    
    console.log('✅ Sidebar layout created');
}

// Function to add sidebar styles
function addSidebarStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Sidebar Layout */
        body {
            display: flex;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        
        .sidebar {
            width: 300px;
            height: 100vh;
            background: var(--bg-secondary, #111827);
            border-right: 1px solid var(--border-color, #374151);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        
        .sidebar-content {
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        
        .profile-section {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .profile-image-container {
            margin-bottom: 1rem;
        }
        
        .sidebar-profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid var(--primary-color, #3b82f6);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .sidebar-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-primary, #f9fafb);
            margin-bottom: 0.5rem;
            line-height: 1.3;
        }
        
        .sidebar-cgpa {
            font-size: 0.9rem;
            color: var(--text-secondary, #d1d5db);
            font-weight: 500;
        }
        
        .sidebar-nav {
            flex: 1;
        }
        
        .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .sidebar-menu li {
            margin-bottom: 0.5rem;
        }
        
        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            color: var(--text-secondary, #d1d5db);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .sidebar-link:hover {
            background: var(--bg-primary, #1f2937);
            color: var(--text-primary, #f9fafb);
            transform: translateX(5px);
        }
        
        .sidebar-link.active {
            background: var(--primary-color, #3b82f6);
            color: white;
        }
        
        .diamond {
            color: var(--primary-color, #3b82f6);
            margin-right: 0.75rem;
            font-size: 0.8rem;
        }
        
        .sidebar-link:hover .diamond,
        .sidebar-link.active .diamond {
            color: white;
        }
        
        .sidebar-footer {
            margin-top: auto;
            padding-top: 1rem;
        }
        
        .collaborate-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            background: var(--primary-color, #3b82f6);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .collaborate-btn:hover {
            background: var(--gradient-start, #4f46e5);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        /* Main Content Area */
        .main-content {
            flex: 1;
            margin-left: 300px;
            height: 100vh;
            overflow-y: auto;
            background: var(--bg-primary, #1f2937);
            position: relative;
        }
        
        /* Move navbar to sidebar */
        .navbar {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: transparent;
            backdrop-filter: none;
            z-index: 1001;
        }
        
        .nav-container {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .nav-menu {
            display: flex;
            gap: 1rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .nav-item {
            margin: 0;
        }
        
        .nav-link {
            padding: 0.5rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            color: white;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .nav-link:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
        

        
        /* Hide hamburger menu */
        .hamburger {
            display: none;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .sidebar.open {
                transform: translateX(0);
            }
            
            .main-content {
                margin-left: 0;
            }
            
            /* Add mobile menu toggle */
            .mobile-menu-toggle {
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1002;
                background: var(--primary-color, #3b82f6);
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 6px;
                cursor: pointer;
                display: block;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Sidebar styles added');
}

// Function to handle sidebar navigation
function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get the target section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to target section in main content
                const mainContent = document.getElementById('main-content');
                const targetOffset = targetSection.offsetTop;
                mainContent.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Sidebar navigation setup complete');
}

// Function to create mobile menu toggle
function createMobileMenuToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.setAttribute('aria-label', 'Toggle Sidebar');
    
    toggle.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });
    
    document.body.appendChild(toggle);
    console.log('✅ Mobile menu toggle created');
}

// Initialize sidebar layout
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Initializing sidebar layout...');
    
    // Add styles first
    addSidebarStyles();
    
    // Create sidebar layout
    createSidebarLayout();
    
    // Setup navigation
    setupSidebarNavigation();
    
    // Create mobile menu toggle
    createMobileMenuToggle();
    
    console.log('✅ Sidebar layout initialization complete');
});

// Make functions available globally
window.createSidebarLayout = createSidebarLayout;
window.setupSidebarNavigation = setupSidebarNavigation; 