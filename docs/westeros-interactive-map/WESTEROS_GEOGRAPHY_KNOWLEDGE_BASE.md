# 《维斯特洛互动世界地图》地理与沙盘生成外挂知识库

> 版本：V1.2  
> 创建日期：2026-06-20  
> 最近更新：2026-06-21  
> 用途：作为地图底图生成、节点坐标审查、前端视觉验收和后续内容扩展的“外挂知识库”。任何新的全局沙盘底图、地点节点、美术按钮或地图层，都应先对照本文档。

## 0. 项目目标与执行状态总览

本文件不只是生成 prompt 备忘录，也是当前地图美术、地理锚点、前端接入和验收状态的审查入口。后续任何新 loop 如果涉及地图底图、地点按钮、地貌层、路线层或节点坐标，都必须先更新本节，再进入生成和实现。

### 0.1 总目标定义

| 目标项 | 当前定义 |
|---|---|
| 产品形态 | 网页端《维斯特洛互动世界地图》，公开网站方向，当前为本地私有原型。 |
| 核心体验 | 不是普通剧情百科，而是“地图驱动的世界观浏览器”；用户从全局维斯特洛沙盘进入地点、人物、事件、家族和故事线。 |
| MVP 内容 | 维斯特洛大陆全局地图；12 个地点节点；临冬城完整详情；其他地点至少作为节点或预览条目。 |
| 当前视觉方向 | 高保真 2.5D 幻想沙盘，保留牛皮纸 / 暗金 UI / 博物馆图鉴气质，但不局限于平面古地图。 |
| 地理原则 | 原著地理关系优先，剧集视觉只作氛围参考；底图负责地形和区域气质，具体地点含义由前端节点和 CMS 数据承担。 |
| 节点美术原则 | 地点按钮必须优先按地点名称、地貌和故事身份创作；不能只按 `castle` / `city` 类型复用同一张通用图。 |
| V1.8 架构原则 | C 方案为主：Unity / Unreal / Blender / Spline 等引擎或 3D 工具负责资产编辑，网页负责最终运行、CMS、详情面板、搜索和部署；附带轻量 Unity WebGL / 轻 3D 可行性验证。 |
| 可维护原则 | 资产来源、生成 prompt、私有源图、公开前台图、测试证据和 loop 状态必须可追溯。 |

### 0.2 当前执行状态

| 范围 | 当前状态 | 证据 / 文件入口 |
|---|---|---|
| 活跃 loop | V1.8 引擎资产管线与高保真 2.5D 验证循环，处于 planning complete / ready to execute。 | `docs/westeros-interactive-map/ACTIVE_LOOP.md`；`docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/` |
| 主底图 | 已从 V1.6 V3 切换到 V1.7 V4 地貌增强底图。 | `apps/westeros-map/public/assets/westeros/generated/v17/westeros-sandtable-map-v4-terrain.png` |
| 主底图源图 | 已保留生成源图与本地增强产物。 | `apps/westeros-map/private/generated-working/v17/westeros-sandtable-map-v4-terrain-source.png`；`docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md` |
| 地点专属节点图标 | 12 个当前地图地点均已生成专属圆章按钮，不再复用同一个临冬城式城堡图标。 | `apps/westeros-map/public/assets/westeros/generated/v17/nodes/map-node-<location-id>-v1.png` |
| 节点图标源图 | 4x3 contact sheet 已保留，裁切预览已生成。 | `apps/westeros-map/private/generated-working/v17/location-node-icons-contact-sheet-v1-source.png`；`apps/westeros-map/private/generated-working/v17/location-node-icons-cropped-preview.png` |
| 前端取图逻辑 | 已改为 `location.id` 专属图标优先，缺失时才回退到 `location.type` 通用图标。 | `apps/westeros-map/src/components/map/MapNode.tsx` |
| 前端主底图接入 | `WorldMap` 已加载 V4 地貌增强底图。 | `apps/westeros-map/src/components/map/WorldMap.tsx` |
| 内容资产元数据 | `asset-westeros-map` 已指向 V4。 | `apps/westeros-map/src/data/mock/assets.ts` |
| E2E 防回归 | 已新增 12 个地点专属图标文件名断言、去重断言和 V4 底图断言。 | `apps/westeros-map/tests/e2e/map.spec.ts` |
| 视觉截图 | 已保存 1440、1920、临冬城详情和 zoom 状态截图。 | `apps/westeros-map/test-results/visual-v1-7-canonical-terrain-icons/` |
| 资产登记 | V4 主底图、V3 历史底图和 12 个 V1.7 节点图标已进入 Asset Manifest；源图已进入 Private Reference Register。 | `docs/westeros-interactive-map/ASSET_MANIFEST.md`；`docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md` |
| 自动验证 | 已通过 `npm run typecheck`、`npm run lint`、`npm run test:unit`、`npm run test:e2e`、`npm run build`。 | 终端验证记录；V1.7 acceptance checks 待同步最终证据。 |
| V1.8 目标 | 验证“引擎 / 3D 工具编辑资产，Web 负责最终运行与 CMS”的路线是否值得作为下一代地图架构。 | `docs/westeros-interactive-map/V1_8_ENGINE_ASSET_PIPELINE_LOOP_PROMPT.md` |
| V1.8 样例区域 | 北境 / 临冬城沙盘 tile。 | 当前 MVP 内容最完整，适合作为资产管线样板。 |

