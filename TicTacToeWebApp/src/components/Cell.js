import React from 'react';

// PUBLIC_INTERFACE
export function Cell({ index, value, onPlay, ariaLabel, isWinning, disabled }) {
  /**
   * Single interactive cell for the Tic Tac Toe board.
   */
  return (
    <button
      type="button"
      className={`cell${isWinning ? ' winning' : ''}`}
      onClick={onPlay}
      aria-label={ariaLabel}
      aria-pressed={!!value}
      aria-disabled={disabled}
      disabled={disabled}
      data-value={value || ''}
      data-index={index}
    >
      {value || ''}
    </button>
  );
}
