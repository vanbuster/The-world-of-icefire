# 《维斯特洛互动世界地图》开发任务拆解

> 阶段：6 - 开发任务拆解
> 状态：已生成，作为后续 loop 执行与验收依据
> 创建日期：2026-06-18
> 上游文档：
> - `docs/westeros-interactive-map/PRD.md`
> - `docs/westeros-interactive-map/IA_CONTENT_MODEL.md`
> - `docs/westeros-interactive-map/TECH_ARCHITECTURE.md`
> - `docs/westeros-interactive-map/VISUAL_ASSET_GUIDE.md`
> - `docs/westeros-interactive-map/IMPLEMENTATION_GUIDE.md`

## 1. 拆解原则

- 每个任务必须可独立验证。
- 先前台静态闭环，再接 CMS。
- 先 mock 数据，再 CMS 数据。
- 先原创 / placeholder 资产闭环，再替换高质量生成图。
- 每个阶段完成后运行相关验证。
- 不实际公网发布，不写真实密钥。

## 2. 阶段总览

| 阶段 | 名称 | 目标 | 主要验收 |
|---|---|---|---|
| P0 | 文档与 loop 状态 | 补齐上游文档和验收清单 | 文档存在，状态可续跑 |
| P1 | 应用初始化 | 创建 Next.js 项目骨架 | dev server 可启动 |
| P2 | 视觉主题与类型 | 建立主题、类型、mock 数据 | typecheck 通过 |
| P3 | 地图静态闭环 | 首页、地图、节点、hover | 10 节点可见 |
| P4 | 临冬城详情闭环 | 点击节点打开完整详情 | 7 事件与人物家族可见 |
| P5 | 动效与搜索 | 天气层、搜索、图例、降级 | 交互可用，低动效可用 |
| P6 | 素材闭环 | 生成 / 绘制资产并登记 | manifest 与文件一致 |
| P7 | CMS 基础 | Payload、登录、Media | admin 可访问 |
| P8 | 内容模型与 seed | Locations、Assets、预留模型 | seed 后有数据 |
| P9 | CMS 数据接入 | 前台读取 published 数据 | mock fallback 可用 |
| P10 | 测试与质量 | lint/typecheck/test/build/E2E | 全部通过 |
| P11 | 部署准备 | README、env、部署说明 | 可按文档部署 |

## 3. P0 文档与 loop 状态

### P0.1 初始化 loop 状态

- 产物：
  - `docs/westeros-interactive-map/loop/ACCEPTANCE_CHECKS.json`
  - `PROGRESS.md`
  - `BLOCKERS.md`
  - `OPERATOR_STATUS.md`
- 验收：
  - JSON 有效。
  - 至少包含文档、应用、CMS、素材、测试、部署检查项。

### P0.2 补齐上游文档

- 产物：
  - `IA_CONTENT_MODEL.md`
  - `TECH_ARCHITECTURE.md`
  - `VISUAL_ASSET_GUIDE.md`
  - `IMPLEMENTATION_GUIDE.md`
  - `TASK_BREAKDOWN.md`
  - `DEPLOYMENT.md`
- 验收：
  - 文件存在。
  - 覆盖 PRD 要求。
  - loop 检查项有 evidence。

依赖：PRD 与约束文件。

## 4. P1 应用初始化

### P1.1 创建应用目录

- 产物：
  - `apps/westeros-map/`
  - `package.json`
  - `tsconfig.json`
  - `next.config.ts`
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
- 验收：
  - `npm install` 成功。
  - `npm run dev` 可启动。
  - 首页可访问。

### P1.2 配置基础工具链

- 产物：
  - ESLint
  - TypeScript
  - Tailwind
  - Vitest
  - Playwright
- 验收：
  - `npm run typecheck` 存在。
  - `npm run lint` 存在。
  - `npm test` 存在。
  - `npm run test:e2e` 存在。

依赖：P1.1。

## 5. P2 视觉主题与类型

### P2.1 配置 Tailwind 主题

- 产物：
  - `tailwind.config.ts`
  - `src/app/globals.css` 或等价全局 CSS
- 验收：
  - parchment / ink / gold / snow / fog / war token 可用。
  - 页面显示基础古地图氛围。

### P2.2 创建 TypeScript 类型

