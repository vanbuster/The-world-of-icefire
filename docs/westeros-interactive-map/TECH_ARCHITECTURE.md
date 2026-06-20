# 《维斯特洛互动世界地图》技术架构文档

> 阶段：3 - 技术架构文档
> 状态：已生成，作为详细实现文档和代码搭建依据
> 创建日期：2026-06-18
> 上游文档：
> - `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`
> - `docs/westeros-interactive-map/PRD.md`
> - `docs/westeros-interactive-map/IA_CONTENT_MODEL.md`

## 1. 架构目标

项目目标是交付一个可长期维护的网页端互动世界地图，而不是一次性静态页面。技术架构需要同时满足：

- 桌面端沉浸式互动地图体验
- 临冬城详情闭环
- 后台 CMS 长期内容维护
- 素材来源和 AI 生成资产追踪
- 可测试、可构建、可部署
- 后续可扩展更多地点、人物、事件、家族、故事线和地图层
- 未来可从 2.5D 视觉升级到 PixiJS / Three.js 渲染层

## 2. 推荐技术栈

### 2.1 前台

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- CSS / SVG / Canvas 轻量视觉层
- 后续可选 PixiJS / Three.js

### 2.2 后台

- Payload CMS
- PostgreSQL
- 本地文件存储
- 后续可扩展 S3 / Cloudflare R2
- 单管理员账号

### 2.3 测试

- TypeScript typecheck
- ESLint
- Vitest / React Testing Library
- Playwright
- 构建验证：`npm run build`

### 2.4 部署

- 前台与 Payload 可采用同一 Next.js 应用承载。
- 第一阶段本地开发优先。
- 公开网站部署候选：
  - Vercel：前台体验友好
  - Railway / Render：更适合同时承载数据库和长运行服务
  - Supabase / Neon：PostgreSQL 托管
  - Cloudflare R2 / S3：后续媒体存储

## 3. 仓库与应用目录

推荐应用目录：

```text
Agent-Workbench/
├─ docs/
│  └─ westeros-interactive-map/
│     ├─ PRD.md
│     ├─ IA_CONTENT_MODEL.md
│     ├─ TECH_ARCHITECTURE.md
│     ├─ VISUAL_ASSET_GUIDE.md
│     ├─ IMPLEMENTATION_GUIDE.md
│     ├─ TASK_BREAKDOWN.md
│     ├─ DEPLOYMENT.md
│     ├─ SOURCE_REGISTER.md
│     ├─ ASSET_MANIFEST.md
│     └─ loop/
└─ apps/
   └─ westeros-map/
      ├─ src/
      ├─ public/
      ├─ tests/
      ├─ payload.config.ts
      ├─ next.config.ts
      ├─ package.json
      └─ README.md
```

如果后续发现已有同类应用目录，应优先沿用现有结构，避免重复创建项目。

## 4. 总体系统架构

```text
┌──────────────────────────────────────────────────────────────┐
│ Public Website                                                │
│ Next.js App Router                                            │
│                                                              │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│ │ App Shell    │  │ World Map    │  │ Location Panel       │ │
│ │ Top / Legend │  │ Renderer     │  │ Winterfell Details   │ │
│ └──────────────┘  └──────────────┘  └──────────────────────┘ │
│        │                 │                    │               │
│        └──────────────┬──┴──────────────┬─────┘               │
│                       │                 │                     │
│                View Models / Selectors / Source Labels         │
│                       │                                       │
├───────────────────────┼───────────────────────────────────────┤
│ CMS / Data Layer      │                                       │
│ Payload CMS           │                                       │
│ Collections: Locations, Assets, Media, Users, reserved models │
│ PostgreSQL + Local Media                                      │
├───────────────────────────────────────────────────────────────┤
│ Asset Pipeline                                               │
│ Generated / drawn assets, manifest, source register           │
├───────────────────────────────────────────────────────────────┤
│ Verification                                                 │
│ typecheck, lint, tests, build, Playwright, visual screenshots  │
└──────────────────────────────────────────────────────────────┘
```

## 5. 前端架构