### 0.3 当前资产入口

| 类型 | 路径 |
|---|---|
| 当前主底图 | `apps/westeros-map/public/assets/westeros/generated/v17/westeros-sandtable-map-v4-terrain.png` |
| 当前节点图标目录 | `apps/westeros-map/public/assets/westeros/generated/v17/nodes/` |
| V1.7 私有生成源目录 | `apps/westeros-map/private/generated-working/v17/` |
| V1.7 截图验收目录 | `apps/westeros-map/test-results/visual-v1-7-canonical-terrain-icons/` |
| V1.7 loop 状态目录 | `docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/` |
| V1.8 loop 状态目录 | `docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/` |
| V1.8 loop prompt | `docs/westeros-interactive-map/V1_8_ENGINE_ASSET_PIPELINE_LOOP_PROMPT.md` |

### 0.4 当前未完全解决的问题

1. V4 比 V3 更接近本轮目标，但它仍是单张生成式底图，不是严格可审计的地理图层系统。
2. V1.8 将验证能否升级为“引擎 / 3D 工具生产资产 + 可审查地形 tile / prefab / 材质 / 图层 + 网页运行与 CMS 管理”的分层地图，而不是继续只重生成单张大图。
3. 当前 12 个地点图标已经有明显差异，但上线前仍需做版权相似性和公开发布审查。
4. 地点坐标仍是静态百分比 / mock 数据；后续 CMS 应提供坐标、地理审查备注和预览能力。
5. 用户没有 3D 建模 / Unity / Unreal 经验，V1.8 不能把成功条件建立在复杂手工建模能力上，必须提供低门槛资产生产路径。

## 1. 核心原则

1. 背景图不负责“随意补城市”。全局底图优先表达大陆轮廓、山脉、河流、海岸、森林、雪线、道路方向和少量关键地貌。
2. 地点含义由前端节点、tooltip、详情面板和 CMS 数据承担；背景图中的建筑只允许作为极弱的地貌锚点，不得出现大量意义不明的城市群。
3. 生成式地图不得直接复制官方地图、官方插画、剧集画面或社区现成地图；只能参考文字地理关系后重绘。
4. 原著地理优先。剧集视觉可以作为氛围参考，但不能覆盖原著中明确的地理关系。
5. 所有地点锚点必须能回答三个问题：它在什么区域、靠近什么水系或地貌、为什么这个位置符合故事背景。

## 2. 生成底图的硬性禁令

- 不要在维斯特洛大陆上随机铺设无名城市、塔楼、港口或城堡群。
- 不要把鹰巢城画成平原城市、海边城市或普通谷地城堡。
- 不要把君临画成内陆城市；它必须与黑水河口、黑水湾和东岸港口关系明确。
- 不要把高庭画在君临附近；它应远离王领东岸，落在西南方河湾地的肥沃河谷与园林地带。
- 不要让沙漠、多恩、北境雪线、河湾地沃土、谷地高山、铁群岛海崖混成同一种地貌。
- 不要在底图内放可读文字、现代 UI、logo、水印、官方地图标签或疑似版权图标。

