# Quickstart: 人机对战（玩家黑棋）

## 运行开发环境

```bash
cd /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit
npm install
npm run dev
```

## 运行测试

```bash
cd /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit
npm run test:unit
npm run test:e2e
```

## 本特性重点验证

- 进入“人机对战”后玩家执黑先手
- 进入人机对战后 3 秒内可落子
- 玩家落子后 2 秒内电脑完成落子
- 胜负/平局判定与提示一致
- 完成一局无需刷新页面
- 刷新或离开页面即结束该局
