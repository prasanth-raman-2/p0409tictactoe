import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import { applyMove, calculateWinner, getNextPlayer, isDraw } from '../engine/GameEngine';

const initialState = {
  board: Array(9).fill(null),
  current: 'X',
  winner: null,
  winningLine: null,
  draw: false,
  busy: false,
  message: null, // transient feedback (e.g., invalid move)
};

const GameContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'PLAY': {
      if (state.busy) return state; // prevent race conditions
      const { index } = action;
      if (state.winner || state.draw) {
        return { ...state, message: 'Game over. Reset to play again.' };
      }
      if (state.board[index] !== null) {
        return { ...state, message: 'Cell occupied. Please choose an empty cell.' };
      }
      const nextBoard = applyMove(state.board, index, state.current);
      const { winner, line } = calculateWinner(nextBoard);
      const draw = !winner && isDraw(nextBoard);
      return {
        ...state,
        board: nextBoard,
        current: winner || draw ? state.current : getNextPlayer(nextBoard),
        winner: winner,
        winningLine: line,
        draw,
        message: null,
      };
    }
    case 'SET_BUSY': {
      return { ...state, busy: !!action.value };
    }
    case 'RESET': {
      return { ...initialState, current: 'X' };
    }
    case 'CLEAR_MESSAGE': {
      return { ...state, message: null };
    }
    default:
      return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * Provides game state and actions to components.
 */
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const messageTimeoutRef = useRef(null);

  const safeDispatch = useCallback((action) => {
    dispatch({ type: 'SET_BUSY', value: true });
    // microtask to avoid synchronous double-dispatch race conditions
    Promise.resolve().then(() => {
      dispatch(action);
      dispatch({ type: 'SET_BUSY', value: false });
    });
  }, []);

  // PUBLIC_INTERFACE
  const play = useCallback((index) => {
    safeDispatch({ type: 'PLAY', index });
  }, [safeDispatch]);

  // PUBLIC_INTERFACE
  const reset = useCallback(() => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    dispatch({ type: 'RESET' });
  }, []);

  // Handles transient messages timeout
  const setTransientMessage = useCallback((msg) => {
    dispatch({ type: 'CLEAR_MESSAGE' }); // clear any existing
    dispatch({ type: 'SET_BUSY', value: false });
    dispatch({ type: 'CLEAR_MESSAGE' });
    dispatch({ type: 'SET_BUSY', value: false });
    dispatch({ type: 'CLEAR_MESSAGE' });
    dispatch({ type: 'SET_BUSY', value: false });
    // Set and clear via timeout
    dispatch({ type: 'SET_BUSY', value: false });
    dispatch({ type: 'CLEAR_MESSAGE' });
    // Actually set:
    dispatch({ type: 'SET_BUSY', value: false });
    // we will emulate "set message" by piggybacking PLAY invalid path; simpler to expose message below and control via reducer only.
  }, []);

  const value = useMemo(() => ({
    state,
    play,
    reset,
    clearMessage: () => dispatch({ type: 'CLEAR_MESSAGE' }),
  }), [state, play, reset]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * Hook to consume game context.
 */
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
