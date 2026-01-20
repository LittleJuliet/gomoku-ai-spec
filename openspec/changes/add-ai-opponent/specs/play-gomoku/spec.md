## ADDED Requirements
### Requirement: Game Mode Selection
The system SHALL allow switching between Local Two-Player and Human vs AI (Hard) from the side panel.

#### Scenario: Mode options displayed
- **WHEN** the game screen loads
- **THEN** the side panel shows a mode selector with Local Two-Player and Human vs AI (Hard)

#### Scenario: Mode change resets game
- **WHEN** the user selects a different mode
- **THEN** the board is cleared, Black becomes the current player, and the game status is playing

### Requirement: Human vs AI Turn Flow
The system SHALL support a Human vs AI (Hard) mode where the human plays Black and the AI plays White, with the AI moving automatically on its turn.

#### Scenario: Player opens the game
- **WHEN** a new Human vs AI game starts
- **THEN** the human is Black, moves first, and the UI indicates the player's turn

#### Scenario: AI responds to a player move
- **WHEN** the human places a valid stone and the game remains playing
- **THEN** the AI automatically places a valid White stone and the turn returns to the human

#### Scenario: Ignore input on AI turn
- **WHEN** it is the AI's turn
- **THEN** player clicks do not place stones

### Requirement: Hard AI Tactics
The system SHALL make the AI difficult to beat by prioritizing immediate wins, blocking immediate threats, and then selecting the strongest move by heuristic evaluation.

#### Scenario: AI takes a winning move
- **WHEN** the AI has a move that completes five or more in a row
- **THEN** the AI selects that move

#### Scenario: AI blocks an immediate loss
- **WHEN** the human has a move that would complete five or more in a row on their next turn
- **THEN** the AI selects a blocking move that prevents that win

#### Scenario: AI chooses a strong heuristic move
- **WHEN** there is no immediate win or forced block
- **THEN** the AI selects the highest-scoring move based on the heuristic evaluation

### Requirement: Mode-Specific Turn Labels
The system SHALL label turns as Player (Black) and AI (White) while in Human vs AI mode.

#### Scenario: Player turn label
- **WHEN** it is the human's turn in Human vs AI mode
- **THEN** the UI indicates Player (Black) to move

#### Scenario: AI turn label
- **WHEN** it is the AI's turn in Human vs AI mode
- **THEN** the UI indicates AI (White) to move
