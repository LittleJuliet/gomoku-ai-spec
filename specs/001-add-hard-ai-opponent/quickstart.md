# Quickstart: 人机对战五子棋（极难）

**Date**: 2026-01-20  
**Repo**: /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2

## Prerequisites

- Node.js 18+（LTS）

## Run (Development)

```bash
cd /Users/juliet/Documents/frontend/code/gomoku-ai-spec/feature-spec-kit-v2
npm install
npm run dev
```

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

## Performance Check

1. 启动开发服务并打开页面，进入“人机对战（极难）”模式。
2. 新用户在 60 秒内完成模式选择并落下第一子（记录可用性通过/失败）。
3. 人类落子后，确认 AI 落子在 2 秒内出现。
4. AI 思考过程中点击“重开”，确认对局立即重置且 AI 落子被取消。
5. 与新手玩家进行不少于 10 局对局，记录 AI 胜率是否 ≥90%。
6. 连续落子 20 步，确认界面交互无明显卡顿。
