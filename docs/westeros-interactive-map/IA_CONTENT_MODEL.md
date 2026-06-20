# 《维斯特洛互动世界地图》信息架构 IA 与内容模型

> 阶段：2 - 信息架构 IA 与内容模型
> 状态：已生成，作为后续技术架构、CMS schema、前端组件和 seed 数据的上游依据
> 创建日期：2026-06-18
> 上游文档：
> - `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`
> - `docs/westeros-interactive-map/PRD.md`

## 1. 文档目标

本文定义《维斯特洛互动世界地图》的信息架构、前台内容结构、后台内容类型、实体关系、来源标记规则和 MVP / 后续边界。

本文不写数据库建表语句，也不写具体代码实现。后续 Payload CMS collections、TypeScript 类型、前端 view model 和 seed 数据必须以本文为结构依据。

## 2. 产品信息架构总览

产品不是普通剧情百科，而是一个地图驱动的世界观浏览器。信息入口按优先级分为：

1. **空间入口**：维斯特洛全局地图、地点节点、局部地图。
2. **故事入口**：地点详情、事件时间线、故事线。
3. **角色入口**：人物卡片、家族势力、角色与地点关系。
4. **素材入口**：配图、地图素材、生成资产、来源记录。
5. **后台入口**：内容管理、素材管理、预览与发布。

MVP 的核心浏览路径：

```text
全局地图
→ 地点节点 hover
→ 点击临冬城
→ 临冬城详情面板
→ 事件时间线
→ 事件卡片
→ 人物 / 家族 / 素材 / 来源标签
```

长期演进路径：

```text
全局地图
→ 搜索 / 图例 / 筛选
→ 任意地点 / 人物 / 事件 / 家族
→ 地图定位 / 百科详情 / 时间线 / 关系网络
```

## 3. 前台站点结构

### 3.1 MVP 页面

| 页面 / 区域 | URL 建议 | MVP 状态 | 说明 |
|---|---|---|---|
| 地图首页 | `/` | 必做 | 桌面端第一屏即全局地图，不做营销落地页。 |
| 地点详情面板 | 首页内状态 | 必做 | 点击临冬城后右侧展开，不需要独立详情页。 |
| 搜索入口 | 首页内弹层 / 面板 | 轻量必做 | MVP 支持地点基础搜索，后续演变为百科搜索。 |
| 图例 | 首页内固定区域 | 必做 | 说明地点类型、节点等级、sourceType 标签。 |
| 后台入口 | `/admin` | 必做 | CMS 管理入口，单管理员登录。 |

### 3.2 后续页面

| 页面 / 区域 | URL 建议 | 后续状态 | 说明 |
|---|---|---|---|
| 地点详情页 | `/locations/[slug]` | V2 | 当地点内容丰富后，可从面板升级为独立页面。 |
| 人物详情页 | `/characters/[slug]` | V2 | 展示人物生命线、所属家族、相关地点与事件。 |
| 家族详情页 | `/houses/[slug]` | V2 | 展示家族势力、纹章、领地和变迁。 |
| 事件详情页 | `/events/[slug]` | V2 | 展示事件来源、人物、地图位置与配图。 |
| 故事线页 | `/storylines/[slug]` | V2 | 按主线组织地点、事件和人物。 |
| 百科搜索页 | `/search` | V2 | 全局统一搜索入口。 |

## 4. 首页布局 IA

首页必须以地图为核心，不做传统内容站首页。

```text
┌──────────────────────────────────────────────────────────────┐
│ Top Toolbar                                                   │
│ 标题 / 搜索入口 / 图例入口 / 动效强度 / 后台入口              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ Map Stage                                                    │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Weather Layer: 云雾 / 雪雾 / 烟尘                         │ │
│ │ Map Background: 维斯特洛 2.5D / 古地图 / 微缩沙盘底图      │ │
│ │ Region Layer: 北境 / 河间地 / 谷地 / 王领等                │ │
│ │ Terrain Layer: 河流 / 山脉 / 森林 / 道路 / 长城            │ │
│ │ Node Layer: 城市 / 城堡 / 要塞 / 港口 / 海域               │ │
│ │ Interaction Layer: hover / selected / tooltip             │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ 左下图例 / 右侧详情面板默认收起 / 底部状态信息                │
└──────────────────────────────────────────────────────────────┘
```

右侧详情面板只在有可点击详情的地点被选中时展开。MVP 只有临冬城拥有完整详情，其他节点显示“详情待扩展”提示或基础卡片。

