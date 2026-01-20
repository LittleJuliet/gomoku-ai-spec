## ADDED Requirements
### Requirement: Canvas Board Rendering
The system SHALL render a 15x15 gomoku board on a fixed-size canvas.

#### Scenario: Board displayed
- **WHEN** the game screen loads
- **THEN** a 15x15 grid is visible on a fixed-size canvas

### Requirement: Local Two-Player Turn Flow
The system SHALL support local two-player play with black moving first and alternating turns on valid moves.

#### Scenario: First move
- **WHEN** a new game starts
- **THEN** black is the current player and may place the first stone

#### Scenario: Alternating turns
- **WHEN** a player places a stone on an empty intersection
- **THEN** the stone is placed and the turn switches to the other player

#### Scenario: Invalid move
- **WHEN** a player clicks an occupied intersection
- **THEN** no stone is placed and the turn does not change

### Requirement: Turn Indicator
The system SHALL display the current player's turn.

#### Scenario: Turn shown
- **WHEN** it is a player's turn
- **THEN** the UI indicates which color should move next

### Requirement: Win Detection and End State
The system SHALL detect five or more consecutive stones in any direction and declare the winner, preventing further moves.

#### Scenario: Five in a row
- **WHEN** a player forms five or more consecutive stones horizontally, vertically, or diagonally
- **THEN** the system declares that player the winner, shows a winner dialog, and disables further placement

### Requirement: Draw Detection
The system SHALL declare a draw when the board is full and no winner exists, and prevent further moves.

#### Scenario: Board full without winner
- **WHEN** the last empty intersection is filled and no player has won
- **THEN** the system shows a draw dialog and disables further placement

### Requirement: Restart Game
The system SHALL provide a restart control that resets the board and turn state.

#### Scenario: Restart after finish
- **WHEN** the user activates restart
- **THEN** the board is cleared, black becomes the current player, and play resumes
