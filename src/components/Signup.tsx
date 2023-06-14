import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  form: { display: 'flex', flexDirection: 'column', width: '300px' },
  input: { margin: '10px 0', padding: '10px' },
  button: { padding: '10px' }
};

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isSuccess = await invoke('signup', { username, password });

    if (isSuccess) {
      history(`/home?username=${username}`);
    } else {
      alert('Signup failed.');
    }
  };

  return (
    <section>
      <div className='air air1'></div>
      <div className='air air2'></div>
      <div className='air air3'></div>
      <div className='air air4'></div>
      <div style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={{ textAlign: 'center' }}>Signup</h2>
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
            <React.Fragment>
              <input
                type="password"
                placeholder="Confirm Password"
                style={styles.input}
              />
            </React.Fragment>
            <button type="submit" style={styles.button}>
              Signup
            </button>

            <p
              style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}
            >
              Already have an account? 
              <a                 
                href="/login"
                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
