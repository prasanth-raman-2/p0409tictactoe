import React from 'react';
import './tictactoe.css';
import { useTicTacToe } from './hooks/useTicTacToe';
import { Board } from './components/Board';
import { StatusBar } from './components/StatusBar';
import { ResetButton } from './components/ResetButton';

/**
 * TicTacToeGame
 * A fully accessible, responsive tic tac toe game component.
 * - Renders a 3x3 grid, supports mouse, touch, and full keyboard interaction.
 * - Provides ARIA live regions for status and error messages.
 * - Prevents invalid moves and moves after game end.
 * - Offers a protected Reset button with confirmation.
 * - Designed with extensibility in mind via useTicTacToe hook and GameEngine utilities.
 */
const TicTacToeGame = () => {
  const {
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
  } = useTicTacToe();

  return (
    <main className="ttt-container" aria-labelledby="game-title" data-testid="ttt-container">
      <div className="ttt-content">
        <h1 id="game-title" className="ttt-title">Tic Tac Toe</h1>

        <StatusBar
          currentPlayer={currentPlayer}
          winner={winner}
          isDraw={isDraw}
          statusMessage={statusMessage}
          errorMessage={errorMessage}
          onDismissError={clearError}
        />

        <section
          className="ttt-board-wrapper"
          aria-label="Tic tac toe game board"
        >
          <Board
            board={board}
            isGameOver={isGameOver}
            onCellSelect={handleCellSelect}
            currentPlayer={currentPlayer}
          />
        </section>

        <div className="ttt-actions">
          <ResetButton onConfirmReset={resetGame} isDisabled={false} />
        </div>

        <section className="ttt-instructions" aria-labelledby="instructions-title">
          <h2 id="instructions-title" className="sr-only">Instructions</h2>
          <ul>
            <li>Use mouse/touch or keyboard to play:
              Arrow keys to move, Enter/Space to place a mark.</li>
            <li>First player is X. Turns alternate automatically.</li>
            <li>Press Reset Game to start a new match.</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default TicTacToeGame;
