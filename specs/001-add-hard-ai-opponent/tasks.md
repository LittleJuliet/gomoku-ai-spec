---

description: "Task list for Human vs AI Gomoku (Extreme)"
---

# Tasks: Human vs AI Gomoku (Extreme)

**Input**: Design documents from `/specs/001-add-hard-ai-opponent/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: 未在规格中要求测试任务，本清单不包含测试任务。

**Organization**: 按用户故事组织，保证每个故事可独立实现与验收。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行（不同文件、无依赖）
- **[Story]**: 任务所属用户故事（US1, US2, US3）
- 每条任务必须包含明确文件路径

## Path Conventions

- Web app: `src/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目结构与新模块骨架

- [x] T001 Create AI module entry in src/game/ai/index.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 所有用户故事共享的基础改动（完成后方可进入 US1/US2/US3）

- [x] T002 Add AI mode/difficulty/actor constants in src/game/constants.js
- [x] T003 Extend match state (mode, difficulty, currentActor, aiPending) in src/game/state.js
- [x] T004 Update match creation/reset and AI-mode result mapping in src/game/matchService.js
- [x] T005 Update store state/applyMatch for AI fields in src/stores/gameStore.js

**Checkpoint**: 基础能力完成后开始用户故事实现

---

## Phase 3: User Story 1 - Start a match against an Extreme AI opponent (Priority: P1) 🎯 MVP

**Goal**: 玩家可以选择“人机对战（极难）”并开始新局，AI 在人类落子后自动应答。

**Independent Test**: 进入人机模式 → 人类落子 → AI 在 2 秒内落子，且 AI 回合时人类无法落子。

### Implementation for User Story 1

- [x] T006 [US1] Add gameMode state + Human vs AI start action (default local two-player; mode applies on new match) in src/stores/gameStore.js
- [x] T007 [US1] Add mode selector (local vs AI) + AI opponent label; reset match on mode change in src/views/GameView.vue
- [x] T008 [P] [US1] Implement candidate generation in src/game/ai/candidates.js
- [x] T009 [P] [US1] Implement board evaluation in src/game/ai/evaluate.js
- [x] T010 [P] [US1] Implement minimax + alpha-beta in src/game/ai/minimax.js
- [x] T011 [US1] Compose AI move selection API in src/game/ai/index.js (use shared legality validation from src/game/board.js)
- [x] T012 [US1] Schedule AI move + enforce turn order in src/stores/gameStore.js
- [x] T013 [US1] Disable board and show AI thinking status in src/views/GameView.vue
- [x] T014 [US1] Add AI status styles in src/assets/main.css

**Checkpoint**: 人机对战可启动，AI 能回应且回合控制正确

---

## Phase 4: User Story 2 - Win, lose, or draw against the AI (Priority: P2)

**Goal**: 正确判定并展示“人类胜/AI 胜/平局”。

**Independent Test**: 构造人类胜、AI 胜、平局三种场景，结果展示正确。

### Implementation for User Story 2

- [x] T015 [P] [US2] Map AI-mode results to Human/AI labels (Human=black, AI=white) in src/stores/gameStore.js
- [x] T016 [P] [US2] Update result text + winner modal copy to use Human/AI labels consistently in src/views/GameView.vue

**Checkpoint**: 结果展示与对局状态一致且清晰

---

## Phase 5: User Story 3 - Restart an AI match at any time (Priority: P3)

**Goal**: 随时重开人机对战，AI 思考中重开会立即取消并重置。

**Independent Test**: AI 思考过程中点击重开 → 对局立即重置且 AI 不再落子。

### Implementation for User Story 3

- [x] T017 [P] [US3] Add AI cancellation flag/token on reset in src/stores/gameStore.js
- [x] T018 [P] [US3] Ensure reset recreates AI match + clears AI state in src/views/GameView.vue

**Checkpoint**: 重开在任何时刻都立即生效

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 性能与文档完善

- [x] T019 Tune AI depth/heuristics to meet >=90% win-rate vs novice while keeping <=2s response in src/game/ai/minimax.js and src/game/ai/evaluate.js
- [x] T020 [P] Review AI mode contract notes in specs/001-add-hard-ai-opponent/contracts/gomoku-openapi.yaml
- [x] T021 [P] Align quickstart checklist with win-rate evaluation + 60s usability check in specs/001-add-hard-ai-opponent/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (Phase 3)** → **US2 (Phase 4)** → **US3 (Phase 5)** → **Polish (Phase 6)**

### User Story Dependencies

- **US1 (P1)**: 依赖 Foundational 完成
- **US2 (P2)**: 依赖 US1（需要 AI 模式已可运行）
- **US3 (P3)**: 依赖 US1（需要 AI 调度与回合控制）

### Parallel Opportunities

- Phase 2 中不同文件任务可并行（T002 / T003 / T004 / T005）
- US1 中 AI 模块实现可并行（T008 / T009 / T010）
- 文档类任务可并行（T020 / T021）

---

## Parallel Example: User Story 1

```bash
Task: "Implement candidate generation in src/game/ai/candidates.js"
Task: "Implement board evaluation in src/game/ai/evaluate.js"
Task: "Implement minimax + alpha-beta in src/game/ai/minimax.js"
```

---

## Parallel Example: User Story 2

```bash
Task: "Map AI-mode results to Human/AI labels in src/stores/gameStore.js"
Task: "Update result text + winner modal copy in src/views/GameView.vue"
```

---

## Parallel Example: User Story 3

```bash
Task: "Add AI cancellation flag/token on reset in src/stores/gameStore.js"
Task: "Ensure reset recreates AI match + clears AI state in src/views/GameView.vue"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational
3. 完成 Phase 3: User Story 1
4. **停止并验证**：人机对战可启动、AI 可应答、回合控制正确

### Incremental Delivery

1. Setup + Foundational 完成后进入 US1
2. US1 独立验收后进入 US2
3. US2 验收后进入 US3
4. 最后执行 Polish

---

## Notes

- [P] 任务 = 不同文件且无依赖
- 每条任务包含明确文件路径
- 任务顺序按依赖关系排列
