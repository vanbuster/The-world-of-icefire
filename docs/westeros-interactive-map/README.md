# 《维斯特洛互动世界地图》项目文档入口

这是《冰与火之歌 / 权力的游戏》维斯特洛互动世界地图项目的文档目录。

项目目标：交付一个可迭代、可维护、可公开部署的地图驱动世界观浏览器，包含前台互动地图、临冬城详情闭环、创作者后台 CMS、素材来源记录、测试和部署准备。

## 当前核心文档

- [项目约束文件](../../WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md)
- [PRD 产品需求文档](./PRD.md)
- [IA 与内容模型](./IA_CONTENT_MODEL.md)
- [技术架构](./TECH_ARCHITECTURE.md)
- [视觉与素材指南](./VISUAL_ASSET_GUIDE.md)
- [实现指南](./IMPLEMENTATION_GUIDE.md)
- [开发任务拆解](./TASK_BREAKDOWN.md)
- [部署与运行说明](./DEPLOYMENT.md)
- [Build Great Loop 循环提示](./BUILD_GREAT_LOOP_PROMPT.md)
- [V1 高保真发布循环提示](./V1_RELEASE_LOOP_PROMPT.md)
- [V1.5 私有美术资产升级循环提示](./V1_5_ART_REMIX_LOOP_PROMPT.md)
- [V1 统一视觉发布循环提示](./V1_UNIFIED_VISUAL_RELEASE_LOOP_PROMPT.md)
- [当前唯一活跃 Loop](./ACTIVE_LOOP.md)
- [来源记录](./SOURCE_REGISTER.md)
- [私有参考素材登记](./PRIVATE_REFERENCE_REGISTER.md)
- [素材清单](./ASSET_MANIFEST.md)

## 预期应用目录

```text
apps/westeros-map/
```

应用已经创建，实际运行命令见 `apps/westeros-map/package.json` 与 [应用 README](../../apps/westeros-map/README.md)。

## 推荐本地命令

当前使用：

```bash
cd apps/westeros-map
npm install
npm run dev
npx tsx src/seed/index.ts
npm run payload:generate-importmap
npm run payload:generate-types
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

实际命令以应用 `package.json` 为准。

## CMS 后台

MVP 后台目标：

- 单管理员登录
- Locations 管理
- Assets / Media 管理
- 素材来源记录
- 草稿 / 发布状态
- 基础预览

默认后台地址：

```text
http://localhost:3000/admin
```

本地开发默认使用 Payload SQLite fallback；显式设置 `DATABASE_URI` 时切换到 PostgreSQL。
真实 PostgreSQL 初始化、真实 seed、管理员账号和公网部署仍需要单独确认。
真实 seed 命令为 `npm run seed`，执行前需要明确确认目标数据库。

## 素材与版权

项目为个人二创，公开发布但不商业运营。

公开核心素材必须优先使用原创、AI 生成、程序化绘制或参考后重绘资产。不直接使用未经授权的官方地图、官方剧照、演员照片、商业游戏素材或大段原文。

所有素材必须记录到：

- `ASSET_MANIFEST.md`
- `SOURCE_REGISTER.md`

## 当前验收入口

- 前台本地验收：`http://localhost:3000`
- 后台本地验收：`http://localhost:3000/admin`
- V1 loop 验收清单：`docs/westeros-interactive-map/loop-v1-release/ACCEPTANCE_CHECKS.json`
- V1 生产截图产物：`apps/westeros-map/test-results/visual-v1-production/`
- 最新生产烟测截图：`1440x900-home-latest.png`、`1440x900-winterfell-latest.png`、`1440x900-kings-landing-latest.png`、`1440x900-admin-create-first-user-latest.png`

## Loop 状态

MVP 长期任务状态在：

```text
docs/westeros-interactive-map/loop/
```

核心文件：

- `ACCEPTANCE_CHECKS.json`
- `PROGRESS.md`
- `BLOCKERS.md`
- `OPERATOR_STATUS.md`

当前活跃 V1 高保真发布循环状态在：

```text
docs/westeros-interactive-map/loop-v1-release/
```

当前唯一活跃执行队列为 V1.5 视觉资产升级与发布清理统一循环：

```text
docs/westeros-interactive-map/loop-v1-unified-visual-release/
```

V1.5 私有美术资产升级循环已并入统一 loop，历史状态保留在：

```text
docs/westeros-interactive-map/loop-v1-5-art-remix/
```

V1.5 允许将原剧剧照、官方视觉和网络图像作为本地私有创作参考，但原始参考素材必须放入 git 忽略目录，并在 `PRIVATE_REFERENCE_REGISTER.md` 中登记。任何 public-ready 上线前必须清理或替换高风险衍生资产。
