import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BarChartsub from "./BarChart-sub";
import minimalist6 from "../assets/minimalist6.jpg";
import BackButton from "./Backbutton";
import home from "../assets/home.jpg";
import print from "../assets/print.png";

export default function Fetchalldata1() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPername, setTotalPername] = useState("");
  const [totalDameg, setTotalDameg] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
    }
  }, []);

  const fetchData = async () => {
    try {
      const quantityResponse = await axios.get("/auth/totalQuantity1");
      setTotalQuantity(quantityResponse.data.totalQuantity);

      const priceResponse = await axios.get("/auth/totalPrice1");
      setTotalPrice(priceResponse.data.totalPrice);

      const pernameResponse = await axios.get("/auth/totalPername1");
      setTotalPername(pernameResponse.data.totalPername);

      const damegResponse = await axios.get("/auth/totalDameg1");
      setTotalDameg(damegResponse.data.totalDameg);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const handlePrint = () => {
    window.print(); // Invoking browser's print dialog
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <ul>
        <nav className="navbar">
          <Link to="/home1">
            <b>
              <img
                className="nav-home"
                src={home}
                height="25"
                width="25"
                alt="Home"
              />
            </b>
          </Link>
          <Link to="/dfp1" className="nav-item">
            <b>Data</b>
          </Link>
          <Link to="/fetchalldata1" className="nav-item">
            <b>Total</b>
          </Link>
          <Link to="/fetchalldata1" className="">
            <button className="print" onClick={handlePrint}>
              <img
                className="nav-logout"
                src={print}
                height="28"
                width="28"
                alt="logout"
              />
            </button>
          </Link>
        </nav>
      </ul>

      

      <div>
        {loading ? (
          <p className="loading-ani">
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
          <div>
            <h3 className="totaldata">Totals</h3>
            <table className="data-table-total" border="">
              <thead>
                <tr>
                  <th>Pername</th>
                  <th>Total Quantity</th>
                  <th>Total Price</th>
                  <th>Total Dameg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{totalPername}</td>
                  <td>{totalQuantity}</td>
                  <td>{totalPrice}</td>
                  <td>{totalDameg}</td>
                </tr>
              </tbody>
            </table>
            <WeeklyReport1 />
            <QuarterlyReport1 />
            <BarChartsub
              data={[
                {
                  pername: totalPername,
                  quantity: totalQuantity,
                  price: totalPrice,
                  dameg: totalDameg,
                },
              ]}
            />{" "}
            <br />
            {/* <DailyReportForm /> */}
          </div>
        )}
      </div>
    </div>
  );
}

function WeeklyReport1() {
  const [weeklyReport, setWeeklyReport] = useState(null);

  useEffect(() => {
    async function fetchWeeklyReport() {
      try {
        const response = await axios.get("/auth/weeklyReport1"); // Replace with your API endpoint
        setWeeklyReport(response.data);
      } catch (error) {
        console.error("Error fetching weekly report:", error);
      }
    }

    fetchWeeklyReport();
  }, []);

  return (
    <div>
      <h4 className="totaldata">Weekly Report</h4>
      {weeklyReport ? (
        <div className="">
          <table className="data-table-total" border="">
            <thead>
              <tr>
                <th className="weekly-quarter-head">Start of Week</th>
                <th className="weekly-quarter-head">End of Week</th>
                <th className="weekly-quarter-head">Weekly Quantity</th>
                <th className="weekly-quarter-head">Weekly Price</th>
                <th className="weekly-quarter-head">Weekly Dameg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weeklyReport.startOfWeek}</td>
                <td>{weeklyReport.endOfWeek}</td>
                <td>{weeklyReport.totalQuantity}</td>
                <td>{weeklyReport.totalPrice}</td>
                <td>{weeklyReport.totalDameg}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

//Qwartaly persoanal 1

const QuarterlyReport1 = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchQuarterlyReport = async () => {
      try {
        const response = await fetch("/auth/quarterlyReport1"); // Replace '/api/quarterlyReport' with your actual backend endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error fetching quarterly report:", error);
      }
    };

    fetchQuarterlyReport();
  }, []);

  return (
    <div>
      <h3 className="totaldata">Quarterly Report</h3>
      {reportData ? (
        <div>
          <table className="data-table-total" border="">
            <thead>
              <tr>
                <th className="weekly-quarter-head">Start of Quarter</th>
                <th className="weekly-quarter-head">End of Quarter</th>
                <th className="weekly-quarter-head">Quarterly Quantity</th>
                <th className="weekly-quarter-head">Quarterly Price</th>
                <th className="weekly-quarter-head">Quarterly Dameg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.startOfQuarter}</td>
                <td>{reportData.endOfQuarter}</td>
                <td>{reportData.totalQuantity}</td>
                <td>{reportData.totalPrice}</td>
                <td>{reportData.totalDameg}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};



  // <BackButton />
  //     <button className="buttons" onClick={handlePrint}>
  //      Print
  //     </button> 
