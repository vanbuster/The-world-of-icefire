# 《维斯特洛互动世界地图》部署与运行说明

> 阶段：部署准备文档
> 状态：已生成，应用初始化后需要用实际命令结果持续更新
> 创建日期：2026-06-18

## 1. 文档目标

本文说明《维斯特洛互动世界地图》的本地启动、环境变量、CMS 后台、seed 数据、测试、部署准备和版权注意事项。

当前项目目标是完成可随时部署上线的准备；除非用户明确授权，不在无人值守状态下实际发布公网、写入真实密钥或创建外部付费资源。

## 2. 预期应用目录

默认应用目录：

```text
apps/westeros-map/
```

如果后续采用已有目录，应同步更新本文和 `docs/westeros-interactive-map/loop/OPERATOR_STATUS.md`。

## 3. 本地开发准备

### 3.1 依赖

推荐环境：

- Node.js 20+
- npm / pnpm / yarn，优先使用项目实际 lockfile 对应工具
- PostgreSQL 15+
- Chromium 浏览器，用于 Playwright / 手动验证

### 3.2 安装依赖

应用初始化后，在应用目录执行：

```bash
cd apps/westeros-map
npm install
```

如果项目使用 pnpm，则改为：

```bash
pnpm install
```

## 4. 环境变量

必须提供 `.env.example`，不得提交真实 `.env`。

推荐字段：

```text
DATABASE_URI=postgres://user:password@localhost:5432/westeros_map
PAYLOAD_SECRET=replace-me-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MEDIA_STORAGE_MODE=local
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

说明：

- `DATABASE_URI`：Payload CMS 使用的 PostgreSQL 连接。
- `PAYLOAD_SECRET`：Payload 加密和 session 使用的密钥，本地开发可生成长随机字符串。
- `NEXT_PUBLIC_SITE_URL`：前台站点地址。
- `MEDIA_STORAGE_MODE`：MVP 使用 `local`。
- S3 / R2 字段后续扩展使用，MVP 可留空。

## 5. 本地启动

应用初始化后：

```bash
cd apps/westeros-map
npm run dev
```

预期：

- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin

如果端口被占用，应使用 Next.js 自动分配端口或在命令中指定端口，并更新 README。

## 6. CMS 后台

MVP 后台目标：

- 单管理员登录
- Locations 管理
- Assets / Media 管理
- 发布状态
- 素材来源记录
- 基础预览

首次启动后，应通过 Payload 的初始化流程创建管理员账号，或通过 seed 脚本创建本地管理员。

不要把管理员真实密码写入文档或提交到仓库。

## 7. Seed 数据

推荐命令：

```bash
cd apps/westeros-map
npm run seed
```

Seed 应创建：

- 10 个地点节点
- 临冬城完整地点内容
- 7 个临冬城事件
- 核心人物
- 核心家族
- 素材 placeholder / 生成资产记录

Seed 要求：

- 尽量幂等。
- 私生子之战标记为 `show` 或 `show-canon`。
- 所有事件有 `sourceType`。
- 素材记录包含来源字段。

## 8. 测试命令

推荐命令：

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

验收要求：

- lint 通过
- typecheck 通过
- unit / component tests 通过
- Playwright 关键路径通过
- production build 通过

如果命令名称不同，应用 README 必须给出实际命令。

## 9. 浏览器验证

每次前端重大改动后：

1. 启动 dev server。
2. 打开前台首页。
3. 确认地图可见。
4. 确认至少 10 个节点可见。
5. hover 临冬城，确认 tooltip。
6. 点击临冬城，确认右侧详情面板。
7. 检查 7 个事件和 sourceType 标签。
8. 检查低动效模式或系统 reduced motion 不破坏页面。

## 10. 部署候选方案

### 10.1 Vercel + 托管 PostgreSQL

适合：

- Next.js 前台部署
- 快速公开分享

需要：

- Vercel project
- Neon / Supabase / Railway PostgreSQL
- 配置环境变量
- 媒体存储策略，MVP 可本地但生产建议 R2 / S3

### 10.2 Railway / Render 一体化部署

适合：

- 前台 + Payload + PostgreSQL 更集中管理
- 对长运行服务更友好

需要：

- Web service
- PostgreSQL service
- 环境变量
- 持久化媒体存储或对象存储

### 10.3 媒体存储升级

MVP 本地媒体适合开发，但公开部署建议：

- Cloudflare R2
- AWS S3
- Supabase Storage

上线前必须确认媒体 URL、权限和缓存策略。

## 11. 部署前检查清单

- [ ] `npm run build` 通过。
- [ ] `npm run test:e2e` 关键路径通过。
- [ ] `.env.example` 完整。
- [ ] 生产环境变量已配置，且未提交真实密钥。
- [ ] 数据库连接正常。
- [ ] 管理员账号创建方式明确。
- [ ] Seed 数据可运行或生产数据已导入。
- [ ] 媒体素材可访问。
- [ ] 核心素材已记录到 `ASSET_MANIFEST.md`。
- [ ] 参考来源已记录到 `SOURCE_REGISTER.md`。
- [ ] 未使用未经授权官方图作为核心公开素材。
- [ ] README 包含运行、测试、后台、seed 和版权说明。

## 12. 版权与素材说明

项目是个人二创作品，非商业运营，但公开网站仍应保留版权边界。

规则：

- 不直接搬运官方地图原图。
- 不直接使用官方剧照、演员照片或商业游戏素材作为核心公开素材。
- 不复制大段原著或剧集台词。
- 剧情内容使用原创摘要。
- 视觉素材优先原创、AI 生成、程序化绘制或参考后重绘。
- 每个素材保留来源记录。
- AI 生成素材标记 `isAIGenerated`。
- 二次创作标记 `isDerivative`。

## 13. 生产风险

| 风险 | 说明 | 缓解 |
|---|---|---|
| 本地媒体生产不可持久 | 部署平台可能清空本地文件 | 使用 R2 / S3 / Supabase Storage |
| 数据库迁移缺失 | CMS schema 变动影响数据 | 部署前固定 schema 与 seed |
| 版权素材风险 | 官方素材直接公开使用 | 使用原创 / 生成 / 重绘并记录来源 |
| 动效性能差 | 低端桌面卡顿 | 低动效模式、关闭天气层 |
| 管理员凭据泄露 | 后台风险 | 不提交真实密钥，使用强密码 |

## 14. 后续维护

每次部署或重大变更后更新：

- `docs/westeros-interactive-map/DEPLOYMENT.md`
- `docs/westeros-interactive-map/ASSET_MANIFEST.md`
- `docs/westeros-interactive-map/SOURCE_REGISTER.md`
- `docs/westeros-interactive-map/loop/PROGRESS.md`

