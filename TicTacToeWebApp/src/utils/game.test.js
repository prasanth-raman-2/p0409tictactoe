import { calculateWinner, isDraw, nextPlayer } from './game';

test('nextPlayer starts with X', () => {
  expect(nextPlayer(Array(9).fill(null))).toBe('X');
});

test('calculateWinner identifies top row', () => {
  const board = ['X','X','X', null, null, null, null, null, null];
  const { winner, line } = calculateWinner(board);
  expect(winner).toBe('X');
  expect(line).toEqual([0,1,2]);
});

test('isDraw true for full board without winner', () => {
  const board = [
    'X','O','X',
    'X','O','O',
    'O','X','X'
  ];
  expect(isDraw(board)).toBe(true);
});
