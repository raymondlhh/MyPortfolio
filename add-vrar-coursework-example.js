// Add VR/AR Coursework Example
// This script adds a sample VR/AR coursework project to Firestore

const vrArCourseworkExample = {
    title: "VR Campus Navigation System",
    description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces. The project demonstrates spatial computing, user interface design for VR, and real-world data integration.",
    category: "VR/AR", // This matches the coursework category
    technologies: [
        "Unity VR", 
        "C#", 
        "Oculus SDK", 
        "3D Modeling", 
        "Blender", 
        "Git"
    ],
    imageUrl: "assets/images/vr-campus-navigation.gif", // You can update this with actual image
    githubUrl: "https://github.com/raymondlhh/vr-campus-navigation",
    demoUrl: "https://demo-link.com/vr-campus",
    featured: true,
    order: 1,
    status: "completed",
    grade: "A+",
    semester: "Spring 2024",
    courseCode: "DMT301",
    courseName: "Virtual and Augmented Reality Development",
    instructor: "Dr. Sarah Chen",
    projectDuration: "12 weeks",
    teamSize: "Individual Project",
    keyFeatures: [
        "Interactive 3D campus environment",
        "Real-time navigation with voice guidance",
        "Building information overlay system",
        "Multi-user collaborative features",
        "Mobile VR compatibility"
    ],
    learningOutcomes: [
        "Mastered Unity VR development workflow",
        "Implemented spatial audio and haptic feedback",
        "Designed intuitive VR user interfaces",
        "Integrated real-world data into virtual environments",
        "Optimized VR performance for mobile devices"
    ],
    challenges: [
        "Optimizing 3D models for mobile VR performance",
        "Implementing intuitive navigation controls",
        "Integrating real-time data feeds",
        "Ensuring accessibility features for all users"
    ],
    solutions: [
        "Used LOD (Level of Detail) system for model optimization",
        "Implemented gaze-based navigation with hand tracking",
        "Created modular data integration system",
        "Added voice commands and audio cues for accessibility"
    ],
    futureImprovements: [
        "Add AR mode for real-world campus overlay",
        "Implement multiplayer collaborative features",
        "Integrate with university scheduling system",
        "Add accessibility features for users with disabilities"
    ]
};

// Function to add the VR/AR coursework example
async function addVRArCourseworkExample() {
    try {
        console.log('Adding VR/AR coursework example to Firestore...');
        
        // Check if database is available
        if (!window.projectDB) {
            console.error('Project database not available. Make sure database.js is loaded.');
            return;
        }

        // Add the coursework to Firestore
        const courseworkId = await window.projectDB.addCoursework(vrArCourseworkExample);
        
        console.log('✅ VR/AR coursework example added successfully!');
        console.log('Coursework ID:', courseworkId);
        console.log('Title:', vrArCourseworkExample.title);
        console.log('Category:', vrArCourseworkExample.category);
        
        // Verify the coursework was added by loading it
        const allCourseworks = await window.projectDB.getAllCourseworks();
        const addedCoursework = allCourseworks.find(cw => cw.id === courseworkId);
        
        if (addedCoursework) {
            console.log('✅ Verification successful - coursework found in database');
            console.log('Full coursework data:', addedCoursework);
        } else {
            console.warn('⚠️ Verification failed - coursework not found in database');
        }

    } catch (error) {
        console.error('❌ Error adding VR/AR coursework example:', error);
        console.error('Error details:', error.message);
    }
}

// Function to check if the example already exists
async function checkIfExampleExists() {
    try {
        const allCourseworks = await window.projectDB.getAllCourseworks();
        const existingExample = allCourseworks.find(cw => 
            cw.title === vrArCourseworkExample.title && 
            cw.category === "VR/AR"
        );
        
        if (existingExample) {
            console.log('⚠️ VR/AR coursework example already exists with ID:', existingExample.id);
            return existingExample.id;
        } else {
            console.log('✅ No existing VR/AR coursework example found');
            return null;
        }
    } catch (error) {
        console.error('Error checking for existing example:', error);
        return null;
    }
}

// Function to load and display VR/AR courseworks
async function loadVRArCourseworks() {
    try {
        console.log('Loading VR/AR courseworks...');
        const vrArCourseworks = await window.projectDB.getCourseworksByCategory('VR/AR');
        
        console.log(`Found ${vrArCourseworks.length} VR/AR courseworks:`);
        vrArCourseworks.forEach((coursework, index) => {
            console.log(`${index + 1}. ${coursework.title} (ID: ${coursework.id})`);
            console.log(`   Grade: ${coursework.grade || 'N/A'}`);
            console.log(`   Semester: ${coursework.semester || 'N/A'}`);
        });
        
        return vrArCourseworks;
    } catch (error) {
        console.error('Error loading VR/AR courseworks:', error);
        return [];
    }
}

// Auto-execute when script loads (with a small delay to ensure Firebase is initialized)
setTimeout(async () => {
    console.log('🚀 VR/AR Coursework Example Script Loaded');
    console.log('Available functions:');
    console.log('- addVRArCourseworkExample() - Add the example coursework');
    console.log('- checkIfExampleExists() - Check if example already exists');
    console.log('- loadVRArCourseworks() - Load all VR/AR courseworks');
    
    // Check if example already exists
    const existingId = await checkIfExampleExists();
    
    if (!existingId) {
        console.log('💡 To add the example coursework, run: addVRArCourseworkExample()');
    } else {
        console.log('💡 Example already exists. To view all VR/AR courseworks, run: loadVRArCourseworks()');
    }
}, 2000);

// Make functions available globally
window.addVRArCourseworkExample = addVRArCourseworkExample;
window.checkIfExampleExists = checkIfExampleExists;
window.loadVRArCourseworks = loadVRArCourseworks; 