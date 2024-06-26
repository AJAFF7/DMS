import { useNavigate } from 'react-router-dom';


// import { useCookies } from "react-cookie";


function Header()  {
   // let user= JSON.parse(localStorage.getItem('user-info'))
   const navigate = useNavigate()
   const Logout = () => {
      window.localStorage.removeItem("userID")

      localStorage.clear();
      navigate("/");
   }
   

  return(
    <div>
        
        <button onClick={() => Logout()}>logOut</button>

    </div>
  )
}

export default Header;







