// Add Sample XR Projects
// This script adds sample VR, AR, and MR projects to the database

console.log('🎮 Adding Sample XR Projects...');

// Sample VR Project
const sampleVRProject = {
    title: "VR Campus Navigation System",
    description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces.",
    category: "VR",
    technologies: ["Unity VR", "C#", "Oculus SDK", "3D Modeling", "Blender"],
    imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    githubUrl: "https://github.com/raymondlhh/vr-campus-navigation",
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    order: 1,
    status: "completed",
    tags: ["Virtual Reality", "Navigation", "Education", "Unity"]
};

// Sample AR Project
const sampleARProject = {
    title: "AR Furniture Placement App",
    description: "An augmented reality application that allows users to visualize furniture in their real environment before purchasing. Users can place virtual furniture items in their space and see how they look and fit.",
    category: "AR",
    technologies: ["ARKit", "Swift", "iOS", "3D Modeling", "Unity AR"],
    imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    githubUrl: "https://github.com/raymondlhh/ar-furniture-app",
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    order: 1,
    status: "completed",
    tags: ["Augmented Reality", "Furniture", "iOS", "ARKit"]
};

// Sample MR Project
const sampleMRProject = {
    title: "Mixed Reality Training Simulator",
    description: "A mixed reality application for training medical professionals. Users can interact with virtual medical equipment and patients in a real environment, providing hands-on training experience.",
    category: "MR",
    technologies: ["HoloLens", "Unity MR", "C#", "Azure Spatial Anchors", "3D Modeling"],
    imageUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    githubUrl: "https://github.com/raymondlhh/mr-medical-training",
    demoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    order: 1,
    status: "completed",
    tags: ["Mixed Reality", "Medical", "Training", "HoloLens"]
};

// Function to add sample XR projects
async function addSampleXRProjects() {
    try {
        console.log('🚀 Starting to add sample XR projects...');
        
        // Check if Firebase is available
        if (!window.db) {
            console.error('❌ Firebase not initialized');
            return false;
        }
        
        console.log('✅ Firebase is ready');
        
        // Add VR project
        console.log('📱 Adding VR project...');
        const vrDocRef = await window.db.collection('VR').add({
            ...sampleVRProject,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ VR project added with ID:', vrDocRef.id);
        
        // Add AR project
        console.log('📱 Adding AR project...');
        const arDocRef = await window.db.collection('AR').add({
            ...sampleARProject,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ AR project added with ID:', arDocRef.id);
        
        // Add MR project
        console.log('📱 Adding MR project...');
        const mrDocRef = await window.db.collection('MR').add({
            ...sampleMRProject,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ MR project added with ID:', mrDocRef.id);
        
        console.log('🎉 SUCCESS! All sample XR projects added to database');
        
        // Verify the projects were added
        const vrSnapshot = await window.db.collection('VR').get();
        const arSnapshot = await window.db.collection('AR').get();
        const mrSnapshot = await window.db.collection('MR').get();
        
        console.log('📊 Verification results:');
        console.log(`  VR projects: ${vrSnapshot.size}`);
        console.log(`  AR projects: ${arSnapshot.size}`);
        console.log(`  MR projects: ${mrSnapshot.size}`);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error adding sample XR projects:', error);
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

// Function to check current XR projects status
async function checkXRProjectsStatus() {
    try {
        console.log('🔍 Checking XR projects status...');
        
        const vrSnapshot = await window.db.collection('VR').get();
        const arSnapshot = await window.db.collection('AR').get();
        const mrSnapshot = await window.db.collection('MR').get();
        
        console.log(`📊 Current XR projects:`);
        console.log(`  VR projects: ${vrSnapshot.size}`);
        console.log(`  AR projects: ${arSnapshot.size}`);
        console.log(`  MR projects: ${mrSnapshot.size}`);
        
        if (vrSnapshot.size > 0) {
            console.log('📋 VR projects:');
            vrSnapshot.forEach(doc => {
                console.log(`  - ${doc.data().title} (ID: ${doc.id})`);
            });
        }
        
        if (arSnapshot.size > 0) {
            console.log('📋 AR projects:');
            arSnapshot.forEach(doc => {
                console.log(`  - ${doc.data().title} (ID: ${doc.id})`);
            });
        }
        
        if (mrSnapshot.size > 0) {
            console.log('📋 MR projects:');
            mrSnapshot.forEach(doc => {
                console.log(`  - ${doc.data().title} (ID: ${doc.id})`);
            });
        }
        
        return {
            vr: vrSnapshot.size,
            ar: arSnapshot.size,
            mr: mrSnapshot.size
        };
    } catch (error) {
        console.error('❌ Error checking XR projects status:', error);
        return { vr: 0, ar: 0, mr: 0 };
    }
}

// Auto-execute when script loads
setTimeout(async () => {
    console.log('🎮 Sample XR Projects Adder Ready!');
    console.log('📋 Available commands:');
    console.log('  addSampleXRProjects() - Add sample VR, AR, and MR projects');
    console.log('  checkXRProjectsStatus() - Check current XR projects status');
    
    // Check current status
    await checkXRProjectsStatus();
    
    console.log('💡 To add sample XR projects, run: addSampleXRProjects()');
}, 1000);

// Make functions available globally
window.addSampleXRProjects = addSampleXRProjects;
window.checkXRProjectsStatus = checkXRProjectsStatus; 