## 5. 内容实体总览

### 5.1 核心实体

| 实体 | 中文名 | MVP 状态 | 说明 |
|---|---|---|---|
| Location | 地点 | 必做 | 地图节点、地点详情、地图坐标和关联内容的核心实体。 |
| Asset | 素材 | 必做 | 图片、地图底图、局部图、事件配图、纹章、生成图。 |
| Region | 区域 | 预留 | 北境、河间地、谷地、王领等地理 / 政治区域。 |
| House | 家族 | 预留 + 前台基础展示 | 史塔克、拜拉席恩、兰尼斯特等势力单位。 |
| Character | 人物 | 预留 + 前台基础展示 | 角色卡片、事件参与者、家族关系。 |
| Event | 事件 | 预留 + 临冬城内嵌样板 | 故事情节单元，必须包含 sourceType。 |
| TimelineEntry | 时间线条目 | 预留 + 临冬城样板 | 事件在时间轴上的展示单元。 |
| Storyline | 故事线 | 预留 | 北境线、史塔克线、五王之战线等。 |
| MapLayer | 地图层 | 预留 | 道路、河流、山脉、森林、长城等地理层。 |
| WeatherLayer | 天气层 | 预留 | 云雾、雪雾、烟尘、战争状态等视觉层。 |
| SourceReference | 来源记录 | 必做基础能力 | 记录内容和素材来源。 |

### 5.2 MVP 编辑范围

MVP 后台必须开放：

- Locations
- Assets / Media
- 单管理员登录
- 草稿 / 发布状态
- 基础预览

MVP 可通过 mock、seed 或简化关系支撑前台展示：

- Characters
- Houses
- Events
- TimelineEntries
- Storylines

这些实体应在 TypeScript 类型和 CMS 架构中预留，避免后续重构成本过高。

## 6. 实体关系模型

### 6.1 高层关系图

```text
Region 1 ──── * Location
House * ──── * Location
House 1 ──── * Character
Location 1 ──── * Event
Event * ──── * Character
Event * ──── * House
Event * ──── * Asset
Location * ──── * Asset
Storyline * ──── * Event
Storyline * ──── * Location
TimelineEntry * ──── 1 Event
SourceReference * ──── * Content Entity
```

### 6.2 关系说明

- 一个 Region 可以包含多个 Location。
- 一个 Location 可以关联多个 House，例如领主家族、占领家族、历史相关家族。
- 一个 Character 通常属于一个主要 House，但后续可扩展多个身份关系。
- 一个 Event 可以发生在一个或多个 Location；MVP 先支持主发生地点。
- 一个 Event 可以关联多个人物、家族和素材。
- 一个 Storyline 可以包含多个 Event 和 Location。
- 一个 Asset 可以关联地点、事件、人物或家族。
- SourceReference 不直接替代 Asset 字段，而是提供更可追溯的来源记录能力。

## 7. 关键内容类型字段需求

以下为内容模型字段，不是数据库 Schema。

### 7.1 Location 地点

用途：地图节点、地点详情、空间关系和内容聚合。

关键字段：

- `id`
- `slug`
- `nameZh`
- `nameEn`
- `aliases`
- `type`：castle / city / region / fortress / port / sea / road / river / mountain / forest / wall / other
- `region`
- `relatedHouses`
- `shortDescription`
- `longDescription`
- `politicalStatus`
- `geography`
- `xPercent`
- `yPercent`
- `virtualX`：0-10000，后续可与 xPercent 二选一或并存
- `virtualY`：0-10000
- `iconType`
- `nodeLevel`
- `visibleZoomRange`
- `isMvpClickable`
- `detailSections`
- `relatedCharacters`
- `relatedEvents`
- `relatedAssets`
- `localMapAsset`
- `sourceType`
- `canonLevel`
- `status`

MVP 坐标策略：

- 后台保留坐标字段。
- 不做拖拽式地图编辑器。
- 手动填写百分比坐标或 0-10000 虚拟坐标。
- 前台根据坐标渲染节点。

### 7.2 Asset 素材

用途：管理地图底图、局部地图、事件配图、人物占位图、家族纹章和生成素材。

关键字段：

