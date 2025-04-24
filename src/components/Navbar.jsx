import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        <Link to="/tareas" className="nav-link">
          Tareas
        </Link>
        <Link to="/db" className="nav-link">
          Dashboard
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
