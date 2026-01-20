# Research Notes: 人机对战五子棋（极难）

**Date**: 2026-01-20  
**Spec**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/001-add-hard-ai-opponent/spec.md

## Decisions

### 1) 技术栈延续：Vue 2.7 + Vite + Pinia
**Decision**: 沿用现有前端技术栈与目录结构，不引入新框架。  
**Rationale**: 与现有项目一致，减少迁移风险与认知成本。  
**Alternatives considered**: 升级 Vue 3、引入其他状态管理。

### 2) 语言：JavaScript（ES2020+）
**Decision**: 继续使用 JavaScript，不新增 TypeScript。  
**Rationale**: 现有代码与构建脚本均基于 JS，保持一致性。  
**Alternatives considered**: TypeScript（会带来额外配置与迁移成本）。

### 3) AI 决策引擎：Minimax + Alpha-Beta + 评估函数
**Decision**: 采用带 Alpha-Beta 剪枝的 Minimax，并结合局面评估函数。  
**Rationale**: 在有限时间内提供强对弈强度，适合作为“极难”难度的确定性 AI。  
**Alternatives considered**: 纯规则启发式、蒙特卡洛树搜索（MCTS）。

### 4) 搜索空间控制：候选点限制
**Decision**: 仅考虑已有棋子邻域内的候选落子点（限定半径）以降低分支。  
**Rationale**: 控制计算量，确保 AI 回应时间 ≤2 秒。  
**Alternatives considered**: 全棋盘遍历（性能不可控）。

### 5) AI 调度与取消
**Decision**: AI 落子在异步调度中执行，并支持取消以满足“重开立即重置”。  
**Rationale**: 避免阻塞 UI，且满足重开时即时取消 AI 行为的需求。  
**Alternatives considered**: 同步计算（易卡顿、难以取消）。

### 6) 运行范围
**Decision**: 单机本地、15×15 棋盘、默认人类先手（黑子）、AI 极难固定。  
**Rationale**: 与规格与澄清一致，范围清晰可测。  
**Alternatives considered**: 可调难度或在线对战（超出范围）。
