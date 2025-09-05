import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGame } from '../state/GameContext';

/**
 * PUBLIC_INTERFACE
 * TicTacToeGame renders the game board and controls.
 * Accessibility:
 * - Board has role="grid", rows role="row", cells role="gridcell" with aria-rowindex/aria-colindex.
 * - aria-live regions announce status updates.
 * - Keyboard: arrow keys move focus within the grid; Enter/Space plays.
 * - Cypress hooks via data-cy attributes for E2E tests.
 */
export function TicTacToeGame() {
  const { state, play, reset, clearMessage } = useGame();
  const { board, current, winner, winningLine, draw, message } = state;
  const gridRef = useRef(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [invalidIndex, setInvalidIndex] = useState(null);
  const liveRef = useRef(null);

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return 'Game ended in a draw.';
    return `Turn: Player ${current}`;
  }, [winner, draw, current]);

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = statusText;
    }
  }, [statusText]);

  // Clear transient message after a short delay
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => clearMessage(), 1800);
    return () => clearTimeout(t);
  }, [message, clearMessage]);

  const onCellClick = useCallback((idx) => {
    if (board[idx] !== null || winner || draw) {
      // subtle feedback
      setInvalidIndex(idx);
      setTimeout(() => setInvalidIndex(null), 450);
      return;
    }
    play(idx);
  }, [board, winner, draw, play]);

  const onCellKeyDown = useCallback((e, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;

    const focusCell = (r, c) => {
      const next = r * 3 + c;
      const cell = gridRef.current?.querySelector(`[data-index="${next}"]`);
      cell?.focus();
    };

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        focusCell(row, Math.min(2, col + 1));
        break;
      case 'ArrowLeft':
        e.preventDefault();
        focusCell(row, Math.max(0, col - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusCell(Math.min(2, row + 1), col);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusCell(Math.max(0, row - 1), col);
        break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        onCellClick(idx);
        break;
      default:
        break;
    }
  }, [onCellClick]);

  const handleReset = useCallback(() => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    reset();
    setConfirmReset(false);
    // Move focus to first cell after reset
    setTimeout(() => {
      const first = gridRef.current?.querySelector('[data-index="0"]');
      first?.focus();
    }, 0);
  }, [confirmReset, reset]);

  const cancelReset = useCallback(() => setConfirmReset(false), []);

  return (
    <section className="game-card" aria-labelledby="game-title">
      <div className="header-row">
        <h1 id="game-title" className="title">Tic Tac Toe</h1>
        <div className="controls">
          {!confirmReset && (
            <button
              type="button"
              className="btn danger"
              onClick={handleReset}
              aria-describedby="reset-help"
              data-cy="reset-btn"
            >
              Reset Game
            </button>
          )}
          {confirmReset && (
            <>
              <span role="alert" aria-live="assertive" className="helper" data-cy="reset-confirm">
                Confirm reset?
              </span>
              <button
                type="button"
                className="btn danger"
                onClick={handleReset}
                data-cy="reset-confirm-yes"
              >
                Yes
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={cancelReset}
                data-cy="reset-confirm-no"
              >
                No
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className={`status${message ? ' error' : ''}`}
        role="status"
        aria-live="polite"
        data-cy="status"
      >
        <span className="badge" aria-hidden="true">
          {winner ? '🏆' : draw ? '🤝' : current === 'X' ? '❌' : '⭕️'}
        </span>
        <p className="text">
          {message ? message : statusText}
          {!winner && !draw && (
            <span className={current === 'X' ? 'player-x' : 'player-o'} aria-hidden="true">
              {current === 'X' ? ' (X)' : ' (O)'}
            </span>
          )}
        </p>
        <span id="reset-help" className="sr-only">
          Reset clears the board and starts a new game. Confirmation required to avoid accidental reset.
        </span>
        <span ref={liveRef} className="sr-only" aria-live="polite" />
      </div>

      <div className="board-wrapper">
        <Board
          ref={gridRef}
          board={board}
          winningLine={winningLine}
          disabled={!!winner || !!draw}
          onCellClick={onCellClick}
          onCellKeyDown={onCellKeyDown}
          invalidIndex={invalidIndex}
        />
        <p className="helper">
          Use Arrow keys to move, Enter or Space to play. Click or tap on an empty cell to place your mark.
        </p>
      </div>
    </section>
  );
}

const Board = React.forwardRef(function Board(
  { board, winningLine, disabled, onCellClick, onCellKeyDown, invalidIndex },
  ref
) {
  return (
    <div
      ref={ref}
      className="board"
      role="grid"
      aria-label="Tic Tac Toe Board"
      aria-rowcount={3}
      aria-colcount={3}
      data-cy="board"
    >
      {[0, 1, 2].map(r => (
        <div role="row" aria-rowindex={r + 1} key={`row-${r}`}>
          {[0, 1, 2].map(c => {
            const idx = r * 3 + c;
            const val = board[idx];
            const occupied = val !== null;
            const isWinning = winningLine?.includes(idx);
            const cls = [
              'cell',
              occupied ? 'occupied' : 'empty',
              invalidIndex === idx ? 'invalid' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const markClass = val === 'X' ? 'mark-x' : val === 'O' ? 'mark-o' : '';
            const ariaLabel = `Row ${r + 1}, Column ${c + 1}, ${val ? `occupied by ${val}` : 'empty'}`;
            const ariaSelected = !!isWinning;

            return (
              <button
                key={idx}
                type="button"
                role="gridcell"
                aria-rowindex={r + 1}
                aria-colindex={c + 1}
                aria-label={ariaLabel}
                aria-selected={ariaSelected}
                className={cls}
                data-index={idx}
                data-cy={`cell-${idx}`}
                onClick={() => !disabled && onCellClick(idx)}
                onKeyDown={(e) => !disabled && onCellKeyDown(e, idx)}
                tabIndex={0}
                disabled={disabled || occupied}
              >
                <span className={markClass} aria-hidden="true">
                  {val ?? ''}
                </span>
                <span className="sr-only">{val ? (val === 'X' ? 'X' : 'O') : ''}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
});
