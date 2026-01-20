# Data Model: 双人对战五子棋游戏

**Date**: 2026-01-20  
**Spec**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/001-two-player-gomoku/spec.md

## Entities

### Match
**Represents**: 一局对战的整体状态。  
**Fields**:
- id: string（本地生成的唯一标识）
- status: enum { not_started, in_progress, ended }
- result: enum { none, black_win, white_win, draw }
- boardSize: number（固定 15）
- currentPlayerId: string
- moveCount: number

**Relationships**: 1 Match 包含 2 Players、1 Board、N Moves。

**Validation Rules**:
- status 只能在定义枚举内取值
- result 在 status=ended 时不得为 none

**State Transitions**:
- not_started → in_progress（新局开始）
- in_progress → ended（胜利或平局）
- ended → in_progress（重开新局）

### Player
**Represents**: 对局中的一方玩家。  
**Fields**:
- id: string（玩家A/玩家B）
- role: enum { first, second }
- stoneColor: enum { black, white }
- isCurrentTurn: boolean

**Relationships**: 属于 1 Match。

**Validation Rules**:
- 两名玩家必须颜色不同且角色不同

### Board
**Represents**: 棋盘与格点占用状态。  
**Fields**:
- size: number（固定 15）
- cells: 15x15 的占用矩阵（empty/black/white）
- lastMove: { row, col } | null

**Relationships**: 属于 1 Match。

**Validation Rules**:
- row/col 必须在 [0, 14] 范围内
- cells 的值仅限 empty/black/white

### Move
**Represents**: 一次落子记录。  
**Fields**:
- id: string
- matchId: string
- playerId: string
- row: number
- col: number
- moveNumber: number（从 1 递增）

**Relationships**: 属于 1 Match、1 Player。

**Validation Rules**:
- 仅允许在空位置落子
- 仅允许在 match.status = in_progress 时落子
- moveNumber 必须连续递增

## Derived Rules (from requirements)

- 任意直线方向出现连续 ≥5 的同色棋子即判定胜利
- 棋盘填满且无胜者时判定平局
- 对局结束后禁止新增 Move
