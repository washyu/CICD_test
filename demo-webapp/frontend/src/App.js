import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
      <header className="App-header">
        <h1>Demo Notes App</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>Add New Note</h2>
          <form onSubmit={addNote}>
            <div className="form-group">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Enter a new note"
                required
              />
              <button type="submit">Add Note</button>
            </div>
          </form>
        </section>

        <section className="notes-section">
          <h2>Notes</h2>
          {notes.length === 0 ? (
            <p>No notes found. Add your first note above.</p>
          ) : (
            <ul className="notes-list">
              {notes.map((note, index) => (
                <li key={note.id || index} className="note-item">
                  {note.content}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
