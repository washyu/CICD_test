import { render, screen } from '@testing-library/react';
// Mock axios to avoid actual API calls
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}));

// Import App after mocking dependencies
import App from './App';

test('renders Demo Notes App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Demo Notes App/i);
  expect(titleElement).toBeInTheDocument();
});
