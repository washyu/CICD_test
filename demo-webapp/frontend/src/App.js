import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL from environment or use default
const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/notes`, { content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Demo Notes App</h1>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a new note"
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;