// Firebase Setup Helper
// This script helps you configure Firebase properly for your portfolio

console.log('🔧 Firebase Setup Helper Loaded');

// Function to test Firebase connection
async function testFirebaseConnection() {
    try {
        console.log('Testing Firebase connection...');
        
        // Test basic connection
        const testDoc = await window.db.collection('test').doc('connection-test').get();
        console.log('✅ Firebase connection successful');
        
        // Test write permission
        await window.db.collection('test').doc('write-test').set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: 'Test write operation'
        });
        console.log('✅ Write permission successful');
        
        // Clean up test data
        await window.db.collection('test').doc('write-test').delete();
        console.log('✅ Delete permission successful');
        
        return true;
    } catch (error) {
        console.error('❌ Firebase connection failed:', error.message);
        
        if (error.message.includes('permission')) {
            console.log('🔧 This is a permissions issue. You need to update your Firestore security rules.');
            console.log('📋 Go to Firebase Console → Firestore Database → Rules and update them to:');
            console.log(`
// Firestore Security Rules for Portfolio
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (for portfolio demo)
    // In production, you should implement proper authentication
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

// Function to initialize collections
async function initializeCollections() {
    try {
        console.log('Initializing Firestore collections...');
        
        // Create projects collection with a test document
        await window.db.collection('projects').doc('test-project').set({
            title: 'Test Project',
            description: 'This is a test project to verify collection creation',
            category: 'VR',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Create courseworks collection with a test document
        await window.db.collection('courseworks').doc('test-coursework').set({
            title: 'Test Coursework',
            description: 'This is a test coursework to verify collection creation',
            category: 'VR/AR',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log('✅ Collections initialized successfully');
        
        // Clean up test documents
        await window.db.collection('projects').doc('test-project').delete();
        await window.db.collection('courseworks').doc('test-coursework').delete();
        
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize collections:', error.message);
        return false;
    }
}

// Function to add the VR/AR coursework example with proper error handling
async function addVRArCourseworkExampleWithRetry() {
    try {
        console.log('🔄 Attempting to add VR/AR coursework example...');
        
        // First test the connection
        const connectionOk = await testFirebaseConnection();
        if (!connectionOk) {
            console.log('❌ Cannot proceed due to Firebase connection issues');
            return false;
        }
        
        // Initialize collections if needed
        await initializeCollections();
        
        // Now add the coursework example
        const vrArCourseworkExample = {
            title: "VR Campus Navigation System",
            description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces.",
            category: "VR/AR",
            technologies: ["Unity VR", "C#", "Oculus SDK", "3D Modeling", "Blender", "Git"],
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
            teamSize: "Individual Project"
        };
        
        const courseworkId = await window.projectDB.addCoursework(vrArCourseworkExample);
        console.log('✅ VR/AR coursework example added successfully!');
        console.log('Coursework ID:', courseworkId);
        
        return true;
    } catch (error) {
        console.error('❌ Failed to add coursework example:', error.message);
        return false;
    }
}

// Auto-run setup check
setTimeout(async () => {
    console.log('🔍 Running Firebase setup check...');
    await testFirebaseConnection();
}, 1000);

// Make functions available globally
window.testFirebaseConnection = testFirebaseConnection;
window.initializeCollections = initializeCollections;
window.addVRArCourseworkExampleWithRetry = addVRArCourseworkExampleWithRetry; 