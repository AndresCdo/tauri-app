import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';

import "../App.css";

const styles: { [key: string]: React.CSSProperties } = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
    form: { display: 'flex', flexDirection: 'column', width: '300px' },
    input: { margin: '10px 0', padding: '10px' },
    button: { padding: '10px' }
};

const StartPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        navigate('/login');
    };

    return (
        <section>
            <div className='air air1'></div>
            <div className='air air2'></div>
            <div className='air air3'></div>
            <div className='air air4'></div>

            <div style={styles.container}>
                <div className='col-md-6' style={{ display: 'flex', flexDirection: 'column', width: '500px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 10px #fff', fontSize: '50px' }}>
                        Body Mass Index Calculator
                    </h2>
                    <p>
                        
                    </p>
                </div>
            </div>
        </section>
    );

}

export default StartPage;