## 3. 全局地理分区审查表

| 区域 | 沙盘地貌要求 | 视觉关键词 | 不能出现的问题 |
|---|---|---|---|
| 北境 | 大面积寒冷荒原、针叶林、雪雾、长城南侧军事边境、狼林和白刀河意象 | 冷灰、雪、松林、古老石堡、孤立道路 | 把北境画成密集城市带或南方农田 |
| 河间地 | 多河流交汇、湖泊、湿润平原、战略路口 | 红叉河、奔流城、神眼湖、战争焦痕 | 河流缺失导致奔流城和赫伦堡失去意义 |
| 谷地 | 东部高山、狭窄山道、峡谷、险要高处 | 明月山脉、巨人之枪、云雾、峭壁 | 鹰巢城落在平原或普通丘陵 |
| 王领 | 东海岸、黑水河口、黑水湾、港口与三丘城市轮廓 | 黑水河、海湾、王都、港口、红堡暗示 | 君临没有河/湾/东岸关系 |
| 西境 | 西海岸、岩石海崖、矿山与金色山地 | 凯岩、兰尼斯港、落日之海 | 凯岩城远离海岸或缺少岩体 |
| 河湾地 | 西南方肥沃河谷、曼德河、花园、道路交汇、农田 | 曼德河、玫瑰大道、海路、绿金田野 | 高庭靠近君临、缺少曼德河与园林地貌 |
| 风暴地 | 东南海岸、风暴海湾、强风海崖、防御型堡垒 | 破船湾、风、潮、坚固堡垒 | 风息堡被画成内陆花园城堡 |
| 多恩 | 最南端，红山、干旱、沙漠、东南海岸和破碎臂 | 红山、沙漠、绿血河、阳戟城 | 多恩过度绿化或阳戟城不在东南海岸 |
| 铁群岛 | 西海离岸群岛、黑色礁石、海崖、桥梁/海风 | 派克、铁群岛、海浪、石桥 | 派克落在大陆内陆 |

## 4. 关键地点沙盘锚点

| 地点 ID | 中文名 | 推荐坐标 x/y | 原著地理约束 | 底图表现要求 | 前端节点要求 | 主要来源 |
|---|---:|---:|---|---|---|---|
| `the-wall` | 长城 | 45 / 6 | 维斯特洛极北横向边界，是文明世界与极北之间的巨型防线。 | 远北横贯冰墙，不要只画成普通山脉。 | wall 类型节点；可用横向防线按钮。 | SRC-029 |
| `castle-black` | 黑城堡 | 42 / 12 | 长城沿线、靠近长城中心、国王大道北端。 | 长城南侧小型军事据点，周围冷色荒原。 | fortress / wall 节点，不要渲染成大城市。 | SRC-028 |
| `winterfell` | 临冬城 | 46 / 20 | 北境中心、国王大道上，位于狼林东缘，白刀河西支以北。 | 北境腹地的古老石堡，西侧有森林，东南/南侧有河流与道路。 | MVP clickable；城堡节点应是北境视觉中心。 | SRC-001 |
| `the-eyrie` | 鹰巢城 | 70 / 44 | 谷地内，明月山脉中，位于巨人之枪高处，远高于谷底。 | 必须是险峻峡谷/高山/云雾/崖壁，不可画成平原或海边城市。 | 使用山地要塞节点；hover 文案突出“险峻高处”。 | SRC-021 |
| `riverrun` | 奔流城 | 45 / 53 | 河间地西部，腾石河与红叉河交汇处。 | 节点附近必须能读到河流交汇或湿润平原。 | 城堡节点旁建议有蓝色河流线。 | SRC-023 |
| `harrenhal` | 赫伦堡 | 53 / 55 | 河间地，神眼湖以北岸，巨大且破败。 | 神眼湖旁的黑色巨型残破城堡暗示，少量烧灼痕迹。 | ruined-castle 节点，不要显示成完整华丽城堡。 | SRC-024 |
| `kings-landing` | 君临 | 64 / 66 | 王领东海岸，黑水河口，俯瞰黑水湾，铁王座与红堡所在地。 | 海湾、河口、港口和三丘城市轮廓必须清楚；城体贴水。 | 城市节点；可与河口/湾区视觉对齐。 | SRC-018 |
| `casterly-rock` | 凯岩城 | 30 / 60 | 西境都城，靠近兰尼斯港，俯瞰落日之海。 | 西海岸巨岩、海崖、港口方向，金色岩体。 | castle-rock 节点；不可离海太远。 | SRC-025 |
| `highgarden` | 高庭 | 40 / 76 | 河湾地首府，位于曼德河上，海路与玫瑰大道交汇，宽阔绿丘和花园。 | 远离君临；西南肥沃河谷、曼德河、绿丘、园林、田野。 | castle-garden 节点；表现精致但不靠近王都。 | SRC-019 |
| `storms-end` | 风息堡 | 62 / 76 | 风暴地核心，位于破船湾北岸的杜伦角。 | 东南海岸强风、海崖、坚固堡垒、暗色海浪。 | castle-storm 节点；不应像花园城堡。 | SRC-027 |
| `pyke` | 派克 | 20 / 49 | 铁群岛之一派克岛上的葛雷乔伊城堡。 | 西侧离岸群岛、黑色礁石、海雾、吊桥/断崖。 | island-castle 节点；必须离开大陆。 | SRC-026 |
| `sunspear` | 阳戟城 | 64 / 92 | 多恩首府，破碎臂，绿血河北侧，远东南海岸，三面环海。 | 多恩东南海岸、沙色城墙、干旱地貌、海水包围感。 | desert-city 节点；不应位于大陆中部。 | SRC-030 |

