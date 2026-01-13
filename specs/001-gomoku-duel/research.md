# Research: 五子棋对战

## Decision 1: 棋盘固定为 15×15
- **Rationale**: 最常见规则与节奏，且已在规格澄清确认。
- **Alternatives considered**: 19×19；可选尺寸。

## Decision 2: 胜负判定为“连五或以上即胜”
- **Rationale**: 规则简单清晰，利于一致性测试。
- **Alternatives considered**: 仅“正好五连”；黑方禁手规则。

## Decision 3: 对局结束后禁止继续落子并提示结果
- **Rationale**: 避免争议与误操作，满足验收一致性。
- **Alternatives considered**: 结束后继续练习落子（不计胜负）。

## Decision 4: 状态展示包含当前玩家与回合状态
- **Rationale**: 提升可理解性，降低错误操作。
- **Alternatives considered**: 不显示回合信息。

## Decision 5: 数据仅内存保存，不做持久化
- **Rationale**: 需求明确为本地双人对战且无存档要求，降低复杂度。
- **Alternatives considered**: 使用本地存储保存对局历史。

## Decision 6: 测试策略
- **Rationale**: 单元测试覆盖规则判定与状态转换，端到端验证基本对局流程。
- **Alternatives considered**: 仅手动测试；仅端到端测试。
