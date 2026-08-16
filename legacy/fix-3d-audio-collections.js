// Fix 3D Modeling and Audio & Video Production Collections
// This script adds sample projects to fix the loading errors

// Sample projects for 3D Modeling
const threeDModelingProjects = [
    {
        title: "Character Design Portfolio",
        description: "Collection of 3D character models with detailed textures and rigging. Features realistic human characters with custom clothing and accessories.",
        technologies: ["Blender", "ZBrush", "Substance Painter", "Maya"],
        imageUrl: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        githubUrl: "",
        featured: true,
        order: 1
    },
    {
        title: "Environment Modeling",
        description: "3D environment models for architectural visualization and game development. Includes detailed interior and exterior scenes.",
        technologies: ["Blender", "3ds Max", "V-Ray", "Photoshop"],
        imageUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        githubUrl: "",
        featured: false,
        order: 2
    },
    {
        title: "Vehicle Modeling",
        description: "High-detail vehicle models including cars, motorcycles, and aircraft with realistic materials and textures.",
        technologies: ["Blender", "Substance Painter", "Maya", "ZBrush"],
        imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        githubUrl: "",
        featured: false,
        order: 3
    }
];

// Sample projects for Audio & Video Production
const audioVideoProjects = [
    {
        title: "Short Film Production",
        description: "Complete short film project including pre-production, filming, and post-production. Features original screenplay and professional cinematography.",
        technologies: ["Premiere Pro", "After Effects", "Audition", "DaVinci Resolve"],
        imageUrl: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        githubUrl: "",
        featured: true,
        order: 1
    },
    {
        title: "Music Production Portfolio",
        description: "Original music compositions and sound design for various media projects. Includes orchestral, electronic, and ambient compositions.",
        technologies: ["Ableton Live", "Pro Tools", "Logic Pro", "Audition"],
        imageUrl: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        githubUrl: "",
        featured: false,
        order: 2
    },
    {
        title: "Commercial Video Production",
        description: "Professional commercial videos for brands and products. Features high-quality cinematography and post-production effects.",
        technologies: ["Premiere Pro", "After Effects", "Cinema 4D", "Audition"],
        imageUrl: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
        demoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        githubUrl: "",
        featured: false,
        order: 3
    }
];

// Function to add projects to 3D Modeling collection
async function add3DModelingProjects() {
    try {
        console.log('🎨 Adding 3D Modeling projects...');
        
        for (const project of threeDModelingProjects) {
            const projectData = {
                ...project,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const docRef = await window.db.collection('3D Modeling').add(projectData);
            console.log(`✅ Added 3D Modeling project "${project.title}" with ID: ${docRef.id}`);
        }
        
        console.log('✅ Successfully added all 3D Modeling projects!');
    } catch (error) {
        console.error('❌ Error adding 3D Modeling projects:', error);
    }
}

// Function to add projects to Audio & Video Production collection
async function addAudioVideoProjects() {
    try {
        console.log('🎬 Adding Audio & Video Production projects...');
        
        for (const project of audioVideoProjects) {
            const projectData = {
                ...project,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            
            const docRef = await window.db.collection('Audio & Video Production').add(projectData);
            console.log(`✅ Added Audio & Video project "${project.title}" with ID: ${docRef.id}`);
        }
        
        console.log('✅ Successfully added all Audio & Video Production projects!');
    } catch (error) {
        console.error('❌ Error adding Audio & Video Production projects:', error);
    }
}

// Function to add projects to both collections
async function addBothCollections() {
    try {
        console.log('🚀 Adding projects to both 3D Modeling and Audio & Video Production collections...');
        
        await add3DModelingProjects();
        await addAudioVideoProjects();
        
        console.log('🎉 Both collections have been populated successfully!');
        console.log('📊 Summary:');
        console.log(`   3D Modeling: ${threeDModelingProjects.length} projects`);
        console.log(`   Audio & Video Production: ${audioVideoProjects.length} projects`);
        
    } catch (error) {
        console.error('❌ Error adding projects to collections:', error);
    }
}

// Function to check if collections exist and have projects
async function checkCollections() {
    try {
        console.log('🔍 Checking collection status...');
        
        // Check 3D Modeling collection
        const threeDModelingSnapshot = await window.db.collection('3D Modeling').get();
        console.log(`📊 3D Modeling collection: ${threeDModelingSnapshot.size} projects`);
        
        // Check Audio & Video Production collection
        const audioVideoSnapshot = await window.db.collection('Audio & Video Production').get();
        console.log(`📊 Audio & Video Production collection: ${audioVideoSnapshot.size} projects`);
        
        if (threeDModelingSnapshot.size === 0) {
            console.log('⚠️ 3D Modeling collection is empty');
        }
        
        if (audioVideoSnapshot.size === 0) {
            console.log('⚠️ Audio & Video Production collection is empty');
        }
        
    } catch (error) {
        console.error('❌ Error checking collections:', error);
    }
}

// Make functions available globally
window.add3DModelingProjects = add3DModelingProjects;
window.addAudioVideoProjects = addAudioVideoProjects;
window.addBothCollections = addBothCollections;
window.checkCollections = checkCollections;

// Auto-run when script loads
document.addEventListener('DOMContentLoaded', async () => {
    // Wait for Firebase to be ready
    setTimeout(async () => {
        if (typeof window.db !== 'undefined') {
            console.log('🔧 Fix 3D Modeling and Audio & Video Production Collections script loaded');
            await checkCollections();
        } else {
            console.log('⏳ Waiting for Firebase to initialize...');
        }
    }, 1000);
});

console.log('🔧 Fix 3D Modeling and Audio & Video Production Collections script loaded'); 