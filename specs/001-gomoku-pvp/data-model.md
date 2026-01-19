# Data Model: 五子棋双人对战

**Date**: 2026-01-19
**Feature**: `/Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/specs/001-gomoku-pvp/spec.md`

## Entities

### Game

- **Fields**
  - id: string
  - status: "idle" | "in_progress" | "finished"
  - boardSize: number (default 15)
  - currentPlayerId: string
  - winnerPlayerId: string | null
  - result: "win" | "draw" | null
  - moveCount: number
  - startedPlayerId: string
- **Relationships**
  - has 2 Players
  - has 1 Board
  - has many Moves (ordered)

### Player

- **Fields**
  - id: string
  - label: "Player A" | "Player B"
  - color: "black" | "white"

### Move

- **Fields**
  - id: string
  - order: number
  - playerId: string
  - x: number
  - y: number

### Board

- **Fields**
  - size: number
  - cells: 2D array of "empty" | playerId

## Validation Rules

- Move 坐标必须在 0..(boardSize-1) 范围内
- 只允许在空格落子
- 仅允许当前行动玩家落子
- 游戏状态为 in_progress 时才可落子
- 当形成连五或以上时立即判定胜利
- 当棋盘满且无胜者时判定和局

## State Transitions

- idle → in_progress: 创建新对局/开始对局
- in_progress → finished: 出现胜利或和局
- finished → in_progress: 重新开始新局（清空棋盘与落子记录）
