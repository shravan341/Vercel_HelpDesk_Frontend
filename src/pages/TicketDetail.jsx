import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./TicketDetail.css";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetch = async () => {
    try {
      const res = await api.get(`/tickets/${id}`);
      setTicket(res.data.ticket);
      setComments(res.data.comments);
    } catch (err) {
      alert("Fetch failed");
    }
  };

  useEffect(() => { fetch(); }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/tickets/${id}/comments`, { text });
      setComments(prev => [...prev, res.data]);
      setText("");
    } catch (err) {
      alert(err.response?.data?.message || "Add comment failed");
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await api.put(`/tickets/${id}`, { status: newStatus });
      fetch();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!ticket) return <div style={{color: "#fff", textAlign:"center"}}>Loading...</div>;

  return (
    <div className="ticket-detail-container">
      <div className="ticket-detail-content">
        <div className="ticket-card">
          <h2>{ticket.title}</h2>
          <div>{ticket.description}</div>
          <div>Status: <strong>{ticket.status}</strong></div>
          <div>SLA: {ticket.slaDeadline ? new Date(ticket.slaDeadline).toLocaleString() : "Not set"}</div>
          <div className="status-buttons">
            <button onClick={() => updateStatus("in-progress")}>Mark In-progress</button>
            <button onClick={() => updateStatus("resolved")}>Mark Resolved</button>
          </div>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map(c => (
            <div key={c._id} className="comment-item">
              <div><strong>{c.user.name}</strong> — {new Date(c.createdAt).toLocaleString()}</div>
              <div>{c.text}</div>
            </div>
          ))}

          <form onSubmit={addComment} className="comment-form">
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Add comment" required />
            <button type="submit">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
