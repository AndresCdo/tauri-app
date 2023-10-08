// Footer/Footer.tsx

import React from 'react';
import './Footer.css';


const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <p className="footer-text">© {year} BMI Calculator. All rights reserved.</p>
        </footer>
    );
};

export default Footer;