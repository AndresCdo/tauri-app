import { SetStateAction, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useCookies } from "react-cookie";
import StartPage from "./components/LandingPage/LandingPage";
import SignupPage  from "./components/Signup/Signup";
import LoginPage from "./components/Login/Login";
import LogoutPage from "./components/Logout/Logout";
import HomePage from "./components/Home/Home";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

// Define App to route to home page when login is successful
// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event: { preventDefault: () => void; }) => {
//     event.preventDefault();
//     // Implement the login logic here, you can call an API: login(username, password)

//     console.log(`Logging in with username: ${username} and password: ${password}`);
//   };
  
//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke("greet", { name }));
//   }
  
//   async function bmi() {  
//     setGreetMsg(await invoke("bmi", { weight, height }));
//   }

    
//   return (
//     // <div className="container">
//     //   <h1>Welcome to Tauri!</h1>

//     //   <div className="row">
//     //     <a href="https://vitejs.dev" target="_blank">
//     //       <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//     //     </a>
//     //     <a href="https://tauri.app" target="_blank">
//     //       <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//     //     </a>
//     //     <a href="https://reactjs.org" target="_blank">
//     //       <img src={reactLogo} className="logo react" alt="React logo" />
//     //     </a>
//     //   </div>

      //  <p 

//     //   <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//     //   <form
//     //     className="row"
//     //     onSubmit={(e) => {
//     //       e.preventDefault();
//     //       greet();
//     //     }}
//     //   >
//     //     <input
//     //       id="greet-input"
//     //       onChange={(e) => setName(e.currentTarget.value)}
//     //       placeholder="Enter a name..."
//     //     />


//     //     <button type="submit">Greet</button>
//     //   </form>

//     //   <p>{greetMsg}</p>
//     // </div>
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
//         <h2>Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={handleUsernameChange}
//           style={{ margin: '10px 0', padding: '10px' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={handlePasswordChange}
//           style={{ margin: '10px 0', padding: '10px' }}
//         />
//         <button type="submit" style={{ padding: '10px' }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
