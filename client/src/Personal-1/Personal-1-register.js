import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import minimalist2 from "../assets/minimalist2.jpg";
import minimalist3 from "../assets/minimalist3.jpg";
// import { Link } from "react-router-dom";

const Personal_1_register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const [alertType, setAlertType] = useState(""); // State to manage alert type (e.g., success, error)
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/auth/personal1-regis", {
        username,
        password,
      });

      setUsername("");
      setPassword("");

      navigate("/Fetchalldata1proc");
      setAlertMessage("Registration Completed"); //!∆
      setAlertType("success");
    } catch (error) {
      setAlertMessage("Username Already Exist");
      setAlertType("error");
      console.error(error);
    }
  };

  return (
    <div className="register">
      <img className="useru-logo-regis" src={minimalist2} alt="" />
      <img className="userp-logo-regis" src={minimalist3} alt="" />

      <form onSubmit={onSubmit}>
        <h4 className="register-name">Register 1</h4>
        <div className="form-group">
          {/* <label htmlFor="username">Username:</label> */}

          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="password">Password:</label> */}

          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="submit" type="submit">
          Register
        </button>
      </form>
      {/* <Link  className='navbutton' to="/login">Login</Link>  */}

      {/* Custom styled alert */}
      {alertMessage && (
        <div className={`alert-all ${alertType} slideIn `}>
          {alertMessage}
          <button className="close" onClick={() => setAlertMessage(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Personal_1_register;