### 5.1 前端分层

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ admin / payload routes
├─ components/
│  ├─ layout/
│  ├─ map/
│  ├─ panel/
│  ├─ timeline/
│  ├─ character/
│  ├─ house/
│  ├─ search/
│  └─ ui/
├─ data/
│  └─ mock/
├─ lib/
│  ├─ content/
│  ├─ map/
│  ├─ cms/
│  └─ assets/
├─ stores/
├─ types/
└─ styles/
```

### 5.2 核心前端模块

| 模块 | 责任 | MVP |
|---|---|---|
| AppShell | 页面框架、顶部工具栏、图例、详情面板插槽 | 必做 |
| WorldMap | 地图总容器 | 必做 |
| MapViewport | 视口、缩放、平移、坐标转换 | 必做 |
| MapBackground | 地图底图、2.5D 视觉背景 | 必做 |
| MapNodeLayer | 渲染地点节点 | 必做 |
| MapNode | 单个节点、hover、selected 状态 | 必做 |
| MapTooltip | hover 说明卡 | 必做 |
| WeatherLayer | 云雾、雪雾、烟尘、低动效切换 | 必做 |
| LocationPanel | 右侧地点详情面板 | 必做 |
| WinterfellDetail | 临冬城详情组合 | 必做 |
| Timeline | 临冬城事件时间线 | 必做 |
| EventCard | 事件卡片与配图 | 必做 |
| CharacterCard | 人物卡片 | 必做 |
| HouseBadge | 家族展示 | 必做 |
| Search | 基础地点搜索 | 轻量必做 |
| Legend | 地图图例与来源标签说明 | 必做 |

### 5.3 Client / Server 边界

地图、动画、交互状态和浏览器测量必须是 Client Component：

- `WorldMap`
- `MapViewport`
- `WeatherLayer`
- `LocationPanel`
- `Search`

数据聚合、静态内容读取和 CMS 查询可在 Server Component 或 server-side helper 中完成，再传递给 client view models。

原则：

- WebGL / Canvas / DOM 测量不要放到 Server Component。
- CMS 查询不要散落在 UI 组件里。
- UI 消费 view model，不直接消费 Payload 原始响应。

## 6. 地图渲染架构

### 6.1 MVP 渲染路线

MVP 采用 2.5D 高保真地图体验：

```text
Map Stage
├─ Parchment / terrain background
├─ Region tint layer
├─ Terrain illustration layer
├─ Node layer
├─ Weather / fog / snow layer
├─ Selection / tooltip layer
└─ UI overlays
```

实现方式：

- 背景：原创 / 生成 / 程序化 SVG 或 raster 资产。
- 节点：HTML / SVG 绝对定位。
- 天气：CSS animation 或轻量 Canvas。
- 交互：Zustand 存储 pan、zoom、hoveredLocationId、selectedLocationId、reducedMotion。

### 6.2 坐标系统

推荐支持两套坐标：

- `xPercent` / `yPercent`：0-100 百分比，便于 CMS 手动输入。
- `virtualX` / `virtualY`：0-10000 虚拟坐标，便于未来精细地图和不同尺寸换算。

MVP 可以以百分比坐标为主，保留虚拟坐标类型和转换函数。

坐标转换模块：

```text
lib/map/coordinates
├─ percentToStylePosition
├─ virtualToPercent
├─ virtualToPixel
└─ clampMapTransform
```

### 6.3 后续渲染升级

后续可引入独立 renderer adapter：

```text
MapRenderer
├─ HtmlSvgRenderer  MVP
├─ PixiRenderer     V2 / V3
└─ ThreeRenderer    V3
```

上层组件只依赖统一的 map view model 和交互事件，不直接耦合具体渲染技术。

## 7. 状态管理

使用 Zustand 管理前台交互状态。

核心状态：

- `selectedLocationId`
- `hoveredLocationId`
- `panelOpen`
- `zoom`
- `panX`
- `panY`
- `searchQuery`
- `activeHouseFilter`
- `activeSourceTypeFilter`
- `weatherEnabled`
- `reducedMotion`

内容数据不放入 Zustand 作为权威来源。内容权威来源来自 CMS / seed / mock fallback，Zustand 只管理当前 UI 状态。

## 8. 数据架构

### 8.1 数据源优先级

MVP 开发期：

```text
mock data
→ selectors / view models
→ frontend components
```

CMS 接入后：

```text
Payload CMS published data
→ CMS queries
→ normalize
→ selectors / view models
→ frontend components
```

Fallback：

```text
CMS unavailable or empty
→ mock fallback
→ visible development note in logs / docs
```

### 8.2 View Model 层

前台组件只消费：

- `MapLocationViewModel`
- `LocationDetailViewModel`
- `TimelineItemViewModel`
- `CharacterCardViewModel`
- `HouseBadgeViewModel`
- `AssetViewModel`

好处：

- 前台不依赖 Payload 具体字段形态。
- mock 和 CMS 可以共享 UI。
- 后续更换 CMS 或增强数据模型时 UI 改动最小。

## 9. CMS 架构

### 9.1 Payload Collections

MVP 必做：

- `Users`
- `Media`
- `Locations`
- `Assets` 或在 `Media` 中扩展来源字段

预留 / scaffold：

- `Regions`
- `Houses`
- `Characters`
- `Events`
- `TimelineEntries`
- `Storylines`
- `MapLayers`
- `WeatherLayers`
- `SourceReferences`

### 9.2 管理能力

MVP 后台必须支持：

- 单管理员登录
- Locations 列表 / 新建 / 编辑
- Assets 上传 / 编辑 / 来源记录
- 发布状态
- 基础搜索 / 筛选
- 基础预览入口

后续支持：

- 多角色权限
- 编辑 / 审核流程
- 拖拽地图坐标编辑器
- 批量导入
- 更完整版权审计字段

### 9.3 发布状态

内容状态：

- `draft`
- `published`

前台默认只读取 `published`。预览可读取 draft，但必须通过预览入口控制。

## 10. 素材架构

### 10.1 素材来源

项目允许：

- 原创绘制
- AI 辅助生成
- 参考公开资料后重绘
- 开源 / 授权手绘素材
- 抽象风格参考后生成

禁止作为公开核心素材：

- 未授权官方地图原图
- 官方剧照
- 演员照片
- 商业游戏截图或素材
- 大段原文 / 台词截图

### 10.2 素材文件结构

```text
public/
└─ assets/
   └─ westeros/
      ├─ maps/
      ├─ local-maps/
      ├─ events/
      ├─ characters/
      ├─ houses/
      ├─ textures/
      └─ ui/
