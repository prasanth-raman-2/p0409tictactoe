import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders game title and controls', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /tic tac toe/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
});

test('allows placing X then O and prevents overwriting', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });

  // X plays center
  fireEvent.click(cells[4]);
  expect(cells[4]).toHaveTextContent('X');

  // O tries to overwrite center (should not change)
  fireEvent.click(cells[4]);
  expect(cells[4]).toHaveTextContent('X');

  // O plays top-left
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('O');
});

test('detects a winning scenario', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });

  // X: 0, O: 3, X: 1, O: 4, X: 2 -> X wins top row
  fireEvent.click(cells[0]);
  fireEvent.click(cells[3]);
  fireEvent.click(cells[1]);
  fireEvent.click(cells[4]);
  fireEvent.click(cells[2]);

  expect(screen.getByText(/winner:\s*x/i)).toBeInTheDocument();
});
