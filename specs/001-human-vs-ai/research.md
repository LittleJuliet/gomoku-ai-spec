# Research Notes: 人机对战（玩家黑棋）

## Decision 1: 电脑落子策略
- **Decision**: 采用多步前瞻的极小化极大搜索（Minimax）+ Alpha-Beta 剪枝，使用启发式评分并设置深度/时间上限（≤ 2 秒），同时优先处理“立即获胜/必须防守”局面。
- **Rationale**: 满足“明显更强对手”的体验诉求，同时确保落子时间可控，不阻塞交互。
- **Alternatives considered**: 随机落子；仅贪心阻挡；全局最优搜索（性能不可控）。

## Decision 2: 对局规则一致性
- **Decision**: 复用现有人人对战的胜负与禁手判定逻辑，确保人机与人人规则一致。
- **Rationale**: 避免用户在不同模式间切换时出现规则认知冲突，降低验收与测试复杂度。
- **Alternatives considered**: 人机单独规则；固定无禁手规则。

## Decision 3: 状态与生命周期
- **Decision**: 对局状态仅保存在 Pinia（内存态），刷新或离开页面即结束对局。
- **Rationale**: 与规格要求一致，减少持久化与恢复复杂度，保持实现范围可控。
- **Alternatives considered**: localStorage 持久化恢复；跨设备同步（需账号系统）。

## Decision 4: 规则与 AI 逻辑的组织方式
- **Decision**: 规则判定、棋盘操作、AI 搜索均以纯函数模块实现，UI 与 Store 仅负责调用与状态编排。
- **Rationale**: 便于单元测试与性能优化，也更容易与现有 UI 解耦。
- **Alternatives considered**: 规则/AI 逻辑直接写入组件或 store 中。