## 5. V1.6 地理约束版底图生成 Prompt

```text
Use case: stylized-concept / historical-scene
Asset type: desktop web map background, 3072x2048 target after local enhancement
Primary request: Create a high-fidelity 2.5D fantasy sandtable terrain map inspired by the geography of Westeros, designed as a terrain-first background for an interactive web map.

Core style:
- museum-grade miniature terrain model
- parchment and aged vellum color base
- sculpted relief mountains, carved riverbeds, coastlines, forests, snow haze, war-worn terrain
- dark gold and antique atlas mood, but no visible UI and no text
- cinematic top-down oblique view, readable as a broad continent, not a close-up diorama

Hard geography anchors:
1. Far north: a long ice Wall spans horizontally across the upper continent. Castle Black is a small military point just south of the central Wall.
2. Winterfell: northern interior, south of the Wall, near the kingsroad; west side reads as Wolfswood forest, nearby river/White Knife impression to east or southeast.
3. The Eyrie: eastern Vale, high in the Mountains of the Moon, on a dangerous cliff / gorge / Giant's Lance-like peak. It must look remote, steep, and impregnable, not like a flat city.
4. Riverrun: central-west Riverlands, clearly at a river confluence.
5. Harrenhal: central Riverlands, on the north shore of a large lake representing the Gods Eye, dark and ruinous.
6. King's Landing: east coast of the Crownlands, directly at the mouth of the Blackwater Rush and overlooking Blackwater Bay. Show river, bay, harbor, and a compact walled city silhouette.
7. Casterly Rock: west coast by the Sunset Sea, a huge rocky coastal mass overlooking a harbor.
8. Highgarden: far southwest Reach, not near King's Landing; place it on/near the Mander River, with green fields, gardens, orchards, and a broad verdant hill.
9. Storm's End: southeastern coast of the Stormlands, on a stormy bay cliff / Shipbreaker Bay feeling, fortress-like and severe.
10. Pyke: offshore western Iron Islands, black rocky island castle, sea cliffs, bridges, waves.
11. Sunspear: far southeastern coast of Dorne, dry desert palette, near the Broken Arm and north of the Greenblood impression, surrounded by sea on multiple sides.

Composition rules:
- Terrain and water systems should be the main read.
- Include only subtle landmark silhouettes for the listed anchor locations.
- Do not add extra random cities, towns, castles, towers, labels, banners, logos, readable text, modern map icons, or official map markings.
- Leave enough clean terrain around anchors for frontend HTML nodes to sit on top.
- Avoid copying any official Westeros map silhouette exactly; this is an original, lore-informed reinterpretation.
- No actors, no character portraits, no still-frame compositions.

Quality:
- crisp enough for 2.6x zoom in a desktop web UI
- low noise, no blurry pixel mush, no dense fog hiding detail
- clear river geometry and coastal placement
- dark fantasy but still readable
```

