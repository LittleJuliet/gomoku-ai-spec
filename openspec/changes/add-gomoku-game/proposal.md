# Change: Add local two-player gomoku game

## Why
Provide a simple local two-player gomoku experience with a fixed 15x15 board using a canvas-based UI.

## What Changes
- Add a local two-player gomoku game flow (black moves first, alternating turns)
- Render the 15x15 board and stones on a fixed-size canvas
- Show turn indicator, winner/draw dialog, and a restart control

## Impact
- Affected specs: play-gomoku
- Affected code: new Vue 2.7 + Vite app, Pinia store, canvas component, UI layout and styles
