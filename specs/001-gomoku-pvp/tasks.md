---

description: "Task list for 五子棋双人对战"
---

# Tasks: 五子棋双人对战

**Input**: Design documents from `/specs/001-gomoku-pvp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: 未在需求中明确要求测试任务，本任务清单不包含测试项。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create/verify project structure at `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/views`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/styles`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/tests/unit`, `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/tests/e2e`
- [x] T002 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/package.json` with Vue 2.7 + Pinia 2 dependencies and scripts (dev/build) using JavaScript only
- [x] T003 [P] Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/vite.config.js` to build Vue 2.7 app (no TypeScript)
- [x] T004 [P] Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/index.html` with `#app` mount node
- [x] T005 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/main.js` to mount app, register Pinia, and import global styles
- [x] T006 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/App.vue` base layout shell

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core game foundations shared by all user stories

- [x] T007 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/constants.js` with board size, player definitions, and win-check directions
- [x] T008 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/initialState.js` to build empty board and initial game state
- [x] T009 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/boardUtils.js` with bounds checks, empty-cell checks, and line scanning helpers
- [x] T010 Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/rules.js` for win/draw detection and move validation helpers

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 完成一局对战并判定结果 (Priority: P1) 🎯 MVP

**Goal**: 两名玩家轮流落子、合法性校验、更新棋盘、判定胜负/和局并展示结果

**Independent Test**: 从空棋盘开始完成一局对战，出现胜利或和局并停止继续落子

### Implementation for User Story 1

- [x] T011 [US1] Implement `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/engine.js` to apply moves, switch turns, and update result using rules
- [x] T012 [US1] Implement `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/gameStore.js` with state and actions: startGame, placeMove, setMessage/result
- [x] T013 [P] [US1] Build `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/BoardGrid.vue` to render 15×15 grid and emit cell clicks
- [x] T014 [P] [US1] Build `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/GameStatus.vue` to show current player, invalid move feedback, and win/draw result
- [x] T015 [US1] Build `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/views/GameView.vue` to wire store, board, status, move handling, and auto-start game on mount
- [x] T016 [US1] Add `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/styles/game.css` for board, stones, and status layout
- [x] T017 [US1] Update `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/App.vue` to render `GameView` as the main screen

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - 对局结束后快速开始新局 (Priority: P2)

**Goal**: 对局结束后可以一键重开并重置状态

**Independent Test**: 在胜利或和局后点击“重新开始”，棋盘清空并回到开局状态

### Implementation for User Story 2

- [x] T018 [US2] Add restart action in `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/gameStore.js` to reset to initial state
- [x] T019 [US2] Create `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/RestartButton.vue` with disabled/visible state based on game status
- [x] T020 [US2] Integrate restart control in `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/views/GameView.vue` and clear result/message on restart

**Checkpoint**: User Story 2 works independently on top of User Story 1

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple stories

- [x] T021 [P] Add in-app play instructions and status copy polish in `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/views/GameView.vue`
- [x] T022 [P] Improve responsive layout and touch targets in `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/styles/game.css`
- [x] T023 Update `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/README.md` with run/build commands and constraints (JS only, no TS)
- [x] T024 Align `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/specs/001-gomoku-pvp/quickstart.md` with actual scripts in `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/package.json`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **User Story 1 (Phase 3)** → **User Story 2 (Phase 4)** → **Polish (Phase 5)**

### User Story Dependencies

- **US1 (P1)**: Depends on Foundational only
- **US2 (P2)**: Depends on US1 (needs end-of-game state to restart)

### Within Each User Story

- Core game logic before store actions
- Store actions before UI wiring
- UI components before final view integration

---

## Parallel Example: User Story 1

```bash
Task: "Build /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/BoardGrid.vue"
Task: "Build /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/GameStatus.vue"
```

## Parallel Example: User Story 2

```bash
Task: "Create /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/components/RestartButton.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: 完成一局对战并判定胜负/和局

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → 独立验证
3. Add User Story 2 → 独立验证
4. Polish → 体验优化与文档完善

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 UI components
   - Developer B: User Story 1 store + engine
3. User Story 2 after US1 completes