## 6. 前端与 CMS 审查规则

1. 如果地点坐标与本文档推荐坐标冲突，先更新本文档，再更新 mock 数据 / CMS 数据。
2. 如果新底图改变了大陆构图，必须重新检查所有节点是否仍贴合地貌。
3. 地点详情页中的 `geography` 字段应能解释节点位置，不应只有剧情简介。
4. CMS 后续应为 Locations 增加“地理审查备注”或等价字段，记录地貌、水系、道路、相邻区域依据。
5. 公开发布前，所有 map-base 资产必须能追溯到本知识库版本与生成 prompt。

## 7. 人工验收 Checklist

- [x] 底图没有大量无名城市或无意义建筑群。V1.7 V4 仍有少量地标轮廓，但主要信息层已转向河网、山脉、海岸、沙漠、森林和道路。
- [x] 鹰巢城位于东部谷地高山/峡谷，不在平原或海边。V4 底图右侧高山与峡谷感明显，节点图标也使用高峰城堡。
- [x] 君临贴近东岸黑水河口与黑水湾。V4 底图中君临节点附近已有东岸城市、海湾和河口关系。
- [x] 高庭位于西南河湾地，靠近曼德河，明显远离君临。V4 中高庭区域呈绿色园林和河网，位置远离王领东岸。
- [x] 奔流城附近能读出河流交汇。V4 中河间地河网更密，奔流城图标也以河流交汇为核心。
- [x] 赫伦堡附近能读出神眼湖。V4 中央偏南有湖泊 / 水域与黑色废墟锚点，图标以湖边废墟补充表达。
- [x] 派克位于西部离岸群岛。V4 西侧黑礁群岛与派克专属图标均强化离岸身份。
- [x] 阳戟城位于多恩远东南海岸，并有干旱地貌。V4 多恩区域为沙色、红山和南海岸，阳戟城专属图标为沙色海岸尖塔。
- [x] 北境、河湾地、多恩、谷地、铁群岛的地貌差异明显。V4 已分别强化雪境、绿地河网、干旱半岛、高山峡谷和黑礁离岛。
- [x] 前端节点贴合底图，不依赖底图里的随机建筑解释地点。当前 12 个地点均使用 `location.id` 专属图标；E2E 验证去重数为 12。

## 8. V1.7 地貌丰富度要求

V1.7 不再只追求“看起来像维斯特洛”，而要让每个区域在沙盘上有不同地貌语言。

| 区域 | V1.7 必须强化的地貌差异 | 推荐视觉元素 | 失败表现 |
|---|---|---|---|
| 北境 | 寒冷、稀疏、古老、边境感 | 长城、积雪山地、针叶林、冻土、国王大道北段、孤立石堡 | 北境像南方平原，城镇过密 |
| 谷地 | 险峻、封闭、高差大 | 明月山脉、峡谷、云雾、极窄山道、高峰城堡 | 鹰巢城像普通城堡按钮或平地城镇 |
| 河间地 | 河流网络、战略交汇、战争焦痕 | 红叉河、腾石河、神眼湖、湿地、桥梁、废墟 | 奔流城和赫伦堡周围没有水系 |
| 王领 | 王都、海湾、河口、港口 | 黑水河、黑水湾、港口、城墙、红堡色块 | 君临离海离河，像内陆城 |
| 西境 | 岩体、矿脉、海岸财富 | 金色岩山、海崖、港口、矿道、石阶 | 凯岩城像普通内陆城堡 |
| 河湾地 | 富饶、园林、河流、道路交汇 | 曼德河、绿丘、玫瑰花园、果园、农田、温暖光线 | 高庭靠近君临，缺少河湾地特征 |
| 风暴地 | 海风、坚固、暴烈 | 暗海、海崖、圆堡、风暴云、浪花 | 风息堡像温和花园城堡 |
| 多恩 | 干旱、红山、沙漠、南海岸 | 沙丘、红色山脉、海湾、尖塔、浅色石墙 | 阳戟城过度绿化或缺少海岸 |
| 铁群岛 | 黑礁、海雾、孤岛、桥梁 | 黑色岩岛、断桥、怒海、海蚀柱 | 派克在大陆上或看不出岛屿 |

