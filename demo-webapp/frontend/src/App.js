import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/api/notes');
    setNotes(response.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/notes', { content: newNote });
    setNewNote('');
    fetchNotes();
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