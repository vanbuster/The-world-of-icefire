# 《维斯特洛互动世界地图 V1.7 原著地貌深化与地点专属图标循环》提示词

> 状态：active  
> 创建日期：2026-06-20  
> 触发原因：用户验收 V1.6 后指出地图仍不够丰富，地形层面仍不够符合原著；各城市 / 城堡节点图标没有按地点名称创作，多个地点仍复用同一个临冬城式城堡按钮。

## 1. 循环目标

你是《维斯特洛互动世界地图》的 V1.7 执行 Agent。

本轮循环名称：

```text
《维斯特洛互动世界地图 V1.7 原著地貌深化与地点专属图标循环》
```

目标：在 V1.6 沙盘版基础上继续收敛两个核心问题：

1. 地形层面更符合原著地理和区域气质。
2. 每个地图地点节点都拥有与地点名称、地貌和故事背景相符的独立图标资产，不再按 `castle` / `city` 类型复用同一个图标。

## 2. 用户明确反馈

- 当前 V1.6 只能算上一轮视觉增强收敛，但产品质量还没有真正收敛。
- 地图不够丰富，地形层面不够符合原著。
- 各个城市 / 城堡图标素材没有根据名字和背景创作。
- 多个地点使用相同的临冬城式城堡图标，造成视觉与叙事割裂。

## 3. 强制策略

1. 先读取并扩展：

```text
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
```

2. 图标生成必须按地点 ID 和地点背景逐一设计：
   - `winterfell`
   - `kings-landing`
   - `the-wall`
   - `castle-black`
   - `the-eyrie`
   - `riverrun`
   - `harrenhal`
   - `casterly-rock`
   - `highgarden`
   - `storms-end`
   - `pyke`
   - `sunspear`

3. 前端节点取图规则必须改为：
   - 优先按 `location.id` 使用专属图标。
   - 找不到专属图标时才回退到 `location.type` 通用图标。

4. 每个专属图标必须能通过肉眼辨识地点差异：
   - 临冬城：北境雪堡、灰石、狼 / 松林意象。
   - 君临：海湾港口、红堡 / 王都、河口。
   - 长城：横向冰墙。
   - 黑城堡：长城南侧黑色军事据点。
   - 鹰巢城：高山、峡谷、峭壁。
   - 奔流城：河流交汇处的城堡。
   - 赫伦堡：湖边破败黑塔。
   - 凯岩城：西海岸金色巨岩城堡。
   - 高庭：绿丘、花园、玫瑰、曼德河。
   - 风息堡：风暴海崖、圆形坚堡。
   - 派克：黑礁岛、断桥、海浪。
   - 阳戟城：多恩沙漠、尖塔、海岸。

5. 地形生成或后续 V4 底图必须减少“泛奇幻大陆感”，强化北境、河间地、谷地、王领、西境、河湾地、风暴地、多恩、铁群岛的差异。

## 4. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/PROGRESS.md
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/BLOCKERS.md
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/PROGRESS.md
docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

## 5. 当前执行队列

1. 创建 V1.7 loop 状态目录与验收清单。
2. 扩展外挂地理知识库，新增 V1.7 地形丰富度和地点图标 brief。
3. 生成 12 个地点专属图标资产。
4. 裁切、增强并放入前台 public assets。
5. 修改 `MapNode.tsx`，按地点 ID 优先取图。
6. 修改 E2E，验证每个地点的 `data-map-node-art` 和背景图文件名不同。
7. 如时间允许，生成 V4 地貌增强底图并替换 V3。
8. 截图验收 1440x900 和 1920x1080。
9. 跑 `typecheck`、`lint`、`test:unit`、`test:e2e`、`build`。
10. 更新状态并输出验收入口。

## 6. 成功标准

- V1.7 loop `ACCEPTANCE_CHECKS.json` 全部 passing。
- 12 个地点均有独立图标文件。
- 前端 12 个地点节点均使用地点专属图标，不再全部复用 `map-node-castle-v2.png`。
- 地理知识库包含每个地点的地貌 brief 和图标 brief。
- 地图地貌有明确的下一步 V4 生成约束，若生成 V4 则接入并验证。
- `npm run typecheck`、`npm run lint`、`npm run test:unit`、`npm run test:e2e`、`npm run build` 通过。
