const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

/**
 * PUBLIC_INTERFACE
 * Compute the winner for the current board.
 * @param {Array<('X'|'O'|null)>} board 9-length array
 * @returns {{winner: 'X'|'O'|null, line: number[]|null}}
 */
export function calculateWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * Checks if the board is in a draw state (no empty cells and no winner).
 * @param {Array<('X'|'O'|null)>} board
 * @returns {boolean}
 */
export function isDraw(board) {
  const { winner } = calculateWinner(board);
  return !winner && board.every((c) => c !== null);
}

/**
 * PUBLIC_INTERFACE
 * Returns next player symbol given current board.
 * @param {Array<('X'|'O'|null)>} board
 * @returns {'X'|'O'}
 */
export function getNextPlayer(board) {
  const xCount = board.filter((c) => c === 'X').length;
  const oCount = board.filter((c) => c === 'O').length;
  return xCount <= oCount ? 'X' : 'O';
}

/**
 * PUBLIC_INTERFACE
 * Returns a new board after applying a valid move. If move invalid, returns original board.
 * @param {Array<('X'|'O'|null)>} board
 * @param {number} index
 * @param {'X'|'O'} player
 * @returns {Array<('X'|'O'|null)>}
 */
export function applyMove(board, index, player) {
  if (index < 0 || index > 8) return board;
  if (board[index] !== null) return board;
  const { winner } = calculateWinner(board);
  if (winner) return board;
  const next = board.slice();
  next[index] = player;
  return next;
}

