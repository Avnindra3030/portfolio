import React from 'react';
import '../styles/Experience.css';

const Experience = () => {
    const experiences = [
        {
            title: 'HTML Developer',
            period: '2024-2025',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil delectus, hic rem quaerat vel neque veritatis beatae, culpa soluta, exercitationem consectetur quasi totam.'
        },
        {
            title: 'Node.js Developer',
            period: '2024-2025',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil delectus, hic rem quaerat vel neque veritatis beatae, culpa soluta, exercitationem consectetur quasi totam.'
        },
        {
            title: 'Full Stack Developer',
            period: '2024-2025',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil delectus, hic rem quaerat vel neque veritatis beatae, culpa soluta, exercitationem consectetur quasi totam.'
        },
        {
            title: 'React Developer',
            period: '2024-2025',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil delectus, hic rem quaerat vel neque veritatis beatae, culpa soluta, exercitationem consectetur quasi totam.'
        }
    ];

    return (
        <section className="secondsection" id="experience">
            <span className="text-gray">What I have done so far</span>
            <h1>Work Experience</h1>
            <div className="box">
                {experiences.map((exp, index) => (
                    <div className="vertical" key={index}>
                        <img className="image-top" src="/bg.png" alt="developer" />
                        <div className="vertical-title">
                            {exp.title} ({exp.period})
                        </div>
                        <div className="vertical-desc">
                            {exp.description}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience; 