- 产物：
  - `src/types/content.ts`
  - `src/types/map.ts`
  - `src/types/cms.ts`
  - `src/types/viewModels.ts`
  - `src/types/index.ts`
- 验收：
  - 包含 SourceType、CanonLevel、PublishStatus、Location、Asset、Event、Character、House 等类型。
  - typecheck 通过。

### P2.3 创建 mock 数据

- 产物：
  - `src/data/mock/*`
- 验收：
  - 10 个地点。
  - 临冬城 7 个事件。
  - 私生子之战 sourceType 正确。
  - 基础人物、家族、素材记录存在。

### P2.4 创建 selectors

- 产物：
  - `src/lib/content/selectors.ts`
  - `src/lib/content/sourceLabels.ts`
- 验收：
  - 可聚合 MapLocationViewModel。
  - 可获取 Winterfell LocationDetailViewModel。
  - 事件按 order 排序。

依赖：P1、P2.2、P2.3。

## 6. P3 地图静态闭环

### P3.1 实现首页 AppShell

- 产物：
  - layout components
- 验收：
  - 地图区域占据第一视觉。
  - 顶部栏、图例、搜索入口、详情面板插槽存在。

### P3.2 实现 WorldMap

- 产物：
  - `WorldMap`
  - `MapViewport`
  - `MapBackground`
- 验收：
  - 地图容器可见。
  - 古地图 / 沙盘底色可见。

### P3.3 实现坐标系统

- 产物：
  - `src/lib/map/coordinates.ts`
- 验收：
  - 百分比坐标 / 虚拟坐标转换可测试。

### P3.4 实现节点层

- 产物：
  - `MapNodeLayer`
  - `MapNode`
- 验收：
  - 至少 10 个节点可见。
  - 临冬城节点突出。

### P3.5 实现 hover tooltip

- 产物：
  - `MapTooltip`
  - map store hover 状态
- 验收：
  - hover 节点展示名称、类型、区域、家族。

依赖：P2。

## 7. P4 临冬城详情闭环

### P4.1 实现 map store

- 产物：
  - `src/stores/mapStore.ts`
- 验收：
  - selectedLocationId、hoveredLocationId、panelOpen、zoom、pan 状态可用。

### P4.2 实现点击临冬城

- 产物：
  - MapNode click handler
  - LocationPanel host
- 验收：
  - 点击临冬城打开详情。
  - 其他节点显示待扩展提示。

### P4.3 实现 LocationPanel

- 产物：
  - `LocationPanel`
  - `LocationHeader`
  - `AssetGallery`
  - `SourceSummary`
- 验收：
  - 临冬城简介、地理、政治归属、来源摘要可见。

### P4.4 实现临冬城局部地图

- 产物：
  - `LocalMap`
- 验收：
  - 显示局部地图或风格化占位。
  - 包含临冬城、狼林、白刀河、临冬镇等标签或意象。

### P4.5 实现 Timeline 与 EventCard

- 产物：
  - `Timeline`
  - `TimelineItem`
  - `EventCard`
- 验收：
  - 7 个关键事件可见。
  - sourceType 标签可见。
  - 私生子之战标签正确。

### P4.6 实现人物与家族展示

- 产物：
  - `CharacterCard`
  - `HouseBadge`
  - `HouseSigil`
- 验收：
  - 临冬城相关人物可见。
  - 相关家族可见。
  - 不使用演员照片。

依赖：P3。

## 8. P5 动效、搜索与图例

### P5.1 实现 pan / zoom

- 验收：
  - 可拖拽或按钮移动地图。
  - 可缩放。
  - reset 可恢复。

### P5.2 实现天气层

- 验收：
  - 云雾 / 雪雾 / 烟尘至少一种可见。
  - 可关闭。
  - respects `prefers-reduced-motion`。

### P5.3 实现基础搜索

- 验收：
  - 搜索“临冬城”或 “Winterfell” 可找到。
  - 点击结果可选中节点或打开详情。

### P5.4 实现图例

- 验收：
  - 地点类型、节点等级、sourceType 标签说明可见。

依赖：P4。

## 9. P6 素材闭环

### P6.1 创建 asset 目录

- 产物：
  - `public/assets/westeros/...`
- 验收：
  - 目录结构符合视觉指南。

