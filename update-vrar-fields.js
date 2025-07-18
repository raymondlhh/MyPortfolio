// Script to update the existing VRAR document with VR Minimarket data
async function updateVRARFields() {
    try {
        console.log('=== Updating VRAR Document Fields ===');
        
        // Get the document ID from your existing document
        const documentId = 'xJ6hT6jFzbPUJthz66Wj'; // Replace with your actual document ID if different
        
        // VR Minimarket data with the correct field names
        const vrMinimarketData = {
            "Name": "VR Minimarket",
            "Description": "An immersive virtual reality minimarket experience where users can explore, interact with products, and practice shopping in a realistic 3D environment.",
            "Demo Link": "https://youtu.be/4JCJLuJrdzc?feature=shared",
            "Image": "assets/images/VR Minimarket.gif",
            "Category": "VR",
            "Technologies": ["Unity VR", "C#", "3D Modeling"],
            "Featured": true,
            "Status": "completed",
            "UpdatedAt": new Date()
        };

        console.log('Updating document with data:', vrMinimarketData);

        // Update the existing document
        await firebase.firestore().collection('VRAR').doc(documentId).update(vrMinimarketData);
        
        console.log('✅ VRAR document updated successfully!');
        
        // Verify the update
        const doc = await firebase.firestore().collection('VRAR').doc(documentId).get();
        console.log('Updated document data:', doc.data());
        
        return true;
        
    } catch (error) {
        console.error('❌ Error updating VRAR document:', error);
        console.error('Error details:', error.message);
        throw error;
    }
}

// Function to add tags to the Tags sub-collection
async function addTagsToVRAR() {
    try {
        console.log('=== Adding Tags to VRAR Document ===');
        
        const documentId = 'xJ6hT6jFzbPUJthz66Wj'; // Replace with your actual document ID if different
        
        // Tags data
        const tags = [
            { name: "Unity VR", type: "technology" },
            { name: "C#", type: "technology" },
            { name: "3D Modeling", type: "technology" },
            { name: "Virtual Reality", type: "category" },
            { name: "Immersive Experience", type: "feature" }
        ];

        console.log('Adding tags:', tags);

        // Add each tag to the Tags sub-collection
        for (const tag of tags) {
            await firebase.firestore()
                .collection('VRAR')
                .doc(documentId)
                .collection('Tags')
                .add({
                    name: tag.name,
                    type: tag.type,
                    createdAt: new Date()
                });
        }
        
        console.log('✅ Tags added successfully!');
        
        // Verify the tags were added
        const tagsSnapshot = await firebase.firestore()
            .collection('VRAR')
            .doc(documentId)
            .collection('Tags')
            .get();
            
        console.log('Total tags added:', tagsSnapshot.size);
        tagsSnapshot.forEach(doc => {
            console.log('Tag:', doc.data());
        });
        
        return true;
        
    } catch (error) {
        console.error('❌ Error adding tags:', error);
        console.error('Error details:', error.message);
        throw error;
    }
}

// Function to load and display the complete VRAR data
async function loadVRARData() {
    try {
        console.log('=== Loading Complete VRAR Data ===');
        
        const documentId = 'xJ6hT6jFzbPUJthz66Wj'; // Replace with your actual document ID if different
        
        // Get the main document
        const doc = await firebase.firestore().collection('VRAR').doc(documentId).get();
        
        if (doc.exists) {
            console.log('Main document data:', doc.data());
            
            // Get the tags sub-collection
            const tagsSnapshot = await firebase.firestore()
                .collection('VRAR')
                .doc(documentId)
                .collection('Tags')
                .get();
                
            const tags = [];
            tagsSnapshot.forEach(tagDoc => {
                tags.push({
                    id: tagDoc.id,
                    ...tagDoc.data()
                });
            });
            
            console.log('Tags:', tags);
            
            return {
                mainData: doc.data(),
                tags: tags
            };
        } else {
            console.log('Document does not exist');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Error loading VRAR data:', error);
        throw error;
    }
}

// Complete function to set up the entire VRAR document
async function setupCompleteVRAR() {
    try {
        console.log('=== Setting up Complete VRAR Document ===');
        
        // Step 1: Update the main fields
        await updateVRARFields();
        
        // Step 2: Add tags
        await addTagsToVRAR();
        
        // Step 3: Load and verify everything
        const completeData = await loadVRARData();
        
        console.log('✅ Complete VRAR setup finished!');
        console.log('Final data:', completeData);
        
        return completeData;
        
    } catch (error) {
        console.error('❌ Error in complete setup:', error);
        throw error;
    }
}

// Make functions available globally
window.updateVRARFields = updateVRARFields;
window.addTagsToVRAR = addTagsToVRAR;
window.loadVRARData = loadVRARData;
window.setupCompleteVRAR = setupCompleteVRAR;

console.log('VRAR field update functions loaded!');
console.log('Available functions:');
console.log('- updateVRARFields() - Update main document fields');
console.log('- addTagsToVRAR() - Add tags to Tags sub-collection');
console.log('- loadVRARData() - Load complete VRAR data');
console.log('- setupCompleteVRAR() - Complete setup (recommended)'); 