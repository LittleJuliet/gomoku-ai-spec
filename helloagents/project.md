# 项目技术约定

---

## 技术栈
- **核心:** JavaScript (ES2020+), Vue 2.7, Pinia 2
- **构建:** Vite + @vitejs/plugin-vue2
- **渲染:** Canvas 2D
- **样式:** 纯 CSS（禁止 TypeScript）

---

## 开发约定
- **代码规范:** 参考 Vue 官方风格指南（A/B 级）
- **命名约定:** 组件 PascalCase、变量 camelCase、常量 UPPER_SNAKE
- **目录约定:** `src/components`, `src/stores`, `src/utils`, `src/assets`

---

## 错误与日志
- **策略:** 用户操作类错误不抛异常，以 UI 提示处理
- **日志:** 仅在开发态使用 `console.debug`，生产环境移除

---

## 测试与流程
- **测试:** 以手工测试为主，必要时补充简单单元测试
- **提交:** Conventional Commits（可选）
