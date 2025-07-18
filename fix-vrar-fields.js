// Fix VRAR Fields
// This script fixes the field structure to match the expected format

console.log('🔧 VRAR Fields Fixer Loaded');

// Function to fix the VR Minimarket project fields
async function fixVRMinimarketFields() {
    try {
        console.log('🔧 Fixing VR Minimarket project fields...');
        
        // Get the existing document
        const snapshot = await window.db.collection('VRAR').get();
        let existingDoc = null;
        
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.Name === 'VR Minimarket') {
                existingDoc = { id: doc.id, ...data };
            }
        });
        
        if (!existingDoc) {
            console.log('❌ VR Minimarket project not found');
            return false;
        }
        
        console.log('📋 Found existing project:', existingDoc.id);
        console.log('📝 Current fields:', Object.keys(existingDoc));
        
        // Fix the fields to match the expected format
        const updates = {
            // Keep existing fields but fix the Image field
            Image: existingDoc['Demo Link'], // Use demo link as cover image
            Technologies: existingDoc.Technologies || ['Unity', 'C#'], // Ensure technologies array
            Name: existingDoc.Name,
            Description: existingDoc.Description,
            'Demo Link': existingDoc['Demo Link'],
            'GitHub Link': existingDoc['GitHub Link'] || '',
            Duration: existingDoc.Duration || '8 weeks',
            'Team Size': existingDoc['Team Size'] || '1',
            
            // Add missing fields that the portfolio expects
            title: existingDoc.Name, // Add title field for compatibility
            description: existingDoc.Description,
            imageUrl: existingDoc['Demo Link'], // Use demo link as cover
            demoUrl: existingDoc['Demo Link'],
            githubUrl: existingDoc['GitHub Link'] || '',
            technologies: existingDoc.Technologies || ['Unity', 'C#'],
            category: 'VR/AR',
            featured: true,
            order: 1,
            status: 'completed',
            grade: 'A+',
            semester: 'Fall 2023',
            courseCode: 'DMT301',
            courseName: 'Virtual and Augmented Reality Development',
            instructor: 'Dr. Sarah Chen',
            projectDuration: existingDoc.Duration || '8 weeks',
            teamSize: existingDoc['Team Size'] || '1',
            keyFeatures: [
                'Interactive 3D minimarket environment',
                'Product selection and purchase simulation',
                'Realistic shopping experience',
                'Inventory management system',
                'User-friendly VR controls'
            ],
            learningOutcomes: [
                'Mastered Unity VR development',
                'Implemented interactive 3D environments',
                'Designed user-friendly VR interfaces',
                'Integrated product management systems',
                'Optimized VR performance'
            ]
        };
        
        // Update the document
        await window.db.collection('VRAR').doc(existingDoc.id).update(updates);
        
        console.log('✅ VR Minimarket project fields fixed successfully!');
        console.log('📝 Updated Image field to use demo link as cover');
        console.log('📝 Ensured Technologies field is properly formatted');
        console.log('📝 Added all missing fields for portfolio compatibility');
        
        return true;
        
    } catch (error) {
        console.error('❌ Error fixing VR Minimarket fields:', error);
        return false;
    }
}

