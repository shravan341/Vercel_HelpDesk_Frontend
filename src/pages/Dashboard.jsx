import React, { useEffect, useState } from "react";
import api from "../services/api";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import "./Dashboard.css";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      alert("Fetch error");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="ticket-form-card">
          <TicketForm onCreated={fetchTickets} />
        </div>

        <h2>Your Tickets</h2>

        <div className="ticket-list-card">
          <TicketList tickets={tickets} />
        </div>
      </div>
    </div>
  );
}
