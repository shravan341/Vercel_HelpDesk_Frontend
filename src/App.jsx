import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/ticket/:id" element={user ? <TicketDetail /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}
