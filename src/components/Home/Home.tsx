import React, { useState , useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "../../App.css"

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  form: { display: 'flex', flexDirection: 'column', width: '300px' },
  input: { margin: '10px 0', padding: '10px' },
  button: { padding: '10px' },
  heading: { textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 10px #351000', fontSize: '35px', fontFamily: 'sans-serif' },
  column: { display: 'flex', flexDirection: 'column', width: '300px', justifyContent: 'center', alignItems: 'center' }
};

const HomePage = () => {
  const location = useLocation();

  // This will parse the query parameters into an object
  const queryParams = new URLSearchParams(location.search);
  // Get the username from the queryParams object
  const username = queryParams.get('username');

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  
  useEffect(() => {
    if (username) {
      setName(username);
    }
  }, [username]);

  async function greet() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
      }
  
  async function calculateBmi() {
    //     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
        setBmi(await invoke("bmi", { weight, height, name }));
      }
  
  return(
    <section>
      <div className='air air1'></div>
      <div className='air air2'></div>
      <div className='air air3'></div>
      <div className='air air4'></div>

      <div style={styles.container}>
        <div className='col-md-6' style={{ display: 'flex', flexDirection: 'column', width: '700px', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0', color: 'white', textShadow: '0 0 5px #fff', fontSize: '50px' }}>
              Body Mass Index Calculator
          </h2>
          
          <div className="row">
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo vite" alt="Vite logo" />
            </a>
            <a href="https://tauri.app" target="_blank">
              <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>

          <div className="col-6" style={styles.column}>
            <div className="col-6" style={styles.column}>
              <input
                required
                style={styles.input}
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Your weight"
              />
              <input
                required
                style={styles.input}
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Your height"
              />
              <button onClick={calculateBmi}>Calculate BMI</button>
            </div>
          </div>

          <div className="col-md-6" style={styles.column}>
            <p style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0' }}
            >{ greetMsg }</p>
            <p style={{ textAlign: 'center', margin: '0 0 20px 0', padding: '0' }} 
            >{ bmi }</p>
          </div>

          <div className="row">
            <a
              className="link"
              href="https://tauri.studio/en/docs/getting-started/intro"
              target="_blank"
            >
              <span>Getting started guide</span>
              <span className="icon">→</span>
            </a>
          </div>
        </div>      
      </div>
    </section>
  );


};

export default HomePage;