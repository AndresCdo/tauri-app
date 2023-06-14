import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";

import "../App.css"
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    // if (event.target.value.length > 12) {
    //   alert("Username must be less than 12 characters.");
    //   return;
    // } else if (event.target.value.length < 3) {
    //   alert("Username must be at least 3 characters.");
    //   return;
    // } else if (!/^[a-zA-Z0-9]+$/.test(event.target.value)) {
    //   alert("Username must only contain alphanumeric characters.");
    //   return;
    // } else if (event.target.value.includes(" ")) {
    //   alert("Username must not contain spaces.");
    //   return;
    // } else if (event.target.value.includes("admin")) {
    //   alert("Username must not contain the word 'admin'.");
    //   return;
    // } else if (event.target.value.includes("user")) {
    //   alert("Username must not contain the word 'user'.");
    //   return;
    // } else if (event.target.value.includes("root")) {
    //   alert("Username must not contain the word 'root'.");
    //   return;
    // } else if (event.target.value.includes("super")) {
    //   alert("Username must not contain the word 'super'.");
    //   return;
    // }
    // } else {
    setUsername(event.target.value);
    // }
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    // Implement your login logic here.
    const isSuccess = await performLogin(username, password); // Replace this with your actual login logic.

    // If login is successful, redirect to the homepage.
    if (isSuccess) {
      history("/home?username=" + username);
    } else {
      alert("Login failed. Please try again.");
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 10px #fff', fontSize: '50px' }}>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px' }}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
