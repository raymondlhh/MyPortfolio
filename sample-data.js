// Sample data structure for projects and courseworks
// This file shows the expected data format for Firestore collections

// Sample Project Data Structure
const sampleProject = {
    title: "VR Minimarket",
    description: "An immersive virtual reality minimarket experience where users can explore, interact with products, and practice shopping in a realistic 3D environment.",
    category: "VR", // VR, AR, MR
    technologies: ["Unity VR", "C#", "3D Modeling"],
    imageUrl: "assets/images/VR Minimarket.gif",
    githubUrl: "https://github.com/yourusername/vr-minimarket",
    demoUrl: "https://demo-link.com",
    featured: true, // For highlighting important projects
    order: 1, // For custom ordering
    status: "completed", // completed, in-progress, planned
    createdAt: null, // Will be set by Firestore
    updatedAt: null // Will be set by Firestore
};

// Sample Coursework Data Structure
const sampleCoursework = {
    title: "VR Educational Environment",
    description: "An immersive VR learning environment for STEM education, featuring interactive 3D models, virtual laboratories, and collaborative learning spaces for students.",
    category: "VR/AR", // VR/AR, Game Development, 3D Modeling, Animation, Audio & Video Production
    technologies: ["Unity VR", "C#", "Oculus SDK"],
    imageUrl: "assets/images/vr-educational.gif",
    githubUrl: "https://github.com/yourusername/vr-educational",
    demoUrl: "https://demo-link.com",
    featured: true,
    order: 1,
    status: "completed",
    grade: "A+", // Optional grade information
    semester: "Fall 2023", // Optional semester information
    createdAt: null,
    updatedAt: null
};

// Example of how to add data to Firestore
async function addSampleData() {
    try {
        // Add sample project
        const projectId = await window.projectDB.addProject(sampleProject);
        console.log('Project added with ID:', projectId);

        // Add sample coursework
        const courseworkId = await window.projectDB.addCoursework(sampleCoursework);
        console.log('Coursework added with ID:', courseworkId);

    } catch (error) {
        console.error('Error adding sample data:', error);
    }
}

// Example of how to load and display projects
async function loadProjects() {
    try {
        // Load all projects
        const allProjects = await window.projectDB.getAllProjects();
        console.log('All projects:', allProjects);

        // Load projects by category
        const vrProjects = await window.projectDB.getProjectsByCategory('VR');
        console.log('VR projects:', vrProjects);

        // Load all courseworks
        const allCourseworks = await window.projectDB.getAllCourseworks();
        console.log('All courseworks:', allCourseworks);

        // Load courseworks by category
        const vrArCourseworks = await window.projectDB.getCourseworksByCategory('VR/AR');
        console.log('VR/AR courseworks:', vrArCourseworks);

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Make functions available globally
window.addSampleData = addSampleData;
window.loadProjects = loadProjects; 