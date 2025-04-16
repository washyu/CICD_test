import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/items', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '' });
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Template Project</h1>
      </header>
      <main>
        <section className="form-section">
          <h2>Add New Item</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Item'}
            </button>
          </form>
        </section>
        
        <section className="items-section">
          <h2>Items</h2>
          {loading && <p>Loading...</p>}
          {items.length === 0 && !loading ? (
            <p>No items found. Add your first item above.</p>
          ) : (
            <ul className="items-list">
              {items.map((item) => (
                <li key={item.id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
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
