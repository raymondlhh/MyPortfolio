// Script to add VR Minimarket project to Firestore VRAR collection
async function addVRMinimarketToDatabase() {
    try {
        // VR Minimarket project data
        const vrMinimarketProject = {
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
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Add to the VRAR collection
        const docRef = await window.db.collection('VRAR').add(vrMinimarketProject);
        console.log('VR Minimarket project added successfully with ID:', docRef.id);
        
        // Verify the data was added
        const doc = await docRef.get();
        console.log('Added project data:', doc.data());
        
        return docRef.id;
    } catch (error) {
        console.error('Error adding VR Minimarket project:', error);
        throw error;
    }
}

// Function to load VR Minimarket from database
async function loadVRMinimarketFromDatabase() {
    try {
        const snapshot = await window.db.collection('VRAR').get();
        const projects = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log('All projects in VRAR collection:', projects);
        
        // Find VR Minimarket project
        const vrMinimarket = projects.find(project => project.title === "VR Minimarket");
        if (vrMinimarket) {
            console.log('VR Minimarket project found:', vrMinimarket);
            return vrMinimarket;
        } else {
            console.log('VR Minimarket project not found in database');
            return null;
        }
    } catch (error) {
        console.error('Error loading VR Minimarket project:', error);
        return null;
    }
}

// Function to update VR Minimarket project
async function updateVRMinimarketProject(projectId, updateData) {
    try {
        await window.db.collection('VRAR').doc(projectId).update({
            ...updateData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('VR Minimarket project updated successfully');
    } catch (error) {
        console.error('Error updating VR Minimarket project:', error);
        throw error;
    }
}

// Function to delete VR Minimarket project
async function deleteVRMinimarketProject(projectId) {
    try {
        await window.db.collection('VRAR').doc(projectId).delete();
        console.log('VR Minimarket project deleted successfully');
    } catch (error) {
        console.error('Error deleting VR Minimarket project:', error);
        throw error;
    }
}

// Make functions available globally
window.addVRMinimarketToDatabase = addVRMinimarketToDatabase;
window.loadVRMinimarketFromDatabase = loadVRMinimarketFromDatabase;
window.updateVRMinimarketProject = updateVRMinimarketProject;
window.deleteVRMinimarketProject = deleteVRMinimarketProject;

console.log('VR Minimarket database functions loaded successfully!');
console.log('Available functions:');
console.log('- addVRMinimarketToDatabase() - Add VR Minimarket to database');
console.log('- loadVRMinimarketFromDatabase() - Load VR Minimarket from database');
console.log('- updateVRMinimarketProject(projectId, updateData) - Update VR Minimarket');
console.log('- deleteVRMinimarketProject(projectId) - Delete VR Minimarket'); 