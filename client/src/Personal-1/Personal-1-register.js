
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import minimalist2 from "../assets/minimalist2.jpg";
import minimalist3 from "../assets/minimalist3.jpg";
import { Link } from "react-router-dom";

const Personal_1_register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
  const [alertType, setAlertType] = useState(""); // State to manage alert type (e.g., success, error)
  const [shake, setShake] = useState(false); // State for shaking animation
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

      setAlertMessage("Registration Completed");
      setAlertType("success");
      setTimeout(() => {
        navigate("/Fetchalldata1proc"); // Redirect after the alert
      }, 2000); // Wait for alert to show before navigating
    } catch (error) {
      setAlertMessage("Username Already Exists");
      setAlertType("error");
      setShake(true); // Trigger shake animation
      setTimeout(() => setShake(false), 500); // Remove shake class after animation
      console.error(error);
    }
  };

  return (
    <div className="register">
      <img className="useru-logo-regis" src={minimalist2} alt="User Logo" />
      <img className="userp-logo-regis" src={minimalist3} alt="Background" />
      <form onSubmit={onSubmit} className={`register-form ${shake ? "shake" : ""}`}>
        <h4 className="register-name">Register 1</h4>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        
        <img 
          src={require('../assets/register.png')} 
          alt="Submit" 
          className="register-img" 
          onClick={onSubmit} 
        />
      </form>

      <Link className="navbutton" to="/">
        <img 
          src={require('../assets/icon-back.png')} 
          alt="Back" 
          className="back-img" 
        />
      </Link>

      {/* Custom styled alert
      {alertMessage && (
        <div className={`alert-all ${alertType} slideIn`}>
          {alertMessage}
          <button
            className="close"
            onClick={() => setAlertMessage("")}
          >
            Close
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Personal_1_register;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import minimalist2 from "../assets/minimalist2.jpg";
// import minimalist3 from "../assets/minimalist3.jpg";
// import { Link } from "react-router-dom";

// const Personal_1_register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [alertMessage, setAlertMessage] = useState(""); // State to manage alert message
//   const [alertType, setAlertType] = useState(""); // State to manage alert type (e.g., success, error)
//   const navigate = useNavigate();

//   const onSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await axios.post("/auth/personal1-regis", {
//         username,
//         password,
//       });

//       setUsername("");
//       setPassword("");

//       setAlertMessage("Registration Completed");
//       setAlertType("success");
//       setTimeout(() => {
//         navigate("/Fetchalldata1proc"); // Redirect after the alert
//       }, 2000); // Wait for alert to show before navigating
//     } catch (error) {
//       setAlertMessage("Username Already Exists");
//       setAlertType("error");
//       console.error(error);
//     }
//   };

//   return (

//     <div className="register">
//       <img className="useru-logo-regis" src={minimalist2} alt="User Logo" />
//       <img className="userp-logo-regis" src={minimalist3} alt="Background" />
//       <form onSubmit={onSubmit} className="register-form">
//         <h4 className="register-name">Register 1</h4>
//         <div className="form-group">
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />
//         </div>
        
//         <img 
//     src={require('../assets/register.png')} 
//     alt="Submit" 
//     className="register-img" 
//     onClick={onSubmit} 
//   />
        
        
//       </form>

//       <Link className="navbutton" to="/">
//         <img 
//     src={require('../assets/icon-back.png')} 
//     alt="Submit" 
//     className="back-img" 
    
//   />
//       </Link>

//       {/* Custom styled alert
//       {alertMessage && (
//         <div className={`alert-all ${alertType} slideIn`}>
//           {alertMessage}
//           <button
//             className="close"
//             onClick={() => setAlertMessage("")}
//           >
//             Close
//           </button>
//         </div>
//       )} */}
      
      
//     </div>
    
    
//   );
// };

// export default Personal_1_register;







