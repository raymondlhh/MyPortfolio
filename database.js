// Database service for Firestore operations
class ProjectDatabase {
    constructor() {
        this.db = window.db;
        this.projectsCollection = 'projects';
        this.courseworksCollection = 'courseworks';
    }

    // Get all projects
    async getAllProjects() {
        try {
            const snapshot = await this.db.collection(this.projectsCollection).get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting projects:', error);
            return [];
        }
    }

    // Get projects by category (VR, AR, MR)
    async getProjectsByCategory(category) {
        try {
            const snapshot = await this.db
                .collection(this.projectsCollection)
                .where('category', '==', category)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error(`Error getting ${category} projects:`, error);
            return [];
        }
    }

    // Get all courseworks
    async getAllCourseworks() {
        try {
            const snapshot = await this.db.collection(this.courseworksCollection).get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting courseworks:', error);
            return [];
        }
    }

    // Get courseworks by category
    async getCourseworksByCategory(category) {
        try {
            const snapshot = await this.db
                .collection(this.courseworksCollection)
                .where('category', '==', category)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error(`Error getting ${category} courseworks:`, error);
            return [];
        }
    }

    // Add a new project
    async addProject(projectData) {
        try {
            const docRef = await this.db.collection(this.projectsCollection).add({
                ...projectData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    }

    // Add a new coursework
    async addCoursework(courseworkData) {
        try {
            const docRef = await this.db.collection(this.courseworksCollection).add({
                ...courseworkData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error adding coursework:', error);
            throw error;
        }
    }

    // Update a project
    async updateProject(projectId, updateData) {
        try {
            await this.db.collection(this.projectsCollection).doc(projectId).update({
                ...updateData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }

    // Update a coursework
    async updateCoursework(courseworkId, updateData) {
        try {
            await this.db.collection(this.courseworksCollection).doc(courseworkId).update({
                ...updateData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating coursework:', error);
            throw error;
        }
    }

    // Delete a project
    async deleteProject(projectId) {
        try {
            await this.db.collection(this.projectsCollection).doc(projectId).delete();
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }

    // Delete a coursework
    async deleteCoursework(courseworkId) {
        try {
            await this.db.collection(this.courseworksCollection).doc(courseworkId).delete();
        } catch (error) {
            console.error('Error deleting coursework:', error);
            throw error;
        }
    }
}

// Create global instance
window.projectDB = new ProjectDatabase(); 