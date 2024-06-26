import React, { useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import minimalist2 from "../assets/minimalist2.jpg";
import minimalist3 from "../assets/minimalist3.jpg";
// import { Link } from "react-router-dom";

const Loginto = () => {
  return (
    <div>
      <Personal_1_login />
      {/* <Register /> */}
    </div>
  );
};

const Personal_1_login = () => {
  // const [_, setCookies] = useCookies(["access_token"]);

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
      window.localStorage.setItem("userID", result.data.userID); //, result.data.userID

      navigate("/Fetchalldata1proc"); //Fetchalldata1proc

      setAlertMessage("logged in success");
      setAlertType("success");
    } catch (error) {
      setAlertMessage("Incorrect Credentials");
      setAlertType("error");
      console.error(error);
    }
  };

  return (
    <div>
      {/* <button navbutton> <Link  className='navbutton' to="/login">Back</Link> </button> <span /> */}
      <div className="login">
        <img className="useru-logo" src={minimalist2} alt="" />
        <img className="userp-logo" src={minimalist3} alt="" />
        <form onSubmit={onSubmit}>
          <h4 className="login-name">Personal 1</h4>

          <div className="form-group">
            <input
              type="text"
              id="username "
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
            Login
          </button>
        </form>
        {/* <Link  className='navbutton' to="/register">Register</Link>  */}

        {/* Custom styled alert */}
        {alertMessage && (
          <div className={`alert-all ${alertType} slideIn `}>
            {alertMessage} <br />
            <button className="close" onClick={() => setAlertMessage(false)}>
              Close
            </button>
          </div>
        )}

        {/* <p className='loading-ani-loginpage'></p> */}
      </div>
    </div>
  );
};

export default Loginto;
