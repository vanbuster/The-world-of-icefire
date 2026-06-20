# 《维斯特洛互动世界地图 V1.5 私有美术资产升级循环》提示词

> 状态：当前待执行美术升级 loop
> 创建日期：2026-06-19
> 上游：V1 高保真发布循环已完成 `29/29` 本地验收；本 loop 不覆盖 V1，而是在其上升级美术资产质量。

## 1. 循环目标

你是《维斯特洛互动世界地图》的美术资产生产与前端集成 Agent。

本轮循环名称：

```text
《维斯特洛互动世界地图 V1.5 私有美术资产升级循环》
```

目标是在当前可运行 V1 的基础上，建立并执行一条更接近参考效果图的美术生产流水线：

- 使用原剧剧照、官方视觉、公开图像、历史地图、材质图、AI 生成图作为本地私有创作基准。
- 通过生图模型、重绘、风格迁移、局部修图、纹理合成，产出更高保真的维斯特洛幻想沙盘资产。
- 替换当前偏程序化 / 占位感的地图底图、事件图、地点局部图、天气层纹理和 UI 装饰资产。
- 保留前台交互、CMS 后台、测试和本地验收能力。
- 不以公开发布合规作为本 loop 的完成阻塞，但必须保留素材来源、风险等级、使用范围和替换策略，避免未来上线时无法清理。

## 2. 当前用户决策

用户确认本阶段暂时：

- 不上线。
- 不盈利。
- 不面向社区发布。
- 允许把原剧剧照、系列视觉元素和网络图像作为本地私有原始素材进行二次创作。
- 以美术效果质量优先，先拉近与参考效果图的差距。

## 3. 强制边界

本 loop 可以使用官方剧照等素材作为 `private-prototype` 创作基准，但不得把它们标记为公开可用资产。

必须遵守：

- 所有官方剧照、官方地图、官方海报、演员照片、商业游戏截图等原始素材只能放在 `apps/westeros-map/private/` 或其他被 git 忽略的目录。
- 公开前台引用路径不得直接指向原始剧照或官方图。
- 生成资产必须记录来源链：原始参考、生成模型、prompt 摘要、是否官方素材衍生、风险等级、是否允许公开。
- `ASSET_MANIFEST.md` 只能记录进入项目前台或 CMS 的资产；原始参考素材记录在 `PRIVATE_REFERENCE_REGISTER.md`。
- 上线前必须有一次 public-ready 清理：替换高风险衍生资产、删除私有参考素材、确认公开素材清单。

仍需先问用户的红线：

- 真实 PostgreSQL 数据库迁移。
- 对真实数据库运行 seed。
- 创建真实管理员账号或真实密码。
- 写入真实 `.env` 密钥。
- 部署到公网平台。
- 删除大量文件、重置 Git、强推或破坏性操作。

## 4. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/loop-v1-5-art-remix/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-5-art-remix/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-5-art-remix/PROGRESS.md
docs/westeros-interactive-map/loop-v1-5-art-remix/BLOCKERS.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-5-art-remix/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-5-art-remix/PROGRESS.md
docs/westeros-interactive-map/loop-v1-5-art-remix/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md
docs/westeros-interactive-map/ASSET_MANIFEST.md
```

若遇到工具、素材、模型或红线阻塞，更新：

```text
docs/westeros-interactive-map/loop-v1-5-art-remix/BLOCKERS.md
```

## 5. 五拍循环

每轮只做一个最小可验证美术增量：

1. Orient：读取状态文件、当前资产、最新截图和前台视觉问题。
2. Plan：选择一个最小资产簇，例如全局底图、临冬城局部图、一个事件图批次、天气纹理、UI 装饰。
3. Act：收集参考、生成 / 重绘资产、压缩导出、替换前台引用或接入 CMS mock 数据。
4. Verify：运行视觉截图、Playwright 关键路径、构建和必要测试；与参考效果图目标进行人工可读对比说明。
5. Record：登记素材来源链、风险等级、截图路径、测试结果和下一步。

## 6. 推荐执行顺序

1. 建立私有素材目录和登记表。
2. 收集 20-40 张私有参考：剧照、官方场景、地图质感、微缩沙盘、古地图材质。
3. 生成 6-12 张 art direction contact sheet。
4. 选择 1 个主视觉方向。
5. 生成全局维斯特洛沙盘地图底图。
6. 生成临冬城局部地图。
7. 生成 7 张临冬城关键事件图。
8. 生成地点微缩图标：临冬城、君临、黑城堡、鹰巢城、奔流城、风息堡、高庭、阳戟城、凯岩城、长城。
9. 生成天气纹理：云雾、北境雪、战争烟尘。
10. 更新前台资产引用和 CSS 质感层。
11. 运行截图验收和测试。
12. 输出 public-ready 替换清单。

## 7. 成功标准

本 loop 完成时必须满足：

- `ACCEPTANCE_CHECKS.json` 所有检查为 `passing`。
- 至少 1 套高保真全局地图底图进入前台。
- 至少 7 张临冬城事件图进入前台。
- 至少 3 个地点拥有高保真局部或预览资产。
- 天气层使用生成纹理或更高质量视觉资源，不再只是基础 div 氛围层。
- 前台 1440x900 和 1920x1080 截图明显优于 V1 SVG 占位资产。
- `PRIVATE_REFERENCE_REGISTER.md` 完整记录所有私有参考素材。
- `ASSET_MANIFEST.md` 记录所有进入前台的生成 / 重绘资产。
- `npm run lint`、`npm run typecheck`、`npm run test:unit`、`npm run test:e2e`、`npm run build` 通过。
- 不把私有原始剧照或官方素材提交到公开资产目录。

## 8. 停止条件

成功停止：

- `loop-v1-5-art-remix/ACCEPTANCE_CHECKS.json` 中所有检查为 `passing`。
- `OPERATOR_STATUS.md` 状态为 `complete`。
- 截图和测试证据齐全。

阻塞停止：

- 生图工具不可用，连续三轮无法生成关键资产。
- 无法获取任何可用参考或输入素材。
- 前端性能因新资产明显不可接受，且三轮优化后仍无法达到桌面流畅。
- 用户要求进入公网部署，但 private-prototype 高风险资产尚未清理。

硬上限：

- 单轮最多推进一个资产簇。
- 单轮如果生成超过 20 张图片，必须先整理筛选，不继续堆资产。
- 任何超过 20MB 的单张前台图片必须压缩或降采样。

## 9. 不得伪完成

不得因为“生成了图”就标记通过。

每个通过项必须有证据：

- 文件路径。
- 参考登记 ID。
- 生成 prompt 摘要。
- 前台引用位置。
- 截图路径。
- 测试命令和结果。
- 风险等级与 public-ready 状态。

## 10. 第一轮启动动作

启动本 loop 时先做：

1. 确认 `apps/westeros-map/private/westeros-reference/` 和 `apps/westeros-map/public/assets/westeros/generated/` 目录策略。
2. 确认 `.gitignore` 忽略私有原始素材目录。
3. 建立 `PRIVATE_REFERENCE_REGISTER.md` 初始条目。
4. 将第一个美术目标设为“全局维斯特洛沙盘地图 art direction contact sheet”。
5. 生成或收集候选资产后，先截图对比，不急于替换所有页面。
