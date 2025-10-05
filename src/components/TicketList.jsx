import React from "react";
import { Link } from "react-router-dom";
import "./TicketList.css";

export default function TicketList({ tickets }) {
  if (!tickets?.length) return <div style={{color:"#fff", fontWeight:"bold"}}>No tickets yet</div>;

  return (
    <div className="ticket-list">
      {tickets.map(t => {
        const overdue = t.slaDeadline && new Date(t.slaDeadline) < new Date();
        return (
          <div key={t._id} className="ticket-card">
            <Link to={`/ticket/${t._id}`}>{t.title}</Link>
            <div>By: {t.createdBy?.name}</div>
            <div>
              Status: <span className={`status-badge status-${t.status.replace(" ", "-")}`}>{t.status}</span>
              {overdue && <span className="status-overdue"> (SLA missed)</span>}
            </div>
            <div>Created: {new Date(t.createdAt).toLocaleString()}</div>
          </div>
        );
      })}
    </div>
  );
}
