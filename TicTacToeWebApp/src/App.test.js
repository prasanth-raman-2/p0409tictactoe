import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tic tac toe components', () => {
  render(<App />);
  expect(screen.getByTestId('ttt-container')).toBeInTheDocument();
  expect(screen.getByTestId('board')).toBeInTheDocument();
  expect(screen.getByTestId('status-bar')).toBeInTheDocument();
  expect(screen.getByTestId('btn-reset')).toBeInTheDocument();
});

test('allows making a valid move and prevents overwriting', () => {
  render(<App />);
  const cell00 = screen.getByTestId('cell-0-0');
  fireEvent.click(cell00);
  expect(cell00).toHaveAttribute('data-cell-state', 'X');
  // Try to click again; should remain X
  fireEvent.click(cell00);
  expect(cell00).toHaveAttribute('data-cell-state', 'X');
});

test('reset confirmation flow', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('btn-reset'));
  expect(screen.getByTestId('btn-reset-confirm')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('btn-reset-cancel'));
  expect(screen.queryByTestId('btn-reset-confirm')).not.toBeInTheDocument();
});
