// Clean Sidebar Layout System
// This script creates a clean sidebar with only profile and main navigation

console.log('🧹 Clean Sidebar Layout System Loaded');

// Function to create the clean sidebar layout
function createCleanSidebarLayout() {
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar clean-sidebar';
    sidebar.id = 'sidebar';
    
    // Create sidebar content with only profile and main navigation
    sidebar.innerHTML = `
        <div class="sidebar-content">
            <div class="profile-section">
                <div class="profile-image-container">
                    <img src="assets/images/profiles/Profile.jpg" alt="Raymond Ling Heng Hua" class="sidebar-profile-image">
                </div>
                <h2 class="sidebar-name">Raymond Ling Heng Hua</h2>
                <p class="sidebar-cgpa">CGPA 3.02</p>
            </div>
            
            <nav class="sidebar-nav">
                <ul class="sidebar-menu">
                    <li><a href="#home" class="sidebar-link"><span class="diamond">◆</span> Home</a></li>
                    <li><a href="#about" class="sidebar-link"><span class="diamond">◆</span> About</a></li>
                    <li><a href="#skills" class="sidebar-link"><span class="diamond">◆</span> Skills</a></li>
                    <li><a href="#projects" class="sidebar-link"><span class="diamond">◆</span> Projects</a></li>
                    <li><a href="#others" class="sidebar-link"><span class="diamond">◆</span> Others</a></li>
                    <li><a href="#contact" class="sidebar-link"><span class="diamond">◆</span> Contact</a></li>
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
    
    console.log('✅ Clean sidebar layout created');
}

// Function to add clean sidebar styles
function addCleanSidebarStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Clean Sidebar Layout */
        body {
            display: flex;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        
        .sidebar.clean-sidebar {
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
            margin-bottom: 3rem;
        }
        
        .profile-image-container {
            margin-bottom: 1.5rem;
        }
        
        .sidebar-profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid var(--primary-color, #3b82f6);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        
        .sidebar-name {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--text-primary, #f9fafb);
            margin-bottom: 0.5rem;
            line-height: 1.3;
        }
        
        .sidebar-cgpa {
            font-size: 1rem;
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
            margin-bottom: 0.75rem;
        }
        
        .sidebar-link {
            display: flex;
            align-items: center;
            padding: 1rem 1.25rem;
            color: var(--text-secondary, #d1d5db);
            text-decoration: none;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .sidebar-link:hover {
            background: var(--bg-primary, #1f2937);
            color: var(--text-primary, #f9fafb);
            transform: translateX(8px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .sidebar-link.active {
            background: var(--primary-color, #3b82f6);
            color: white;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .diamond {
            color: var(--primary-color, #3b82f6);
            margin-right: 1rem;
            font-size: 1rem;
        }
        
        .sidebar-link:hover .diamond,
        .sidebar-link.active .diamond {
            color: white;
        }
        
        .sidebar-footer {
            margin-top: auto;
            padding-top: 2rem;
        }
        
        .collaborate-btn {
            width: 100%;
            padding: 1rem 1.5rem;
            background: var(--primary-color, #3b82f6);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .collaborate-btn:hover {
            background: var(--gradient-start, #4f46e5);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
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
        
        /* Hide the original navbar */
        .navbar {
            display: none !important;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar.clean-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }
            
            .sidebar.clean-sidebar.open {
                transform: translateX(0);
            }
            
            .main-content {
                margin-left: 0;
            }
            
            /* Mobile menu toggle */
            .mobile-menu-toggle {
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1002;
                background: var(--primary-color, #3b82f6);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 8px;
                cursor: pointer;
                display: block;
                font-size: 1.2rem;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            
            .mobile-menu-toggle:hover {
                background: var(--gradient-start, #4f46e5);
                transform: scale(1.05);
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Clean sidebar styles added');
}

// Function to handle sidebar navigation
function setupCleanSidebarNavigation() {
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
    
    // Set initial active state based on current section
    const currentSection = window.location.hash || '#home';
    const activeLink = document.querySelector(`[href="${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    console.log('✅ Clean sidebar navigation setup complete');
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

// Function to handle collaborate button
function setupCollaborateButton() {
    const collaborateBtn = document.querySelector('.collaborate-btn');
    if (collaborateBtn) {
        collaborateBtn.addEventListener('click', () => {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const mainContent = document.getElementById('main-content');
                const targetOffset = contactSection.offsetTop;
                mainContent.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    }
    console.log('✅ Collaborate button setup complete');
}

// Initialize clean sidebar layout
document.addEventListener('DOMContentLoaded', () => {
    console.log('🧹 Initializing clean sidebar layout...');
    
    // Add styles first
    addCleanSidebarStyles();
    
    // Create clean sidebar layout
    createCleanSidebarLayout();
    
    // Setup navigation
    setupCleanSidebarNavigation();
    
    // Setup collaborate button
    setupCollaborateButton();
    
    // Create mobile menu toggle
    createMobileMenuToggle();
    
    console.log('✅ Clean sidebar layout initialization complete');
});

// Make functions available globally
window.createCleanSidebarLayout = createCleanSidebarLayout;
window.setupCleanSidebarNavigation = setupCleanSidebarNavigation; 