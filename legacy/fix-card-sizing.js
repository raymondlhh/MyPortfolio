// Fix Card Sizing Issues
// This script fixes problems with project card layout and sizing

function fixCardSizingIssues() {
    const style = document.createElement('style');
    style.textContent = `
        /* Fix for bigger poker card size */
        .project-card.bigger-poker-size {
            background: var(--card-bg, #ffffff);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color, #e5e7eb);
            width: 360px;
            min-height: 520px;
            height: auto;
            display: flex;
            flex-direction: column;
            margin: 1.5rem;
        }
        
        .project-card.bigger-poker-size:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }
        
        .project-card.bigger-poker-size .project-image {
            position: relative;
            width: 100%;
            height: 260px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .project-card.bigger-poker-size .project-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .project-video-cover {
            position: relative;
            width: 100%;
            height: 260px;
            overflow: hidden;
            background: #000;
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 100%;
            border: none;
            pointer-events: none;
        }
        
        .project-card.bigger-poker-size .project-content {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 200px;
        }
        
        .project-card.bigger-poker-size h3 {
            margin: 0 0 0.75rem 0;
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text-primary, #1f2937);
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: break-word;
        }
        
        .project-card.bigger-poker-size p {
            margin: 0 0 1rem 0;
            color: var(--text-secondary, #6b7280);
            line-height: 1.6;
            font-size: 1rem;
            flex: 1;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            text-align: justify;
            text-justify: inter-word;
        }
        
        .project-technologies {
            margin-top: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
            padding-top: 0.5rem;
        }
        
        .tech-tag {
            background: var(--primary-color, #3b82f6);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        
        .tech-more {
            background: var(--secondary-color, #6b7280);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .project-demo-link {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 10;
        }
        
        .demo-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #ff0000;
            color: white;
            border-radius: 50%;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 3px 6px rgba(255, 0, 0, 0.3);
            backdrop-filter: blur(4px);
        }
        
        .demo-button:hover {
            background: #cc0000;
            transform: scale(1.15);
            box-shadow: 0 6px 12px rgba(255, 0, 0, 0.4);
        }
        
        .demo-button i {
            font-size: 1.1rem;
        }
        
        .project-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--placeholder-bg, #f3f4f6);
            color: var(--placeholder-color, #9ca3af);
        }
        
        .project-placeholder i {
            font-size: 3rem;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .project-card.bigger-poker-size {
            background: var(--card-bg-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
        }
        
        [data-theme="dark"] .project-card.bigger-poker-size h3 {
            color: var(--text-primary-dark, #f9fafb);
        }
        
        [data-theme="dark"] .project-card.bigger-poker-size p {
            color: var(--text-secondary-dark, #d1d5db);
        }
        
        [data-theme="dark"] .tech-tag {
            background: var(--primary-color-dark, #60a5fa);
        }
        
        [data-theme="dark"] .tech-more {
            background: var(--secondary-color-dark, #9ca3af);
        }
        
        [data-theme="dark"] .project-placeholder {
            background: var(--placeholder-bg-dark, #374151);
            color: var(--placeholder-color-dark, #6b7280);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .project-card.bigger-poker-size {
                width: 300px;
                min-height: 460px;
                margin: 1rem;
            }
            
            .project-card.bigger-poker-size .project-image,
            .project-video-cover {
                height: 200px;
            }
            
            .project-card.bigger-poker-size .project-content {
                padding: 1.25rem;
                min-height: 180px;
            }
            
            .project-card.bigger-poker-size h3 {
                font-size: 1.25rem;
            }
            
            .project-card.bigger-poker-size p {
                font-size: 0.9rem;
            }
            
            .tech-tag {
                font-size: 0.75rem;
                padding: 0.2rem 0.6rem;
            }
            
            .demo-button {
                width: 36px;
                height: 36px;
            }
            
            .demo-button i {
                font-size: 1rem;
            }
        }
        
        /* Grid layout for multiple cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            justify-content: center;
            padding: 1rem;
        }
        
        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                padding: 0.5rem;
            }
        }
        
        /* Ensure proper overflow handling */
        .project-card.bigger-poker-size {
            overflow: visible;
        }
        
        .project-card.bigger-poker-size .project-image {
            overflow: hidden;
        }
        
        .project-card.bigger-poker-size .project-content {
            overflow: hidden;
        }
        
        /* Fix for long titles */
        .project-card.bigger-poker-size h3 {
            word-break: break-word;
            hyphens: auto;
        }
        
        /* Ensure demo button stays within card bounds */
        .project-demo-link {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 10;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Card sizing issues fixed');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        fixCardSizingIssues();
    }, 100);
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            fixCardSizingIssues();
        }, 100);
    });
} else {
    setTimeout(() => {
        fixCardSizingIssues();
    }, 100);
} 