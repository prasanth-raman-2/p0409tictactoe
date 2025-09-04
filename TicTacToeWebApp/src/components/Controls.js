import React from 'react';

// PUBLIC_INTERFACE
export function Controls({ onReset, onUndo, canUndo, isGameOver }) {
  /**
   * Renders Undo and Reset buttons.
   */
  return (
    <div className="controls" role="group" aria-label="Game controls">
      <button
        type="button"
        className="btn secondary"
        onClick={onUndo}
        disabled={!canUndo}
        aria-disabled={!canUndo}
        aria-label="Undo last move"
      >
        ↩️ Undo
      </button>
      <button
        type="button"
        className="btn"
        onClick={onReset}
        aria-label={isGameOver ? 'Start a new game' : 'Reset current game'}
      >
        🔄 {isGameOver ? 'New Game' : 'Reset'}
      </button>
    </div>
  );
}
