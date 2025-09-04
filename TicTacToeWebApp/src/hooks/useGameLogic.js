import { useMemo, useState } from 'react';
import { calculateWinner, isDraw, nextPlayer } from '../utils/game';

// PUBLIC_INTERFACE
export function useGameLogic() {
  /**
   * Encapsulates Tic Tac Toe board, current player, winner/draw, history, and actions.
   * Provides a11y-friendly liveMessage for screen readers.
   */
  const [board, setBoard] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  const { winner, line: winnerLine } = useMemo(() => calculateWinner(board), [board]);
  const isDrawState = useMemo(() => isDraw(board), [board]);
  const currentPlayer = useMemo(() => (winner ? null : nextPlayer(board)), [board, winner]);

  const canUndo = step > 0;

  // PUBLIC_INTERFACE
  const playAt = (index) => {
    if (winner || isDrawState) return;
    if (board[index]) return;

    const player = currentPlayer || nextPlayer(board);
    const next = board.slice();
    next[index] = player;
    const newHistory = history.slice(0, step + 1).concat([next]);

    setBoard(next);
    setHistory(newHistory);
    setStep(step + 1);
  };

  // PUBLIC_INTERFACE
  const reset = () => {
    const empty = Array(9).fill(null);
    setBoard(empty);
    setHistory([empty]);
    setStep(0);
  };

  // PUBLIC_INTERFACE
  const undo = () => {
    if (!canUndo) return;
    const prevStep = step - 1;
    setStep(prevStep);
    setBoard(history[prevStep]);
    setHistory(history.slice(0, history.length - 1));
  };

  const liveMessage = useMemo(() => {
    if (winner) return `Game over. ${winner} wins.`;
    if (isDrawState) return 'Game over. Draw.';
    return `Player ${currentPlayer}'s turn.`;
  }, [winner, isDrawState, currentPlayer]);

  return {
    board,
    currentPlayer,
    winner,
    winnerLine,
    isDraw: isDrawState,
    canUndo,
    playAt,
    reset,
    undo,
    liveMessage,
  };
}
