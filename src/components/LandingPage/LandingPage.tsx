import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { emit, listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'

import "../../App.css";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };
    
    return (
        <div className="start-page">
            {/* <Header title="Body Mass Index Calculator" /> */}

            <main className="content">
                <section>
                    <div className='air air1'></div>
                    <div className='air air2'></div>
                    <div className='air air3'></div>
                    <div className='air air4'></div>
                    <div className='container'>
                        <div className='inner-container'>
                            <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '10px', color: 'white', textShadow: '0 0 10px #fff', fontSize: '50px' }}>
                                BMI Calculator
                            </h2>
                            <p className="intro-text" style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 10px #fff', fontSize: '20px' }}>
                                Find out your Body Mass Index (BMI) and understand what it means for your health.
                            </p>
                            <button className="get-started-button" onClick={handleGetStarted}>
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default LandingPage;
