import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import minimalist6 from "../assets/minimalist6.jpg";

export default function Fetchalldata1proc() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/home1"); // Redirect to home1 after 5000 milliseconds (5 seconds)
    }, 570);

    return () => clearTimeout(redirectTimer); // Clear the timer if the component unmounts before the redirect
  }, []);

  return (
    <>
      {loading ? (
        <p className="loading-ani-proc">
          {" "}
          <img
            className="mainlogo"
            height="200px"
            width="200px"
            src={minimalist6}
            alt=""
          />{" "}
        </p> //className="loading-ani"
      ) : (
        <div> </div>
      )}

      {/* <WeeklyReport1proc />      */}
    </>
  );
}

// function WeeklyReport1proc() {
//   const [weeklyReport, setWeeklyReport] = useState(null);

//   useEffect(() => {
//     async function fetchWeeklyReport() {
//       try {
//         const response = await axios.get('/auth/weeklyReport1proc'); // Replace with your API endpoint
//         setWeeklyReport(response.data);
//       } catch (error) {
//         console.error('Error fetching weekly report:', error);
//       }
//     }

//     fetchWeeklyReport();
//   }, []);

//   return (

//         <></>

//         );
//       }
