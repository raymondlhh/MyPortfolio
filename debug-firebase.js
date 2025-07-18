// Debug script to check Firebase connection and manually add VR Minimarket data
console.log('=== Firebase Debug Script ===');

// Check if Firebase is loaded
function checkFirebaseConnection() {
    console.log('1. Checking Firebase connection...');
    
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase is not loaded!');
        return false;
    }
    
    if (typeof firebase.firestore === 'undefined') {
        console.error('❌ Firestore is not loaded!');
        return false;
    }
    
    console.log('✅ Firebase and Firestore are loaded');
    return true;
}

// Check if our database instance is available
function checkDatabaseInstance() {
    console.log('2. Checking database instance...');
    
    if (typeof window.db === 'undefined') {
        console.error('❌ Database instance (window.db) is not available!');
        return false;
    }
    
    console.log('✅ Database instance is available');
    return true;
}

// Manual function to add VR Minimarket data
async function manuallyAddVRMinimarket() {
    console.log('3. Attempting to add VR Minimarket data...');
    
    try {
        // VR Minimarket project data
        const vrMinimarketData = {
            title: "VR Minimarket",
            description: "An immersive virtual reality minimarket experience where users can explore, interact with products, and practice shopping in a realistic 3D environment.",
            category: "VR",
            technologies: ["Unity VR", "C#", "3D Modeling"],
            imageUrl: "assets/images/VR Minimarket.gif",
            githubUrl: "https://github.com/yourusername/vr-minimarket",
            demoUrl: "https://demo-link.com",
            featured: true,
            order: 1,
            status: "completed",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        console.log('Data to be added:', vrMinimarketData);

        // Try to add to VRAR collection
        const docRef = await firebase.firestore().collection('VRAR').add(vrMinimarketData);
        console.log('✅ VR Minimarket added successfully!');
        console.log('Document ID:', docRef.id);
        
        // Verify the data was added
        const doc = await docRef.get();
        console.log('Added data:', doc.data());
        
        return docRef.id;
        
    } catch (error) {
        console.error('❌ Error adding VR Minimarket:', error);
        console.error('Error details:', error.message);
        throw error;
    }
}

// Function to load all data from VRAR collection
async function loadAllVRARData() {
    console.log('4. Loading all data from VRAR collection...');
    
    try {
        const snapshot = await firebase.firestore().collection('VRAR').get();
        console.log('Total documents in VRAR collection:', snapshot.size);
        
        if (snapshot.empty) {
            console.log('No documents found in VRAR collection');
            return [];
        }
        
        const documents = [];
        snapshot.forEach(doc => {
            console.log('Document ID:', doc.id);
            console.log('Document data:', doc.data());
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return documents;
        
    } catch (error) {
        console.error('❌ Error loading VRAR data:', error);
        throw error;
    }
}

// Main debug function
async function debugFirebase() {
    console.log('=== Starting Firebase Debug ===');
    
    // Step 1: Check Firebase connection
    const firebaseOk = checkFirebaseConnection();
    if (!firebaseOk) {
        console.error('Firebase connection failed. Please check your Firebase SDK loading.');
        return;
    }
    
    // Step 2: Check database instance
    const dbOk = checkDatabaseInstance();
    if (!dbOk) {
        console.log('Database instance not available, but Firebase is loaded. Continuing...');
    }
    
    // Step 3: Load existing data
    try {
        const existingData = await loadAllVRARData();
        console.log('Existing data loaded successfully');
    } catch (error) {
        console.error('Failed to load existing data:', error);
    }
    
    // Step 4: Try to add new data
    try {
        const newDocId = await manuallyAddVRMinimarket();
        console.log('✅ Debug completed successfully!');
        console.log('New document ID:', newDocId);
    } catch (error) {
        console.error('❌ Failed to add data:', error);
    }
}

// Make functions available globally
window.debugFirebase = debugFirebase;
window.manuallyAddVRMinimarket = manuallyAddVRMinimarket;
window.loadAllVRARData = loadAllVRARData;
window.checkFirebaseConnection = checkFirebaseConnection;

console.log('Debug functions loaded!');
console.log('Run debugFirebase() to start debugging'); 