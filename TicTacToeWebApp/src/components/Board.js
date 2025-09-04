import React, { useCallback, useEffect, useRef } from 'react';
import { Cell } from './Cell';

// PUBLIC_INTERFACE
export function Board({ board, currentPlayer, onCellPlay, winnerLine, isGameOver }) {
  /**
   * Renders 3x3 board as an accessible grid. Provides arrow key navigation.
   */
  const gridRef = useRef(null);

  const focusCell = useCallback((idx) => {
    const grid = gridRef.current;
    if (!grid) return;
    const btn = grid.querySelector(`[data-index="${idx}"]`);
    btn && btn.focus();
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      const target = e.target;
      const idx = Number(target.getAttribute('data-index'));
      if (Number.isNaN(idx)) return;

      const row = Math.floor(idx / 3);
      const col = idx % 3;

      let nextIdx = idx;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          nextIdx = row > 0 ? idx - 3 : idx;
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextIdx = row < 2 ? idx + 3 : idx;
          break;
        case 'ArrowLeft':
          e.preventDefault();
          nextIdx = col > 0 ? idx - 1 : idx;
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextIdx = col < 2 ? idx + 1 : idx;
          break;
        default:
          return;
      }
      if (nextIdx !== idx) focusCell(nextIdx);
    },
    [focusCell]
  );

  useEffect(() => {
    // focus first empty cell on mount for better keyboard flow
    const firstEmpty = board.findIndex((c) => !c);
    if (firstEmpty >= 0) focusCell(firstEmpty);
  }, [board, focusCell]);

  const getCellAria = (i) => {
    const value = board[i] || 'Empty';
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    const pos = `row ${row}, column ${col}`;
    const playHint = board[i] || isGameOver ? '' : ` Press Enter to place ${currentPlayer}.`;
    return `Cell ${pos}. ${value}.${playHint}`;
  };

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-rowcount={3}
      aria-colcount={3}
      ref={gridRef}
      onKeyDown={onKeyDown}
    >
      {board.map((value, i) => (
        <Cell
          key={i}
          index={i}
          value={value}
          onPlay={() => onCellPlay(i)}
          ariaLabel={getCellAria(i)}
          isWinning={winnerLine ? winnerLine.includes(i) : false}
          disabled={!!value || isGameOver}
        />
      ))}
    </div>
  );
}