- `id`
- `title`
- `assetType`：map-base / local-map / event-art / character-art / house-sigil / texture / weather / ui / reference
- `file`
- `description`
- `sourceType`：original / ai-generated / redrawn-reference / open-license / public-reference / other
- `sourceUrl`
- `author`
- `sourceParty`
- `isAIGenerated`
- `isDerivative`
- `generationPromptSummary`
- `referenceNotes`
- `licenseStatus`
- `riskLevel`
- `usageScope`
- `relatedLocation`
- `relatedEvent`
- `relatedCharacter`
- `relatedHouse`
- `notes`
- `status`

MVP 来源记录策略：

- 先记录基础来源，不做复杂法务工作流。
- 所有 AI 生成素材必须标记 `isAIGenerated = true`。
- 基于参考再创作的素材必须标记 `isDerivative = true` 并写 `referenceNotes`。

### 7.3 Event 事件

用途：组织故事阶段、时间线、来源标签和临冬城详情内容。

关键字段：

- `id`
- `slug`
- `title`
- `summary`
- `description`
- `primaryLocation`
- `relatedLocations`
- `relatedCharacters`
- `relatedHouses`
- `relatedAssets`
- `storylines`
- `sourceType`
- `canonLevel`
- `order`
- `eraLabel`
- `bookRefLabel`
- `showRefLabel`
- `isBookEvent`
- `isShowEvent`
- `isOriginalNote`
- `status`

临冬城 MVP 必须包含：

1. 国王劳勃北上访问临冬城
2. 史塔克一家南下君临
3. 布兰坠塔
4. 罗柏起兵
5. 临冬城陷落
6. 私生子之战
7. 北境重归史塔克

“私生子之战”必须使用 `sourceType = show` 或 `show-canon`。

### 7.4 Character 人物

用途：人物卡片、事件参与者、家族关系和后续人物详情。

关键字段：

- `id`
- `slug`
- `nameZh`
- `nameEn`
- `aliases`
- `house`
- `titles`
- `shortBio`
- `portraitAsset`
- `relatedLocations`
- `relatedEvents`
- `sourceType`
- `canonLevel`
- `status`

MVP 前台至少展示临冬城相关人物卡片，不要求完整人物后台编辑体验。

### 7.5 House 家族

用途：家族势力展示、地点归属、人物所属和纹章视觉。

关键字段：

- `id`
- `slug`
- `nameZh`
- `nameEn`
- `motto`
- `sigilDescription`
- `sigilAsset`
- `primaryColor`
- `secondaryColor`
- `seatLocation`
- `controlledRegions`
- `relatedCharacters`
- `relatedEvents`
- `sourceType`
- `canonLevel`
- `status`

MVP 前台至少展示史塔克、拜拉席恩、兰尼斯特、葛雷乔伊、波顿等与临冬城事件相关家族。

### 7.6 Region 区域

用途：组织维斯特洛大陆地理和政治区域。

关键字段：

- `id`
- `slug`
- `nameZh`
- `nameEn`
- `type`
- `description`
- `dominantHouse`
- `locations`
- `mapBounds`
- `status`

MVP 可先创建北境等基础区域。

### 7.7 TimelineEntry 时间线条目

用途：把事件以可排序方式呈现于地点详情或全局时间线。

关键字段：

- `id`
- `title`
- `event`
- `location`
- `storyline`
- `order`
- `displayDate`
- `sourceType`
- `asset`
- `status`

MVP 可将时间线字段内嵌在 Event 或 Location detail 中，后续再独立为内容类型。

### 7.8 Storyline 故事线

用途：组织跨地点、跨人物、跨事件的主线。

关键字段：

- `id`
- `slug`
- `title`
- `summary`
- `description`
- `relatedEvents`
- `relatedLocations`
- `relatedCharacters`
- `relatedHouses`
- `sourceType`
- `status`

MVP 至少预留：北境线、史塔克家族线、五王之战线、剧集北境收复线。

### 7.9 MapLayer 地图层

用途：组织道路、河流、山脉、森林、长城、海域等地图图层。

关键字段：

- `id`
- `name`
- `layerType`
- `geometryType`
- `asset`
- `zIndex`
- `visibleByDefault`
- `visibleZoomRange`
- `styleToken`
- `status`

MVP 可由前端静态表现，CMS 先预留。

### 7.10 WeatherLayer 天气层

用途：组织云雾、雪雾、烟尘、战争痕迹等氛围层。

关键字段：

- `id`
- `name`
- `weatherType`
- `regions`
- `intensity`
- `animationMode`
- `asset`
- `visibleByDefault`
- `reducedMotionFallback`
- `status`

MVP 可由前端配置，CMS 先预留。

