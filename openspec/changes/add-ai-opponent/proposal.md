# Change: Add human vs AI (hard) mode

## Why
Expand gomoku gameplay by adding a challenging single-player mode while keeping local two-player intact.

## What Changes
- Add a mode selector in the side panel for Local Two-Player and Human vs AI (Hard)
- Introduce AI move logic that plays as White after the player (Black)
- Update turn/status labels to reflect player vs AI turns

## Impact
- Affected specs: play-gomoku
- Affected code: src/stores/game.js, src/App.vue, UI copy and mode controls
