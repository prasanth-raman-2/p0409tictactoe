import { WIN_LINES } from './types';

/**
 * GameEngine
 * Encapsulates pure logic for determining winners and future extension points.
 */
export class GameEngine {
  // PUBLIC_INTERFACE
  checkWinner(board) {
    /**
     * Determine the winner by scanning precomputed win lines.
     * Returns 'X' or 'O' if there is a winner; otherwise null.
     */
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      const v1 = board[a[0]][a[1]];
      const v2 = board[b[0]][b[1]];
      const v3 = board[c[0]][c[1]];
      if (v1 && v1 === v2 && v2 === v3) {
        return v1;
      }
    }
    return null;
  }

  // Example extension point for future AI turn handling
  // onAfterPlayerMove(board, nextPlayer, setBoard, setCurrentPlayer, setWinner, setIsDraw, updateStatus) {}
}