```

### 10.3 Manifest 与来源记录

每个公开使用素材必须记录到：

- `docs/westeros-interactive-map/ASSET_MANIFEST.md`
- 如使用网络参考，同时记录到 `SOURCE_REGISTER.md`

CMS Asset / Media 也必须保留来源字段。

### 10.4 生成策略

AI 生成提示词应避免复刻官方视觉，应使用抽象描述：

- medieval fantasy cartographic miniature
- snowy northern stone castle
- parchment texture
- dark gold museum interface
- war smoke
- foggy northern landscape

不要要求生成具体演员、剧照镜头或官方地图复制品。

## 11. 测试架构

### 11.1 静态质量门

- lint
- typecheck
- unit / component tests
- production build

### 11.2 前台 E2E

Playwright 测试关键路径：

1. 首页加载。
2. 地图 stage 可见。
3. 至少 10 个地点节点可见。
4. hover 临冬城显示 tooltip。
5. 点击临冬城打开详情面板。
6. 7 个事件或时间线项可见。
7. 私生子之战显示 `show` 或 `show-canon` 标签。
8. 切换低动效或系统 reduced motion 时页面不崩。

### 11.3 CMS 验证

CMS 验证可以分阶段：

- Collection 配置类型检查。
- Seed 脚本可运行。
- Admin 路由可访问。
- Locations 和 Assets 可创建。
- 前台可读取 published 数据或 fallback。

如果本地没有 PostgreSQL，先使用文档化 fallback 或轻量本地开发配置，但最终部署说明必须明确 PostgreSQL。

## 12. 性能与降级策略

### 12.1 性能风险

- 大图底图加载过慢
- 雾层 / 雪粒子动画阻塞主线程
- 详情面板图片过大
- 地图 pan / zoom 触发过多重排
- CMS 数据请求过多

### 12.2 降级策略

- 支持 `prefers-reduced-motion`
- UI 内提供低动效模式
- 天气层可关闭
- 粒子数量按性能降低
- Canvas 图层可退回 CSS 背景动画
- 图片使用压缩尺寸和懒加载
- 地图节点使用 transform 而非频繁 layout

### 12.3 首屏策略

首页首屏必须先展示地图框架和核心节点，再加载高成本视觉增强。

推荐顺序：

1. App shell
2. 地图底色 / 占位底图
3. 地点节点
4. 天气层
5. 详情素材图

## 13. 部署架构

### 13.1 本地开发

```text
npm install
npm run dev
npm run seed
npm run test
npm run build
```

实际命令以后续应用 package scripts 为准。

### 13.2 环境变量

必须提供 `.env.example`，包含：

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `MEDIA_STORAGE_MODE`
- 后续 S3 / R2 变量占位

不得提交真实密钥。

### 13.3 部署候选

推荐组合：

- Vercel：Next.js 前台和 API
- Railway / Render / Supabase / Neon：PostgreSQL
- R2 / S3：后续媒体文件

MVP 可先完成部署准备，不在无人值守状态下实际发布公网。

## 14. 安全与权限

MVP：

- 单管理员登录
- 不开放前台用户系统
- 不开放评论 / 投稿 / 上传
- 不暴露 draft 内容
- 环境变量不进仓库

后续：

- 编辑者 / 审核者
- 访客预览链接
- 内容审核工作流
- 素材版权审计

## 15. 错误处理与空状态

前台必须有空状态：

- CMS 无数据：显示 mock fallback 或“内容维护中”
- 某地点无详情：显示“详情待扩展”
- 素材缺失：显示风格化占位图
- 事件无配图：显示事件类型占位图
- 网络请求失败：显示可恢复提示，不让页面白屏

后台必须有字段说明，降低长期维护成本。

## 16. 架构决策记录

### ADR-001：MVP 不做真 3D

决策：MVP 使用 2.5D 高保真地图体验，不直接上 Three.js 真 3D。

原因：

- 真 3D 资产成本高。
- 交互和性能复杂度高。
- MVP 重点是地图 + 临冬城详情 + CMS 闭环。
- 2.5D 可以保留幻想沙盘感，并为后续 PixiJS / Three.js 预留接口。

### ADR-002：前台消费 view model，不直接消费 CMS 原始数据

决策：建立 selector / normalize 层。

原因：

- 方便 mock 与 CMS 切换。
- 降低 UI 与 Payload schema 耦合。
- 后续内容模型扩展时减少前台重构。

### ADR-003：坐标字段从第一版进入 Location

决策：MVP 后台保留坐标字段，但不做拖拽编辑器。

原因：

- 长期维护需要不改代码即可调整节点。
- 拖拽编辑器成本较高，可后续迭代。
- 手动坐标足够支撑 MVP。

### ADR-004：素材来源记录从第一版进入 Assets

决策：素材来源记录属于 MVP 基础能力。

原因：

- 项目面向公开社区发布。
- 二创素材需要留痕。
- 后补版权字段成本更高。

## 17. 风险清单

| 风险 | 影响 | 缓解策略 |
|---|---|---|
| 素材版权边界不清 | 公开发布风险 | 原创 / AI 生成 / 重绘，保留来源记录，不使用官方核心素材 |
| 真 3D 过早引入 | 延误 MVP | 先 2.5D，预留 renderer adapter |
| CMS 复杂度过高 | 初版难完成 | MVP 只做 Locations / Assets，其他预留 |
| PostgreSQL 本地环境不稳定 | 阻塞开发 | 先 mock + seed + 文档化 DB 配置 |
| 动效影响性能 | 用户体验下降 | reduced motion、天气关闭、粒子降级 |
| 内容模型过早写死临冬城 | 后续扩展困难 | 所有详情组件基于通用 LocationDetailViewModel |

