import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('renders a 3x3 board and allows a move', () => {
  render(<App />);
  const cell0 = screen.getByTestId('board').querySelector('[data-cy="cell-0"]');
  expect(cell0).toBeInTheDocument();
  fireEvent.click(cell0);
  expect(cell0).toHaveTextContent(/X|O/);
});

test('prevents clicking occupied cell', () => {
  render(<App />);
  const cell0 = screen.getByTestId('board').querySelector('[data-cy="cell-0"]');
  fireEvent.click(cell0); // first move
  const text = cell0.textContent;
  fireEvent.click(cell0); // second invalid move
  expect(cell0.textContent).toBe(text); // unchanged
});
