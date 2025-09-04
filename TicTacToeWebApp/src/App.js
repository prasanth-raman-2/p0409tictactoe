import React from 'react';
import './App.css';
import './styles/tictactoe.css';
import { useTheme } from './hooks/useTheme';
import { Board } from './components/Board';
import { StatusBar } from './components/StatusBar';
import { Controls } from './components/Controls';
import { useGameLogic } from './hooks/useGameLogic';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root app renders the Tic Tac Toe game with theme toggle, status, board, and controls.
   * It adheres to accessibility best practices and provides keyboard and screen reader support.
   */
  const { theme, toggleTheme } = useTheme();
  const game = useGameLogic();

  return (
    <div className="App">
      <header className="App-header" aria-label="Tic Tac Toe Application">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <h1 className="app-title">Tic Tac Toe</h1>
        <StatusBar
          currentPlayer={game.currentPlayer}
          winner={game.winner}
          isDraw={game.isDraw}
          liveMessage={game.liveMessage}
        />

        <Board
          board={game.board}
          currentPlayer={game.currentPlayer}
          onCellPlay={game.playAt}
          winnerLine={game.winnerLine}
          isGameOver={!!game.winner || game.isDraw}
        />

        <Controls
          onReset={game.reset}
          onUndo={game.undo}
          canUndo={game.canUndo}
          isGameOver={!!game.winner || game.isDraw}
        />
      </header>
    </div>
  );
}

export default App;
