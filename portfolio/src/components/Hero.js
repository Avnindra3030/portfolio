import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../styles/Hero.css';

const Hero = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Software Engineer', 'Cybersecurity Student'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="hero" id="home">
            <div className="firstSection">
                <div className="leftSection">
                    <h1>Hi, I am <span className="purple">Avnindra</span></h1>
                    <div>I am a <span ref={el}></span></div>
                    <div className="buttons">
                        <button className="btn">Download Resume</button>
                        <button className="btn">Visit GitHub</button>
                    </div>
                </div>
                <div className="rightSection">
                    <img src="/bg.png" alt="avnindra" />
                </div>
            </div>
        </section>
    );
};

export default Hero; 