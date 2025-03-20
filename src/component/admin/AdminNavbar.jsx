import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css';
import LogoutButton from "../Logout";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">National Engineering College</div>
      
      <ul className="navbar-links">
        <li><Link to="/admin-home">Home</Link></li>
        <li><Link to="/admin-recruiters">Recruiters</Link></li>
        <li><Link to="/admin-upcoming-drive">Upcoming Drive</Link></li>
        <li><Link to="/admin-registered-students">Registered Student</Link></li>
        
      </ul>

      <div className="navbar-icons">
        <span>🔔</span>
        <Link to="/studentprofile" title="Profile">👤</Link>
      </div>
      <LogoutButton className="logout-button" />

    </nav>
  );
};

export default Navbar;
