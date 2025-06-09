import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="footer">
                <div className="footer-first">
                    <h3>Avnindra's Developer Portfolio</h3>
                </div>
                <div className="footer-second">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                    </ul>
                </div>
                <div className="footer-third">
                    <ul>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#blog">Blog</a></li>
                    </ul>
                </div>
                <div className="footer-fourth">
                    <ul>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Service</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-rights">
                Copyright © {currentYear} Avnindra's Portfolio | All rights reserved
            </div>
        </footer>
    );
};

export default Footer; 