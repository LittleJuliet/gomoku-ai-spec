# 架构设计

## 总体架构
```mermaid
flowchart TD
    UI[UI界面] --> Board[Canvas棋盘组件]
    Board --> Store[Pinia游戏状态]
    Store --> Logic[胜负判定逻辑]
    Logic --> Store
    Store --> UI
```

## 技术栈
- **后端:** 无
- **前端:** Vue 2.7 + Pinia 2 + Vite + Canvas 2D
- **数据:** 前端内存状态

## 核心流程
```mermaid
sequenceDiagram
    participant User as 用户
    participant Board as 棋盘组件
    participant Store as 游戏状态
    participant Logic as 规则判定

    User->>Board: 点击落子
    Board->>Store: placeMove(row, col)
    Store->>Logic: checkWin(board, lastMove)
    Logic-->>Store: winner/null
    Store-->>Board: state更新并重绘
```

## 重大架构决策
完整的ADR存储在各变更的how.md中，本章节提供索引。

| adr_id | title | date | status | affected_modules | details |
|--------|-------|------|--------|------------------|---------|
| ADR-001 | 使用 Canvas 绘制棋盘 | 2026-01-19 | ✅已采纳 | ui-board, game-core | [链接](../history/2026-01/202601191531_gomoku_duel/how.md#adr-001-使用-canvas-绘制棋盘) |