## 9. V1.7 地点专属图标 Brief

前端节点图标必须优先表达地点名称与地貌身份，而不是只表达地点类型。以下 brief 用于生成、挑选和验收节点图标。

| 地点 ID | 图标文件建议 | 图标核心识别 | 视觉元素 | 避免 |
|---|---|---|---|---|
| `winterfell` | `map-node-winterfell-v1.png` | 北境雪堡 | 灰石城堡、雪、松林、狼形暗示、冷光 | 金色南方城堡、港口、花园 |
| `kings-landing` | `map-node-kings-landing-v1.png` | 河口王都 | 红金城墙、海湾港口、河口、王冠 / 红堡轮廓 | 内陆城堡、雪景 |
| `the-wall` | `map-node-the-wall-v1.png` | 横向冰墙 | 冰墙截面、哨塔、蓝白裂纹、寒雾 | 普通石墙、城市图标 |
| `castle-black` | `map-node-castle-black-v1.png` | 长城南侧黑堡 | 黑色木石堡、冰墙背景、守夜人哨塔 | 大型王都感、华丽城堡 |
| `the-eyrie` | `map-node-the-eyrie-v1.png` | 峡谷高峰城堡 | 尖峰、悬崖、云雾、白石小堡、窄路 | 平原城堡、海港 |
| `riverrun` | `map-node-riverrun-v1.png` | 河流交汇城堡 | 三角形水道、蓝色河流、石堡、桥梁 | 干旱沙漠、山顶孤堡 |
| `harrenhal` | `map-node-harrenhal-v1.png` | 湖边黑色废墟 | 断塔、焦黑巨墙、湖水、阴影 | 完整华丽宫殿 |
| `casterly-rock` | `map-node-casterly-rock-v1.png` | 西海巨岩城堡 | 金色岩体、海崖、城堡嵌入岩山、港口暗示 | 平地城市、雪堡 |
| `highgarden` | `map-node-highgarden-v1.png` | 河湾花园城 | 绿色丘陵、玫瑰、园林城堡、河流、温暖金光 | 黑暗废墟、风暴海崖 |
| `storms-end` | `map-node-storms-end-v1.png` | 风暴海崖坚堡 | 圆形堡垒、海崖、浪花、风暴云、冷灰色 | 花园城堡、沙漠塔 |
| `pyke` | `map-node-pyke-v1.png` | 黑礁岛堡 | 海蚀柱、断桥、黑色礁石、浪花、铁群岛孤岛 | 大陆城堡、绿色花园 |
| `sunspear` | `map-node-sunspear-v1.png` | 多恩海岸尖塔城 | 沙色尖塔、太阳 / 长矛暗示、海岸、红山远景 | 雪、北境石堡 |

## 10. V1.7 地点图标生成 Prompt

```text
Use case: stylized-concept
Asset type: 12 individual circular map node buttons for a desktop fantasy atlas UI
Primary request: Create a 4x3 contact sheet of twelve distinct miniature sandtable location icons. Each tile is a circular medallion button with old metal rim, enamel depth, miniature terrain, and a readable top-down oblique landmark. No text, no labels, no watermark.

Global style:
- dark fantasy medieval atlas
- physical miniature sandtable pieces
- antique metal rim, subtle parchment-gold highlights
- coherent UI button set, but every icon must be visually distinct
- centered subject with padding, transparent-looking dark vignette background inside each medallion
- no readable text

Order left to right, top to bottom:
1. Winterfell: snowbound grey stone northern castle, pine forest, wolf hint.
2. King's Landing: red-gold coastal capital, river mouth, harbor bay, compact royal citadel.
3. The Wall: long blue-white ice wall segment with a tiny watchtower.
4. Castle Black: black military fort under an ice wall, austere watchtower.
5. The Eyrie: tiny white castle on a sheer mountain spire above a gorge and clouds.
6. Riverrun: stone castle at a clear river confluence, blue water around it.
7. Harrenhal: ruined black towers beside a dark lake, scorched stone.
8. Casterly Rock: golden castle carved into a massive coastal rock cliff with sea below.
9. Highgarden: green hill garden castle, roses, orchards, river curve, warm light.
10. Storm's End: round storm fortress on a sea cliff, waves and dark storm clouds.
11. Pyke: black island sea-stack castle with broken bridges and waves.
12. Sunspear: sandy Dornish coastal city with spear-like towers, desert, red hills, blue sea.

Composition:
- exact 4 columns x 3 rows
- each tile equally sized and isolated, with gutters for cropping
- no repeated castle silhouettes
- no generic duplicate icons
- no official sigils, no actors, no character portraits
```

