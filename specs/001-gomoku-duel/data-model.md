# Data Model: 五子棋对战

## Entities

### Game
- **id**: string
- **boardSize**: number (固定 15)
- **board**: 15×15 的二维数组（空/黑/白）
- **currentPlayer**: enum { black, white }
- **status**: enum { idle, in_progress, finished }
- **winner**: enum { black, white, draw, none }
- **moveCount**: number
- **createdAt**: ISO datetime
- **finishedAt**: ISO datetime (可为空)

### Move
- **id**: string
- **gameId**: string (FK → Game.id)
- **player**: enum { black, white }
- **x**: number (0-14)
- **y**: number (0-14)
- **turnIndex**: number (从 1 开始)
- **createdAt**: ISO datetime

### Player
- **id**: string (black / white)
- **displayName**: string (可选)

## Relationships

- Game 1 → N Move
- Player 1 → N Move
- Game.currentPlayer 关联 Player.id

## Validation Rules

- boardSize 必须为 15。
- x、y 必须在 0-14 范围内。
- 只能在空位落子。
- status=finished 时禁止新增 Move。
- 连续五子或以上立即胜利；棋盘满且无胜负则平局。

## State Transitions

- idle → in_progress：创建新局
- in_progress → finished：出现胜利或平局
- finished → in_progress：重开新局（新 Game 实例）
