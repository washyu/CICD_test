-- Initialize database schema

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data
INSERT INTO items (name, description) VALUES
  ('Sample Item 1', 'This is a description for the first sample item'),
  ('Sample Item 2', 'This is a description for the second sample item')
ON CONFLICT DO NOTHING;
