## Context
Build a minimal local two-player gomoku game using Vue 2.7, Vite, and Pinia. The board is rendered on a fixed-size canvas with click interaction. No networking, AI, undo, or responsive scaling.

## Goals / Non-Goals
- Goals: local two-player play, 15x15 board, turn indicator, win/draw dialogs, restart control
- Non-Goals: AI opponent, online multiplayer, undo/history, timers, responsive canvas, TypeScript

## Decisions
- Use a single canvas for board and stones; redraw on state changes
- Store board state as a 15x15 2D array in Pinia with current player and game status
- Map clicks to nearest grid intersection and reject occupied cells
- Detect wins by counting consecutive stones in four directions from the last move
- Use a simple modal/dialog overlay for win/draw notifications

## Risks / Trade-offs
- Click-to-grid mapping may feel imprecise if spacing is too tight; keep clear grid spacing
- Full-canvas redraw each move is simplest and sufficient for 15x15 performance

## Migration Plan
No migration required (new feature).

## Open Questions
None.
