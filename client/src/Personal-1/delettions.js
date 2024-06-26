import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DFP1 from "./DFP1"; // Import DFP1 component

const DeletePersonal = () => {
  const [personalData, setPersonalData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false); // State to track deletion status

  // Function to fetch personal data
  const fetchPersonalData = async () => {
    try {
      const response = await axios.get("/auth/personal1");
      setPersonalData(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to delete a personal data item
  const deletePersonalItem = async () => {
    try {
      if (!deleteId) {
        setError("Please enter an item ID"); // Set error message if ID is empty
        setTimeout(() => setError(null), 1000); // Clear error message after 3 seconds
        return;
      }

      await axios.delete(`/auth/personal1/${deleteId}`);
      fetchPersonalData();
      setDeleteId("");
      setError(null);
      setIsDeleted(true); // Set deletion status to true
      setTimeout(() => window.location.reload(), 500); // Reload the page after 2 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, []); // Run once on component mount

  return (
    <div>
      <h2></h2>
      <div>
        <input
          className="delete-input"
          type="text"
          id="deleteId"
          placeholder="Delete Data"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <span /> <span />
        {/* Conditionally render the button or the "OK" message */}
        {!isDeleted ? (
          <button className="button-delete-dfp" onClick={deletePersonalItem}>
            <span>Delete by ID</span>
          </button>
        ) : (
          <button className="button-delete-ok">
            <span>Deleted successfully</span>
          </button>
        )}
        {error && <h3>{error}</h3>}
      </div>
    </div>
  );
};

export default DeletePersonal;
