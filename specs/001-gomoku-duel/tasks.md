---

description: "Task list template for feature implementation"
---

# Tasks: 五子棋对战

**Input**: Design documents from `/specs/001-gomoku-duel/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 包含测试工具与脚本配置任务，但不包含测试用例实现。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create directories `src/components`, `src/pages`, `src/stores`, `src/assets`, `src/styles`, `tests/unit`, `tests/e2e`
- [ ] T002 Initialize Vue 2.7 app scaffold in `package.json`, `index.html`, `src/main.js`, `src/App.vue`
- [ ] T003 Configure Tailwind in `tailwind.config.js`, `postcss.config.js`, `src/styles/tailwind.css`, import in `src/main.js`
- [ ] T004 Configure Pinia plugin setup in `src/main.js`
- [ ] T005 Configure test tooling in `package.json`, `vitest.config.js`, `cypress.config.js`
- [ ] T006 Add store entry file `src/stores/index.js` and export `useGameStore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create game engine helpers in `src/stores/gameEngine.js` (board init, move validation, turn switching)
- [ ] T008 Implement Pinia game store in `src/stores/game.js` (state, startGame, placeMove, moveCount)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 开始对局并轮流落子 (Priority: P1) 🎯 MVP

**Goal**: 同一设备启动对局并交替落子

**Independent Test**: 打开应用后，能开始新对局并完成至少 3 步交替落子

### Implementation for User Story 1

- [ ] T009 [P] [US1] Build board cell component in `src/components/BoardCell.vue`
- [ ] T010 [P] [US1] Build game board grid in `src/components/GameBoard.vue`
- [ ] T011 [P] [US1] Build status display in `src/components/GameStatus.vue`
- [ ] T012 [US1] Compose page layout in `src/pages/HomePage.vue`
- [ ] T013 [US1] Initialize `useGameStore` and bind state in `src/pages/HomePage.vue`
- [ ] T014 [US1] Wire board clicks to store actions in `src/pages/HomePage.vue`
- [ ] T015 [US1] Render HomePage in `src/App.vue`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 胜负判定与对局结束 (Priority: P2)

**Goal**: 出现连五或平局时判定结果并结束对局

**Independent Test**: 连成五子或棋盘满时系统立即显示结果并禁止继续落子

### Implementation for User Story 2

- [ ] T016 [US2] Implement win/draw detection in `src/stores/gameEngine.js` (>=5 连线、满盘判平)
- [ ] T017 [US2] Update game store to set status/winner and block moves in `src/stores/game.js`
- [ ] T018 [US2] Update result UI in `src/components/GameStatus.vue`

**Checkpoint**: User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 再开一局 (Priority: P3)

**Goal**: 对局结束后可快速开始新局

**Independent Test**: 结束对局后点击“新局/重开”可清空棋盘并重置回合

### Implementation for User Story 3

- [ ] T019 [US3] Add restart action to reset game state in `src/stores/game.js`
- [ ] T020 [US3] Add restart control in `src/pages/HomePage.vue`

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T021 [P] Refine layout and spacing with Tailwind in `src/pages/HomePage.vue`
- [ ] T022 [P] Add aria labels for board cells in `src/components/BoardCell.vue`
- [ ] T023 [P] Update usage notes in `README.md`
- [ ] T024 [P] Sync local actions with `specs/001-gomoku-duel/contracts/openapi.yaml`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 → US2 → US3 (按优先级推进)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Base gameplay and UI, no dependencies
- **User Story 2 (P2)**: Depends on US1 base gameplay flow
- **User Story 3 (P3)**: Depends on US2 end-of-game state

### Within Each User Story

- 组件先实现，再接入 store
- 规则逻辑先完成，再更新 UI 表现
- 该故事完成后再进入下一优先级

### Parallel Opportunities

- Setup: T003/T004 可并行但需协调 `src/main.js`
- US1: T009/T010/T011 可并行（不同文件）
- Polish: T021/T022/T023/T024 可并行（不同文件）

---

## Parallel Example: User Story 1

```bash
Task: "Build board cell component in src/components/BoardCell.vue"
Task: "Build game board grid in src/components/GameBoard.vue"
Task: "Build status display in src/components/GameStatus.vue"
```

## Parallel Example: User Story 2

```bash
Task: "Implement win/draw detection in src/stores/gameEngine.js"
```

## Parallel Example: User Story 3

```bash
Task: "Add restart action to reset game state in src/stores/game.js"
Task: "Add restart control in src/pages/HomePage.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
