import html2pdf from 'html2pdf.js';

export const exportToPDF = async (elementId) => {
    const element = document.getElementById(elementId);
    const opt = {
        margin: 1,
        filename: 'portfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        return false;
    }
};

export const generateShareableURL = (portfolioData) => {
    const baseUrl = window.location.origin;
    const queryParams = new URLSearchParams();
    
    // Add portfolio data to URL parameters
    Object.entries(portfolioData).forEach(([key, value]) => {
        if (typeof value === 'object') {
            queryParams.append(key, JSON.stringify(value));
        } else {
            queryParams.append(key, value);
        }
    });

    return `${baseUrl}/share?${queryParams.toString()}`;
};

export const saveTemplate = (templateData) => {
    try {
        const templates = JSON.parse(localStorage.getItem('portfolioTemplates') || '[]');
        templates.push({
            id: Date.now(),
            ...templateData,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('portfolioTemplates', JSON.stringify(templates));
        return true;
    } catch (error) {
        console.error('Error saving template:', error);
        return false;
    }
};

export const loadTemplate = (templateId) => {
    try {
        const templates = JSON.parse(localStorage.getItem('portfolioTemplates') || '[]');
        return templates.find(template => template.id === templateId);
    } catch (error) {
        console.error('Error loading template:', error);
        return null;
    }
};

export const getAllTemplates = () => {
    try {
        return JSON.parse(localStorage.getItem('portfolioTemplates') || '[]');
    } catch (error) {
        console.error('Error loading templates:', error);
        return [];
    }
}; 