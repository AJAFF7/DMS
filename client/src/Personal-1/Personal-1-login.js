import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import minimalist2 from "../assets/minimalist2.jpg";
import minimalist3 from "../assets/minimalist3.jpg";

const Personal_1_login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [shake, setShake] = useState(false);
  const [authShake, setAuthShake] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [countdown, setCountdown] = useState(15); // Countdown starts at 15 seconds
  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (showAuthPrompt && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up interval on component unmount or when countdown reaches 0
    } else if (countdown === 0) {
      setShowAuthPrompt(false); // Close the prompt when countdown reaches 0
      setAuthCode(""); // Clear the authCode input when the prompt closes
    }
  }, [showAuthPrompt, countdown]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post("/auth/personal1-login", {
        username,
        password,
      });

      window.localStorage.setItem("userID", result.data.userID);
      navigate("/Fetchalldata1proc");

      setAlertMessage("Logged in successfully");
      setAlertType("success");
    } catch (error) {
      setAlertMessage("Incorrect credentials");
      setAlertType("error");
      setShake(true); // Trigger shake effect for incorrect login
      setTimeout(() => setShake(false), 500); // Reset shake after 500ms
      console.error(error);
    }
  };

  const handlePlusClick = () => {
    setShowAuthPrompt(true);
    setCountdown(15); // Reset countdown to 15 when plus button is clicked
  };

  const handleAuthSubmit = () => {
    const correctAuthCode = "0000";
    if (authCode.trim() === correctAuthCode) {
      navigate("/register");
      setShowAuthPrompt(false); // Close prompt on correct code
    } else {
      setAuthShake(true); // Trigger shake effect for incorrect code
      setTimeout(() => setAuthShake(false), 500); // Reset shake after 500ms
      setAlertMessage("Incorrect authentication code");
      setAlertType("error");
    }
  };

  return (
    <div className="login">
      <img className="useru-logo" src={minimalist2} alt="Logo 1" />
      <img className="userp-logo" src={minimalist3} alt="Logo 2" />

      <form onSubmit={onSubmit} className={shake ? "shake" : ""}>
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
          src={require("../assets/login.png")}
          alt="Submit"
          className="submit-img"
          onClick={onSubmit}
        />
      </form>

      <button className="change" onClick={handlePlusClick}>
        ⨭
      </button>

      {showAuthPrompt && (
        <div className="auth-prompt">
          <p
            className="close-auth"
            onClick={() => {
              setShowAuthPrompt(false); // Close the prompt
              setAuthCode(""); // Clear the authCode input when the prompt is closed
            }}
          >
            {countdown > 0 ? countdown : "Closed"}
          </p>

          <h4 className="title">Authentication Code</h4>
          <input
            type="text"
            placeholder="Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            className={authShake ? "shake" : ""} // Apply shake effect to auth input
          />
          <div className="auth-buttons">
            <button onClick={handleAuthSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal_1_login;











// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import minimalist2 from "../assets/minimalist2.jpg";
// import minimalist3 from "../assets/minimalist3.jpg";

// const Personal_1_login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [authCode, setAuthCode] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");
//   const [shake, setShake] = useState(false);
//   const [authShake, setAuthShake] = useState(false);
//   const [showAuthPrompt, setShowAuthPrompt] = useState(false);

//   const navigate = useNavigate();

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const result = await axios.post("/auth/personal1-login", {
//         username,
//         password,
//       });

//       window.localStorage.setItem("userID", result.data.userID);
//       navigate("/Fetchalldata1proc");

//       setAlertMessage("Logged in successfully");
//       setAlertType("success");
//     } catch (error) {
//       setAlertMessage("Incorrect credentials");
//       setAlertType("error");
//       setShake(true); // Trigger shake effect for incorrect login
//       setTimeout(() => setShake(false), 500); // Reset shake after 500ms
//       console.error(error);
//     }
//   };

//   const handlePlusClick = () => {
//     setShowAuthPrompt(true);
//   };

//   const handleAuthSubmit = () => {
//     const correctAuthCode = "0000";
//     if (authCode.trim() === correctAuthCode) {
//       navigate("/register");
//       setShowAuthPrompt(false); // Close prompt on correct code
//     } else {
//       setAuthShake(true); // Trigger shake effect for incorrect code
//       setTimeout(() => setAuthShake(false), 500); // Reset shake after 500ms
//       setAlertMessage("Incorrect authentication code");
//       setAlertType("error");
//     }
//   };

//   return (
//     <div className="login">
//       <img className="useru-logo" src={minimalist2} alt="Logo 1" />
//       <img className="userp-logo" src={minimalist3} alt="Logo 2" />

//       <form onSubmit={onSubmit} className={shake ? "shake" : ""}>
//         <h4 className="login-name">Personal 1</h4>

//         <div className="form-group">
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <input
//             type="password"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>

//         <img
//           src={require("../assets/login.png")}
//           alt="Submit"
//           className="submit-img"
//           onClick={onSubmit}
//         />
//       </form>

//       <button className="change" onClick={handlePlusClick}>
//         ⨭
//       </button>
//       {showAuthPrompt && (
     
//         <div className="auth-prompt">
//         <button className="close-auth" onClick={() => setShowAuthPrompt(false)}>
//             &times;
//           </button>
          
//           <h4 className="title">Authentication Code</h4>
//           <input
//             type="text"
//             placeholder="Code"
//             value={authCode}
//             onChange={(e) => setAuthCode(e.target.value)}
//             className={authShake ? "shake" : ""} // Apply shake effect to auth input
//           />
//           <div className="auth-buttons">
//             <button onClick={handleAuthSubmit}>Submit</button>
//           </div>
//         </div>
        
//       )}

     
//     </div>
//   );
// };

// export default Personal_1_login;





















// const Personal_1_login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("");
//   const [shake, setShake] = useState(false); // State to trigger shake animation

//   const navigate = useNavigate();

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post("/auth/personal1-login", {
//         username,
//         password,
//       });

//       window.localStorage.setItem("userID", result.data.userID);
//       navigate("/Fetchalldata1proc");

//       setAlertMessage("Logged in successfully");
//       setAlertType("success");
//     } catch (error) {
//       setAlertMessage("Incorrect credentials");
//       setAlertType("error");
//       setShake(true); // Trigger shake animation

//       // Remove the shake class after animation ends
//       setTimeout(() => setShake(false), 500);

//       console.error(error);
//     }
//   };

//   const navigateToRegister = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="login">
//       <img className="useru-logo" src={minimalist2} alt="" />
//       <img className="userp-logo" src={minimalist3} alt="" />
//       <form onSubmit={onSubmit} className={shake ? "shake" : ""}>
//         <h4 className="login-name">Personal 1</h4>
//         <div className="form-group">
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <img 
//           src={require('../assets/login.png')} 
//           alt="Submit" 
//           className="submit-img" 
//           onClick={onSubmit} 
//         />
//       </form>

//       <button className="change" onClick={navigateToRegister}>
//         ⨭
//       </button>

//       {alertMessage && (
//         <div className={`alert-all ${alertType} slideIn`}>
//           {alertMessage} <br />
//           <button className="close" onClick={() => setAlertMessage(false)}>
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

