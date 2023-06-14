import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
    form: { display: 'flex', flexDirection: 'column', width: '300px' },
    input: { margin: '10px 0', padding: '10px' },
    button: { padding: '10px' }
};

const LogoutPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const location = useLocation();

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const isSuccess = await invoke('logout', { username, password });

        if (isSuccess) {
            history(`/home?username=${username}`);
        } else {
            alert('Logout failed.');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setUsername(params.get('username') || '');
    }, [location.search]);

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={{ textAlign: 'center' }}>Logout</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange(setUsername)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange(setPassword)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Logout
        </button>
            </form>
        </div>
    );
}

export default LogoutPage;