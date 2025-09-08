import React, { useEffect, useState } from 'react';
import './App.css';
import TicTacToeGame from './tictactoe/TicTacToeGame';

/**
 * App serves as the shell hosting the TicTacToeGame.
 * It also provides a simple theme toggle retained from the template.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /** Toggle between light and dark theme; accessible label is applied on the button. */
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" data-testid="app-root">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          data-testid="btn-theme-toggle"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <TicTacToeGame />
      </header>
    </div>
  );
}

export default App;
