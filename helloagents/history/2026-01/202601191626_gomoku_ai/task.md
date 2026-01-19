# 任务清单: 人机对战

目录: `helloagents/plan/202601191626_gomoku_ai/`

---

## 1. AI 引擎模块
- [√] 1.1 在 `src/utils/ai.js` 中实现候选点生成、局面评分与搜索，验证 why.md#需求-人机对战模式-场景-玩家落子后ai立即回应
- [√] 1.2 在 `src/utils/ai.js` 中加入时间预算与降级逻辑，验证 why.md#需求-人机对战模式-场景-玩家落子后ai立即回应，依赖任务1.1

## 2. 状态管理与回合
- [√] 2.1 在 `src/stores/game.js` 中新增对战模式/结果状态与平局判定，验证 why.md#需求-平局判定-场景-棋盘落满
- [√] 2.2 在 `src/stores/game.js` 中接入 AI 决策与人机回合切换，验证 why.md#需求-人机对战模式-场景-玩家落子后ai立即回应，依赖任务2.1

## 3. 交互与 UI
- [√] 3.1 在 `src/components/BoardCanvas.vue` 中限制 AI 回合落子并调用人机落子动作，验证 why.md#需求-人机对战模式-场景-玩家落子后ai立即回应
- [√] 3.2 在 `src/App.vue` 中新增模式切换入口与文案更新，验证 why.md#需求-模式切换与文案更新-场景-切换对战模式
- [√] 3.3 在 `src/components/StatusBar.vue` 与 `src/components/WinnerModal.vue` 中更新玩家/电脑与平局提示，验证 why.md#需求-模式切换与文案更新-场景-切换对战模式，依赖任务3.2

## 4. 安全检查
- [√] 4.1 执行安全检查（按G9: 输入验证、敏感信息处理、权限控制、EHRB风险规避）

## 5. 文档更新
- [√] 5.1 更新 `helloagents/wiki/overview.md` 与新增 `helloagents/wiki/modules/ai-engine.md`
- [√] 5.2 更新 `helloagents/wiki/modules/state-store.md` 与 `helloagents/wiki/modules/ui-board.md`
- [√] 5.3 更新 `helloagents/CHANGELOG.md`

## 6. 测试
- [-] 6.1 手动验证：人机对战默认、AI 立即落子、胜负/平局弹窗、模式切换重置
  > 备注: 未执行手动验证
