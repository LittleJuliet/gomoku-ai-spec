---

description: "Task list for 人机对战（玩家黑棋）"
---

# Tasks: 人机对战（玩家黑棋）

**Input**: Design documents from `/specs/001-human-vs-ai/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 未在规格中要求测试任务，本清单不包含测试任务。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions (absolute paths)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 创建人机对战逻辑目录与占位文件：/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/ai.js, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/board.js, /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/rules.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 实现棋盘基础操作（BOARD_SIZE、createEmptyBoard、isInside、isCellEmpty、isBoardFull）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/board.js
- [x] T003 实现规则与胜负判定（nextPlayer、hasFiveInRow），并对照 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/gameEngine.js 保持与人人对战规则一致，在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/rules.js
- [x] T004 建立人机对战 Pinia store 骨架（state: board/status/currentTurn/result/moveCount/isAiThinking/lastError 等，startGame/restartGame）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/aiGame.js
- [x] T005 更新 store 导出入口以暴露 useAiGameStore，在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/index.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 开始人机对战 (Priority: P1) 🎯 MVP

**Goal**: 提供“人机对战”入口，创建新对局并清晰标识玩家黑棋/电脑白棋与先手

**Independent Test**: 从入口进入人机对战后，棋盘为空、玩家黑先手、显示黑白归属与当前轮次

### Implementation for User Story 1

- [x] T006 [P] [US1] 搭建人机对战页面结构与静态文案（玩家黑/电脑白、当前轮次区域）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/AiMatchPage.vue
- [x] T007 [US1] 绑定 useAiGameStore 并在进入页面时创建新对局（startGame）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/AiMatchPage.vue
- [x] T008 [P] [US1] 在首页增加“人机对战”入口并实现页面内切换展示 AiMatchPage（非路由），在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/HomePage.vue

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 轮流落子对战 (Priority: P2)

**Goal**: 玩家落子后电脑自动落子，遵守轮次与合法性限制

**Independent Test**: 玩家落子后自动切换到电脑落子，电脑完成后回到玩家；电脑回合玩家无法落子

### Implementation for User Story 2

- [x] T009 [P] [US2] 实现 AI 落子搜索与评估（多步前瞻，必须优先赢棋/必须防守）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/game/ai.js
- [x] T010 [US2] 在 store 中实现玩家落子校验、轮次切换与 AI 落子流程（含 isAiThinking、lastError、2 秒上限与超时回退）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/aiGame.js
- [x] T011 [US2] 更新对战页面：AI 回合禁用棋盘、显示“电脑思考中”与非法落子提示，在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/AiMatchPage.vue

**Checkpoint**: User Story 2 should be fully functional and testable independently

---

## Phase 5: User Story 3 - 结束对局与再来一局 (Priority: P3)

**Goal**: 结束对局并展示结果，支持再来一局

**Independent Test**: 形成胜负或平局后显示结果并禁止继续落子，点击“再来一局”重开且玩家黑先手

### Implementation for User Story 3

- [x] T012 [US3] 落子后触发胜负/平局判定并更新 status/result，在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/aiGame.js
- [x] T013 [US3] 对战页面展示结果文案与“再来一局”入口，并提示“刷新/离开即结束该局”，在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/AiMatchPage.vue
- [x] T014 [US3] 完善 restartGame 重置逻辑（新局、玩家黑先手）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/stores/aiGame.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 [P] 更新人机对战规则说明文案（黑先、规则与人人对战一致、刷新/离开即结束）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/src/pages/AiMatchPage.vue
- [x] T016 [P] 更新快速上手验收步骤（进入 ≤3 秒可落子、AI ≤2 秒落子、无需刷新完成一局）在 /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/specs/001-human-vs-ai/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational completion
- **User Story 2 (P2)**: Depends on User Story 1 (UI入口与对局创建已有)
- **User Story 3 (P3)**: Depends on User Story 2（对局进行后才能结束）

### Within Each User Story

- 先完成 store 与规则逻辑，再完成页面绑定与交互
- 完成每个故事后必须能独立演示其验收场景

---

## Parallel Example: User Story 1

```text
Task: "T006 搭建人机对战页面结构与静态文案（AiMatchPage.vue）"
Task: "T008 在首页增加人机对战入口与模式切换（HomePage.vue）"
```

## Parallel Example: User Story 2

```text
Task: "T009 实现 AI 落子搜索与评估（ai.js）"
```

## Parallel Example: User Story 3

```text
Task: "无（该故事主要集中在同一 store 与页面文件）"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: 验证入口、黑白归属与先手提示

### Incremental Delivery

1. Setup + Foundational → 基础完成
2. User Story 1 → 可进入人机对战并看到棋盘
3. User Story 2 → 人机轮流落子体验完整
4. User Story 3 → 完成胜负闭环与再来一局
5. Polish → 文案与快速上手核对
