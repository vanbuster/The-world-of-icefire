# 《维斯特洛互动世界地图 V1.8 引擎资产管线与高保真 2.5D 验证循环》提示词

> 状态：active  
> 创建日期：2026-06-21  
> 触发原因：用户确认 V1.8 方向应以 C 方案为主，即“Unity / Unreal / Blender 等引擎或 3D 工具负责资产编辑，网页负责最终运行、CMS、详情面板、搜索和部署”，并附带小范围验证 Unity / WebGL 方向的可行性。

## 1. 循环目标

你是《维斯特洛互动世界地图》的 V1.8 执行 Agent。

本轮循环名称：

```text
《维斯特洛互动世界地图 V1.8 引擎资产管线与高保真 2.5D 验证循环》
```

目标：在 V1.7 已完成 V4 地貌底图和 12 个地点专属图标的基础上，验证下一代地图架构是否应该从“单张生成式底图 + HTML 节点”升级为“引擎 / 3D 工具生产资产 + Web 2.5D / 轻 3D 运行 + CMS 管理”的长期路线。

## 2. 用户最新决策

用户认为：

- Unity 或 Unreal 的质感、可交互性、可玩性更高。
- 引擎场景可局部修改地形、城市、材质、光照，不必每次整张图重绘。
- 引擎化资产在长期维护上可能比单张生成图更强。
- 但用户没有 3D 建模和引擎经验，因此不能直接把整个项目押到完整游戏工程。
- 当前更倾向 C 方案：引擎负责资产编辑，网页负责最终运行和 CMS。
- V1.8 应做折中验证：主线仍然保证网页作品完成度，同时验证一条高质感 3D / 2.5D 资产管线。

## 3. V1.8 推荐方案

采用“标准验证”：

```text
C 方案为主：引擎 / 3D 工具编辑资产，Web 负责最终运行与 CMS。
附带 A 方案小验证：评估 Unity WebGL 或等价轻 3D 原型是否值得继续投入。
```

V1.8 不直接重做整个维斯特洛大陆，不直接迁移到完整 Unity / Unreal 项目。

V1.8 只验证一个小样板区域：

```text
北境 / 临冬城沙盘 tile
```

选择临冬城 / 北境的原因：

- 它是当前 MVP 内容核心。
- 现有详情、人物、事件、局部地图和节点数据最完整。
- 能验证雪地、针叶林、古堡、道路、城镇、天气层等关键视觉能力。
- 不会像君临或谷地那样一开始就引入过高复杂度。

## 4. V1.8 必须回答的问题

1. 引擎 / 3D 工具生产的沙盘资产，视觉质感是否明显强于当前单张 AI 底图？
2. 地形、城堡、森林、道路、局部建筑能否作为模块独立维护？
3. 这些资产能否导出成网页可运行格式，例如 glTF / image tile / sprite atlas / heightmap？
4. 网页端能否加载这个样板资产，并与现有地图 UI、节点、详情面板兼容？
5. CMS 后台未来能否管理这些资产、坐标、图层、tile 与来源记录？
6. 如果用户不会建模，是否仍可以通过 AI、现成资产、简单 3D 工具、引擎模板完成可维护创作？
7. 这条路线是否比继续做高保真平面 / 2.5D 网页更值得投入？

## 5. V1.8 交付物

### 5.1 文档交付

- V1.8 需求与架构说明。
- 引擎资产管线说明。
- 地形 tile / 地点 prefab / 材质 / 坐标 / 图层 / CMS 字段草案。
- Unity / Unreal / Blender / Spline / Three.js / PixiJS 的路线取舍说明。
- 用户零建模经验下的最低可行学习与制作路径。
- 后续是否进入 Unity WebGL、Three.js 轻 3D 或继续 Web 2.5D 的决策建议。

### 5.2 前端验证交付

- 一个新的 V1.8 “Engine Asset Lab” 或等价实验入口。
- 一个北境 / 临冬城沙盘 tile 的网页验证视图。
- 至少包含：
  - 地形层
  - 临冬城地标资产
  - 森林 / 雪地 / 道路 / 河流等模块化层
  - 地点锚点
  - 与右侧详情面板或现有地图 UI 的基本联动
- 该验证不要求替换当前正式地图，但必须能证明下一代路线可行。

### 5.3 资产验证交付

- 生成或制作一个高质感北境 / 临冬城样例资产。
- 保存源文件、生成 prompt、导出文件和公开前端文件。
- 所有资产进入 `ASSET_MANIFEST.md` 和 `PRIVATE_REFERENCE_REGISTER.md`。
- 如果未安装 Unity / Unreal，则可先用 Blender / Spline / Three.js procedural / AI 生成资产模拟引擎资产管线，但文档必须说明真实引擎接入路径。

### 5.4 测试与验收交付

- E2E 验证实验入口可访问。
- E2E 验证样例 tile 可加载。
- E2E 验证地点锚点和 UI 联动不破坏现有地图。
- 视觉截图至少包含：
  - 1440x900 实验入口
  - 1440x900 临冬城样例 tile
  - 1920x1080 临冬城样例 tile
- `typecheck`、`lint`、`test:unit`、`test:e2e`、`build` 必须通过。

## 6. 非目标范围

V1.8 不做：

- 完整 Unity / Unreal 维斯特洛大陆。
- 完整游戏化移动、角色控制、战斗、经济系统。
- 完整 3D 建模教学课程。
- 大量地点详情内容扩写。
- 大规模 CMS Schema 迁移。
- 公开部署或发布。
- 版权合规最终审查。

## 7. 技术路线默认假设

优先级：

1. 保留当前 Next.js / React / Payload CMS 项目作为主项目。
2. 新增实验性 Web 2.5D / 轻 3D 资产加载层。
3. 若选择真实 3D 运行，优先使用 Three.js / React Three Fiber 做网页内轻 3D 验证。
4. Unity / Unreal 在 V1.8 中优先作为资产生产和编辑管线讨论，不作为默认最终运行时。
5. 如果本机环境已具备 Unity 或 Blender，可增加导出 glTF / 贴图 / heightmap 的真实资产实验。
6. 如果没有引擎环境，则用程序化地形、AI 生成素材和可替换 asset manifest 模拟资产管线。

## 8. 成功标准

- V1.8 loop `ACCEPTANCE_CHECKS.json` 全部 passing。
- 需求、目标、风险和路线选择写入总控文档和外挂知识库。
- 明确回答“是否值得进入引擎资产管线”。
- 至少有一个可访问的网页实验入口。
- 至少有一个高质感北境 / 临冬城沙盘样例。
- 实验资产具备模块化结构，而不是单张不可维护大图。
- 现有 V1.7 主地图不被破坏。
- 所有验证命令通过。

## 9. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/ACTIVE_LOOP.md
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/PROGRESS.md
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/BLOCKERS.md
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/PROGRESS.md
docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

## 10. 当前执行队列

1. 创建 V1.8 loop 状态目录与验收清单。
2. 更新 `ACTIVE_LOOP.md`，把当前唯一活跃 loop 指向 V1.8。
3. 更新外挂知识库，新增 V1.8 引擎资产管线目标、执行状态和决策背景。
4. 更新项目约束文件，记录 C 方案为主的架构方向变更。
5. 写 V1.8 设计规格与实现计划。
6. 开始执行 V1.8 标准验证。

