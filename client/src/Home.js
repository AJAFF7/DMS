import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import TransportDb from './TransportDb'
import { Link } from "react-router-dom";
// import Header from './Header'
// import Home1 from './Home1'
//import Register from './Register'
//import Delete from './Delete';

import Texthome from "./Text-home";
import Personal_1_login from "./Personal-1/Personal-1-login";

import Personal_1_register from "./Personal-1/Personal-1-register";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userID")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Texthome />

      <div className="navbutton">
        {/* <button navbutton> <Link className='navbutton' to="/dataFetch">Delete</Link> </button> <span /> */}

        {/* <button navbutton> <Link  className='navbutton' to="/">Back</Link> </button> <span />
           <button navbutton> <Link className='navbutton' to="/datafetch">Data</Link> </button> <span />
          <button> <Link className="backnav-transportdata" to="/home1">Home1</Link> </button>
          <button> <Link className="backnav-transportdata" to="/home2">Home2</Link> </button>  */}
        {/* <button navbutton> <Link className='navbutton'  to="/Header">logOut</Link> </button>  */}

        <div class="container">
          <div className="personal-home">
           <Personal_1_login />
          {/*<Personal_1_register /> */}
          </div>
        </div>

       {/*  <Home1 />
          <Header />
            <TransportDb/>  */}
      </div>
    </div>
  );
}

export default Home;