## 11. V1.7 / V4 地貌增强底图 Prompt

```text
Use case: stylized-concept / historical-scene
Asset type: geography-rich 2.5D fantasy sandtable terrain map background for desktop web UI
Primary request: Create a richer lore-grounded terrain-first Westeros-inspired sandtable map. The goal is not more random cities, but stronger regional terrain identity.

Must improve over V3:
- more visible river network in the Riverlands and Reach
- more distinct Vale mountain enclosure and gorge paths
- King's Landing clearly at east coast river mouth / bay
- Highgarden clearly far southwest in fertile river gardens
- Casterly Rock clearly west coast rock mass
- Pyke clearly offshore western black islands
- Dorne clearly arid southern/eastern peninsula with red mountains and coast
- Storm's End clearly on stormy southeast coast
- North clearly colder, sparse, with Wall and Wolfswood / winter forest

Hard constraints:
- No random dense cities, no unexplained town clusters.
- No labels, no readable text, no UI, no banners, no official map marks.
- Terrain, water, roads, and region material contrast are the main information layer.
- Landmark silhouettes should be subtle and tied only to known anchor locations.
```

## 12. 来源索引

- SRC-001 Winterfell: https://awoiaf.westeros.org/index.php/Winterfell
- SRC-018 King's Landing: https://awoiaf.westeros.org/index.php/King%27s_Landing
- SRC-019 Highgarden: https://awoiaf.westeros.org/index.php/Highgarden
- SRC-021 Eyrie: https://awoiaf.westeros.org/index.php/Eyrie
- SRC-023 Riverrun: https://awoiaf.westeros.org/index.php/Riverrun
- SRC-024 Harrenhal: https://awoiaf.westeros.org/index.php/Harrenhal
- SRC-025 Casterly Rock: https://awoiaf.westeros.org/index.php/Casterly_Rock
- SRC-026 Pyke: https://awoiaf.westeros.org/index.php/Pyke
- SRC-027 Storm's End: https://awoiaf.westeros.org/index.php/Storm%27s_End
- SRC-028 Castle Black: https://awoiaf.westeros.org/index.php/Castle_Black
- SRC-029 Wall: https://awoiaf.westeros.org/index.php/Wall
- SRC-030 Sunspear: https://awoiaf.westeros.org/index.php/Sunspear

## 13. V1.8 引擎资产管线验证

V1.8 的核心不是“立刻把项目改成 Unity / Unreal 游戏”，而是验证一条长期路线：

```text
引擎 / 3D 工具负责可编辑资产生产
Web 负责最终运行、CMS、详情面板、搜索、时间线和部署
```

### 13.1 路线选择

| 路线 | V1.8 判断 |
|---|---|
| Unity WebGL 作为最终运行时 | 可作为后续小验证，但不作为 V1.8 默认主线。优点是可玩性强，缺点是包体、加载、CMS 联动和部署复杂度高。 |
| Unreal + Pixel Streaming | 暂不作为 V1.8 主线。画质上限最高，但更像云游戏，服务器、访问成本和维护复杂度明显高于当前个人作品阶段。 |
| 引擎 / 3D 工具做资产，Web 运行 | V1.8 主线。兼顾高质感资产、局部可修改、网页部署、CMS 管理和长期迭代。 |
| 纯平面 / 传统 2.5D 网页 | 保留为可降级路线。如果 3D 资产管线成本过高，仍可做成高完成度平面作品。 |

### 13.2 V1.8 样例区域

V1.8 标准验证选择：

```text
北境 / 临冬城沙盘 tile
```

原因：

