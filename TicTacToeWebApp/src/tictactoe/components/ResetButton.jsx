import React, { useState } from 'react';

/**
 * ResetButton shows a prominent action with a confirmation step.
 * The confirmation is implemented inline to avoid blocking browser confirm dialogs
 * and to remain accessible and test-friendly.
 */
export const ResetButton = ({ onConfirmReset, isDisabled }) => {
  const [confirming, setConfirming] = useState(false);

  const requestConfirm = () => {
    setConfirming(true);
  };

  const cancel = () => {
    setConfirming(false);
  };

  const confirm = () => {
    setConfirming(false);
    onConfirmReset();
  };

  return (
    <div className="reset-wrapper">
      {!confirming ? (
        <button
          type="button"
          className="btn-reset"
          onClick={requestConfirm}
          disabled={isDisabled}
          aria-haspopup="dialog"
          aria-expanded={false}
          data-testid="btn-reset"
        >
          Reset Game
        </button>
      ) : (
        <div className="confirm-reset" role="dialog" aria-modal="false" aria-label="Confirm reset">
          <span className="confirm-text">Are you sure you want to reset?</span>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn-confirm"
              onClick={confirm}
              data-testid="btn-reset-confirm"
            >
              Yes, reset
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={cancel}
              data-testid="btn-reset-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
