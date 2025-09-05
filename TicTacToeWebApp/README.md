# TicTacToeWebApp

An accessible, responsive, and minimalistic Tic Tac Toe application built with React. This app implements robust game logic, ARIA-friendly UI, keyboard navigation, win/draw detection, reset with confirmation, and testing hooks for Cypress.

## Highlights

- Responsive 3x3 grid board with clear boundaries
- Mouse, touch, and full keyboard interaction (arrows to move, Enter/Space to play)
- Immediate mark placement, turn alternation, win/draw detection
- Prevents invalid actions (occupied cell, after game end) with subtle feedback
- Prominent Reset with confirmation (prevents accidental reset)
- Accessible: roles, labels, aria-live announcements, visible focus indicators
- Minimalistic, theme-aware UI (light/dark)
- Cypress test hooks (data-cy) and unit tests
- SOLID-friendly modular architecture; ready for AI/multiplayer extensions

## Getting Started

- `npm start` — Run development server
- `npm test` — Run unit tests
- `npm run build` — Create production build

Open http://localhost:3000 in your browser.

## Architecture

- src/engine/GameEngine.js — Pure game logic (win/draw, applyMove, next player)
- src/state/GameContext.js — Centralized state with reducer to avoid race conditions
- src/game/TicTacToeGame.js — UI components (board, status, controls) with ARIA/keyboard support
- src/hooks/usePrefersColorScheme.js — Sets initial theme based on user preference
- src/App.js — Root component wiring provider and theme toggle

Extension points:
- Add AI: create a player module to compute next move and dispatch play(index)
- Add multiplayer: replace play action to sync with remote peer or server

## Accessibility

- Board uses role="grid", cells role="gridcell" with row/col indices
- aria-live regions announce status updates and outcomes
- Keyboard: arrow keys navigate cells; Enter/Space to place mark
- Visible focus outlines and non-color-only cues

## Cypress

The UI includes data-cy attributes:
- `data-cy="board"`
- `data-cy="cell-<index>"`
- `data-cy="status"`
- `data-cy="reset-btn"`
- `data-cy="reset-confirm"`, `data-cy="reset-confirm-yes"`, `data-cy="reset-confirm-no"`
- `data-cy="toggle-theme"`

Integrate Cypress in your pipeline to run E2E and accessibility tests.

## Deployment

This is a static SPA and can be deployed on Netlify, Vercel, GitHub Pages or any static host:
- Build using `npm run build`
- Serve the `build/` directory
- Use relative asset paths (default CRA settings are compatible)

## Notes

- The code is organized for maintainability and future feature additions.
- No backend integration is required for current functionality.
