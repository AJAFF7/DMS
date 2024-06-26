// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import BackButton from "./Backbutton";
// import DeletePersonal from "./delettions";
// import home from "../assets/home.jpg";
// import print from "../assets/print.png";

// const DFP1 = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updateId, setUpdateId] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     quantity: "",
//     price: "",
//     dameg: "",
//     timestamp: "",
//   });
//   const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("userID")) {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchData();
//   }, []); // Fetch data on mount

//   const fetchData = async () => {
//     try {
//       const response = await fetch("/auth/personal1", {
//         method: "GET",
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         setData(responseData.data);
//         setLoading(false);
//       } else {
//         console.error("Error fetching data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const goTo = () => {
//     navigate("/Fetchalldata1");
//   };

//   const handleUpdate = (id) => {
//     setUpdateId(id);
//     const selectedItem = data.find((item) => item._id === id);
//     setUpdateData({
//       quantity: selectedItem.quantity,
//       price: selectedItem.price,
//       dameg: selectedItem.dameg,
//       timestamp: selectedItem.timestamp,
//     });
//   };

//   const cancelUpdate = () => {
//     setUpdateId(null);
//     setUpdateData({
//       quantity: "",
//       price: "",
//       dameg: "",
//       timestamp: "",
//     });
//   };

//   const updatePersonalItem = async () => {
//     try {
//       const response = await fetch(`/auth/personal1/${updateId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       });

//       if (response.ok) {
//         // Refresh data after updating
//         fetchData();

//         // Reset update state
//         cancelUpdate();
//       } else {
//         console.error("Error updating data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   //Filter data based on search query
//   const filteredData = data.filter((item) => {
//     // Check if the search query is a valid date
//     const searchDate = new Date(searchQuery);
//     if (!isNaN(searchDate.getTime())) {
//       const itemDate = new Date(item.timestamp);
//       // Compare item's timestamp with search date
//       return itemDate.toDateString() === searchDate.toDateString();
//     }
//     // If the search query is not a valid date, perform regular string search
//     return Object.values(item).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   });

//   return (
//     <div>
//       <ul>
//         <nav className="navbar">
//           <Link to="/home1">
//             <b>
//               <img
//                 className="nav-home"
//                 src={home}
//                 height="25"
//                 width="25"
//                 alt="Home"
//               />
//             </b>
//           </Link>
//           <Link to="/dfp1" className="nav-item">
//             <b>Data</b>
//           </Link>
//           <Link to="/fetchalldata1" className="nav-item">
//             <b>Total</b>
//           </Link>

//           <Link to="/dfp1" className="">
//             <button className="print" onClick={handlePrint}>
//               <img
//                 className="nav-logout"
//                 src={print}
//                 height="28"
//                 width="28"
//                 alt="logout"
//               />
//             </button>
//           </Link>
//         </nav>
//       </ul>

//       <p>
//         <h1 className="patched-data">Patched Data</h1>
//       </p>

//       <div className="search-input" style={{ position: "relative" }}>
//         <input
//           className="search-field"
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ paddingRight: "30px" }} // Adjust padding if needed
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="26"
//           height="26"
//           fill="currentColor"
//           className="bi bi-search"
//           viewBox="0 0 16 16"
//           style={{
//             position: "absolute",
//             right: "10px",
//             top: "50%",
//             transform: "translateY(-50%)",
//           }}
//         >
//           <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
//         </svg>
//       </div>

//       {loading ? (
//         <p className="server-m">
//           Server is not running .... <p className="loading-ani-server"></p>
//         </p>
//       ) : (
//         <div className="data-container-dfp">
//           <DeletePersonal />

//           {/* <h1 className="totl-data">Patched Data:</h1> */}
//           {filteredData.length > 0 ? (
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>pername</th>
//                   <th>quantity</th>
//                   <th>price</th>
//                   <th>dameg</th>
//                   <th>Timestamp</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((i) => (
//                   <tr key={i._id}>
//                     <td>{i._id}</td>
//                     <td>{i.pername}</td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.quantity}
//                           value={updateData.quantity}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               quantity: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.quantity
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.price}
//                           value={updateData.price}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               price: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.price
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.dameg}
//                           value={updateData.dameg}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               dameg: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.dameg
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.timestamp}
//                           value={updateData.timestamp}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               timestamp: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.timestamp
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <>
//                           <button
//                             className="update-ch1"
//                             onClick={updatePersonalItem}
//                           >
//                             Save
//                           </button>
//                           <button className="update-ch2" onClick={cancelUpdate}>
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           className="update"
//                           onClick={() => handleUpdate(i._id)}
//                         >
//                           Update
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DFP1;

