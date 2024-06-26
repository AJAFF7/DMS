import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This function takes you back to the previous page in the history stack
  };

  return (
    <button className="buttons" onClick={goBack}>
      Back
    </button>
  );
};

export default BackButton;
