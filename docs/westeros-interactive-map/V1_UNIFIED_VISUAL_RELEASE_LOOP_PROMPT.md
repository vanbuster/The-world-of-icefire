# 《维斯特洛互动世界地图 V1.5 视觉资产升级与发布清理统一循环》提示词

> 状态：complete / 18 of 18 passing
> 创建日期：2026-06-19
> 合并来源：
> - `loop-v1-release/`：V1 高保真本地发布验收，已完成 `29/29`。
> - `loop-v1-5-art-remix/`：V1.5 私有美术资产升级，已创建 `4/17`，尚未真正执行资产生产。

## 1. 循环目标

你是《维斯特洛互动世界地图》的长期执行 Agent。

本轮统一循环名称：

```text
《维斯特洛互动世界地图 V1.5 视觉资产升级与发布清理统一循环》
```

目标：以已经通过验收的 V1 产品骨架为稳定基线，继续执行 V1.5 美术资产升级，直到前台视觉从“可运行占位沙盘”提升为“接近参考效果图的高保真幻想地图体验”。

## 2. 当前合并判断

- V1 loop 已跑完并可作为 baseline，不重复执行其全部 29 项。
- V1.5 art remix loop 只完成 loop 创建和私有参考登记框架，未完成参考收集、生成资产、前台替换和截图验收。
- 因此本统一 loop 将 V1 的完成状态作为 `baseline-passing`，把 V1.5 的 13 个 pending 项作为当前执行队列。

## 3. 用户当前决策

本阶段暂时：

- 不上线。
- 不盈利。
- 不面向社区发布。
- 允许原剧剧照、官方视觉、系列元素和网络图像作为本地私有原始素材进行二次创作。
- 以美术效果质量优先。
- 各大家族的旗帜、标志和按钮美术必须有明显差异，同时保持同一套暗金 / 古地图 / 微缩沙盘 UI 语言；不得用通用图标长期代替家族纹章。

## 4. 强制边界

允许：

- 本地私有参考素材收集。
- 生图模型、图像编辑、重绘、合成、压缩和前台替换。
- 官方剧照等作为 `private-prototype` 创作基准。

必须：

- 原始参考图只放在 `apps/westeros-map/private/westeros-reference/` 或其他 git ignored 目录。
- 不把原始剧照、官方地图、演员照片、商业游戏截图直接放入 `apps/westeros-map/public/`。
- 所有进入前台的生成 / 重绘资产必须记录到 `ASSET_MANIFEST.md`。
- 所有私有参考必须记录到 `PRIVATE_REFERENCE_REGISTER.md`。
- 上线前必须输出 public-ready cleanup report。

仍需先问用户的红线：

- 真实 PostgreSQL 数据库迁移。
- 对真实数据库运行 seed。
- 创建真实管理员账号或真实密码。
- 写入真实 `.env` 密钥。
- 部署到公网平台。
- 删除大量文件、重置 Git、强推或破坏性操作。

## 5. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/loop-v1-unified-visual-release/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-unified-visual-release/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-unified-visual-release/PROGRESS.md
docs/westeros-interactive-map/loop-v1-unified-visual-release/BLOCKERS.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-unified-visual-release/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-unified-visual-release/PROGRESS.md
docs/westeros-interactive-map/loop-v1-unified-visual-release/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
```

## 6. 五拍循环

每轮只推进一个最小可验证资产簇：

1. Orient：读取状态、当前截图、当前资产和待办检查。
2. Plan：选一个未通过检查作为本轮目标。
3. Act：生成 / 下载私有参考 / 重绘 / 替换 / 压缩 / 接入。
4. Verify：截图、视觉对比、lint/typecheck/test/build。
5. Record：登记参考、资产、风险、截图、测试结果。

## 7. 当前执行队列

优先顺序：

1. 私有参考素材包：20-40 个参考条目。
2. 全局地图 art direction contact sheet：至少 6 个候选方向。
3. 高保真全局地图底图：替换当前 SVG placeholder。
4. 临冬城局部地图：替换占位局部图。
5. 七个临冬城事件图：替换 SVG 占位事件图。
6. 天气纹理：云雾、雪、烟尘。
7. 家族旗帜按钮与 HouseBadge 美术：先完成史塔克、拜拉席恩、兰尼斯特、葛雷乔伊、波顿，再扩展其他家族。
8. 前台截图和测试验收。
9. public-ready cleanup report。

## 8. 成功标准

本统一 loop 完成时必须满足：

- V1 baseline 仍为 `29/29 passing`。
- 统一 loop `ACCEPTANCE_CHECKS.json` 所有检查为 `passing`。
- 前台仍能打开 `http://localhost:3000`。
- 后台仍能打开 `http://localhost:3000/admin`。
- 至少一套高保真全局地图底图进入前台。
- 至少 7 张临冬城事件图进入前台。
- 至少 3 个地点拥有高保真局部或预览资产。
- 当前出现在前台的主要家族拥有不同的旗帜 / 纹章按钮，并在 HouseBadge、底部按钮、人物卡片中保持统一。
- 天气层使用生成纹理或更高质量视觉资源。
- 1440x900 与 1920x1080 截图显示视觉质量明显提升。
- `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run test:e2e`、`npm run build` 全部通过。

## 9. 不得伪完成

不得因为生成了图片或页面没报错就通过。

每个通过项必须包含：

- 文件路径。
- 参考登记 ID。
- 生成 prompt 摘要。
- 前台引用位置。
- 截图路径。
- 测试命令和结果。
- 风险等级与 public-ready 状态。
