# 《维斯特洛互动世界地图 V1.6 沙盘写实化与交互质感升级循环》提示词

> 状态：active
> 创建日期：2026-06-20
> 触发原因：用户反馈当前地图、家族旗帜、城市按钮和交互模块仍显粗糙；放大后噪点与模糊明显；随后进一步指出沙盘底图出现大量意义不明的城市，鹰巢城、君临、高庭等关键地点必须按原著地理背景刻画。

## 1. 循环目标

你是《维斯特洛互动世界地图》的 V1.6 执行 Agent。

本轮循环名称：

```text
《维斯特洛互动世界地图 V1.6 沙盘写实化与交互质感升级循环》
```

目标：在 V1.5 已完成的可运行视觉版本基础上，继续提升地图、节点、家族徽章和交互手感，使前台体验更接近“可拖动的高精细幻想沙盘”，同时用原著地理知识库约束全局底图，避免随机城市和错误地貌破坏世界观可信度。

## 2. 用户明确反馈

- 家族旗帜和家族纹章不够写实，不够有材质感。
- 地图上的按钮、重要城市按钮仍然粗糙。
- 当前缺少一个质感好的维斯特洛交互模块。
- 地图细节不足，用杂乱、噪点和雾层掩盖了精细度问题。
- 放大后地图出现噪点、模糊像素。
- 希望地图做成沙盘型，可以拖动，有交互效果，更像一个真实沙盘。
- 要联网搜索素材参考。
- 要使用 sub-agent 编排验收。
- 要使用最高规格的美术生成与再创作流程。
- 沙盘底图里存在大量意义不明的城市，需要改成地貌优先、节点解释优先。
- 鹰巢城必须位于险要峡谷 / 高山；君临必须贴近河流和海湾；高庭必须位于遥远的西南河湾地。
- 这些地理规则需要沉淀成外挂知识库文档，方便后续审查和修改。

## 3. 强制策略

1. 不再只用单张低清背景图掩盖问题。
2. 地图底图必须优先追求：
   - 更高分辨率
   - 更清晰的山脉、河流、海岸、城堡、道路和森林
   - 更少随机噪点
   - 更明确的沙盘灯光、地形层次与微缩模型感
3. 地点节点必须从线性通用图标升级为微缩沙盘 UI 按钮。
4. 家族徽章必须从扁平 SVG 感升级为金属、珐琅、织物或浮雕质感。
5. 地图交互必须强化沙盘镜头感：
   - 拖动时有轻微惯性 / 浮动感
   - 缩放时有景深、阴影或视差响应
   - 重要地点 hover / selected 状态有立体反馈
6. 所有新资产必须记录来源、生成方式、风险等级和 public-ready 状态。
7. 不能以“测试通过”替代视觉达标；每个视觉项必须有截图证据。
8. 生成或替换全局底图前必须读取并遵守：

```text
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
```

9. 底图背景主要表达地形、水系和少量锚点，不得随机生成无法解释的城市群。

## 4. Subagent 编排

至少使用一个 sub-agent 执行独立验收或审计任务。

推荐分工：

- 主 Agent：创建 loop、生成资产、改前台、跑测试、更新文档。
- Visual Audit Subagent：只读审计当前视觉缺陷、给出验收标准和优先级。
- 后续可选 Worker Subagent：独立实现某个互不冲突的组件或测试。

sub-agent 结果必须沉淀进：

```text
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/SUBAGENT_AUDIT.md
```

## 5. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/PROGRESS.md
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/BLOCKERS.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/PROGRESS.md
docs/westeros-interactive-map/loop-v1-6-sandtable-realism/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
```

## 6. 当前执行队列

1. 联网收集沙盘地图、立体地形、纹章材质、微缩 UI 按钮、博物馆图鉴交互参考。
2. 使用 sub-agent 完成当前视觉缺陷审计。
3. 生成更高规格维斯特洛沙盘底图 V2。
4. 生成或重绘写实家族纹章 V2。
5. 生成或重绘地点节点按钮 V2。
6. 替换前台地图底图、地点节点按钮、家族徽章按钮。
7. 强化拖拽 / 缩放交互的沙盘感。
8. 增加视觉验收测试和截图。
9. 更新资产清单、来源登记、风险说明。
10. 输出 V1.6 验收总结。
11. 若用户反馈地理位置或地貌不符合原著，先更新外挂知识库，再生成 / 替换底图和节点坐标。

## 7. 成功标准

- V1.6 loop `ACCEPTANCE_CHECKS.json` 全部 passing。
- 前台仍可访问 `http://localhost:3000`。
- 后台仍可访问 `http://localhost:3000/admin`。
- 地图底图替换为更清晰、更少噪点、更有沙盘层次、并受原著地理知识库约束的 V3 资产。
- 背景中不再出现大量无意义城市；君临、鹰巢城、高庭等关键地点的地貌关系可被人工验收。
- `WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md` 已创建并可作为后续地图生成和审查依据。
- 至少 5 个家族徽章使用更写实材质资产。
- 地点节点 / 城市按钮不再使用通用线性 icon 作为主视觉。
- 拖动、缩放、hover、selected 的交互更接近沙盘操作台。
- 1440x900 与 1920x1080 截图显示视觉质量提升。
- `npm run typecheck`、`npm run lint`、`npm run test:unit`、`npm run test:e2e`、`npm run build` 通过。
