export const PLAYER_X = 'X';
export const PLAYER_O = 'O';
export const PLAYER_MARKS = [PLAYER_X, PLAYER_O];

export const INITIAL_PLAYER = PLAYER_X;
export const CELL_COUNT = 9;

export const EMPTY_BOARD = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const safeCloneBoard = (board) => board.map(row => [...row]);

export const isCellEmpty = (cell) => cell === null;

export const isValidMove = (board, row, col) =>
  row >= 0 && row < 3 && col >= 0 && col < 3 && isCellEmpty(board[row][col]);

export const getNextPlayer = (current) => (current === PLAYER_X ? PLAYER_O : PLAYER_X);

export const indicesToId = (row, col) => row * 3 + col;

export const WIN_LINES = [
  // Rows
  [[0,0],[0,1],[0,2]],
  [[1,0],[1,1],[1,2]],
  [[2,0],[2,1],[2,2]],
  // Cols
  [[0,0],[1,0],[2,0]],
  [[0,1],[1,1],[2,1]],
  [[0,2],[1,2],[2,2]],
  // Diagonals
  [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]],
];

export const isBoardFull = (board) => {
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (board[r][c] === null) return false;
    }
  }
  return true;
};
