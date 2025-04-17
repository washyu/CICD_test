const request = require('supertest');
const { createApp } = require('../server');

// Mock the database connection
const mockDb = {
  query: jest.fn()
};

describe('API Endpoints', () => {
  let app;

  beforeEach(() => {
    // Reset mock before each test
    mockDb.query.mockReset();
    app = createApp(mockDb);
  });

  describe('GET /api/notes', () => {
    it('should return all notes', async () => {
      // Mock the database response
      const mockNotes = [
        { id: 1, content: 'Test note 1' },
        { id: 2, content: 'Test note 2' }
      ];
      
      mockDb.query.mockImplementation((query, callback) => {
        callback(null, mockNotes);
      });

      const response = await request(app).get('/api/notes');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotes);
      expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM notes', expect.any(Function));
    });

    it('should handle database errors', async () => {
      // Mock a database error
      mockDb.query.mockImplementation((query, callback) => {
        callback(new Error('Database error'), null);
      });

      const response = await request(app).get('/api/notes');
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const newNote = { content: 'New test note' };
      const mockResult = { insertId: 3 };
      
      mockDb.query.mockImplementation((query, values, callback) => {
        callback(null, mockResult);
      });

      const response = await request(app)
        .post('/api/notes')
        .send(newNote);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 3, content: 'New test note' });
      expect(mockDb.query).toHaveBeenCalledWith(
        'INSERT INTO notes (content) VALUES (?)',
        [newNote.content],
        expect.any(Function)
      );
    });

    it('should validate request body', async () => {
      const response = await request(app)
        .post('/api/notes')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Content is required');
      expect(mockDb.query).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      const newNote = { content: 'New test note' };
      
      mockDb.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database error'), null);
      });

      const response = await request(app)
        .post('/api/notes')
        .send(newNote);
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });
});
