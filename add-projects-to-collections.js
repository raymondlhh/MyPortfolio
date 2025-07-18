// Add Projects to Collections
// This script adds sample projects to each of your Firestore collections

// Sample projects for each collection
const sampleProjects = {
    'Virtual Reality': [
        {
            title: "VR Campus Navigation",
            description: "An immersive virtual reality application for navigating university campus with interactive 3D environments.",
            technologies: ["Unity VR", "C#", "Oculus SDK", "3D Modeling"],
            imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            githubUrl: "https://github.com/example/vr-campus",
            featured: true,
            order: 1
        },
        {
            title: "VR Training Simulator",
            description: "Virtual reality training environment for professional skill development and assessment.",
            technologies: ["Unity VR", "C#", "HTC Vive", "Blender"],
            imageUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            githubUrl: "https://github.com/example/vr-training",
            featured: false,
            order: 2
        }
    ],
    'Augmented Reality': [
        {
            title: "AR Product Visualization",
            description: "Augmented reality app for visualizing products in real-world environments.",
            technologies: ["Unity AR", "C#", "ARKit", "Vuforia"],
            imageUrl: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
            githubUrl: "https://github.com/example/ar-product",
            featured: true,
            order: 1
        }
    ],
    'Mixed Reality': [
        {
            title: "MR Collaborative Workspace",
            description: "Mixed reality workspace for collaborative design and development projects.",
            technologies: ["Unity MR", "C#", "HoloLens", "Azure Spatial Anchors"],
            imageUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            githubUrl: "https://github.com/example/mr-workspace",
            featured: true,
            order: 1
        }
    ],
    'Game Development': [
        {
            title: "2D Platformer Game",
            description: "A classic 2D platformer game with multiple levels and character progression.",
            technologies: ["Unity 2D", "C#", "Photoshop", "Audacity"],
            imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            githubUrl: "https://github.com/example/2d-platformer",
            featured: true,
            order: 1
        },
        {
            title: "3D Adventure Game",
            description: "3D adventure game with open world exploration and puzzle elements.",
            technologies: ["Unity 3D", "C#", "Blender", "Substance Painter"],
            imageUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            githubUrl: "https://github.com/example/3d-adventure",
            featured: false,
            order: 2
        }
    ],
    '3D Modeling': [
        {
            title: "Character Design Portfolio",
            description: "Collection of 3D character models with detailed textures and rigging.",
            technologies: ["Blender", "ZBrush", "Substance Painter", "Maya"],
            imageUrl: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
            githubUrl: "",
            featured: true,
            order: 1
        },
        {
            title: "Environment Modeling",
            description: "3D environment models for architectural visualization and game development.",
            technologies: ["Blender", "3ds Max", "V-Ray", "Photoshop"],
            imageUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            githubUrl: "",
            featured: false,
            order: 2
        }
    ],
    '2D & 3D Animation': [
        {
            title: "Character Animation Reel",
            description: "Showcase of character animations including walk cycles, facial expressions, and action sequences.",
            technologies: ["Blender", "Adobe Animate", "After Effects", "Premiere Pro"],
            imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            githubUrl: "",
            featured: true,
            order: 1
        },
        {
            title: "Motion Graphics Collection",
            description: "2D motion graphics and visual effects for digital media and advertising.",
            technologies: ["After Effects", "Photoshop", "Illustrator", "Premiere Pro"],
            imageUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            githubUrl: "",
            featured: false,
            order: 2
        }
    ],
    'Audio & Video Production': [
        {
            title: "Short Film Production",
            description: "Complete short film project including pre-production, filming, and post-production.",
            technologies: ["Premiere Pro", "After Effects", "Audition", "DaVinci Resolve"],
            imageUrl: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
            githubUrl: "",
            featured: true,
            order: 1
        },
        {
            title: "Music Production Portfolio",
            description: "Original music compositions and sound design for various media projects.",
            technologies: ["Ableton Live", "Pro Tools", "Logic Pro", "Audition"],
            imageUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            demoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
            githubUrl: "",
            featured: false,
            order: 2
        }
    ]
};

// Function to add projects to a specific collection
async function addProjectsToCollection(collectionName, projects) {
    try {
        console.log(`Adding ${projects.length} projects to ${collectionName} collection...`);
        
        for (const project of projects) {
            // Add timestamp fields
            const projectData = {
                ...project,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const docRef = await window.db.collection(collectionName).add(projectData);
            console.log(`✅ Added project "${project.title}" to ${collectionName} with ID: ${docRef.id}`);
        }
        
        console.log(`✅ Successfully added ${projects.length} projects to ${collectionName}`);
    } catch (error) {
        console.error(`❌ Error adding projects to ${collectionName}:`, error);
    }
}

// Function to add all sample projects
async function addAllSampleProjects() {
    try {
        console.log('🚀 Starting to add sample projects to all collections...');
        
        for (const [collectionName, projects] of Object.entries(sampleProjects)) {
            await addProjectsToCollection(collectionName, projects);
        }
        
        console.log('🎉 All sample projects have been added successfully!');
        console.log('📊 Summary:');
        for (const [collectionName, projects] of Object.entries(sampleProjects)) {
            console.log(`   ${collectionName}: ${projects.length} projects`);
        }
        
    } catch (error) {
        console.error('❌ Error adding sample projects:', error);
    }
}

// Function to add projects to a specific collection only
async function addProjectsToSpecificCollection(collectionName) {
    if (!sampleProjects[collectionName]) {
        console.error(`❌ No sample projects found for collection: ${collectionName}`);
        return;
    }
    
    await addProjectsToCollection(collectionName, sampleProjects[collectionName]);
}

// Make functions available globally
window.addAllSampleProjects = addAllSampleProjects;
window.addProjectsToSpecificCollection = addProjectsToSpecificCollection;
window.sampleProjects = sampleProjects;

console.log('📝 Sample projects script loaded!');
console.log('Available functions:');
console.log('  - addAllSampleProjects() - Add projects to all collections');
console.log('  - addProjectsToSpecificCollection("Collection Name") - Add projects to specific collection');
console.log('Available collections:', Object.keys(sampleProjects)); 