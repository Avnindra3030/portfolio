import React from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ isDark, toggleTheme }) => {
    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '🌞' : '🌙'}
        </button>
    );
};

export default ThemeToggle; 
 