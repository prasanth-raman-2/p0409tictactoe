import React from 'react';

// PUBLIC_INTERFACE
export function StatusBar({ currentPlayer, winner, isDraw, liveMessage }) {
  /**
   * Shows current status: turn, winner, or draw.
   * Contains an aria-live region for screen readers.
   */
  return (
    <div className="game-status" aria-live="polite" aria-atomic="true">
      <span className="sr-only live-region">{liveMessage}</span>
      {winner ? (
        <span>
          Winner: <strong>{winner}</strong>
          <span className="badge winner">Game Over</span>
        </span>
      ) : isDraw ? (
        <span>
          Draw
          <span className="badge draw">No moves left</span>
        </span>
      ) : (
        <span>
          Turn: <strong>{currentPlayer}</strong>
        </span>
      )}
    </div>
  );
}
