// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define DeleteAccount component
const DeleteAccount = () => {
  // State variables
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch stored user ID on component mount

  useEffect(() => {
    const storedUserId = window.localStorage.getItem("userID");
    console.log("Stored User ID:", storedUserId);

    if (storedUserId !== null) {
      setUserId(storedUserId);
    }
  }, []);

  // Handle user account deletion
  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (confirmed) {
      try {
        // Make API call to delete user account
        const response = await axios.delete(`/auth/p1-auths/${userId}`);

        // Check if the deletion was successful
        if (response.data.message) {
          setMessage(response.data.message);

          // Remove userID from local storage
          window.localStorage.removeItem("userID");

          // Navigate to the home page
          navigate("/");
        }
      } catch (error) {
        setMessage(
          `Error: ${error.response ? error.response.data.message : error.message}`,
        );
      }
    }
  };

  // Render component
  return (
    // <div>
    //   <button className="button-delete" onClick={handleDeleteUser}></button>
    //   {message && <p>{message}</p>}
    // </div>

    <div>
      <button className="button-delete" onClick={handleDeleteUser}>
        <span>Delete User</span>
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

// Export the component
export default DeleteAccount;
