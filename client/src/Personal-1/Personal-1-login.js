import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import minimalist2 from "../assets/minimalist2.jpg";
import minimalist3 from "../assets/minimalist3.jpg";

const Loginto = () => {
  return (
    <div>
      <Personal_1_login />
    </div>
  );
};

const Personal_1_login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const [alertType, setAlertType] = useState(""); // State to manage alert type (e.g., success, error)

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("/auth/personal1-login", {
        username,
        password,
      });

      //  setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);

      navigate("/Fetchalldata1proc");

      setAlertMessage("Logged in successfully");
      setAlertType("success");
    } catch (error) {
      setAlertMessage("Incorrect credentials");
      setAlertType("error");
      console.error(error);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
   
      <div className="login">
        <img className="useru-logo" src={minimalist2} alt="" />
        <img className="userp-logo" src={minimalist3} alt="" />
        <form onSubmit={onSubmit}>
          <h4 className="login-name">Personal 1</h4>
          <div className="form-group">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          
           <img 
    src={require('../assets/login.png')} 
    alt="Submit" 
    className="submit-img" 
    onClick={onSubmit} 
  />
          
          
        </form>

        {/* Circular button to navigate to the register page */}
        <button className="change" onClick={navigateToRegister}>
        ⨭
        </button>

        {/* Custom styled alert */}
        {alertMessage && (
          <div className={`alert-all ${alertType} slideIn`}>
            {alertMessage} <br />
            <button className="close" onClick={() => setAlertMessage(false)}>
              Close
            </button>
          </div>
        )}
     
    </div>
  );
};

export default Loginto;




//<button className="submit" type="submit">
//            Login
 //         </button>
