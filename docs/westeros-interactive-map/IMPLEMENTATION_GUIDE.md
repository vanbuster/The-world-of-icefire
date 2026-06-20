# 《维斯特洛互动世界地图》详细实现指南

> 阶段：5 - 详细技术文档 / 实现指南
> 状态：已生成，作为代码实现、测试和维护的工程约定
> 创建日期：2026-06-18
> 上游文档：
> - `docs/westeros-interactive-map/PRD.md`
> - `docs/westeros-interactive-map/IA_CONTENT_MODEL.md`
> - `docs/westeros-interactive-map/TECH_ARCHITECTURE.md`
> - `docs/westeros-interactive-map/VISUAL_ASSET_GUIDE.md`

## 1. 实现原则

实现目标是交付一个可迭代的完整项目，而不是只看起来像地图的静态页面。

核心原则：

- 先完成前台静态闭环，再接 CMS。
- 所有 UI 先消费 view model，避免和 Payload 原始响应耦合。
- 临冬城是第一个完整样板，但组件必须能扩展到其他地点。
- 地图节点坐标进入内容模型，MVP 不做拖拽编辑器。
- 素材来源记录从第一版进入工作流。
- 每个增量必须可验证。

## 2. 应用目录结构

默认应用目录：

```text
apps/westeros-map/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ globals.css
│  │  └─ (payload)/
│  ├─ components/
│  │  ├─ layout/
│  │  ├─ map/
│  │  ├─ panel/
│  │  ├─ timeline/
│  │  ├─ character/
│  │  ├─ house/
│  │  ├─ search/
│  │  └─ ui/
│  ├─ collections/
│  ├─ data/
│  │  └─ mock/
│  ├─ lib/
│  │  ├─ content/
│  │  ├─ cms/
│  │  ├─ map/
│  │  └─ assets/
│  ├─ seed/
│  ├─ stores/
│  ├─ styles/
│  └─ types/
├─ public/
│  └─ assets/
│     └─ westeros/
├─ tests/
│  ├─ unit/
│  └─ e2e/
├─ payload.config.ts
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ playwright.config.ts
├─ package.json
├─ .env.example
└─ README.md
```

如果创建项目时 Next.js 版本默认使用 `src/app/globals.css` 以外路径，应保持内部一致，但 README 必须写明。

## 3. 前端模块实现顺序

### 3.1 Layout

文件建议：

- `src/components/layout/AppShell.tsx`
- `src/components/layout/TopToolbar.tsx`
- `src/components/layout/LegendBar.tsx`
- `src/components/layout/PanelHost.tsx`

职责：

- 组织首页桌面布局。
- 保持地图为第一视觉主体。
- 提供搜索入口、图例入口、动效开关。
- 承载右侧详情面板。

### 3.2 Map

文件建议：

- `src/components/map/WorldMap.tsx`
- `src/components/map/MapViewport.tsx`
- `src/components/map/MapBackground.tsx`
- `src/components/map/MapNodeLayer.tsx`
- `src/components/map/MapNode.tsx`
- `src/components/map/MapTooltip.tsx`
- `src/components/map/MapControls.tsx`
- `src/components/map/WeatherLayer.tsx`
- `src/components/map/CloudLayer.tsx`
- `src/components/map/SnowLayer.tsx`

职责：

- 显示地图底图。
- 渲染地点节点。
- 支持 hover tooltip。
- 支持临冬城 selected 状态。
- 支持基础 pan / zoom。
- 支持天气层和降级。

### 3.3 Panel

文件建议：

- `src/components/panel/LocationPanel.tsx`
- `src/components/panel/LocationHeader.tsx`
- `src/components/panel/LocalMap.tsx`
- `src/components/panel/AssetGallery.tsx`
- `src/components/panel/SourceSummary.tsx`

职责：

- 展示地点详情。
- MVP 只展示临冬城完整详情。
- 支持关闭、滚动和展开动画。