### 7.11 SourceReference 来源记录

用途：为内容与素材提供可追溯来源。

关键字段：

- `id`
- `title`
- `url`
- `sourceParty`
- `author`
- `accessedAt`
- `usageType`
- `relatedEntityType`
- `relatedEntityId`
- `notes`
- `riskLevel`

不在公开页面展示过多来源细节时，仍需在后台和文档中保留记录。

## 8. 来源与正典标记规则

### 8.1 sourceType

`sourceType` 用于回答“这条内容来自哪条叙事来源”。

| 值 | 含义 | 前台标签 |
|---|---|---|
| `novel` | 原著已有或以原著为主 | 原著线 |
| `show` | 剧集事件或剧集处理 | 剧集线 |
| `show-canon` | 本项目采纳为剧集正典的事件 | 剧集正典 |
| `mixed` | 原著与剧集均有，或综合处理 | 混合线 |
| `original-note` | 项目作者的整理、解释、注释或二创补充 | 创作注释 |

规则：

- 每个 Event 必须有 `sourceType`。
- Location、Character、House 可以有默认 `sourceType`，但若内部事件不同，事件级字段优先。
- “私生子之战”必须标记为 `show` 或 `show-canon`。
- 前台 MVP 不做小说线 / 剧集线切换，只展示标签。

### 8.2 canonLevel

`canonLevel` 用于表达内容可信层级。

推荐值：

- `book-canon`
- `show-canon`
- `mixed-canon`
- `fan-interpretation`

示例：

- 布兰坠塔：`sourceType = mixed`，`canonLevel = mixed-canon`
- 私生子之战：`sourceType = show-canon`，`canonLevel = show-canon`
- 地理推测或图像氛围描述：`sourceType = original-note`，`canonLevel = fan-interpretation`

## 9. 前台 View Model 需求

前台不应直接消费 CMS 原始结构，而应通过 view model 聚合。

### 9.1 MapLocationViewModel

用途：地图节点渲染。

字段：

- `id`
- `slug`
- `nameZh`
- `nameEn`
- `type`
- `regionName`
- `houseNames`
- `x`
- `y`
- `iconType`
- `nodeLevel`
- `isClickable`
- `statusLabel`

### 9.2 LocationDetailViewModel

用途：右侧详情面板。

字段：

- `id`
- `nameZh`
- `nameEn`
- `type`
- `region`
- `politicalStatus`
- `geography`
- `intro`
- `relatedHouses`
- `relatedCharacters`
- `timelineItems`
- `eventCards`
- `galleryAssets`
- `localMap`
- `sourceSummary`

### 9.3 TimelineItemViewModel

用途：临冬城时间线。

字段：

- `id`
- `title`
- `summary`
- `order`
- `displayDate`
- `sourceType`
- `canonLevel`
- `asset`
- `relatedCharacters`
- `relatedHouses`

### 9.4 AssetViewModel

用途：素材图集和配图。

字段：

- `id`
- `title`
- `assetType`
- `src`
- `alt`
- `caption`
- `isAIGenerated`
- `isDerivative`
- `sourceLabel`
- `riskLevel`

## 10. 后台导航 IA

```text
Admin
├─ Dashboard
├─ Content
│  ├─ Locations        MVP 必做
│  ├─ Regions          预留
│  ├─ Houses           预留
│  ├─ Characters       预留
│  ├─ Events           预留
│  ├─ TimelineEntries  预留
│  └─ Storylines       预留
├─ Media
│  ├─ Assets / Media   MVP 必做
│  └─ SourceReferences MVP 基础记录
├─ Map
│  ├─ MapLayers        预留
│  └─ WeatherLayers    预留
├─ Preview
│  ├─ Published Site
│  └─ Draft Preview
└─ Settings
   └─ Admin User
```

MVP 后台优先级：

1. 管理员登录
2. Locations 列表 / 新建 / 编辑 / 发布状态
3. Assets 上传 / 来源记录 / 关联地点或事件
4. 临冬城内容维护
5. 前台预览

## 11. 临冬城内容聚合结构

临冬城详情面板由 Location 聚合多个内容块。

