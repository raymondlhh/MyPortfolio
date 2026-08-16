// Add VR/AR Project Now
// This script immediately adds a sample VR/AR coursework project

console.log('🎯 VR/AR Project Adder Loaded');

// Sample VR/AR coursework project
const vrArProject = {
    title: "VR Campus Navigation System",
    description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces. The project demonstrates spatial computing, user interface design for VR, and real-world data integration.",
    category: "VR/AR",
    technologies: [
        "Unity VR", 
        "C#", 
        "Oculus SDK", 
        "3D Modeling", 
        "Blender", 
        "Git"
    ],
    imageUrl: "assets/images/vr-campus-navigation.gif",
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
    ]
};

// Function to add the VR/AR project
async function addVRArProject() {
    try {
        console.log('🚀 Starting to add VR/AR project...');
        
        // Check if Firebase is available
        if (!window.db) {
            console.error('❌ Firebase not initialized');
            return false;
        }
        
        // Check if projectDB is available
        if (!window.projectDB) {
            console.error('❌ Project database not available');
            return false;
        }
        
        console.log('✅ Firebase and database are ready');
        
        // Add the project to courseworks collection
        const projectId = await window.projectDB.addCoursework(vrArProject);
        
        console.log('🎉 SUCCESS! VR/AR project added to database');
        console.log('📋 Project ID:', projectId);
        console.log('📝 Title:', vrArProject.title);
        console.log('🏷️ Category:', vrArProject.category);
        
        // Verify the project was added
        const allCourseworks = await window.projectDB.getAllCourseworks();
        const addedProject = allCourseworks.find(p => p.id === projectId);
        
        if (addedProject) {
            console.log('✅ Verification successful - project found in database');
            console.log('📊 Total courseworks in database:', allCourseworks.length);
            
            // Show VR/AR specific courseworks
            const vrArCourseworks = await window.projectDB.getCourseworksByCategory('VR/AR');
            console.log('🎮 VR/AR courseworks found:', vrArCourseworks.length);
            vrArCourseworks.forEach((cw, index) => {
                console.log(`  ${index + 1}. ${cw.title} (Grade: ${cw.grade})`);
            });
            
            return true;
        } else {
            console.warn('⚠️ Verification failed - project not found');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error adding VR/AR project:', error);
        console.error('Error details:', error.message);
        
        if (error.message.includes('permission')) {
            console.log('🔧 PERMISSION ERROR: You need to update your Firestore rules');
            console.log('📋 Go to Firebase Console → Firestore Database → Rules');
            console.log('📝 Replace rules with:');
            console.log(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
            `);
        }
        
        return false;
    }
}

// Function to check current database status
async function checkDatabaseStatus() {
    try {
        console.log('🔍 Checking database status...');
        
        const allCourseworks = await window.projectDB.getAllCourseworks();
        console.log(`📊 Total courseworks in database: ${allCourseworks.length}`);
        
        const vrArCourseworks = await window.projectDB.getCourseworksByCategory('VR/AR');
        console.log(`🎮 VR/AR courseworks: ${vrArCourseworks.length}`);
        
        if (vrArCourseworks.length > 0) {
            console.log('📋 Current VR/AR projects:');
            vrArCourseworks.forEach((cw, index) => {
                console.log(`  ${index + 1}. ${cw.title} (ID: ${cw.id})`);
            });
        } else {
            console.log('📭 No VR/AR projects found');
        }
        
        return vrArCourseworks.length;
    } catch (error) {
        console.error('❌ Error checking database:', error);
        return 0;
    }
}

// Auto-execute when script loads
setTimeout(async () => {
    console.log('🎯 VR/AR Project Adder Ready!');
    console.log('📋 Available commands:');
    console.log('  addVRArProject() - Add the VR/AR project');
    console.log('  checkDatabaseStatus() - Check current database status');
    
    // Check current status
    await checkDatabaseStatus();
    
    console.log('💡 To add the VR/AR project, run: addVRArProject()');
}, 1000);

// Make functions available globally
window.addVRArProject = addVRArProject;
window.checkDatabaseStatus = checkDatabaseStatus; 