//////////////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import BackButton from "./Backbutton";
// import DeletePersonal from "./delettions";
// import home from "../assets/home.jpg";
// import print from "../assets/print.png";

// const DFP1 = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updateId, setUpdateId] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     quantity: "",
//     price: "",
//     dameg: "",
//     timestamp: "",
//   });
//   const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("userID")) {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchData();
//   }, []); // Fetch data on mount

//   const fetchData = async () => {
//     try {
//       const response = await fetch("/auth/personal1", {
//         method: "GET",
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         setData(responseData.data);
//         setLoading(false);
//       } else {
//         console.error("Error fetching data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const goTo = () => {
//     navigate("/Fetchalldata1");
//   };

//   const handleUpdate = (id) => {
//     setUpdateId(id);
//     const selectedItem = data.find((item) => item._id === id);
//     setUpdateData({
//       quantity: selectedItem.quantity,
//       price: selectedItem.price,
//       dameg: selectedItem.dameg,
//       timestamp: selectedItem.timestamp,
//     });
//   };

//   const cancelUpdate = () => {
//     setUpdateId(null);
//     setUpdateData({
//       quantity: "",
//       price: "",
//       dameg: "",
//       timestamp: "",
//     });
//   };

//   const updatePersonalItem = async () => {
//     try {
//       const response = await fetch(`/auth/personal1/${updateId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       });

//       if (response.ok) {
//         // Refresh data after updating
//         fetchData();

//         // Reset update state
//         cancelUpdate();
//       } else {
//         console.error("Error updating data:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };

//   // Filter data based on search query
//   const filteredData = data.filter((item) => {
//     // Check if the search query is a valid date
//     const searchDate = new Date(searchQuery);
//     if (!isNaN(searchDate.getTime())) {
//       const itemDate = new Date(item.timestamp);
//       // Compare item's timestamp with search date
//       return itemDate.toDateString() === searchDate.toDateString();
//     }
//     // If the search query is not a valid date, perform regular string search
//     return Object.values(item).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//   });

//   // Get the latest 90-day data from filteredData
//   const latest90DayData = filteredData.filter((item) => {
//     const today = new Date();
//     const itemDate = new Date(item.timestamp);
//     const timeDiff = Math.abs(today - itemDate);
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//     return daysDiff <= 90;
//   });

//   return (
//     <div>
//       <ul>
//         <nav className="navbar">
//           <Link to="/home1">
//             <b>
//               <img
//                 className="nav-home"
//                 src={home}
//                 height="25"
//                 width="25"
//                 alt="Home"
//               />
//             </b>
//           </Link>
//           <Link to="/dfp1" className="nav-item">
//             <b>Data</b>
//           </Link>
//           <Link to="/fetchalldata1" className="nav-item">
//             <b>Total</b>
//           </Link>

//           <Link to="/dfp1" className="">
//             <button className="print" onClick={handlePrint}>
//               <img
//                 className="nav-logout"
//                 src={print}
//                 height="28"
//                 width="28"
//                 alt="logout"
//               />
//             </button>
//           </Link>
//         </nav>
//       </ul>

//       <p>
//         <h1 className="patched-data">Patched Data</h1>
//       </p>

//       <div className="search-input" style={{ position: "relative" }}>
//         <input
//           className="search-field"
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ paddingRight: "30px" }}
//         />
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="26"
//           height="26"
//           fill="currentColor"
//           className="bi bi-search"
//           viewBox="0 0 16 16"
//           style={{
//             position: "absolute",
//             right: "10px",
//             top: "50%",
//             transform: "translateY(-50%)",
//           }}
//         >
//           <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
//         </svg>
//       </div>

//       {loading ? (
//         <p className="server-m">
//           Server is not running .... <p className="loading-ani-server"></p>
//         </p>
//       ) : (
//         <div className="data-container-dfp">
//           <DeletePersonal />

//           {latest90DayData.length > 0 ? (
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>pername</th>
//                   <th>quantity</th>
//                   <th>price</th>
//                   <th>dameg</th>
//                   <th>Timestamp</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {latest90DayData.map((i) => (
//                   <tr key={i._id}>
//                     <td>{i._id}</td>
//                     <td>{i.pername}</td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.quantity}
//                           value={updateData.quantity}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               quantity: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.quantity
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.price}
//                           value={updateData.price}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               price: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.price
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.dameg}
//                           value={updateData.dameg}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               dameg: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.dameg
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <input
//                           type="text"
//                           placeholder={i.timestamp}
//                           value={updateData.timestamp}
//                           onChange={(e) =>
//                             setUpdateData({
//                               ...updateData,
//                               timestamp: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         i.timestamp
//                       )}
//                     </td>
//                     <td>
//                       {updateId === i._id ? (
//                         <>
//                           <button
//                             className="update-ch1"
//                             onClick={updatePersonalItem}
//                           >
//                             Save
//                           </button>
//                           <button className="update-ch2" onClick={cancelUpdate}>
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           className="update"
//                           onClick={() => handleUpdate(i._id)}
//                         >
//                           Update
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No matching data found within the last 90 days.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DFP1;

