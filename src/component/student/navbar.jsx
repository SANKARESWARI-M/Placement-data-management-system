import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Navbar.css';
import LogoutButton from "../Logout";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">National Engineering College</div>
      
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/recruiters">Recruiters</Link></li>
        <li><Link to="/upcoming-drive">Upcoming Drive</Link></li>
        <li><Link to="/status">Status</Link></li>
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
