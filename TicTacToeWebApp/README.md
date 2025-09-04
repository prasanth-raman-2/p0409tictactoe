# TicTacToeWebApp

A fully functional, accessible, and responsive Tic Tac Toe web application built with React. It supports:
- Interactive cell selection and mark placement
- Real-time game status updates
- Visual and accessible feedback for actions
- Keyboard navigation and screen reader compatibility
- Game reset and undo functionality
- Responsive design and theme toggle (light/dark)
- Test coverage for core logic and UI behavior

No backend is required; this is a static SPA.

## Quick start

- npm install
- npm start
- npm test
- npm run build

## User stories

- As a player, I can start a new game and see an empty 3x3 board.
- As a player, I can use mouse or keyboard to select a cell and place my mark.
- As a player, I see whose turn it is in real time.
- As a player, I am prevented from playing in an occupied or finished game.
- As a player, I see when the game is won or drawn, with the winning line highlighted.
- As a player, I can reset the game at any time.
- As a player who uses a screen reader, I can understand the board state and actions through ARIA labels and live regions.
- As a player on mobile, I get a responsive layout and large tap targets.

## Accessibility

- Board is a grid with proper roles and labels.
- Each cell is a button with descriptive aria-labels and state.
- Live region announces turn changes and results.
- Full keyboard support: Tab to move focus, Enter/Space to play, Arrow keys to navigate cells (roving tabindex).
- High-contrast focused states and sufficient color contrast.

## Project structure

- src/components: Board, Cell, StatusBar, Controls
- src/hooks: useGameLogic, useTheme
- src/utils: game (pure logic)
- src/styles: App.css (layout, theme) + tictactoe.css (game styles)

## Environment

This container requires no environment variables.

## License

MIT
