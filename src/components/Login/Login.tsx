import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";

import "../../App.css"

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  form: { display: 'flex', flexDirection: 'column', width: '300px' },
  input: { margin: '10px 0', padding: '10px' },
  button: { padding: '10px' }
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    // Implement your login logic here.
    // Replace this with your actual login logic.
    
    const isSuccess = await performLogin(username, password);
    
    
    // If login is successful, redirect to the homepage.
    if (isSuccess) {
      navigate("/home?username=" + username);
    } else {
      // Otherwise, display an error message.
      setIsError(true);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  // This is a placeholder function, replace this with your actual login logic.
  const performLogin = async (username: string, password: string) => {
    // Perform login logic (e.g. API call)
    // Return true if successful, false otherwise.
    
    return await invoke('login', { username, password });
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
                        Body Mass Index
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                            <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 10px #fff', fontSize: '30px' }}>
                                Login
                            </h2>
                            <input
                                type="text"
                                placeholder="Username"
                                style={styles.input}
                                onChange={handleUsernameChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                style={styles.input}
                                onChange={handlePasswordChange}
                                required
                            />
                            <button type="submit" style={styles.button} onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="row" style={{ display: 'flex', margin: '0 0 20px 0', padding: '0', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <p>
                            Don't have an account?
                            <button type="submit" style={{ margin: '0 0 0 10px', padding: '0', color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: '16px' }} onClick={() => navigate('/signup')}>
                                Signup
                            </button>
                        </p>
                    </div>

                    {isError && <div style={{ color: 'red' }}>{errorMessage}</div>}
                </div>
            </div>
    </section>
  );
};

export default LoginPage;

