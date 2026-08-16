// Test Pagination System
// This file tests the pagination system with sample data

// Sample project data for testing
const sampleProjects = [
    {
        id: '1',
        title: 'VR Minimarket',
        description: 'A virtual reality shopping experience',
        imageUrl: 'assets/images/gif/VR Minimarket.gif',
        technologies: ['Unity', 'C#', 'VR'],
        demoUrl: 'https://youtube.com/watch?v=example1',
        githubUrl: 'https://github.com/example1'
    },
    {
        id: '2',
        title: 'AR Navigation App',
        description: 'Augmented reality navigation system',
        imageUrl: '',
        technologies: ['Unity', 'C#', 'AR'],
        demoUrl: 'https://youtube.com/watch?v=example2',
        githubUrl: 'https://github.com/example2'
    },
    {
        id: '3',
        title: '3D Game Environment',
        description: 'Immersive 3D game world',
        imageUrl: '',
        technologies: ['Unreal Engine', 'C++', '3D Modeling'],
        demoUrl: 'https://youtube.com/watch?v=example3',
        githubUrl: 'https://github.com/example3'
    },
    {
        id: '4',
        title: 'Mixed Reality Experience',
        description: 'Combined VR and AR experience',
        imageUrl: '',
        technologies: ['Unity', 'C#', 'MR'],
        demoUrl: 'https://youtube.com/watch?v=example4',
        githubUrl: 'https://github.com/example4'
    },
    {
        id: '5',
        title: 'VR Educational App',
        description: 'Educational content in virtual reality',
        imageUrl: '',
        technologies: ['Unity', 'C#', 'VR'],
        demoUrl: 'https://youtube.com/watch?v=example5',
        githubUrl: 'https://github.com/example5'
    },
    {
        id: '6',
        title: 'AR Art Gallery',
        description: 'Augmented reality art exhibition',
        imageUrl: '',
        technologies: ['Unity', 'C#', 'AR'],
        demoUrl: 'https://youtube.com/watch?v=example6',
        githubUrl: 'https://github.com/example6'
    }
];

// Test function to populate a category with sample projects
function testPaginationWithSampleData(categoryId) {
    console.log(`Testing pagination with sample data for ${categoryId}`);
    
    const container = document.getElementById(categoryId);
    if (!container) {
        console.error(`Container ${categoryId} not found`);
        return;
    }
    
    const projectsGrid = container.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error(`Projects grid not found in ${categoryId}`);
        return;
    }
    
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Create project cards from sample data
    sampleProjects.forEach(project => {
        const card = createSampleProjectCard(project);
        projectsGrid.appendChild(card);
    });
    
    console.log(`Added ${sampleProjects.length} sample projects to ${categoryId}`);
    
    // Trigger pagination refresh
    if (window.projectPagination) {
        setTimeout(() => {
            window.projectPagination.refreshPagination(categoryId);
        }, 100);
    }
}

// Create a sample project card
function createSampleProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    // Create image section
    let imageSection = '';
    if (project.imageUrl && project.imageUrl !== '') {
        imageSection = `<img src="${project.imageUrl}" alt="${project.title}" class="project-cover">`;
    } else {
        imageSection = `
            <div class="project-placeholder">
                <i class="fas fa-vr-cardboard"></i>
            </div>
        `;
    }

    // Create technologies section
    let techSection = '';
    if (project.technologies && project.technologies.length > 0) {
        techSection = project.technologies.map(tech => `<span>${tech}</span>`).join('');
    }

    // Create links section
    let linksSection = '';
    if (project.demoUrl && project.demoUrl !== '') {
        linksSection += `<a href="${project.demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Demo</a>`;
    }
    if (project.githubUrl && project.githubUrl !== '') {
        linksSection += `<a href="${project.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>`;
    }

    card.innerHTML = `
        <div class="project-image">
            ${imageSection}
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${techSection}
            </div>
            <div class="project-links">
                ${linksSection}
            </div>
        </div>
    `;

    return card;
}

// Test all categories
function testAllCategories() {
    const categories = [
        'vr-projects', 'ar-projects', 'mr-projects',
        'game-dev-projects', '3d-modeling-projects', 'animation-projects', 'audio-video-projects'
    ];
    
    categories.forEach(categoryId => {
        testPaginationWithSampleData(categoryId);
    });
}

// Export test functions
window.testPagination = {
    testPaginationWithSampleData,
    testAllCategories,
    sampleProjects
};

console.log('Pagination test functions loaded. Use testPagination.testAllCategories() to test all categories.'); 