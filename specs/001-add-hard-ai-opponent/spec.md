# Feature Specification: Human vs AI Gomoku (Extreme)

**Feature Branch**: `001-add-hard-ai-opponent`  
**Created**: 2026-01-20  
**Status**: Draft  
**Input**: User description: "新增人机对战功能，难度设定为极难。"

## Clarifications

### Session 2026-01-20

- Q: Who moves first in Human vs AI mode? → A: Human moves first (black).
- Q: What happens if the player restarts while the AI is thinking? → A: The AI action is cancelled and the match resets immediately.
- Q: What win-rate target defines "Extreme" difficulty? → A: AI wins at least 90% vs novice players.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start a match against an Extreme AI opponent (Priority: P1)

A player can choose a "Human vs AI" mode and start a new Gomoku match against an AI opponent set to Extreme difficulty, then take turns with the AI.

**Why this priority**: This is the core value of the requested feature and enables the new play mode.

**Independent Test**: Start a Human vs AI match, place a legal first move, and observe an AI response with turn switching.

**Acceptance Scenarios**:

1. **Given** the player is on the new match screen, **When** they select "Human vs AI" and start, **Then** an empty board is shown, the opponent is labeled as AI (Extreme), and the human is prompted to move first
2. **Given** it is the human's turn in an AI match, **When** the human places a legal move, **Then** the move is accepted, control switches to the AI, and the AI makes a legal move
3. **Given** it is the AI's turn, **When** the human attempts to place a move, **Then** the system rejects the move and the board state does not change

---

### User Story 2 - Win, lose, or draw against the AI (Priority: P2)

The match ends correctly when either side completes five in a row, or when the board fills with no winner, and the result is clearly presented.

**Why this priority**: Clear and correct outcomes are essential for a credible AI opponent experience.

**Independent Test**: Play a short match that reaches a win or draw and verify the correct result is shown and the match ends.

**Acceptance Scenarios**:

1. **Given** a match where the human completes five in a row, **When** the winning move is placed, **Then** the system declares the human winner and ends the match
2. **Given** a match where the AI completes five in a row, **When** the AI places the winning move, **Then** the system declares the AI winner and ends the match
3. **Given** a match where the board becomes full without five in a row, **When** the final move is placed, **Then** the system declares a draw and ends the match

---

### User Story 3 - Restart an AI match at any time (Priority: P3)

The player can restart an AI match at any point to begin a fresh game at Extreme difficulty.

**Why this priority**: Enables rapid replay and learning without leaving the mode.

**Independent Test**: Restart during an active match and verify the board, turns, and result are reset.

**Acceptance Scenarios**:

1. **Given** an AI match in progress or completed, **When** the player selects restart, **Then** the board clears, the result resets, and a new AI match begins at Extreme difficulty

---

### Edge Cases

- The player attempts to place a move during the AI's turn
- The player attempts to place a move on an occupied cell or outside the board
- The AI has no legal moves because the board is full
- The player triggers restart while the AI is "thinking" (AI action is cancelled and the match resets immediately)
- A move creates more than five in a row (six or more)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide mode selection between Local Two-Player and Human vs AI (Extreme)
- **FR-001a**: The default mode MUST be Local Two-Player, and mode selection applies when starting a new match; switching modes resets the current match immediately
- **FR-002**: Starting a Human vs AI match MUST initialize an empty board and set the AI difficulty to Extreme
- **FR-003**: The system MUST clearly indicate the opponent is AI and display whose turn it is
- **FR-004**: The system MUST prevent the human from placing a move while it is the AI's turn
- **FR-005**: The AI MUST place moves only within the board and only on empty cells, and must use the same legality validation as human moves
- **FR-006**: After each legal human move, the system MUST produce exactly one AI move unless the match has ended
- **FR-007**: The system MUST declare a winner when either side has five or more in a row and end the match
- **FR-008**: The system MUST declare a draw when the board is full with no winner and end the match
- **FR-009**: The player MUST be able to restart a Human vs AI match at any time, resetting board, turn, and result
- **FR-009a**: If restart is triggered during the AI's turn, the system MUST cancel the pending AI action and reset immediately
- **FR-010**: The system MUST present the final result as Human win, AI win, or Draw, where Human = black and AI = white
- **FR-011**: The system MUST keep AI difficulty fixed to Extreme with no user-adjustable levels in this mode

### Key Entities *(include if feature involves data)*

- **Player**: The human participant, including assigned piece color and turn order
- **AI Opponent**: The computer-controlled participant, including fixed difficulty level and turn order
- **Match**: The state of a single game, including status (in progress/ended) and result
- **Board**: The grid state and occupied positions
- **Move**: A single placement including actor (human or AI) and position

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability tests, 90% of participants can start a Human vs AI match and place a first move within 60 seconds without assistance
- **SC-002**: In 95% of test games, the AI move appears within 2 seconds after the human move is shown
- **SC-003**: In playtests with novice players, the AI wins at least 90% of completed matches, supporting the "Extreme" difficulty expectation
- **SC-004**: In validation testing, 100% of rule scenarios (illegal move rejection, five-in-a-row detection, draw detection) are handled correctly with clear feedback

## Assumptions

- The AI match follows the same rules and board size as the existing two-player mode
- Play is local on a single device; no online or remote play is included
- The human is the fixed first player (black)
- No additional features (hints, undo, match history, rankings) are introduced as part of this feature
- No external services or third-party integrations are required; match state does not persist beyond the current session
