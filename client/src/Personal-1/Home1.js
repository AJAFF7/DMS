import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TP1 from "./TP1";
import { Link } from "react-router-dom";
// import Header from '../Header';
// import Personal_1_register from './Personal-1-register'
import Personal_1_logout from "./Personal-1-logout";
// import Textlogin from './Texthome-1'
// import Clock from './Clock'
import BarChart from "./BarChart";
import Alertp1 from "./Alert-p1";
import Clock from "./Clock";
import DeleteAccount from "./deleteaccount";
import home from "../assets/home.jpg";
import author from "../assets/author.jpg";
import logout from "../assets/logout.jpg";

function Home1() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // const navigate = useNavigate();

  ///for Chart

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state

  ///

  ///for chart

  useEffect(() => {
    fetch("/auth/personal1", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((responseData) => {
        console.log(responseData, "userData");
        setData(responseData.data); // Assuming 'data' is the array you want to display
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  ///

  // const goTo = () => {
  //   navigate("/dfp1"); // This function takes you back to the previous page in the history stack
  // };

  // const goToDelete = () => {
  //   navigate('/handleDeleteUser'); // This function takes you back to the previous page in the history stack
  // };

  const Logout = () => {
    window.localStorage.removeItem("userID");

    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="">
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

          <div className="dropdown" onClick={toggleDropdown}>
            {" "}
            <span className="dropdown-toggle">
              {isDropdownOpen ? "Menu▽" : "Menu▼"}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-content" onClick={closeDropdown}>
                {" "}
                <br />
                <Link to="/health-advice" className="nav-item">
                  <b>General</b>
                </Link>
                <Link to="/personal_1_register" className="nav-item">
                  <b>Register</b>
                </Link>
                <Link to="/home1" className="nav-item">
                  <DeleteAccount />
                </Link>
                <Link to="/home1" className="nav-item"></Link>
              </div>
            )}
          </div>

          <Link to="/" className="">
            <button className="logout" onClick={() => Logout()}>
              <img
                className="nav-logout"
                src={logout}
                height="28"
                width="28"
                alt="logout"
              />
            </button>
          </Link>
        </nav>
      </ul>

      {/* <Texthome_1 /> */}

      <div className="allbuttons">
        {/* <button className="nav-logout" onClick={handleLogout}></button> */}
        {/* <button className="buttons" onClick={goTo}>
          {" "}
          Data{" "}
        </button> */}
        {/* <button  className='buttons' onClick={goToDelete}> Delete</button> */}
        {/* <DeleteAccount /> */}

        <Clock />
        <TP1 />
      </div>

      {/* <Calendar /> */}

      <Alertp1 />

      <BarChart data={data} />
    </div>
  );
}

export default Home1;
