 // PUBLIC_INTERFACE
 export const LINES = [
   [0,1,2],[3,4,5],[6,7,8],
   [0,3,6],[1,4,7],[2,5,8],
   [0,4,8],[2,4,6]
 ];

 // PUBLIC_INTERFACE
 export function calculateWinner(board) {
   /** Determine winner and winning line. Returns { winner: 'X'|'O'|null, line: number[]|null } */
   for (const line of LINES) {
     const [a, b, c] = line;
     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
       return { winner: board[a], line };
     }
   }
   return { winner: null, line: null };
 }

 // PUBLIC_INTERFACE
 export function isDraw(board) {
   /** Check if board is full and no winner. */
   return board.every(Boolean) && !calculateWinner(board).winner;
 }

 // PUBLIC_INTERFACE
 export function nextPlayer(board) {
   /** Return next player by counting filled cells. X always starts. */
   const moves = board.filter(Boolean).length;
   return moves % 2 === 0 ? 'X' : 'O';
 }