```text
Winterfell Location
├─ Basic Facts
│  ├─ 地点简介
│  ├─ 地理位置
│  ├─ 政治归属
│  └─ 相关家族
├─ Local Map
├─ Timeline
│  ├─ 国王劳勃北上访问临冬城
│  ├─ 史塔克一家南下君临
│  ├─ 布兰坠塔
│  ├─ 罗柏起兵
│  ├─ 临冬城陷落
│  ├─ 私生子之战
│  └─ 北境重归史塔克
├─ Characters
│  ├─ 艾德
│  ├─ 凯特琳
│  ├─ 罗柏
│  ├─ 珊莎
│  ├─ 艾莉亚
│  ├─ 布兰
│  ├─ 琼恩
│  ├─ 席恩
│  └─ 拉姆斯
├─ Houses
│  ├─ 史塔克
│  ├─ 拜拉席恩
│  ├─ 兰尼斯特
│  ├─ 葛雷乔伊
│  └─ 波顿
├─ Gallery
└─ Source Labels
```

## 12. 10 个 MVP 地点节点建议

MVP 需要至少 10 个节点。建议第一批：

| 地点 | 英文 | 类型 | 区域 | MVP 详情 |
|---|---|---|---|---|
| 临冬城 | Winterfell | castle | 北境 | 完整可点击 |
| 君临 | King's Landing | city | 王领 | 节点展示 |
| 长城 | The Wall | wall | 北境边境 | 节点展示 |
| 黑城堡 | Castle Black | fortress | 长城 | 节点展示 |
| 鹰巢城 | The Eyrie | castle | 谷地 | 节点展示 |
| 奔流城 | Riverrun | castle | 河间地 | 节点展示 |
| 赫伦堡 | Harrenhal | castle | 河间地 | 节点展示 |
| 凯岩城 | Casterly Rock | castle | 西境 | 节点展示 |
| 高庭 | Highgarden | castle | 河湾地 | 节点展示 |
| 风息堡 | Storm's End | castle | 风暴地 | 节点展示 |
| 派克 | Pyke | castle | 铁群岛 | 可选第 11 节点 |
| 多恩阳戟城 | Sunspear | city | 多恩 | 可选第 12 节点 |

## 13. 搜索 IA

MVP 搜索：

- 搜索入口可见。
- 支持地点中文名 / 英文名基础搜索。
- 搜索结果可定位或选中地图节点。

V2 百科搜索：

- 支持地点、人物、事件、家族、故事线、素材。
- 支持类型筛选。
- 支持结果跳转到地图位置或详情页。
- 支持全文检索。

搜索结果分组建议：

```text
搜索结果
├─ 地点
├─ 人物
├─ 事件
├─ 家族
├─ 故事线
└─ 素材
```

## 14. 图例 IA

图例需要解释三类信息：

1. 地点类型：城市、城堡、要塞、港口、海域、长城。
2. 节点等级：MVP 重点节点、普通节点、待扩展节点。
3. 来源标签：原著线、剧集线、剧集正典、混合线、创作注释。

MVP 图例可以静态展示，后续升级为地图层开关。

## 15. 发布状态 IA

内容状态：

- `draft`：后台可编辑，前台默认不展示。
- `published`：前台可展示。

预览策略：

- MVP 后台支持基础预览入口。
- 前台默认只读取 `published` 内容。
- 如果 CMS 未接入或数据为空，前台可使用 mock fallback，但需要明确标记为开发数据。

## 16. MVP 与后续边界

### 16.1 MVP 必做

- 前台首页 IA
- 地点节点 IA
- 临冬城详情 IA
- 临冬城 7 个事件
- 人物卡片基础结构
- 家族展示基础结构
- 素材来源记录
- Locations / Assets 后台入口
- sourceType 标签

### 16.2 MVP 预留

- 人物完整编辑体验
- 事件完整编辑体验
- 家族完整编辑体验
- 故事线完整编辑体验
- 时间线筛选
- 小说线 / 剧集线切换
- 地图层 CMS 编辑
- 天气层 CMS 编辑
- 拖拽式地图节点编辑器
- 百科全文搜索

## 17. 设计约束对后续实现的影响

- 前端组件不应把临冬城写死为唯一模型；临冬城只是第一个完整样板。
- MapNode 必须支持 `isClickable`，避免其他地点错误打开完整详情。
- 详情面板必须能消费 `LocationDetailViewModel`，后续可复用到其他地点。
- sourceType 标签必须是公共组件或公共映射，不能散落硬编码。
- 素材来源字段必须从第一版进入 Asset 模型，否则后续版权管理成本会变高。
- 坐标字段必须进入 Location 模型，即使 MVP 只手动填写。
- CMS 模型需要预留关系字段，避免 V2 扩展时大改数据结构。