////////////////////

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackButton from "./Backbutton";
import DeletePersonal from "./delettions";
import home from "../assets/home.jpg";
import print from "../assets/print.png";

const DFP1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState(null);
  const [updateData, setUpdateData] = useState({
    quantity: "",
    price: "",
    dameg: "",
    timestamp: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on mount

  const fetchData = async () => {
    try {
      const response = await fetch("/auth/personal1", {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData.data);
        setLoading(false);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goTo = () => {
    navigate("/Fetchalldata1");
  };

  const handleUpdate = (id) => {
    setUpdateId(id);
    const selectedItem = data.find((item) => item._id === id);
    setUpdateData({
      quantity: selectedItem.quantity,
      price: selectedItem.price,
      dameg: selectedItem.dameg,
      timestamp: selectedItem.timestamp,
    });
  };

  const cancelUpdate = () => {
    setUpdateId(null);
    setUpdateData({
      quantity: "",
      price: "",
      dameg: "",
      timestamp: "",
    });
  };

  const updatePersonalItem = async () => {
    try {
      const response = await fetch(`/auth/personal1/${updateId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        // Refresh data after updating
        fetchData();

        // Reset update state
        cancelUpdate();
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //Filter data based on search query
  const filteredData = data.filter((item) => {
    // Check if the search query is a valid date
    const searchDate = new Date(searchQuery);
    if (!isNaN(searchDate.getTime())) {
      const itemDate = new Date(item.timestamp);
      // Compare item's timestamp with search date
      return itemDate.toDateString() === searchDate.toDateString();
    }
    // If the search query is not a valid date, perform regular string search
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  });

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

          <Link to="/dfp1" className="">
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

      <p>
        <h1 className="patched-data">Search In DataBase</h1>
      </p>

      <div className="search-input" style={{ position: "relative" }}>
        <input
          className="search-field"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingRight: "30px" }} // Adjust padding if needed
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>

      {/* Check if there's a search query and data to display */}
      {searchQuery && filteredData.length > 0 && (
        <div className="data-container-dfp">
          <DeletePersonal />

          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>pername</th>
                <th>quantity</th>
                <th>price</th>
                <th>dameg</th>
                <th>Timestamp</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((i) => (
                <tr key={i._id}>
                  <td>{i._id}</td>
                  <td>{i.pername}</td>
                  <td>
                    {updateId === i._id ? (
                      <input
                        type="text"
                        placeholder={i.quantity}
                        value={updateData.quantity}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            quantity: e.target.value,
                          })
                        }
                      />
                    ) : (
                      i.quantity
                    )}
                  </td>
                  <td>
                    {updateId === i._id ? (
                      <input
                        type="text"
                        placeholder={i.price}
                        value={updateData.price}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            price: e.target.value,
                          })
                        }
                      />
                    ) : (
                      i.price
                    )}
                  </td>
                  <td>
                    {updateId === i._id ? (
                      <input
                        type="text"
                        placeholder={i.dameg}
                        value={updateData.dameg}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            dameg: e.target.value,
                          })
                        }
                      />
                    ) : (
                      i.dameg
                    )}
                  </td>
                  <td>
                    {updateId === i._id ? (
                      <input
                        type="text"
                        placeholder={i.timestamp}
                        value={updateData.timestamp}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            timestamp: e.target.value,
                          })
                        }
                      />
                    ) : (
                      i.timestamp
                    )}
                  </td>
                  <td>
                    {updateId === i._id ? (
                      <>
                        <button
                          className="update-ch1"
                          onClick={updatePersonalItem}
                        >
                          Save
                        </button>
                        <button className="update-ch2" onClick={cancelUpdate}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="update"
                        onClick={() => handleUpdate(i._id)}
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display message if no data found */}
      {searchQuery && filteredData.length === 0 && <p>No data available</p>}

      {/* Display loading message */}
      {loading && (
        <p className="server-m">
          Server is not running .... <p className="loading-ani-server"></p>
        </p>
      )}
    </div>
  );
};

export default DFP1;
