import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CELL_COUNT, indicesToId, isCellEmpty } from '../logic/types';

/**
 * A single interactive cell in the board.
 * - Focusable button with aria-label describing position and content.
 * - Supports keyboard activation (Enter/Space) and arrow-key navigation across grid.
 */
const Cell = ({
  row,
  col,
  value,
  disabled,
  onSelect,
  focusRef,
}) => {
  const label = `Row ${row + 1}, Column ${col + 1}, ${value ? value : 'empty'}`;
  const isOccupied = Boolean(value);
  const handleClick = useCallback((e) => {
    e.preventDefault();
    onSelect(row, col);
  }, [row, col, onSelect]);

  return (
    <button
      ref={focusRef}
      type="button"
      className={`ttt-cell ${isOccupied ? 'occupied' : 'empty'}`}
      aria-label={label}
      aria-disabled={disabled || isOccupied}
      data-testid={`cell-${row}-${col}`}
      data-cell-state={isOccupied ? value : 'empty'}
      disabled={disabled || isOccupied}
      onClick={handleClick}
    >
      <span aria-hidden="true" className={`mark ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`}>
        {value || ''}
      </span>
    </button>
  );
};

/**
 * Board renders a 3x3 accessible grid with robust keyboard navigation.
 * - Uses roving tabindex strategy with internal focus index to support arrow navigation.
 * - Calls onCellSelect(row,col) on activation.
 */
export const Board = ({ board, isGameOver, onCellSelect, currentPlayer }) => {
  const flatCells = useMemo(() => {
    const arr = [];
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        arr.push({ r, c, id: indicesToId(r, c), value: board[r][c] });
      }
    }
    return arr;
  }, [board]);

  const [focusIndex, setFocusIndex] = useState(0);
  const cellRefs = useRef(Array.from({ length: CELL_COUNT }, () => React.createRef()));

  useEffect(() => {
    // Keep focus in bounds
    const idx = Math.min(Math.max(0, focusIndex), CELL_COUNT - 1);
    setFocusIndex(idx);
  }, [focusIndex]);

  useEffect(() => {
    // Auto focus first empty cell at start or after reset
    const firstEmptyIdx = flatCells.findIndex(c => isCellEmpty(c.value));
    const target = firstEmptyIdx >= 0 ? firstEmptyIdx : 0;
    setFocusIndex(target);
    const ref = cellRefs.current[target];
    if (ref && ref.current) {
      // Defer to ensure element exists
      setTimeout(() => ref.current && ref.current.focus(), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatCells.map(c => c.value).join('|')]);

  const handleKeyDown = (e) => {
    const row = Math.floor(focusIndex / 3);
    const col = focusIndex % 3;
    let next = focusIndex;
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        next = ((row + 2) % 3) * 3 + col;
        break;
      case 'ArrowDown':
        e.preventDefault();
        next = ((row + 1) % 3) * 3 + col;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        next = row * 3 + ((col + 2) % 3);
        break;
      case 'ArrowRight':
        e.preventDefault();
        next = row * 3 + ((col + 1) % 3);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onCellSelect(row, col);
        return;
      default:
        return;
    }
    setFocusIndex(next);
    const ref = cellRefs.current[next];
    if (ref && ref.current) ref.current.focus();
  };

  return (
    <div
      className="ttt-board"
      role="grid"
      aria-label="3 by 3 tic tac toe board"
      aria-rowcount={3}
      aria-colcount={3}
      onKeyDown={handleKeyDown}
      data-testid="board"
      data-current-player={currentPlayer}
    >
      {flatCells.map((cell, i) => (
        <div
          role="row"
          className="ttt-row"
          key={`row-${cell.r}-${Math.floor(i / 3)}`}
          aria-rowindex={cell.r + 1}
        >
          {/* Render row cells only when column is 0 to avoid duplicating rows */}
          {i % 3 === 0 && (
            <>
              {[0, 1, 2].map((col) => {
                const idx = cell.r * 3 + col;
                const c = flatCells[idx];
                return (
                  <div
                    role="gridcell"
                    aria-colindex={col + 1}
                    className="ttt-gridcell"
                    key={`cell-${cell.r}-${col}`}
                  >
                    <Cell
                      row={c.r}
                      col={c.c}
                      value={c.value}
                      disabled={isGameOver}
                      onSelect={onCellSelect}
                      focusRef={cellRefs.current[idx]}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
  );
};
