## Context
The app currently supports local two-player gomoku on a fixed 15x15 canvas. This change adds a single-player mode with a hard AI opponent, while preserving the existing local two-player mode.

## Goals / Non-Goals
- Goals: add a selectable human vs AI mode; AI plays White; player plays Black and moves first; AI makes automatic moves with a hard strategy
- Non-Goals: online multiplayer, undo/history, timers, responsive canvas, TypeScript

## Decisions
- Store a game mode value (e.g., local vs ai-hard) alongside existing game state.
- When in AI mode, clicks are only accepted on the player's turn; after a valid player move, the AI computes and places a move automatically if the game is still playing.
- AI strategy uses a deterministic, fast heuristic with mandatory tactical steps:
  1) play an immediate winning move if available
  2) otherwise block any immediate player winning move
  3) otherwise choose the highest-scoring move from a pattern-based heuristic (favoring open fours, open threes, and central control)
- Candidate selection may be limited to empty intersections near existing stones (plus center on an empty board) to keep evaluation small while still strong.

## Risks / Trade-offs
- Pure heuristic play can still be outsmarted; the mandated win/block steps and aggressive weights are used to make wins difficult.
- Constraining candidate moves improves speed but could miss long-range tactics; keep radius conservative and include center early-game.

## Migration Plan
No migration required (new mode).

## Open Questions
None.
