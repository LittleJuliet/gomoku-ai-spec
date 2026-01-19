# 数据模型

## 概述
数据仅保存在前端内存，用于驱动棋盘渲染与胜负判定。

---

## 数据结构

### 游戏状态 GameState

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| board | number[][] | 15×15 | 0=空，1=黑子，2=白子 |
| currentPlayer | number | 1/2 | 当前回合玩家 |
| winner | number/null | 1/2/null | 获胜玩家（无则为 null） |
| moveCount | number | ≥0 | 已落子数 |
| lastMove | {row:number,col:number} | 可选 | 最近落子位置 |
