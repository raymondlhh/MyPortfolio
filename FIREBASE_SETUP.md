# Firebase Firestore Database Setup Guide

This guide will help you set up and use Firebase Firestore to store and manage your portfolio project data.

## 🔥 Firebase Setup

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project `my-portfolio-70502` is already created
3. Navigate to **Firestore Database** in the left sidebar
4. Click **Create Database**
5. Choose **Start in test mode** (for development)
6. Select a location closest to your users

### 2. Security Rules
Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if false; // Only allow writes from authenticated users or admin
    }
  }
}
```

## 📊 Database Collections

### Projects Collection
**Collection Name:** `projects`

**Document Structure:**
```javascript
{
  title: "VR Minimarket",
  description: "An immersive virtual reality minimarket experience...",
  category: "VR", // VR, AR, MR
  technologies: ["Unity VR", "C#", "3D Modeling"],
  imageUrl: "assets/images/VR Minimarket.gif",
  githubUrl: "https://github.com/yourusername/vr-minimarket",
  demoUrl: "https://demo-link.com",
  featured: true,
  order: 1,
  status: "completed", // completed, in-progress, planned
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Courseworks Collection
**Collection Name:** `courseworks`

**Document Structure:**
```javascript
{
  title: "VR Educational Environment",
  description: "An immersive VR learning environment...",
  category: "VR/AR", // VR/AR, Game Development, 3D Modeling, Animation, Audio & Video Production
  technologies: ["Unity VR", "C#", "Oculus SDK"],
  imageUrl: "assets/images/vr-educational.gif",
  githubUrl: "https://github.com/yourusername/vr-educational",
  demoUrl: "https://demo-link.com",
  featured: true,
  order: 1,
  status: "completed",
  grade: "A+", // Optional
  semester: "Fall 2023", // Optional
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🚀 Usage Examples

### Adding Data to Firestore

#### Method 1: Using the Browser Console
1. Open your portfolio website
2. Open browser console (F12)
3. Run the sample data function:
```javascript
addSampleData();
```

#### Method 2: Manual Addition
```javascript
// Add a new project
const newProject = {
    title: "AR Navigation App",
    description: "A mobile AR application for navigation...",
    category: "AR",
    technologies: ["Unity AR", "ARKit", "C#"],
    imageUrl: "assets/images/ar-navigation.gif",
    githubUrl: "https://github.com/yourusername/ar-navigation",
    demoUrl: "https://demo-link.com",
    featured: false,
    order: 2,
    status: "completed"
};

const projectId = await window.projectDB.addProject(newProject);
console.log('Project added with ID:', projectId);
```

### Loading Data from Firestore

```javascript
// Load all projects
const allProjects = await window.projectDB.getAllProjects();

// Load projects by category
const vrProjects = await window.projectDB.getProjectsByCategory('VR');

// Load all courseworks
const allCourseworks = await window.projectDB.getAllCourseworks();

// Load courseworks by category
const vrArCourseworks = await window.projectDB.getCourseworksByCategory('VR/AR');
```

### Updating Data

```javascript
// Update a project
await window.projectDB.updateProject('project-id', {
    title: "Updated Project Title",
    featured: true
});

// Update a coursework
await window.projectDB.updateCoursework('coursework-id', {
    grade: "A+",
    status: "completed"
});
```

### Deleting Data

```javascript
// Delete a project
await window.projectDB.deleteProject('project-id');

// Delete a coursework
await window.projectDB.deleteCoursework('coursework-id');
```

## 📝 Adding Your Projects

### Step 1: Prepare Your Project Data
Create a JavaScript object with your project information:

```javascript
const myProject = {
    title: "Your Project Title",
    description: "Detailed description of your project...",
    category: "VR", // or "AR", "MR"
    technologies: ["Unity", "C#", "3D Modeling"],
    imageUrl: "assets/images/your-project.gif",
    githubUrl: "https://github.com/yourusername/your-project",
    demoUrl: "https://your-demo-link.com",
    featured: true, // Set to true for important projects
    order: 1, // Use for custom ordering
    status: "completed" // or "in-progress", "planned"
};
```

### Step 2: Add to Database
```javascript
// Add the project to Firestore
const projectId = await window.projectDB.addProject(myProject);
console.log('Project added successfully with ID:', projectId);
```

### Step 3: Verify
```javascript
// Check if the project was added
const projects = await window.projectDB.getAllProjects();
console.log('All projects:', projects);
```

## 🔧 Integration with Your Website

The database is already integrated with your website. To display dynamic content:

1. **Load data when page loads:**
```javascript
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await window.projectDB.getAllProjects();
    // Update your HTML with the loaded data
    displayProjects(projects);
});
```

2. **Create a function to display projects:**
```javascript
function displayProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.imageUrl}" alt="${project.title}" class="project-cover">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.githubUrl}" class="project-link"><i class="fab fa-github"></i> Code</a>
                <a href="${project.demoUrl}" class="project-link"><i class="fas fa-external-link-alt"></i> Demo</a>
            </div>
        </div>
    `;
    return card;
}
```

## 🛡️ Security Considerations

1. **Production Security Rules:** Update Firestore rules for production
2. **API Key Protection:** Your API key is public (safe for client-side apps)
3. **Authentication:** Consider adding user authentication for admin features
4. **Rate Limiting:** Implement rate limiting for write operations

## 📱 Testing

1. Open your portfolio website
2. Open browser console (F12)
3. Test the database functions:
```javascript
// Test loading data
loadProjects();

// Test adding sample data
addSampleData();
```

## 🎯 Next Steps

1. Add your actual project data to Firestore
2. Update your website to load data dynamically
3. Create an admin interface for managing projects
4. Add image upload functionality
5. Implement search and filtering features

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Firebase configuration
3. Ensure Firestore is enabled in your Firebase project
4. Check your security rules

Your Firebase setup is now ready to store and manage your portfolio project data! 🚀 