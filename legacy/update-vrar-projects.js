// Update VRAR Projects
// This script updates existing projects and adds new ones to the VRAR collection

console.log('🔄 VRAR Projects Updater Loaded');

// Function to update the existing VR Minimarket project
async function updateVRMinimarket() {
    try {
        console.log('🔄 Updating VR Minimarket project...');
        
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
        
        // Update the project with missing fields
        const updates = {
            title: existingDoc.Name, // Add title field
            description: existingDoc.Description,
            imageUrl: existingDoc['Demo Link'], // Use demo link as cover image
            demoUrl: existingDoc['Demo Link'],
            githubUrl: existingDoc['GitHub Link'] || '',
            technologies: existingDoc.Tags || ['Unity', 'C#'], // Use Tags as technologies
            category: 'VR/AR',
            featured: true,
            order: 1,
            status: 'completed',
            grade: 'A+',
            semester: 'Fall 2023',
            courseCode: 'DMT301',
            courseName: 'Virtual and Augmented Reality Development',
            instructor: 'Dr. Sarah Chen',
            projectDuration: '8 weeks',
            teamSize: 'Individual Project',
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
        
        console.log('✅ VR Minimarket project updated successfully!');
        console.log('📝 Added fields: title, imageUrl, technologies, category, etc.');
        
        return true;
        
    } catch (error) {
        console.error('❌ Error updating VR Minimarket:', error);
        return false;
    }
}

// Function to add the new VR Campus Navigation project
async function addVRCampusNavigation() {
    try {
        console.log('🚀 Adding VR Campus Navigation project...');
        
        const vrCampusProject = {
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
            imageUrl: "https://www.youtube.com/watch?v=4JCJLuJrdzc", // Using demo link as cover
            demoUrl: "https://www.youtube.com/watch?v=4JCJLuJrdzc",
            githubUrl: "https://github.com/raymondlhh/vr-campus-navigation",
            featured: true,
            order: 2,
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
        
        // Add to VRAR collection
        const docRef = await window.db.collection('VRAR').add(vrCampusProject);
        
        console.log('✅ VR Campus Navigation project added successfully!');
        console.log('📋 Project ID:', docRef.id);
        console.log('📝 Title:', vrCampusProject.title);
        
        return docRef.id;
        
    } catch (error) {
        console.error('❌ Error adding VR Campus Navigation:', error);
        return null;
    }
}

// Function to check current VRAR projects
async function checkVRARProjects() {
    try {
        console.log('🔍 Checking VRAR projects...');
        
        const snapshot = await window.db.collection('VRAR').get();
        const projects = [];
        
        snapshot.forEach(doc => {
            const data = doc.data();
            projects.push({
                id: doc.id,
                title: data.title || data.Name,
                description: data.description || data.Description,
                technologies: data.technologies || data.Tags || []
            });
        });
        
        console.log(`📊 Found ${projects.length} VRAR projects:`);
        projects.forEach((project, index) => {
            console.log(`  ${index + 1}. ${project.title} (ID: ${project.id})`);
            console.log(`     Technologies: ${project.technologies.join(', ')}`);
        });
        
        return projects;
        
    } catch (error) {
        console.error('❌ Error checking VRAR projects:', error);
        return [];
    }
}

// Function to update all VRAR projects
async function updateAllVRARProjects() {
    try {
        console.log('🔄 Starting VRAR projects update...');
        
        // Update existing VR Minimarket
        const minimarketUpdated = await updateVRMinimarket();
        
        // Add new VR Campus Navigation
        const campusProjectId = await addVRCampusNavigation();
        
        // Check final status
        const projects = await checkVRARProjects();
        
        console.log('🎉 VRAR projects update completed!');
        console.log(`📊 Total projects: ${projects.length}`);
        
        return {
            minimarketUpdated,
            campusProjectId,
            totalProjects: projects.length
        };
        
    } catch (error) {
        console.error('❌ Error updating VRAR projects:', error);
        return null;
    }
}

// Auto-execute when script loads
setTimeout(async () => {
    console.log('🔄 VRAR Projects Updater Ready!');
    console.log('📋 Available commands:');
    console.log('  updateVRMinimarket() - Update existing VR Minimarket project');
    console.log('  addVRCampusNavigation() - Add new VR Campus Navigation project');
    console.log('  checkVRARProjects() - Check current VRAR projects');
    console.log('  updateAllVRARProjects() - Update all VRAR projects at once');
    
    // Check current status
    await checkVRARProjects();
    
    console.log('💡 To update all projects, run: updateAllVRARProjects()');
}, 1000);

// Make functions available globally
window.updateVRMinimarket = updateVRMinimarket;
window.addVRCampusNavigation = addVRCampusNavigation;
window.checkVRARProjects = checkVRARProjects;
window.updateAllVRARProjects = updateAllVRARProjects; 