### 3.4 Timeline / Event

文件建议：

- `src/components/timeline/Timeline.tsx`
- `src/components/timeline/TimelineItem.tsx`
- `src/components/timeline/EventCard.tsx`
- `src/components/source/SourceTypeBadge.tsx`
- `src/components/source/CanonBadge.tsx`

职责：

- 展示 7 个临冬城关键事件。
- 显示 sourceType / canonLevel。
- 点击或展开事件详情。
- 确保私生子之战显示剧集线或剧集正典。

### 3.5 Character / House

文件建议：

- `src/components/character/CharacterGrid.tsx`
- `src/components/character/CharacterCard.tsx`
- `src/components/house/HouseBadge.tsx`
- `src/components/house/HouseSigil.tsx`

职责：

- 显示临冬城相关人物。
- 显示相关家族和纹章。
- 不使用演员照片。

### 3.6 Search / Legend

文件建议：

- `src/components/search/SearchBox.tsx`
- `src/components/search/SearchResults.tsx`
- `src/components/layout/LegendBar.tsx`

职责：

- MVP 支持地点中文名 / 英文名搜索。
- 搜索临冬城后可选中节点或打开详情。
- 图例说明地点类型、节点等级和来源标签。

## 4. 类型与数据层

### 4.1 类型文件

建议：

- `src/types/content.ts`
- `src/types/map.ts`
- `src/types/cms.ts`
- `src/types/viewModels.ts`
- `src/types/index.ts`

必须包含：

- `SourceType`
- `CanonLevel`
- `PublishStatus`
- `Location`
- `Asset`
- `Event`
- `Character`
- `House`
- `Region`
- `Storyline`
- `MapLayer`
- `WeatherLayer`
- view model 类型

### 4.2 Mock 数据

建议：

- `src/data/mock/regions.ts`
- `src/data/mock/houses.ts`
- `src/data/mock/characters.ts`
- `src/data/mock/events.ts`
- `src/data/mock/assets.ts`
- `src/data/mock/locations.ts`
- `src/data/mock/index.ts`

要求：

- 至少 10 个地点。
- 临冬城完整内容。
- 7 个关键事件。
- 私生子之战 sourceType 为 `show` 或 `show-canon`。
- 素材记录中保留来源字段，即便先是 placeholder。

### 4.3 Selectors

建议：

- `src/lib/content/selectors.ts`
- `src/lib/content/sourceLabels.ts`
- `src/lib/content/normalize.ts`

函数：

- `getPublishedLocations`
- `getMapLocationViewModels`
- `getLocationById`
- `getLocationDetailViewModel`
- `getEventsByLocationId`
- `getCharactersByIds`
- `getHousesByIds`
- `getSourceTypeLabel`
- `getCanonLevelLabel`

## 5. 状态管理

建议文件：

- `src/stores/mapStore.ts`

状态：

- `selectedLocationId`
- `hoveredLocationId`
- `isPanelOpen`
- `zoom`
- `pan`
- `searchQuery`
- `weatherEnabled`
- `reducedMotion`

规则：

- 不把内容数据作为 Zustand 权威状态。
- 只管理 UI 交互状态。
- selectedLocationId 为空时面板关闭。

## 6. CMS 实现顺序

CMS 应在前台静态闭环确认后接入。

### 6.1 基础配置

文件建议：

- `payload.config.ts`
- `src/collections/Users.ts`
- `src/collections/Media.ts`

能力：

- Admin 可访问。
- 单管理员登录。
- Media 可上传。

### 6.2 MVP Collections

文件建议：

- `src/collections/Locations.ts`
- `src/collections/Assets.ts` 或扩展 `Media`

Locations 必须覆盖：

- 名称
- 英文名
- 类型
- 区域
- 家族
- 简介
- 坐标
- 图标类型
- 节点等级
- 是否可点击
- 详情内容
- 关联素材
- 发布状态

Assets / Media 必须覆盖：

