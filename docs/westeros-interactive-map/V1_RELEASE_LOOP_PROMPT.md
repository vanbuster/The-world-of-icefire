# 《维斯特洛互动世界地图 V1 高保真发布循环》提示词

> 状态：当前活跃延续 loop
> 创建日期：2026-06-18
> 上游：MVP loop 已完成 51/51 验收；本 loop 不重置 MVP，而是在其上继续向可公开发布 V1 推进。

## 1. 循环目标

你是《维斯特洛互动世界地图》的长期执行 Agent。

本轮循环名称：

```text
《维斯特洛互动世界地图 V1 高保真发布循环》
```

目标是在既有 MVP 基础上，继续交付更接近公开发布的 V1：

- 更高保真的 2.5D / 幻想沙盘视觉
- 更多可点击或可预览地点样板
- 更清晰的百科式搜索入口
- 更强的后台 CMS 字段与 seed 准备
- 更稳的前台数据边界
- 更完整的测试与生产截图验收

## 2. 当前边界

允许直接执行：

- 本地代码修改
- 本地文档修改
- 本地原创 / 程序化 / SVG 资产生成
- 本地 mock 数据、seed 脚本和 CMS collection 字段增强
- 本地测试、构建、生产 smoke check
- 本地截图验收

必须先问用户的红线：

- 真实 PostgreSQL 数据库迁移
- 对真实数据库运行 seed
- 创建真实管理员账号或真实密码
- 写入真实 `.env` 密钥
- 部署到公网平台
- 使用未经授权官方素材作为公开核心资产
- 删除文件、重置 Git、强推或破坏性操作

## 3. 状态文件

每轮开始先读取：

```text
docs/westeros-interactive-map/loop-v1-release/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-release/ACCEPTANCE_CHECKS.json
docs/westeros-interactive-map/loop-v1-release/PROGRESS.md
docs/westeros-interactive-map/loop-v1-release/BLOCKERS.md
WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md
```

每轮结束必须更新：

```text
docs/westeros-interactive-map/loop-v1-release/OPERATOR_STATUS.md
docs/westeros-interactive-map/loop-v1-release/PROGRESS.md
docs/westeros-interactive-map/loop-v1-release/ACCEPTANCE_CHECKS.json
```

若遇到红线或三轮无法推进的同一阻塞，更新：

```text
docs/westeros-interactive-map/loop-v1-release/BLOCKERS.md
```

## 4. 五拍循环

每轮只做一个最小可验证增量：

1. Orient：读取状态文件、最新验收项、代码现状。
2. Plan：选择一个最小且可验证的 V1 增量。
3. Act：实现该增量，不做无关重构。
4. Verify：运行相关测试或截图验证。
5. Record：更新验收清单、进度、状态。

## 5. 停止条件

成功停止：

- `loop-v1-release/ACCEPTANCE_CHECKS.json` 中所有检查为 `passing`。
- `OPERATOR_STATUS.md` 状态为 `complete`。
- 最终测试至少包含 lint、typecheck、unit、build、E2E、生产截图验证。

阻塞停止：

- 同一红线或同一外部依赖连续三轮阻塞。
- 需要用户提供真实密钥、真实数据库、真实部署授权。

硬上限：

- 单轮最多推进一个可独立验证的功能簇。
- 若上下文变大，优先写入状态文件并继续，不依赖聊天上下文记忆。

## 6. 不得伪完成

不得因为 UI 看起来不错就标记通过。

每个通过项必须有证据：

- 文件路径
- 测试命令和结果
- 截图路径
- grep / DOM / E2E 证据
- 文档位置

## 7. 当前验收清单

验收源：

```text
docs/westeros-interactive-map/loop-v1-release/ACCEPTANCE_CHECKS.json
```

不要使用旧 MVP `loop/ACCEPTANCE_CHECKS.json` 作为本轮停止条件。