// Function to add the VR Campus Navigation project with correct field structure
async function addVRCampusNavigationCorrect() {
    try {
        console.log('🚀 Adding VR Campus Navigation project with correct fields...');
        
        const vrCampusProject = {
            // Original field names (as shown in screenshot)
            Name: "VR Campus Navigation System",
            Description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces.",
            Image: "https://www.youtube.com/watch?v=4JCJLuJrdzc", // Demo link as cover
            'Demo Link': "https://www.youtube.com/watch?v=4JCJLuJrdzc",
            'GitHub Link': "https://github.com/raymondlhh/vr-campus-navigation",
            Technologies: ["Unity VR", "C#", "Oculus SDK", "3D Modeling", "Blender", "Git"],
            Duration: "12 weeks",
            'Team Size': "1",
            
            // Additional fields for portfolio compatibility
            title: "VR Campus Navigation System",
            description: "An immersive virtual reality application that allows users to navigate through a 3D replica of the university campus. Users can explore buildings, find classrooms, and access real-time information about facilities through interactive VR interfaces.",
            imageUrl: "https://www.youtube.com/watch?v=4JCJLuJrdzc",
            demoUrl: "https://www.youtube.com/watch?v=4JCJLuJrdzc",
            githubUrl: "https://github.com/raymondlhh/vr-campus-navigation",
            technologies: ["Unity VR", "C#", "Oculus SDK", "3D Modeling", "Blender", "Git"],
            category: "VR/AR",
            featured: true,
            order: 2,
            status: "completed",
            grade: "A+",
            semester: "Spring 2024",
            courseCode: "DMT301",
            courseName: "Virtual and Augmented Reality Development",
            instructor: "Dr. Sarah Chen",
            projectDuration: "12 weeks",
            teamSize: "1",
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
        
        // Add to VRAR collection
        const docRef = await window.db.collection('VRAR').add(vrCampusProject);
        
        console.log('✅ VR Campus Navigation project added successfully!');
        console.log('📋 Project ID:', docRef.id);
        console.log('📝 Title:', vrCampusProject.Name);
        console.log('🖼️ Image field set to demo link');
        
        return docRef.id;
        
    } catch (error) {
        console.error('❌ Error adding VR Campus Navigation:', error);
        return null;
    }
}

// Function to check and display current field structure
async function checkFieldStructure() {
    try {
        console.log('🔍 Checking current field structure...');
        
        const snapshot = await window.db.collection('VRAR').get();
        const projects = [];
        
        snapshot.forEach(doc => {
            const data = doc.data();
            projects.push({
                id: doc.id,
                fields: Object.keys(data),
                data: data
            });
        });
        
        console.log(`📊 Found ${projects.length} VRAR projects:`);
        projects.forEach((project, index) => {
            console.log(`  ${index + 1}. Project ID: ${project.id}`);
            console.log(`     Fields: ${project.fields.join(', ')}`);
            console.log(`     Name: ${project.data.Name || 'N/A'}`);
            console.log(`     Image: ${project.data.Image || 'N/A'}`);
            console.log(`     Technologies: ${JSON.stringify(project.data.Technologies || project.data.technologies || [])}`);
        });
        
        return projects;
        
    } catch (error) {
        console.error('❌ Error checking field structure:', error);
        return [];
    }
}

// Function to fix all VRAR projects
async function fixAllVRARProjects() {
    try {
        console.log('🔧 Starting VRAR projects field fix...');
        
        // Fix existing VR Minimarket
        const minimarketFixed = await fixVRMinimarketFields();
        
        // Add new VR Campus Navigation
        const campusProjectId = await addVRCampusNavigationCorrect();
        
        // Check final structure
        const projects = await checkFieldStructure();
        
        console.log('🎉 VRAR projects field fix completed!');
        console.log(`📊 Total projects: ${projects.length}`);
        
        return {
            minimarketFixed,
            campusProjectId,
            totalProjects: projects.length
        };
        
    } catch (error) {
        console.error('❌ Error fixing VRAR projects:', error);
        return null;
    }
}

// Auto-execute when script loads
setTimeout(async () => {
    console.log('🔧 VRAR Fields Fixer Ready!');
    console.log('📋 Available commands:');
    console.log('  fixVRMinimarketFields() - Fix existing VR Minimarket fields');
    console.log('  addVRCampusNavigationCorrect() - Add new project with correct fields');
    console.log('  checkFieldStructure() - Check current field structure');
    console.log('  fixAllVRARProjects() - Fix all VRAR projects at once');
    
    // Check current structure
    await checkFieldStructure();
    
    console.log('💡 To fix all projects, run: fixAllVRARProjects()');
}, 1000);

// Make functions available globally
window.fixVRMinimarketFields = fixVRMinimarketFields;
window.addVRCampusNavigationCorrect = addVRCampusNavigationCorrect;
window.checkFieldStructure = checkFieldStructure;
window.fixAllVRARProjects = fixAllVRARProjects; 