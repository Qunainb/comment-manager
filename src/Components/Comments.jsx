import { useEffect, useState } from "react";

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

  return (
    <div>
      <h2>Comment Manager</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message || "Failed to fetch comments"}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.author}:</strong> {comment.text} {comment.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
