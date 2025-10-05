import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={submit} className="register-form">
        <h2>Register</h2>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
