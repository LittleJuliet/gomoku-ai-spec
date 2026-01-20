# Data Model: 人机对战五子棋（极难）

**Date**: 2026-01-20  
**Spec**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/001-add-hard-ai-opponent/spec.md

## Entities

### Match
**Represents**: 一局人机对战的整体状态。  
**Fields**:
- id: string（本地生成的唯一标识）
- mode: enum { human_vs_ai }
- difficulty: enum { extreme }
- status: enum { not_started, in_progress, ended }
- result: enum { none, human_win, ai_win, draw }
- boardSize: number（固定 15）
- currentActor: enum { human, ai }
- moveCount: number
- aiPending: boolean（AI 是否处于待执行状态）

**Relationships**: 1 Match 包含 1 HumanPlayer、1 AIOpponent、1 Board、N Moves。

**Validation Rules**:
- mode 必须为 human_vs_ai
- difficulty 必须为 extreme
- status 在 ended 时 result 不能为 none
- currentActor 在 status=ended 时不再变化

**State Transitions**:
- not_started → in_progress（开始新局）
- in_progress → ended（胜利或平局）
- ended → in_progress（重开新局）
- in_progress（aiPending=true）→ in_progress（aiPending=false，AI 完成落子）

### HumanPlayer
**Represents**: 人类玩家。  
**Fields**:
- id: string（human）
- stoneColor: enum { black }
- isCurrentTurn: boolean

**Validation Rules**:
- 人类固定先手且为黑子

### AIOpponent
**Represents**: 电脑对手。  
**Fields**:
- id: string（ai）
- stoneColor: enum { white }
- difficulty: enum { extreme }
- isCurrentTurn: boolean

**Validation Rules**:
- AI 固定后手且为白子

### Board
**Represents**: 棋盘与格点占用状态。  
**Fields**:
- size: number（固定 15）
- cells: 15x15 的占用矩阵（empty/black/white）
- lastMove: { row, col } | null

**Validation Rules**:
- row/col 必须在 [0, 14] 范围内
- cells 的值仅限 empty/black/white

### Move
**Represents**: 一次落子记录。  
**Fields**:
- id: string
- matchId: string
- actor: enum { human, ai }
- row: number
- col: number
- moveNumber: number（从 1 递增）

**Validation Rules**:
- 仅允许在空位置落子
- 仅允许在 match.status = in_progress 时落子
- moveNumber 必须连续递增

## Derived Rules (from requirements)

- 人类先手（黑子），AI 后手（白子）
- 人类落子后，若对局未结束，AI 必须生成且仅生成一步合法落子
- AI 落子不得越界或占用已有棋子
- 出现连续 ≥5 同色棋子即判定胜利
- 棋盘填满且无胜者时判定平局
- 对局结束后禁止新增 Move
- AI 进行中触发重开需取消 AI 动作并立即重置
