import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    orderBy,
    addDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

// Portfolio Data Management
export const savePortfolioData = async (userId, data) => {
    try {
        const portfolioRef = doc(db, 'portfolios', userId);
        await setDoc(portfolioRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error saving portfolio:', error);
        return false;
    }
};

export const getPortfolioData = async (userId) => {
    try {
        const portfolioRef = doc(db, 'portfolios', userId);
        const portfolioDoc = await getDoc(portfolioRef);
        return portfolioDoc.exists() ? portfolioDoc.data() : null;
    } catch (error) {
        console.error('Error getting portfolio:', error);
        return null;
    }
};

// Project Management
export const addProject = async (userId, projectData) => {
    try {
        const projectsRef = collection(db, 'projects');
        const docRef = await addDoc(projectsRef, {
            ...projectData,
            userId,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding project:', error);
        throw error;
    }
};

export const getProjects = async (userId) => {
    try {
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting projects:', error);
        throw error;
    }
};

export const updateProject = async (projectId, projectData) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await updateDoc(projectRef, {
            ...projectData,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProject = async (projectId) => {
    try {
        const projectRef = doc(db, 'projects', projectId);
        await deleteDoc(projectRef);
        return true;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

// Image Upload
export const uploadImage = async (file, userId) => {
    try {
        const timestamp = Date.now();
        const fileName = `${userId}_${timestamp}_${file.name}`;
        const storageRef = ref(storage, `project-images/${fileName}`);
        
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

// Template Management
export const saveTemplate = async (userId, templateData) => {
    try {
        const templatesRef = collection(db, 'templates');
        const newTemplateRef = doc(templatesRef);
        await setDoc(newTemplateRef, {
            ...templateData,
            userId,
            createdAt: new Date().toISOString()
        });
        return newTemplateRef.id;
    } catch (error) {
        console.error('Error saving template:', error);
        return null;
    }
};

export const getTemplates = async (userId) => {
    try {
        const templatesRef = collection(db, 'templates');
        const q = query(
            templatesRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting templates:', error);
        return [];
    }
};

// Experience related functions
export const addExperience = async (userId, experienceData) => {
    try {
        const experiencesRef = collection(db, 'experiences');
        const docRef = await addDoc(experiencesRef, {
            ...experienceData,
            userId,
            createdAt: new Date().toISOString()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding experience:', error);
        throw error;
    }
};

export const getExperiences = async (userId) => {
    try {
        const experiencesRef = collection(db, 'experiences');
        const q = query(experiencesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting experiences:', error);
        throw error;
    }
};

export const updateExperience = async (experienceId, experienceData) => {
    try {
        const experienceRef = doc(db, 'experiences', experienceId);
        await updateDoc(experienceRef, {
            ...experienceData,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Error updating experience:', error);
        throw error;
    }
};

export const deleteExperience = async (experienceId) => {
    try {
        const experienceRef = doc(db, 'experiences', experienceId);
        await deleteDoc(experienceRef);
        return true;
    } catch (error) {
        console.error('Error deleting experience:', error);
        throw error;
    }
};

// Analytics
export const trackPortfolioView = async (portfolioId) => {
    try {
        const analyticsRef = collection(db, 'analytics');
        await setDoc(doc(analyticsRef), {
            portfolioId,
            viewedAt: new Date().toISOString(),
            type: 'view'
        });
        return true;
    } catch (error) {
        console.error('Error tracking view:', error);
        return false;
    }
}; 