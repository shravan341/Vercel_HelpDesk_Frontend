import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="brand">
        <Link to="/">HelpDesk Mini</Link>
      </div>
      <div className="user-section">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}
