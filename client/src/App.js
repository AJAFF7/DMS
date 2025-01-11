import "./App.css";
import { Routes, Route } from "react-router-dom";
// import {Routes, Route} from 'react-router-dom';
// import minimalist1 from './assets/minimalist1.jpg';
import Home from "./Home";
// import Weather from "./Personal-1/Weather";

import { useState } from "react";
// import { motion } from "framer-motion";

import Home1 from "./Personal-1/Home1";
import TP1 from "./Personal-1/TP1";
import DFP1 from "./Personal-1/DFP1";
import Personal_1_login from "./Personal-1/Personal-1-login";
import Personal_1_register from "./Personal-1/Personal-1-register";
import Personal_1_logout from "./Personal-1/Personal-1-logout";
import Fetchalldata1 from "./Personal-1/Totaldata1";
import Fetchalldata1proc from "./Personal-1/Totaldata1-process";
import Alertp1 from "./Personal-1/Alert-p1";
import DeleteAccount from "./Personal-1/deleteaccount";

// import Login from './login';
// import Register from './Register';

// import Header from './Header';

//
function App() {
  //window.localStorage.setItem("userID");
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  const [darkModeColor, setDarkModeColor] = useState("dark-mode-default");

  const toggleDarkMode = () => {
    // Toggle between different dark mode color schemes
    if (darkModeColor === "dark-mode-default") {
      setDarkModeColor("dark-mode-alt1");
    } else if (darkModeColor === "dark-mode-alt1") {
      setDarkModeColor("dark-mode-alt2");
    } else if (darkModeColor === "dark-mode-alt2") {
      setDarkModeColor("dark-mode-alt3");
    } else if (darkModeColor === "dark-mode-alt3") {
      setDarkModeColor("dark-mode-alt4");
    } else {
      setDarkModeColor("dark-mode-default");
    }
  };

  return (
    // <div className={`app-header ${isDarkMode ? 'on' : 'off'}`}>
    // <div className="switch" onClick={toggleDarkMode}>
    // <div className={`handle ${isDarkMode ? 'right' : 'left'}`} />
    // </div>
    // <div>

    <div className={`app-header ${darkModeColor}`}>
      <div className="switch" onClick={toggleDarkMode}>
        <div className={`handle ${darkModeColor}`} />
      </div>
      <div>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/tp1" element={<TP1 />} />
          <Route path="/dfp1" element={<DFP1 />} />
          <Route path="/fetchalldata1" element={<Fetchalldata1 />} />
          <Route path="/fetchalldata1proc" element={<Fetchalldata1proc />} />
          <Route
            path="/personal_1_register"
            element={<Personal_1_register />}
          />
          <Route path="/personal_1_login" element={<Personal_1_login />} />
          <Route path="/personal_1_logout" element={<Personal_1_logout />} />
          <Route path="/deleteAccount" element={<DeleteAccount />} />{" "}
          <Route path="/alertp1" element={<Alertp1 />} />
          <Route path="/register" element={<Personal_1_register />} /> {/* Register Route */}


        </Routes>

        {/* <Weather /> */}

        {/* <img className='foto' width="500" height="550" src={minimalist1} alt="" /> */}
        {/* </header> */}
        {/* </header> */}
      </div>
    </div>
  );
}

export default App;
