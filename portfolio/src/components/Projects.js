import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addProject, getProjects, uploadImage } from '../services/portfolioService';
import '../styles/Projects.css';

const Projects = () => {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        liveLink: '',
        githubLink: ''
    });
    const [previewMode, setPreviewMode] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            loadProjects();
        }
    }, [currentUser]);

    const loadProjects = async () => {
        try {
            const projectsData = await getProjects(currentUser.uid);
            setProjects(projectsData);
        } catch (error) {
            setError('Error loading projects');
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadImage(file, currentUser.uid);
            setNewProject(prev => ({
                ...prev,
                image: imageUrl
            }));
        } catch (error) {
            setError('Error uploading image');
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleAddProject = async () => {
        if (!newProject.title || !newProject.description) {
            setError('Title and description are required');
            return;
        }

        try {
            const projectToAdd = {
                ...newProject,
                technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
            };
            
            const projectId = await addProject(currentUser.uid, projectToAdd);
            if (projectId) {
                setProjects(prev => [...prev, { id: projectId, ...projectToAdd }]);
                setNewProject({
                    title: '',
                    description: '',
                    image: '',
                    technologies: '',
                    liveLink: '',
                    githubLink: ''
                });
                setError('');
            }
        } catch (error) {
            setError('Error adding project');
            console.error('Error adding project:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div className="loading">Loading projects...</div>;
    }

    return (
        <section className="projects-section" id="projects">
            <h2>My Projects</h2>
            {error && <div className="error-message">{error}</div>}
            
            <div className="projects-container">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        {project.image && (
                            <img src={project.image} alt={project.title} />
                        )}
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="technologies">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        )}
                        <div className="project-links">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                    Live Demo
                                </a>
                            )}
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {currentUser && (
                <div className="add-project-section">
                    <h3>Add New Project</h3>
                    <div className="project-form">
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            value={newProject.title}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Project Description"
                            value={newProject.description}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                        {uploading && <div className="uploading">Uploading image...</div>}
                        <input
                            type="text"
                            name="technologies"
                            placeholder="Technologies (comma-separated)"
                            value={newProject.technologies}
                            onChange={handleInputChange}
                        />
                        <input
                            type="url"
                            name="liveLink"
                            placeholder="Live Demo URL"
                            value={newProject.liveLink}
                            onChange={handleInputChange}
                        />
                        <input
                            type="url"
                            name="githubLink"
                            placeholder="GitHub Repository URL"
                            value={newProject.githubLink}
                            onChange={handleInputChange}
                        />
                        <button 
                            onClick={handleAddProject}
                            disabled={uploading}
                        >
                            Add Project
                        </button>
                    </div>

                    {previewMode && (
                        <div className="preview-section">
                            <h3>Preview</h3>
                            <div className="project-card">
                                {newProject.image && (
                                    <img src={newProject.image} alt={newProject.title} />
                                )}
                                <h3>{newProject.title}</h3>
                                <p>{newProject.description}</p>
                                {newProject.technologies && (
                                    <div className="technologies">
                                        {newProject.technologies.split(',').map((tech, index) => (
                                            <span key={index} className="tech-tag">{tech.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="project-links">
                                    {newProject.liveLink && (
                                        <a href={newProject.liveLink} target="_blank" rel="noopener noreferrer">
                                            Live Demo
                                        </a>
                                    )}
                                    {newProject.githubLink && (
                                        <a href={newProject.githubLink} target="_blank" rel="noopener noreferrer">
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <button 
                        className="preview-toggle"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode ? 'Hide Preview' : 'Show Preview'}
                    </button>
                </div>
            )}
        </section>
    );
};

export default Projects; 