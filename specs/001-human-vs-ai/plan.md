# Implementation Plan: 人机对战（玩家黑棋）

**Branch**: `001-human-vs-ai` | **Date**: 2026-01-14 | **Spec**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit/specs/001-human-vs-ai/spec.md  
**Input**: Feature specification from `/specs/001-human-vs-ai/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

新增人机对战模式（玩家黑、电脑白），在前端单页内完成对局创建、轮流落子、胜负/平局判定与再来一局。对局状态由 Pinia 统一管理，核心规则与 AI 落子逻辑封装为纯函数模块；AI 采用多步前瞻并在可胜/必防局面优先落子。对局不做持久化，刷新或离开即结束。

## Technical Context

**Language/Version**: JavaScript (ES2019+), 禁止 TypeScript  
**Primary Dependencies**: Vue 2.7, Pinia, Tailwind CSS  
**Storage**: 仅内存态（Pinia store），无持久化  
**Testing**: Vitest（单元）、Cypress（端到端）  
**Target Platform**: Web（现代主流浏览器）  
**Project Type**: web  
**Performance Goals**: 电脑落子 ≤ 2 秒完成并更新棋盘；玩家点击落子 ≤ 100ms 给出视觉反馈  
**Constraints**: 单局对战、无登录、无跨页面持久化  
**Scale/Scope**: 单用户单局、本地运行，无多用户并发要求

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] 技术栈符合宪法：Vue 2.7 + Tailwind CSS + Pinia
- [x] 未引入 TypeScript（无 .ts/.tsx/tsconfig 等）
- [x] 状态管理仅使用 Pinia（无 Vuex/Redux 等）
- [x] 样式仅使用 Tailwind；自定义 CSS 有明确必要性与范围
- [x] 计划中的新增依赖不替代核心栈

Post-design check: 以上条目保持通过。

## Project Structure

### Documentation (this feature)

```text
specs/001-human-vs-ai/
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
├── App.vue
├── main.js
├── assets/
├── components/
├── pages/
├── stores/
├── styles/
└── game/
    ├── ai.js
    ├── board.js
    └── rules.js

tests/
├── unit/
└── e2e/
```

**Structure Decision**: 采用单一前端项目结构；UI 组件放在 `src/components` 与 `src/pages`，对局状态集中在 `src/stores`，规则与 AI 逻辑集中在 `src/game` 以便单测覆盖。

## Complexity Tracking

无（宪法检查无违规）。
