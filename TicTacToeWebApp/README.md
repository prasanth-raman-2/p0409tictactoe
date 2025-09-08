# Lightweight React Template with Tic Tac Toe

This project now includes a fully accessible, responsive Tic Tac Toe game.

## Architecture Overview

- src/tictactoe/logic
  - gameEngine.js: Pure winner detection logic and extension hooks.
  - types.js: Constants, types, and pure helpers (e.g., win lines, validation).
- src/tictactoe/hooks
  - useTicTacToe.js: Encapsulates game state, move handling, error/status, and reset.
- src/tictactoe/components
  - Board.jsx: Accessible 3×3 grid with keyboard, mouse, and touch support.
  - StatusBar.jsx: ARIA live regions for status and error messages.
  - ResetButton.jsx: Prominent reset with confirmation.
- src/tictactoe/tictactoe.css: Minimalistic, responsive styles with clear focus/hover/occupied states.

## Extension Points

- AI Opponent: Implement GameEngine.onAfterPlayerMove to compute AI moves after human plays.
- Multiplayer: Replace move source by subscribing to remote events and calling useTicTacToe handlers.
- Analytics/Telemetry: Subscribe to updates in useTicTacToe to track moves/outcomes.

All logic is client-side only; no backend or env configuration required.

## Run

- npm start: start the dev server
- npm test: run unit tests
- npm run build: create a static build suitable for static hosting