- 临冬城是当前 MVP 内容核心。
- 现有事件、人物、家族、局部地图和素材最完整。
- 北境地貌能验证雪地、森林、道路、古堡、城镇、天气和暗色幻想气质。
- 范围足够小，不会陷入完整维斯特洛大陆 3D 建模。

### 13.3 模块化资产单位

| 模块 | 说明 | 后续 CMS 管理方向 |
|---|---|---|
| TerrainTile | 一个可复用地形块，例如北境雪地、狼林边缘、河谷、城镇周边。 | 坐标、尺寸、缩放、地貌类型、来源、版本。 |
| LandmarkPrefab | 地点核心模型或图像资产，例如临冬城、黑城堡、鹰巢城。 | 关联 Location、模型路径、预览图、LOD、版权来源。 |
| MaterialSet | 雪、石、木、草地、河水、旧金属等材质集合。 | 材质名、贴图路径、生成方式、授权状态。 |
| RouteLayer | 国王大道、支路、桥梁、山道。 | 起点、终点、控制点、故事时期、sourceType。 |
| WaterLayer | 河流、湖泊、海岸线。 | 水系名称、路径点、地貌说明、原著依据。 |
| ForestLayer | 狼林、针叶林、密度区。 | 区域范围、树种风格、密度、季节。 |
| WeatherPreset | 雪雾、云影、战争烟尘、风暴。 | 区域、强度、性能等级、是否默认开启。 |
| MapAnchor | 地点锚点，连接 3D / 2.5D 坐标与 CMS Location。 | x/y/z、旋转、缩放、可点击状态、tooltip 文案。 |

### 13.4 V1.8 最低可行交付

V1.8 不要求用户掌握复杂建模。最低可行交付可以由以下方式组合完成：

- AI 生成高质感地形和城市资产。
- 程序化生成地形 / tile / 道路 / 河流图层。
- 使用 Three.js 或 Canvas 做网页端 2.5D / 轻 3D 验证。
- 用 glTF / PNG tile / sprite atlas / heightmap 作为未来引擎资产格式占位。
- 文档中明确 Unity / Unreal / Blender / Spline 的真实接入路径。

### 13.5 V1.8 验收问题

- 引擎 / 3D 工具生产的资产，质感是否比当前 V4 单张底图明显更强？
- 资产是否可按 tile、prefab、material、anchor 独立替换？
- 网页端是否能加载样例资产，并保持现有地图 UI 与详情面板联动？
- CMS 是否能在未来管理这些资产，而不是只记录一张图片？
- 如果用户不懂建模，是否仍能通过模板、AI、程序化工具和少量可视化编辑完成迭代？

### 13.6 降级标准

如果 V1.8 验证发现以下问题，则应回到高完成度 2.5D 网页路线：

- 资产制作成本远高于视觉收益。
- 本机或部署环境无法稳定运行轻 3D / WebGL。
- 3D 管线导致 CMS、搜索、详情面板和内容维护被拖慢。
- 用户需要学习过多引擎知识才能做普通内容更新。

降级不是失败。降级后的目标是：

```text
做一个完成度极高、可发布、可维护的平面 / 2.5D 互动世界观作品。
```

### 13.7 V1.8 执行证据

- Engine Asset Lab route: `/engine-lab`
- Sample tile id: `tile-north-winterfell-v1`
- Sample anchor: `winterfell`
- Current runtime: Web-authored validation surface
- Future export targets: glTF / GLB / PNG tile / sprite atlas / heightmap
- Verified layer units:
  - terrain
  - landmark
  - forest
  - route
  - water
  - weather
  - anchor
- Verification result:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - `npm run test:e2e`
  - `npm run build`

### 13.8 V1.8 结论

V1.8 证明 C 方案可以作为下一阶段主线：

```text
高保真 Web 2.5D 继续作为最终用户体验；
引擎 / 3D 工具作为资产生产、局部沙盘、tile、prefab、material、anchor 的上游管线；
暂不把完整项目迁移到 Unity / Unreal runtime。
```

这条路线保留了网页部署、CMS、搜索、详情面板、时间线和长期内容维护的优势，同时允许后续逐步用更强的 3D / 引擎资产替换当前程序化验证层。
