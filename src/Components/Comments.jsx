import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/comments";

  useEffect(() => {
    async function fetchComments() {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, []);

  async function handleAddComment(comment) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(" Failed to add comment");
      }

      const newComment = await response.json();
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      setError(error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      setError(error);
    }
  }

  async function handleUpdate(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ text: "Updated Comment" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      const updatedComment = await response.json();

      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? updatedComment : comment))
      );
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <h2>Comment Manager</h2>
      <CommentForm onAddComment={handleAddComment} />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message || "Failed to fetch comments"}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author}:</strong> {comment.text} {comment.date}
            <button onClick={() => handleDelete(comment.id)}>❌</button>
            <button onClick={() => handleUpdate(comment.id)}>✏️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
