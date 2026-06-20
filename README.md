# The World of Ice & Fire - Interactive Westeros Map

一个桌面端优先的《冰与火之歌 / 权力的游戏》维斯特洛互动世界地图原型。

> 当前版本：Initial Demo / V1.8 planning ready  
> 项目定位：个人非商业二创作品、地图驱动的世界观浏览器、长期可维护 CMS 内容系统。

## 当前 Demo

当前初版 demo 已包含：

- 维斯特洛大陆高保真 2.5D 沙盘地图。
- 12 个地点节点。
- 临冬城完整可点击详情。
- 君临、黑城堡预览级详情。
- 地点 hover tooltip。
- 地图 pan / zoom / reset。
- 云雾、雪雾、战争烟尘氛围层。
- 家族纹章按钮。
- 地点搜索入口。
- Payload CMS 后台基础结构。
- V1.8 引擎资产管线验证方案已准备，下一步将验证“3D 工具生产资产，Web 负责运行与 CMS”的路线。

## 本地启动

```bash
cd apps/westeros-map
npm install
cp .env.example .env.local
npm run dev
```

访问：

- 前台：`http://localhost:3000`
- 后台：`http://localhost:3000/admin`
- REST API：`http://localhost:3000/api`
- GraphQL：`http://localhost:3000/api/graphql`

## 常用命令

```bash
cd apps/westeros-map
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zustand
- Payload CMS
- SQLite local fallback / PostgreSQL ready
- Playwright
- Vitest

## 文档入口

- [PRD](docs/westeros-interactive-map/PRD.md)
- [技术架构](docs/westeros-interactive-map/TECH_ARCHITECTURE.md)
- [视觉与素材指南](docs/westeros-interactive-map/VISUAL_ASSET_GUIDE.md)
- [地理与沙盘生成外挂知识库](docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md)
- [资产清单](docs/westeros-interactive-map/ASSET_MANIFEST.md)
- [来源登记](docs/westeros-interactive-map/SOURCE_REGISTER.md)
- [当前活跃 Loop](docs/westeros-interactive-map/ACTIVE_LOOP.md)
- [V1.8 设计规格](docs/superpowers/specs/2026-06-21-westeros-v18-engine-asset-pipeline-design.md)
- [V1.8 实现计划](docs/superpowers/plans/2026-06-21-westeros-v18-engine-asset-pipeline.md)

## 当前路线

V1.7 已完成：

- V4 地貌增强沙盘底图。
- 12 个地点专属节点图标。
- 更严格的原著地理锚点文档。

V1.8 准备开始：

- 高保真 2.5D 网页主线。
- 引擎 / 3D 工具资产生产管线验证。
- 北境 / 临冬城沙盘 tile 样例。
- 未来支持 Unity / Unreal / Blender / Spline / Three.js 等资产路线。

## 版权与素材边界

本项目是个人非商业二创原型。

- 不直接搬运官方地图、官方剧照或大段原文。
- 当前公开核心视觉资产以 AI 生成、程序化生成、原创重绘和本地处理资产为主。
- 所有素材应记录来源、作者、授权状态、AI 生成状态、二次创作状态和备注。
- 若未来公开发布，需要重新审查所有生成式和参考资产的版权相似性风险。

## 目录结构

```text
apps/westeros-map/                 # Next.js + Payload CMS app
docs/westeros-interactive-map/     # PRD、架构、素材、来源、loop 状态
docs/superpowers/specs/            # V1.8 设计规格
docs/superpowers/plans/            # V1.8 实现计划
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

## 当前状态

当前活跃阶段：

```text
V1.8 Engine Asset Pipeline Loop
in_progress / ready to execute
```

详情见：

```text
docs/westeros-interactive-map/ACTIVE_LOOP.md
```

