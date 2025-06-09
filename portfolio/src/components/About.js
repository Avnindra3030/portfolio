import React, { useState } from 'react';
import '../styles/About.css';

const About = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [aboutContent, setAboutContent] = useState({
        title: 'About Me',
        description: 'I am a passionate web developer with expertise in React, Node.js, and modern web technologies. I love creating beautiful and functional web applications.',
        skills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'MongoDB'],
        education: [
            {
                degree: 'Bachelor of Technology',
                school: 'Your University',
                year: '2020-2024'
            }
        ]
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to a backend
        localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAboutContent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                {isEditing ? (
                    <div className="edit-form">
                        <input
                            type="text"
                            name="title"
                            value={aboutContent.title}
                            onChange={handleChange}
                            className="edit-input"
                        />
                        <textarea
                            name="description"
                            value={aboutContent.description}
                            onChange={handleChange}
                            className="edit-textarea"
                        />
                        <button onClick={handleSave} className="save-button">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="about-content">
                        <h2>{aboutContent.title}</h2>
                        <p>{aboutContent.description}</p>
                        <div className="skills-section">
                            <h3>Skills</h3>
                            <div className="skills-grid">
                                {aboutContent.skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="education-section">
                            <h3>Education</h3>
                            {aboutContent.education.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <h4>{edu.degree}</h4>
                                    <p>{edu.school}</p>
                                    <p>{edu.year}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleEdit} className="edit-button">
                            Edit Content
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About; 