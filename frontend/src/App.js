import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("https://notes-app-1dz8.onrender.com/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      if (editId) {
        // Edit existing note
        const res = await axios.put(
          `https://notes-app-1dz8.onrender.com/api/notes/${editId}`,
          { title, description }
        );
        setNotes(notes.map((note) => (note._id === editId ? res.data : note)));
        setEditId(null);
      } else {
        // Add new note
        const res = await axios.post(
          "https://notes-app-1dz8.onrender.com/api/notes",
          { title, description }
        );
        setNotes([...notes, res.data]);
      }

      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`https://notes-app-1dz8.onrender.com/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Start Editing
  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setDescription(note.description);
  };

  return (
    <div className="container">
      <h1>🗒️ My Notes</h1>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
      </form>

      <hr />

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <small>📅 {new Date(note.date).toLocaleString()}</small>
              <div>
                <button onClick={() => handleEdit(note)} className="edit-btn">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
