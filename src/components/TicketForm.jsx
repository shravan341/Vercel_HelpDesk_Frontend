import React, { useState } from "react";
import api from "../services/api";
import "./TicketForm.css";

export default function TicketForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sla, setSla] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, slaDeadline: sla || null };
      await api.post("/tickets", body);
      setTitle(""); 
      setDescription(""); 
      setSla("");
      if (onCreated) onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <form onSubmit={submit} className="ticket-form-card">
      <h3>Create Ticket</h3>
      <input 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <label>
        SLA Deadline: 
        <input 
          type="datetime-local" 
          value={sla} 
          onChange={e => setSla(e.target.value)} 
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
