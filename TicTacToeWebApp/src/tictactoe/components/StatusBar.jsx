import React from 'react';

/**
 * StatusBar displays current player, winner or draw, and accessible live messages.
 * It uses both polite and assertive live regions to announce updates to screen readers.
 */
export const StatusBar = ({
  currentPlayer,
  winner,
  isDraw,
  statusMessage,
  errorMessage,
  onDismissError,
}) => {
  const outcome = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'The game is a draw.'
    : `Current turn: ${currentPlayer}`;

  return (
    <section className="ttt-status" aria-labelledby="status-heading" data-testid="status-bar">
      <h2 id="status-heading" className="sr-only">Game status</h2>

      <div className="status-line" role="status" aria-live="polite">
        <span className="status-label" data-testid="status-outcome">{outcome}</span>
      </div>

      <div className="sr-only" aria-live="polite">
        {statusMessage}
      </div>

      {errorMessage && (
        <div
          className="error-banner"
          role="alert"
          aria-live="assertive"
          data-testid="error-banner"
        >
          <span className="error-text">{errorMessage}</span>
          <button
            type="button"
            className="error-dismiss"
            onClick={onDismissError}
            aria-label="Dismiss error"
            data-testid="btn-error-dismiss"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};
