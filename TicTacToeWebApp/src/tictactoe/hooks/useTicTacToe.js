import { useCallback, useMemo, useRef, useState } from 'react';
import {
  EMPTY_BOARD,
  getNextPlayer,
  INITIAL_PLAYER,
  isBoardFull,
  isValidMove,
  PLAYER_MARKS,
  safeCloneBoard,
} from '../logic/types';
import { GameEngine } from '../logic/gameEngine';

const ENGINE = new GameEngine();

/**
 * useTicTacToe
 * Encapsulates game state, move handling, and status logic.
 * Designed for extensibility (e.g., pluggable AI via ENGINE.onAfterPlayerMove).
 */
export const useTicTacToe = () => {
  const [board, setBoard] = useState(EMPTY_BOARD());
  const [currentPlayer, setCurrentPlayer] = useState(INITIAL_PLAYER);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Game started. Player X goes first.');
  const [errorMessage, setErrorMessage] = useState('');
  const isProcessingMove = useRef(false);

  const isGameOver = useMemo(() => Boolean(winner) || isDraw, [winner, isDraw]);

  const clearError = useCallback(() => setErrorMessage(''), []);

  const updateStatus = useCallback((msg) => {
    setStatusMessage(msg);
  }, []);

  const handleCellSelect = useCallback((row, col) => {
    if (isProcessingMove.current) {
      // Prevent race conditions on rapid multi-input
      return;
    }
    isProcessingMove.current = true;

    try {
      if (winner || isDraw) {
        setErrorMessage('The game is over. Please reset to play again.');
        return;
      }
      if (!isValidMove(board, row, col)) {
        setErrorMessage('Invalid move. Please select an empty cell.');
        return;
      }

      // Apply move
      const nextBoard = safeCloneBoard(board);
      nextBoard[row][col] = currentPlayer;
      setBoard(nextBoard);

      // Check for win/draw
      const winResult = ENGINE.checkWinner(nextBoard);
      if (winResult) {
        setWinner(winResult);
        updateStatus(`Player ${winResult} wins!`);
        return;
      }
      if (isBoardFull(nextBoard)) {
        setIsDraw(true);
        updateStatus('The game is a draw.');
        return;
      }

      // Next turn
      const nextPlayer = getNextPlayer(currentPlayer);
      setCurrentPlayer(nextPlayer);
      updateStatus(`Player ${nextPlayer}'s turn.`);

      // Extension point: post-move hook (e.g., AI response)
      // ENGINE.onAfterPlayerMove?.(nextBoard, nextPlayer, setBoard, setCurrentPlayer, setWinner, setIsDraw, updateStatus);
    } catch (e) {
      console.error(e);
      setErrorMessage('An unexpected error occurred. Please try again or reset the game.');
    } finally {
      isProcessingMove.current = false;
    }
  }, [board, currentPlayer, winner, isDraw, updateStatus]);

  // PUBLIC_INTERFACE
  const resetGame = useCallback(() => {
    setBoard(EMPTY_BOARD());
    setCurrentPlayer(INITIAL_PLAYER);
    setWinner(null);
    setIsDraw(false);
    setStatusMessage('Game reset. Player X goes first.');
    setErrorMessage('');
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    isGameOver,
    handleCellSelect,
    resetGame,
    statusMessage,
    errorMessage,
    clearError,
    PLAYER_MARKS, // exported for potential UI use or tests
  };
};
