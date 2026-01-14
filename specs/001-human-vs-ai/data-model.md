# Data Model: 人机对战（玩家黑棋）

## Entities

### 对局（Game）
- **Fields**: 
  - id
  - status（idle | in_progress | finished）
  - currentTurn（black | white）
  - result（black_win | white_win | draw | ongoing）
  - createdAt
  - endedAt
- **Relationships**:
  - 1 对局包含 1 个棋盘状态
  - 1 对局包含 2 个参与者
  - 1 对局包含 0..N 个落子记录

### 参与者（Player）
- **Fields**:
  - id
  - type（human | ai）
  - color（black | white）
- **Relationships**:
  - 参与者属于 1 个对局

### 棋盘状态（BoardState）
- **Fields**:
  - size（如 15）
  - grid（size x size，单元为 empty | black | white）
  - lastMove（可选）
- **Relationships**:
  - 1 个棋盘状态属于 1 个对局

### 落子记录（Move）
- **Fields**:
  - id
  - turnNumber
  - color（black | white）
  - position（x, y）
  - createdAt
- **Relationships**:
  - 落子记录属于 1 个对局

## Validation Rules

- position 必须在棋盘范围内且对应格为 empty
- color 必须与 currentTurn 一致
- 对局 status 为 finished 时禁止新增落子
- result 仅在对局结束时可为 black_win/white_win/draw

## State Transitions

- idle → in_progress：创建对局并初始化棋盘
- in_progress → finished：满足胜利条件或棋盘无空位
- finished → in_progress：通过“再来一局”创建新对局（新 id）
