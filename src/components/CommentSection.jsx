import React, { useState, useEffect } from "react";
import axios from "../services/api"; // axios instance with baseURL

const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/tickets/${ticketId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [ticketId]);

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`/tickets/${ticketId}/comments`, {
        text: newComment,
      });
      setComments([...comments, res.data]); // update UI
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100 mt-4">
      <h3 className="font-bold mb-2">Comments</h3>
      
      {/* Existing comments */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c._id} className="bg-white p-2 rounded shadow">
              <p className="text-sm">{c.text}</p>
              <span className="text-xs text-gray-500">
                By {c.user?.name || "Unknown"} on{" "}
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* New comment form */}
      <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
