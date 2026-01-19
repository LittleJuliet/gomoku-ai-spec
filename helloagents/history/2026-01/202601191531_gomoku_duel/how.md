# 技术设计: 五子棋双人对战

## 技术方案
### 核心技术
- Vue 2.7 + Pinia 2（JavaScript）
- Vite + @vitejs/plugin-vue2
- Canvas 2D 绘制棋盘与棋子

### 实现要点
- 使用 Pinia 管理 `board/currentPlayer/winner/lastMove` 等状态
- Canvas 负责绘制棋盘线条与棋子，落子后重绘
- 点击坐标换算为行列索引，超出棋盘或已占用则忽略
- 胜负判定基于最近落子在四个方向扩展计数
- 胜利后弹窗提示并禁止继续落子
- 布局以 1920×1080 为主要展示，最低适配 1280 宽度
- 拟物风格：木纹背景、棋子阴影与高光，按钮具轻微立体感

## 架构决策 ADR
### ADR-001: 使用 Canvas 绘制棋盘
**上下文:** 需要拟物风格棋盘与棋子，棋盘为 15×15，交互以点击为主。
**决策:** 采用 Canvas 进行棋盘与棋子绘制。
**理由:** 拟物材质与阴影效果在 Canvas 中更易控制，且渲染性能稳定。
**替代方案:** DOM Grid + CSS
→ 拒绝原因: DOM 结构较重，拟物细节与棋子阴影更复杂。
**影响:** 需实现坐标换算与高 DPI 适配；交互与可访问性需额外处理。

## API设计
无

## 数据模型
```js
const state = {
  board: Array(15).fill(null).map(() => Array(15).fill(0)),
  currentPlayer: 1,
  winner: null,
  moveCount: 0,
  lastMove: null
}
```

## 安全与性能
- **安全:** 严格校验点击坐标范围与棋盘占用状态；不持久化任何用户数据
- **性能:** 使用 `devicePixelRatio` 进行高 DPI 适配，避免模糊；仅在状态变更时重绘

## 测试与部署
- **测试:** 手工测试落子、胜负判定、重新开始、回合提示、胜负弹窗
- **部署:** 本地构建 `npm run build` 产物静态部署即可
