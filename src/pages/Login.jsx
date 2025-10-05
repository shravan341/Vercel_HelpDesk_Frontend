import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-card">
        <h2>Login</h2>
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          type="email" 
          required 
        />
        <input 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          type="password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
