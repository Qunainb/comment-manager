import { useState } from "react";

export default function CommentForm({ onAddComment }) {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newComment = {
      author,
      text,
      date: new Date().toISOString().slice(0, 10),
    };

    onAddComment(newComment);
    setAuthor("");
    setText("");
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
        value={text}
        onChange={(event) => setText(event.target.value)}
        required
      />
      <button type="submit">Add comment</button>
    </form>
  );
}
