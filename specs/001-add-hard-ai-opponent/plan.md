# Implementation Plan: Human vs AI Gomoku (Extreme)

**Branch**: `001-add-hard-ai-opponent` | **Date**: 2026-01-20 | **Spec**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2/specs/001-add-hard-ai-opponent/spec.md
**Input**: Feature specification from `/specs/001-add-hard-ai-opponent/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

新增“人机对战（极难）”模式：在现有五子棋基础上加入固定极难 AI 对手、严格轮次控制与明确胜负/平局展示；技术路径为复用现有棋盘与规则逻辑，新增 AI 决策引擎与异步落子调度，确保 AI 响应不超过 2 秒并可被重开取消。

## Technical Context

**Language/Version**: JavaScript（ES2020+）  
**Primary Dependencies**: Vue 2.7, Vite 5, Pinia 2, Vitest, @vue/test-utils  
**Storage**: N/A（内存态，仅会话内）  
**Testing**: Vitest + @vue/test-utils  
**Target Platform**: 现代浏览器（桌面与移动端）  
**Project Type**: Web application（SPA）  
**Performance Goals**: AI 落子在 2 秒内完成并可见  
**Constraints**: 本地单机、无外部服务；AI 难度固定为 Extreme；人类固定先手（黑子）；重开时取消 AI 行为并立即重置  
**Scale/Scope**: 单局 15×15 棋盘（最多 225 步），单设备单会话

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Constitution 文件为占位模板，未定义可执行约束或强制门禁
- Gate 状态：PASS（无可验证条款）
- Phase 1 设计后复核：PASS（无新增约束）

## Project Structure

### Documentation (this feature)

```text
specs/001-add-hard-ai-opponent/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── assets/
├── components/
│   └── GomokuCanvas.vue
├── game/
│   ├── ai/              # NEW: AI 决策与评估
│   ├── board.js
│   ├── constants.js
│   ├── matchService.js
│   ├── rules.js
│   └── state.js
├── stores/
│   └── gameStore.js
├── utils/
└── views/
    └── GameView.vue
```

**Structure Decision**: 单体前端应用结构保持不变；AI 逻辑新增到 `src/game/ai/`，由 `gameStore` 统一调度与取消。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
