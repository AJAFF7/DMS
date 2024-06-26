

import React, { useState, useEffect } from "react";
import axios from "axios";
import minimalist5 from "../assets/minimalist5.jpg";
import { useNavigate } from "react-router-dom";
import Texthome_1 from "./Texthome-1";

export default function TP1() {
  const [id, setId] = useState("");
  const [pername, setPername] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [dameg, setDameg] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
    } else {
      const fetchUsername = async () => {
        try {
          const userID = localStorage.getItem("userID");
          const response = await axios.get(`/auth/get-username/${userID}`);
          const username = response.data.username;
          setPername(username);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };
      fetchUsername();
    }
  }, [navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/auth/personal1", {
        id,
        pername,
        quantity,
        price,
        dameg,
      });

      setId("");
      setQuantity("");
      setPrice("");
      setDameg("");
      setAlertMessage("Data Transferred");
      setAlertType("success");
      setTimeout(() => window.location.reload(), ); 
    } catch (error) {
      setAlertMessage("Error Transferring Data");
      setAlertType("error");
      console.error(error);
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timeout = setTimeout(() => {
        setAlertMessage("");
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [alertMessage]);

  return (
    <div>
      <div className="data-container">
        <form onSubmit={onSubmit}>
          <Texthome_1 />
          {/* <div className="form-group">
            <label htmlFor="id">Id</label>
            <input
              type="text"
              name="id"
              placeholder="Id"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="pername">Personal</label>
            <input
              type="text"
              name="pername"
              value={pername}
              onChange={(event) => setPername(event.target.value)}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dameg">Dameg</label>
            <input
              type="text"
              name="dameg"
              placeholder="Dameg"
              value={dameg}
              onChange={(event) => setDameg(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <div className="form-group">
            <label htmlFor="dameg"></label>
            <input placeholder="Dameg" />
          </div>
          <button className="submit-tp" type="submit">
            Submit
          </button>{" "}
        </form>
      </div>

      {alertMessage && (
        <div className={`alert-all ${alertType} slideIn `}>
          {alertMessage} <br />
        </div>
      )}
    </div>
  );
}
