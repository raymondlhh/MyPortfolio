// Mobile Viewport Fix for Social Media Apps
// This script handles viewport issues when opening from LinkedIn, Facebook, etc.

(function() {
    'use strict';
    
    // Function to update viewport height
    function updateViewportHeight() {
        // Get the actual viewport height
        const vh = window.innerHeight * 0.01;
        // Set CSS custom property
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Function to handle navbar positioning
    function updateNavbarPosition() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // Get safe area insets
        const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
        const statusBarHeight = window.visualViewport ? window.visualViewport.offsetTop : 0;
        
        // Calculate total top offset
        const totalOffset = Math.max(safeAreaTop, statusBarHeight, 20);
        
        // Update navbar padding
        navbar.style.paddingTop = `${totalOffset}px`;
        
        // Update scroll padding
        document.documentElement.style.scrollPaddingTop = `${totalOffset + 80}px`;
    }
    
    // Initial setup
    function init() {
        // Set initial viewport height
        updateViewportHeight();
        updateNavbarPosition();
        
        // Add CSS custom properties for safe areas
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --vh: 1vh;
                --sat: env(safe-area-inset-top, 0px);
                --sal: env(safe-area-inset-left, 0px);
                --sar: env(safe-area-inset-right, 0px);
                --sab: env(safe-area-inset-bottom, 0px);
            }
            
            .navbar {
                padding-top: max(0.75rem, var(--sat));
                padding-left: max(0px, var(--sal));
                padding-right: max(0px, var(--sar));
            }
            
            @media (max-width: 768px) {
                .navbar {
                    padding-top: max(calc(0.75rem + 20px), var(--sat));
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Event listeners
    function setupEventListeners() {
        // Update on resize
        window.addEventListener('resize', () => {
            updateViewportHeight();
            updateNavbarPosition();
        });
        
        // Update on orientation change
        window.addEventListener('orientationchange', () => {
            // Delay to allow orientation change to complete
            setTimeout(() => {
                updateViewportHeight();
                updateNavbarPosition();
            }, 100);
        });
        
        // Update on scroll (for mobile browsers that hide/show address bar)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateViewportHeight();
                updateNavbarPosition();
            }, 150);
        });
        
        // Update on visual viewport changes (modern browsers)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                updateViewportHeight();
                updateNavbarPosition();
            });
            
            window.visualViewport.addEventListener('scroll', () => {
                updateNavbarPosition();
            });
        }
        
        // Handle focus events (when returning from other apps)
        window.addEventListener('focus', () => {
            setTimeout(() => {
                updateViewportHeight();
                updateNavbarPosition();
            }, 100);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            setupEventListeners();
        });
    } else {
        init();
        setupEventListeners();
    }
    
    // Additional fix for iOS Safari
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Fix for iOS Safari viewport issues
        window.addEventListener('load', () => {
            setTimeout(() => {
                updateViewportHeight();
                updateNavbarPosition();
            }, 500);
        });
    }
    
    // Export functions for manual updates if needed
    window.mobileViewportFix = {
        updateViewportHeight,
        updateNavbarPosition
    };
    
})(); 