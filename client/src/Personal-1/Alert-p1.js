import React, { useEffect, useState } from "react";
import axios from "axios";
import alert from "../assets/alert.jpg";
function Alertp1() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      try {
        const response = await axios.get("/auth/weeklyReport1proc");
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching weekly report:", error);
      }
    };

    fetchWeeklyReport();
  }, []);

  const calculatePercentage = (value, max) => {
    return Math.round((value / max) * 100);
  };

  return (
    //     <div className='data-table-home-contai'>

    <div>
      {reportData && (
        <div className="data-table-home-contai">
          <table className="data-table-home" border="">
            <thead>
              <tr>
                <th className="weekly-quarter-head-home">Start of Week</th>
                <th className="weekly-quarter-home">End of Week</th>
                <th className="weekly-quarter-home">Weekly Dameg</th>
                <th className="weekly-quarter-home">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.startOfWeek}</td>
                <td>{reportData.endOfWeek}</td>
                <td>{reportData.totalDameg}</td>
                <td>
                  {reportData.message && (
                    <p className="alert-dameg">
                      {" "}
                      <img
                        className="useru-logo-alert"
                        src={alert}
                        alt=""
                      />{" "}
                      {reportData.message}
                    </p>
                  )}{" "}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <div className="progress-container">
              <p></p>
              <div className="progress-wrapper">
                <progress
                  className="yellow-progress"
                  value={reportData.totalQuantity}
                  max={100}
                ></progress>
                <span className="progress-label">
                  {calculatePercentage(reportData.totalQuantity, 100)}%
                </span>
              </div>
            </div>
            <div className="progress-container">
              <p></p>
              <div className="progress-wrapper">
                <progress
                  className="purple-progress"
                  value={reportData.totalPrice}
                  max={100}
                ></progress>
                <span className="progress-label">
                  {calculatePercentage(reportData.totalPrice, 100)}%
                </span>
              </div>
            </div>
            <div className="progress-container">
              <p></p>
              <div className="progress-wrapper">
                <progress
                  className="red-progress"
                  value={reportData.totalDameg}
                  max={100}
                ></progress>
                <span className="progress-label">
                  {calculatePercentage(reportData.totalDameg, 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alertp1;
