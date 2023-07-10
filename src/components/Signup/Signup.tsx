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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };


  const handlePasswordConfirmChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setErrorMessage("Passwords do not match.");
      setIsError(true);
    } else {
      setErrorMessage("");
      setIsError(false);
    }
  };

  const checkUsername = (username: string) => {
    if (username.length > 12) {
      setErrorMessage("Username must be less than 12 characters.");
      setIsError(true);
    } else if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters.");
      setIsError(true);
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setErrorMessage("Username must be alphanumeric.");
      setIsError(true);
    } else {
      setErrorMessage("");
      setIsError(false);
    }
  };

  const checkPassword = (password: string) => {
    if (password.length > 12) {
      setErrorMessage("Password must be less than 12 characters.");
      setIsError(true);
    } else if (password.length < 3) {
      setErrorMessage("Password must be at least 3 characters.");
      setIsError(true);
    } else if (password.toString().includes(" ")) {
      setErrorMessage("Password must not contain spaces.");
      setIsError(true);
    } else if (password.toString().includes(username)) {
      setErrorMessage("Password must not contain username.");
      setIsError(true);
    } else if (password.toString().includes("password")) {
      setErrorMessage("Password must not contain 'password'.");
      setIsError(true);
    } else if (!/^[a-zA-Z0-9]+$/.test(password.toString())) {
      setErrorMessage("Password must be alphanumeric.");
      setIsError(true);
    } else if (password.toString().toLowerCase() === password.toString()) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      setIsError(true);
    } else if (password.toString().toUpperCase() === password.toString()) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      setIsError(true);
    } else if (!/\d/.test(password.toString())) {
      setErrorMessage("Password must contain at least one number.");
      setIsError(true);
    } else {
      setErrorMessage("");
      setIsError(false);
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    checkPassword(password);
    checkUsername(username);
    if (isError) {
      return;
    } else {
      const isSuccess = await invoke('signup', { username, password });
      if (isSuccess) {
        history(`/home?username=${username}`);
      } else {
        setErrorMessage('Signup failed.');
      }
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
              onChange={handleUsernameChange}
              style={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={styles.input}
              required
            />
            <React.Fragment>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handlePasswordConfirmChange}
                style={styles.input}
                required
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
            <div style={{ color: 'red' }}>{errorMessage}</div>
          </form>
          
        </div>
        
      </div>
      
    </section>
    
  );
};

export default SignupPage;
