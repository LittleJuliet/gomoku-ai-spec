<!--
Sync Impact Report
- Version change: Template (unversioned) -> 1.0.0
- Modified principles:
  - Template placeholder -> I. 技术栈锁定（Vue 2.7 + Tailwind CSS + Pinia）
  - Template placeholder -> II. 禁用 TypeScript（仅 JavaScript）
  - Template placeholder -> III. 状态边界清晰（Pinia 统一管理）
  - Template placeholder -> IV. Tailwind 优先与最小自定义样式
  - Template placeholder -> V. 规格驱动交付与可验收
- Added sections:
  - 技术与约束
  - 开发流程与质量门禁
- Removed sections: None
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# gomoku-ai-spec Constitution

## Core Principles

### I. 技术栈锁定（Vue 2.7 + Tailwind CSS + Pinia）
- 前端必须使用 Vue 2.7。
- 样式必须使用 Tailwind CSS。
- 全局/跨组件状态必须使用 Pinia。
- 任何替代核心栈的依赖变更，必须先修订宪法。

Rationale: 统一技术栈以降低协作成本与维护复杂度。

### II. 禁用 TypeScript（仅 JavaScript）
- 全项目仅允许 JavaScript（.js/.vue），禁止 .ts/.tsx 与 tsconfig。
- 不引入强依赖 TypeScript 的库或构建链路。
- 需要类型约束时可使用 JSDoc，但不得引入 TS 编译流程。

Rationale: 明确语言边界，避免工具链复杂化。

### III. 状态边界清晰（Pinia 统一管理）
- 跨组件或跨页面共享状态必须进入 Pinia store。
- 组件只维护局部 UI 状态，通过 props/emit 传递数据。
- 禁止全局事件总线或隐式全局变量作为状态通道。

Rationale: 保持状态可追踪与可测试。

### IV. Tailwind 优先与最小自定义样式
- 样式以 Tailwind 工具类为主，不引入其它 CSS 框架。
- 必要的自定义样式需限制在最小范围并注明原因。
- 动态样式优先通过 class 组合实现，避免大量内联 style。

Rationale: 保障一致性与可维护性。

### V. 规格驱动交付与可验收
- 每个特性必须包含 spec.md、plan.md、tasks.md 的闭环文档。
- 规格中的用户故事必须可独立验收与测试。
- 任何与宪法冲突的方案必须先完成修订。

Rationale: 以可追踪的规格确保交付质量。

## 技术与约束

- 技术栈固定为 Vue 2.7 + Tailwind CSS + Pinia。
- 仅允许 JavaScript，禁止 TypeScript。
- 依赖新增需明确目的，不得替代核心栈。
- 如需引入新框架或重大工具链变更，必须修订宪法。

## 开发流程与质量门禁

- 规格流程：spec → plan → tasks，缺一不可。
- plan.md 必须包含“Constitution Check”并逐条通过。
- 评审与合并必须检查：技术栈、语言、状态管理与样式约束。
- 违反宪法的实现必须回退或先修订宪法。

## Governance

- 本宪法优先级最高；与其他文档冲突时以本宪法为准。
- 修订流程：提交修订说明（动机、影响、迁移策略）并更新模板。
- 版本策略采用语义化版本：
  - MAJOR：删除/重定义原则或产生破坏性变更。
  - MINOR：新增原则或新增强约束。
  - PATCH：文字澄清与非语义调整。
- 每次规格与计划评审都必须进行合规检查并记录结果。

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13
