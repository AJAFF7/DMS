// // import React from "react"

// //  function Texthome_1() {
// //   return (
// //     <div>
// //         <h3 className='textloginpage-p'> Welcom Personal 1</h3>
// //          {/* <p ><Alertp1 /></p>  */}

// //         </div>
// //   )
// // }

// // export default Texthome_1

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Texthome_1() {
//   const [username, setUsername] = useState(""); // State to store the username

//   // Function to fetch the username from the API
//   const fetchUsername = async () => {
//     try {
//       const userID = localStorage.getItem("userID");
//       const response = await axios.get(`/auth/get-username/${userID}`);
//       setUsername(response.data.username);
//     } catch (error) {
//       console.error("Error fetching username:", error);
//     }
//   };

//   // Fetch the username when the component mounts
//   useEffect(() => {
//     fetchUsername();
//   }, []);

//   return (
//     <div>
//       <h3 className="textloginpage-p">
//         Welcome {username ? username : "User"}
//       </h3>
//     </div>
//   );
// }

// export default Texthome_1;

import React, { useState, useEffect } from "react";
import axios from "axios";

function Texthome_1() {
  const [pername, setPername] = useState(""); // State to store the pername

  // Function to fetch the username from the API
  const fetchPername = async () => {
    try {
      const userID = localStorage.getItem("userID");
      const response = await axios.get(`/auth/get-username/${userID}`);
      setPername(response.data.username);
    } catch (error) {
      console.error("Error fetching pername:", error);
    }
  };

  // Fetch the pername when the component mounts
  useEffect(() => {
    fetchPername();
  }, []);

  return (
    <div>
      <h3 className="textloginpage-p">Welcome {pername ? pername : ""}</h3>
    </div>
  );
}

export default Texthome_1;
