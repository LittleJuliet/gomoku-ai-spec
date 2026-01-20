---

description: "Task list for feature implementation"
---

# Tasks: Two-Player Gomoku Game

**Input**: Design documents from `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/002-two-player-gomoku/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not requested in the feature specification; no test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Vite + Vue 2.7 project setup in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/package.json and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/vite.config.js
- [x] T002 Create app entry and styles in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/main.js, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/App.vue, and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/assets/main.css
- [x] T003 [P] Create base source directories /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/components, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views, and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/utils

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Checkpoint**: Foundation ready - user story implementation can now begin

- [x] T004 Initialize Pinia and mount root app in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/main.js
- [x] T005 [P] Define constants and new-match factory in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game/constants.js and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game/state.js
- [x] T006 [P] Implement board utilities (create board, inBounds, isEmpty, placeStone) in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game/board.js
- [x] T007 [P] Implement rules helpers (checkFiveInRow, isBoardFull) in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game/rules.js
- [x] T008 Implement in-memory match service aligned to contracts in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/game/matchService.js

---

## Phase 3: User Story 1 - Start match, alternate moves, and declare winner (Priority: P1) MVP

**Goal**: A local two-player game can start, accept alternating moves, detect a win, and end the match.

**Independent Test**: Start a new game, place alternating moves until five-in-a-row is formed, and see the winner announced with further moves blocked.

### Implementation for User Story 1

- [x] T009 [US1] Build game view layout with status area and canvas slot in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
- [x] T010 [P] [US1] Implement canvas rendering for grid and stones in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/components/GomokuCanvas.vue
- [x] T011 [US1] Wire GameView into root app in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/App.vue
- [x] T012 [P] [US1] Implement game store state and actions (newGame, placeMove, switchTurn, setWinner, blockAfterEnd) in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
- [x] T013 [US1] Connect canvas clicks to placeMove with validation feedback in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
- [x] T014 [US1] Display current player indicator and win result banner in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
- [x] T015 [US1] Add winner modal overlay and actions in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/assets/main.css

**Checkpoint**: User Story 1 is fully functional and independently testable

---

## Phase 4: User Story 2 - Restart a new game anytime (Priority: P2)

**Goal**: Players can reset the game at any time to start a fresh match.

**Independent Test**: Mid-game, click “New Game” and confirm board, turn, and result reset.

### Implementation for User Story 2

- [x] T016 [P] [US2] Add resetMatch action and state reset logic in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
- [x] T017 [US2] Add “New Game” control and hook to resetMatch in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue

**Checkpoint**: User Story 2 is independently testable alongside User Story 1

---

## Phase 5: User Story 3 - Detect draw and show result (Priority: P3)

**Goal**: The system declares a draw when the board is full and no winner exists.

**Independent Test**: Fill the board with no five-in-a-row and confirm a draw message with moves blocked.

### Implementation for User Story 3

- [x] T018 [P] [US3] Add draw detection after each move using isBoardFull in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
- [x] T019 [US3] Show draw result message and disable move input in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue

**Checkpoint**: All user stories are independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T020 [P] Align quickstart commands with actual scripts in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/002-two-player-gomoku/quickstart.md and /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/package.json
- [x] T021 [P] Add basic accessibility labels for status and controls in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
- [x] T022 [P] Add performance verification checklist in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/002-two-player-gomoku/quickstart.md
- [x] T023 [P] Mark contracts as conceptual-only in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/002-two-player-gomoku/contracts/gomoku-openapi.yaml

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Starts after Foundational - builds on US1 UI/state but remains independently testable
- **User Story 3 (P3)**: Starts after Foundational - builds on US1 move flow but remains independently testable

### Within Each User Story

- Implement store/state before wiring UI interactions
- Core implementation before user-facing feedback
- Story complete before moving to the next priority (unless parallelized)

---

## Parallel Examples

### User Story 1

```text
T010 Implement canvas rendering in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/components/GomokuCanvas.vue
T012 Implement store actions in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
```

### User Story 2

```text
T016 Add resetMatch logic in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
T017 Add New Game control in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
```

### User Story 3

```text
T018 Add draw detection in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/stores/gameStore.js
T019 Show draw message in /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/src/views/GameView.vue
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate User Story 1 independently

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → MVP
3. Add User Story 2 → Validate
4. Add User Story 3 → Validate

### Parallel Team Strategy

1. Team completes Setup + Foundational
2. After Foundational:
   - Dev A: User Story 1
   - Dev B: User Story 2
   - Dev C: User Story 3
