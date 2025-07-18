// Remove Sidebar and Restore Original Layout
// This script removes any sidebar-related CSS and restores the original navbar layout

console.log('🔄 Removing sidebar and restoring original layout...');

// Function to remove sidebar-related CSS
function removeSidebarCSS() {
    // Remove any sidebar-related styles that might have been added
    const styleSheets = document.styleSheets;
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            if (rules) {
                for (let j = rules.length - 1; j >= 0; j--) {
                    const rule = rules[j];
                    if (rule.selectorText && (
                        rule.selectorText.includes('.sidebar') ||
                        rule.selectorText.includes('.main-content') ||
                        rule.selectorText.includes('.clean-sidebar') ||
                        rule.selectorText.includes('.sidebar-nav') ||
                        rule.selectorText.includes('.sidebar-menu') ||
                        rule.selectorText.includes('.sidebar-link') ||
                        rule.selectorText.includes('.sidebar-profile-image') ||
                        rule.selectorText.includes('.sidebar-name') ||
                        rule.selectorText.includes('.sidebar-cgpa') ||
                        rule.selectorText.includes('.collaborate-btn') ||
                        rule.selectorText.includes('.mobile-menu-toggle')
                    )) {
                        styleSheets[i].deleteRule(j);
                    }
                }
            }
        } catch (e) {
            // Skip external stylesheets that might throw errors
            continue;
        }
    }
    
    console.log('✅ Removed sidebar-related CSS');
}

// Function to restore original navbar visibility
function restoreNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.display = 'block';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '1000';
    }
    console.log('✅ Restored navbar visibility');
}

// Function to remove any sidebar elements
function removeSidebarElements() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.remove();
        console.log('✅ Removed sidebar element');
    }
    
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.remove();
        console.log('✅ Removed mobile menu toggle');
    }
}

// Function to restore body layout
function restoreBodyLayout() {
    document.body.style.display = 'block';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    document.body.style.minHeight = 'auto';
    console.log('✅ Restored body layout');
}

// Function to restore main content layout
function restoreMainContent() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        // Move all content back to body
        const allContent = Array.from(mainContent.children);
        allContent.forEach(child => {
            document.body.appendChild(child);
        });
        
        // Remove the main-content wrapper
        mainContent.remove();
        console.log('✅ Restored main content layout');
    }
}

// Initialize the restoration
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 Starting layout restoration...');
    
    // Remove sidebar elements first
    removeSidebarElements();
    
    // Remove sidebar CSS
    removeSidebarCSS();
    
    // Restore body layout
    restoreBodyLayout();
    
    // Restore main content
    restoreMainContent();
    
    // Restore navbar
    restoreNavbar();
    
    console.log('✅ Layout restoration complete!');
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, run immediately
    console.log('🔄 DOM already loaded, running restoration immediately...');
    
    removeSidebarElements();
    removeSidebarCSS();
    restoreBodyLayout();
    restoreMainContent();
    restoreNavbar();
    
    console.log('✅ Immediate layout restoration complete!');
} 