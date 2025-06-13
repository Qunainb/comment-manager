import { useState } from "react";

export default function CommentForm({ onAddComment }) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newComment = {
      author,
      comment,
      date: new Date().toISOString().slice(0, 10),
    };

    onAddComment(newComment);
    setAuthor("");
    setComment("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        required
      />
      <button type="submit">Add comment</button>
    </form>
  );
}
