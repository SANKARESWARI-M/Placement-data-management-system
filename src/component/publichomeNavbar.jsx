import React from "react";
import { Link,useNavigate } from "react-router-dom";
import '../styles/Navbar.css';
// import LoginButton from "../Login";
const Navbar = () => {
    const navigate=useNavigate();
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img 
          src="https://lms.nec.edu.in/pluginfile.php/1/theme_academi/logo/1739862648/logo.jpeg" 
          alt="NEC Logo" 
          className="navbar-logo-img"
        />
        <span>National Engineering College</span>
      </div>

      {/* Right Section: Icons & Logout */}
      <div className="navbar-right">
        
      <button className="loginbutton" onClick={() => navigate("/login")}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
