// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(31, 41, 55, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Project Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const projectCategories = document.querySelectorAll('.project-category');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Remove active class from all buttons and categories
        tabButtons.forEach(btn => btn.classList.remove('active'));
        projectCategories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked button and corresponding category
        button.classList.add('active');
        const targetCategory = document.getElementById(`${category}-projects`);
        targetCategory.classList.add('active');
        
        // Handle pagination for the newly active category
        if (window.projectPagination) {
            window.projectPagination.handleTabSwitch(targetCategory.id);
        }
        
        // Fix YouTube videos when switching XR project tabs
        if (window.YouTubeTabFix && window.YouTubeTabFix.reloadYouTubeIframes) {
            setTimeout(() => {
                window.YouTubeTabFix.reloadYouTubeIframes(targetCategory);
            }, 300);
        }
        
        // Smooth scroll to projects section if not already there
        const projectsSection = document.getElementById('projects');
        const rect = projectsSection.getBoundingClientRect();
        if (rect.top > 100) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Coursework Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing Coursework Tabs');
    
    const courseworkTabButtons = document.querySelectorAll('.coursework-tab-button');
    const courseworkCategories = document.querySelectorAll('.coursework-category');

    console.log('Found coursework tab buttons:', courseworkTabButtons.length);
    console.log('Found coursework categories:', courseworkCategories.length);

    if (courseworkTabButtons.length > 0 && courseworkCategories.length > 0) {
        courseworkTabButtons.forEach((button, index) => {
            console.log(`Setting up button ${index + 1}:`, button.getAttribute('data-category'));
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Button clicked:', button.getAttribute('data-category'));
                
                const category = button.getAttribute('data-category');
                
                // Remove active class from all buttons and categories
                courseworkTabButtons.forEach(btn => btn.classList.remove('active'));
                courseworkCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked button and corresponding category
                button.classList.add('active');
                const targetCategory = document.getElementById(`${category}-projects`);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                    console.log('Successfully activated category:', category);
                } else {
                    console.error(`Category element with id "${category}-projects" not found`);
                }
                
                // Smooth scroll to coursework section if not already there
                const courseworkSection = document.getElementById('coursework');
                if (courseworkSection) {
                    const rect = courseworkSection.getBoundingClientRect();
                    if (rect.top > 100) {
                        courseworkSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    } else {
        console.warn('Coursework tab buttons or categories not found');
        
        // Fallback: Try again after a short delay
        setTimeout(() => {
            console.log('Retrying coursework tab initialization...');
            const retryButtons = document.querySelectorAll('.coursework-tab-button');
            const retryCategories = document.querySelectorAll('.coursework-category');
            
            if (retryButtons.length > 0 && retryCategories.length > 0) {
                console.log('Fallback successful - found elements on retry');
                retryButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        const category = button.getAttribute('data-category');
                        
                        retryButtons.forEach(btn => btn.classList.remove('active'));
                        retryCategories.forEach(cat => cat.classList.remove('active'));
                        
                        button.classList.add('active');
                        const targetCategory = document.getElementById(`${category}-projects`);
                        if (targetCategory) {
                            targetCategory.classList.add('active');
                        }
                    });
                });
            }
        }, 100);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 1);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Force Dark Mode
document.documentElement.setAttribute('data-theme', 'dark');

// Add CSS for active nav link and theme transitions
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
`;
document.head.appendChild(style); 