- 素材名称
- 素材类型
- 来源类型
- 来源链接
- 作者 / 来源方
- 是否 AI 生成
- 是否二次创作
- 备注

### 6.3 预留 Collections

建议创建或预留：

- `Regions`
- `Houses`
- `Characters`
- `Events`
- `TimelineEntries`
- `Storylines`
- `MapLayers`
- `WeatherLayers`
- `SourceReferences`

## 7. Seed 数据

建议：

- `src/seed/index.ts`
- `src/seed/locations.ts`
- `src/seed/events.ts`
- `src/seed/characters.ts`
- `src/seed/houses.ts`
- `src/seed/assets.ts`

Seed 必须能创建：

- 10 个地点节点
- 临冬城地点详情
- 7 个临冬城事件
- 关键人物
- 关键家族
- 素材 placeholder 或生成资产记录

Seed 需要尽量幂等，重复运行不应无限重复创建。

## 8. 素材工作流

流程：

```text
确定素材需求
→ 查找事实 / 风格参考
→ 记录 SOURCE_REGISTER
→ 生成或绘制素材
→ 存入 public/assets/westeros
→ 记录 ASSET_MANIFEST
→ 创建 CMS Asset / Media 记录
→ 前台引用
```

如果图像生成工具不可用：

- 使用 SVG / CSS / 程序化图形创建 placeholder。
- 在 manifest 中标记 placeholder。
- 后续替换为生成图。

## 9. 命令约定

推荐 package scripts：

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "seed": "tsx src/seed/index.ts"
}
```

如果使用的 Next.js 版本不支持 `next lint`，应改用 ESLint CLI 并在 README 说明。

## 10. 测试约定

### 10.1 单元 / 组件测试

优先测试：

- 坐标转换
- sourceType label 映射
- selectors 聚合
- 临冬城事件排序
- 私生子之战标签
- MapNode hover 状态

### 10.2 E2E 测试

Playwright 覆盖：

- 首页打开
- 地图 stage 可见
- 至少 10 个节点
- hover 临冬城显示 tooltip
- 点击临冬城打开详情面板
- 时间线和 7 个事件可见
- 私生子之战标签正确
- 搜索临冬城可定位
- 低动效模式不崩溃

### 10.3 视觉验证

前端重大改动后：

- 启动 dev server。
- 用浏览器打开首页。
- 截图或人工检查地图是否非空。
- 检查节点、面板、时间线没有明显重叠。

## 11. 环境变量

`.env.example` 应包含：

```text
DATABASE_URI=postgres://user:password@localhost:5432/westeros_map
PAYLOAD_SECRET=replace-me-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MEDIA_STORAGE_MODE=local
```

不要提交真实 `.env` 或真实密钥。

## 12. 错误处理约定

前台：

- 地点无详情：显示“详情待扩展”。
- 素材缺失：显示风格化占位。
- CMS 无数据：使用 mock fallback 或显示内容维护中。
- 查询失败：显示可恢复提示。

后台：

- 关键字段添加 description。
- sourceType 使用 select。
- 坐标字段提供范围说明。
- 素材来源字段不可完全省略。

## 13. 开发增量建议

推荐顺序：

1. 项目初始化
2. 主题和布局
3. 类型定义
4. mock 数据
5. selectors
6. WorldMap
7. 节点层
8. hover tooltip
9. pan / zoom
10. 临冬城详情
11. 时间线
12. 人物 / 家族
13. 天气层
14. 搜索 / 图例
15. 测试
16. CMS
17. seed
18. CMS 数据接入
19. 素材替换和视觉 polish
20. 部署准备

## 14. 完成定义

一个实现增量只有在以下条件满足时才算完成：

- 代码或文档已落盘。
- 能用命令、截图、E2E 或明确检查验证。
- loop acceptance check 有 evidence。
- 未破坏已通过检查。
- 没有引入真实密钥或未经授权核心素材。

