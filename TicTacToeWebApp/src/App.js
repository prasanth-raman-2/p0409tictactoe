import React, { useEffect, useState } from 'react';
import './App.css';
import { TicTacToeGame } from './game/TicTacToeGame';
import { GameProvider } from './state/GameContext';
import { usePrefersColorScheme } from './hooks/usePrefersColorScheme';

/**
 * App is the root component that wires providers and global theme handling.
 * It renders the TicTacToeGame screen within the GameProvider.
 */
function App() {
  const prefersDark = usePrefersColorScheme();
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="App" data-testid="app-root">
      <header className="app-header">
        <nav className="navbar" aria-label="Main">
          <div className="brand">
            <span aria-hidden="true">⭕️❌</span>
            <span className="brand-text">Tic Tac Toe</span>
          </div>
          <div className="nav-actions">
            <button
              className="btn theme-toggle"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              data-cy="toggle-theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </nav>
      </header>

      <main className="container" id="main" tabIndex={-1}>
        <GameProvider>
          <TicTacToeGame />
        </GameProvider>
      </main>

      <footer className="footer" aria-label="Footer">
        <p className="sr-only" aria-live="polite">
          Theme is {theme} mode
        </p>
      </footer>
    </div>
  );
}

export default App;