### P6.2 创建或生成地图底图

- 验收：
  - 全局地图底图存在。
  - 不直接复制官方地图。
  - 记录到 manifest。

### P6.3 创建临冬城局部图

- 验收：
  - 局部图存在或 SVG 占位存在。
  - 记录到 manifest。

### P6.4 创建 7 个事件配图或占位资产

- 验收：
  - 每个事件有对应素材。
  - 记录到 manifest。

### P6.5 创建家族纹章和人物占位

- 验收：
  - 核心家族纹章存在。
  - 人物不使用演员照片。

依赖：视觉指南与前台组件。

## 10. P7 CMS 基础

### P7.1 安装 Payload

- 验收：
  - Payload admin 路由可访问。
  - 前台不受影响。

### P7.2 配置 Users / Media

- 验收：
  - 单管理员登录可用。
  - Media 上传能力存在。

### P7.3 创建 `.env.example`

- 验收：
  - 包含 DATABASE_URI、PAYLOAD_SECRET、NEXT_PUBLIC_SITE_URL。
  - 不包含真实密钥。

依赖：P1。

## 11. P8 内容模型与 seed

### P8.1 创建 Locations collection

- 验收：
  - 坐标字段、发布状态、基础详情字段存在。

### P8.2 创建 Assets / Media 来源字段

- 验收：
  - 来源类型、链接、作者、AI 生成、二次创作字段存在。

### P8.3 预留其他 collections

- 验收：
  - Regions、Houses、Characters、Events、Storylines 等预留或 scaffold。

### P8.4 创建 seed

- 验收：
  - seed 后有 10 地点。
  - seed 后有临冬城 7 事件。
  - 私生子之战标记正确。

依赖：P7。

## 12. P9 CMS 数据接入

### P9.1 创建 CMS client / queries

- 验收：
  - 查询 published locations。
  - 查询临冬城详情相关数据。

### P9.2 normalize CMS 数据

- 验收：
  - CMS 数据可转为前台 view model。

### P9.3 保留 mock fallback

- 验收：
  - CMS 空数据或不可用时前台不白屏。

依赖：P8。

## 13. P10 测试与质量

### P10.1 单元测试

- 验收：
  - selectors、坐标、source labels 有测试。

### P10.2 组件测试

- 验收：
  - 关键组件可渲染。

### P10.3 E2E 测试

- 验收：
  - Playwright 覆盖首页、节点、hover、点击临冬城、时间线、来源标签。

### P10.4 质量命令

- 验收：
  - lint 通过。
  - typecheck 通过。
  - test 通过。
  - build 通过。

依赖：P5、P9。

## 14. P11 部署准备

### P11.1 README

- 验收：
  - 说明启动、测试、CMS、seed、部署。

### P11.2 DEPLOYMENT

- 验收：
  - 说明 Vercel / Railway / Render / Supabase 或 Neon 方案。

### P11.3 版权说明

- 验收：
  - 说明非商业二创、素材来源记录、禁止未经授权官方素材。

### P11.4 最终浏览器验证

- 验收：
  - 本地 URL 可访问。
  - 截图检查地图非空、节点可见、详情可打开。

依赖：P10。

## 15. 推荐执行顺序

严格推荐：

1. P0 文档与 loop 状态
2. P1 应用初始化
3. P2 视觉主题与类型
4. P3 地图静态闭环
5. P4 临冬城详情闭环
6. P5 动效、搜索与图例
7. P6 素材闭环
8. P10 中的前台相关测试先补一轮
9. P7 CMS 基础
10. P8 内容模型与 seed
11. P9 CMS 数据接入
12. P10 完整测试与质量门
13. P11 部署准备

原因：

- 先做前台闭环，可以尽早验证产品感觉。
- CMS 过早接入会拖慢视觉和交互探索。
- 素材先 placeholder 后替换，可以避免阻塞主路径。
- 测试分两次补：前台闭环后一次，CMS 接入后一次。

## 16. 每个任务的通用完成定义

- 文件已创建或修改。
- 可用命令或浏览器验证。
- 验收标准逐条满足。
- loop 状态文件写入 evidence。
- 不破坏上游约束。
- 不引入真实密钥。
- 不使用未经授权官方核心素材。

