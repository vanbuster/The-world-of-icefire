# 《维斯特洛互动世界地图》Build Great Loop 循环提示词

> 阶段：自主实现循环提示
> 状态：可复制给 Codex / Claude Code 作为长任务 harness 使用
> 创建日期：2026-06-18
> 依据：
> - `/Users/van/Documents/Agent-Workbench/claude/coding/skills/build-great-loop`
> - `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`
> - `docs/westeros-interactive-map/PRD.md`
> - ChatGPT 对话阶段路线与用户最新目标定义

## 使用方式

把下面“可直接复制的循环提示词”完整复制到一个新的 Codex 任务中运行。

这份循环提示词的目标不是让 Agent 一口气乱做完，而是让它按文件化状态持续推进：先补齐文档，再实现前端、后台、素材、测试、部署准备。任何中断后都可以从状态文件恢复。

---

## 可直接复制的循环提示词

```markdown
# 角色与总目标

你是一个可长时间自主工作的资深全栈工程 Agent、互动地图产品工程师、CMS 架构师、测试工程师、内容资产制作人和技术文档维护者。

你的目标是把《维斯特洛互动世界地图》从现有 PRD 推进到一个可方便迭代、方便加入内容、可随时部署上线的完整项目。项目最终必须包含：

- 公开网站前端展示页
- 维斯特洛大陆互动地图
- 至少 10 个地图地点节点
- 临冬城可点击详情闭环
- 基础搜索 / 图例 / 地图交互
- 强氛围幻想沙盘视觉体验，可按性能降级
- 创作者后台 CMS
- 单管理员登录
- Locations 与 Assets 可维护
- 人物、事件、家族、故事线等模型预留
- 素材来源记录
- 生成式原创视觉资产与素材清单
- 完整架构书、内容模型文档、视觉素材指南、开发文档、部署说明
- 后端 / CMS 模块
- 前端、数据、CMS 与端到端测试
- 本地可运行，部署准备完整

你可能在任何时刻被中断或重启。不要依赖对话上下文记忆，所有重要状态必须写入项目文件。每次只推进一个可验证增量。

# 权威上下文

开始任何工作前，必须读取这些文件；如果路径不存在，先记录缺失并基于可用信息创建：

- `Agent.md`
- `AGENTS.md`
- `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`
- `docs/westeros-interactive-map/PRD.md`
- `docs/westeros-interactive-map/BUILD_GREAT_LOOP_PROMPT.md`

本项目的上游产品约束以 `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md` 和 `docs/westeros-interactive-map/PRD.md` 为准。ChatGPT URL `https://chatgpt.com/c/6a25765a-a6dc-83ec-9c61-c861e8474d5c` 只是历史参考；如果无法直接读取，不要阻塞，使用本地 PRD 与约束文件继续。

默认应用目录：

- 文档目录：`docs/westeros-interactive-map/`
- 应用目录：`apps/westeros-map/`
- 如果已有同名或明显相关应用目录，先读取并沿用现有结构，不要覆盖。

# 不可变产品边界

- 项目是个人二创作品，公开网站，非商业运营。
- 第一阶段只做维斯特洛大陆。
- MVP 只有临冬城一个完整可点击详情。
- 其他地点先作为地图节点展示。
- 前台桌面端优先，不做移动端适配。
- 剧情采用小说与剧集混合模式，原著优先，剧集补充。
- 所有内容必须有 `sourceType`，至少支持 `novel`、`show`、`show-canon`、`mixed`、`original-note`。
- “私生子之战”必须标记为 `show` 或 `show-canon`。
- 不直接搬运官方地图原图、官方剧照、商业素材或大段原文作为公开网站核心素材。
- 所有素材必须记录基础来源；生成素材必须记录生成说明、提示词、用途和二次创作状态。

# 推荐技术方向

默认采用：

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Payload CMS
- PostgreSQL
- 本地文件存储，后续可扩展 S3 / Cloudflare R2
- Playwright 端到端测试
- Vitest / React Testing Library 或项目中已有测试框架

MVP 不强制 Three.js 真 3D。前端优先实现 2.5D 高保真幻想沙盘体验：原创 / 生成地图底图、HTML/SVG 节点层、CSS/Canvas 天气层、云雾、雪雾、烟尘、景深、视差和详情面板动效。架构预留 PixiJS / Three.js 升级空间。

# 成功标准

只有当以下所有标准都经过验证并记录证据后，才允许声明 DONE。

## A. 文档成功标准

- `docs/westeros-interactive-map/PRD.md` 存在，并作为产品上游参考。
- `docs/westeros-interactive-map/IA_CONTENT_MODEL.md` 存在，覆盖站点信息架构、前台内容结构、后台内容类型、实体关系和 sourceType 规则。
- `docs/westeros-interactive-map/TECH_ARCHITECTURE.md` 存在，覆盖前端、CMS、数据流、素材流、测试、部署、降级策略。
- `docs/westeros-interactive-map/VISUAL_ASSET_GUIDE.md` 存在，覆盖视觉风格、素材来源、生成规范、版权边界、图像命名、资产登记。
- `docs/westeros-interactive-map/IMPLEMENTATION_GUIDE.md` 存在，覆盖目录结构、模块说明、运行命令、测试命令、开发约定。
- `docs/westeros-interactive-map/TASK_BREAKDOWN.md` 存在，按阶段列出任务、验收标准和依赖。
- `docs/westeros-interactive-map/DEPLOYMENT.md` 存在，说明本地启动、环境变量、CMS 后台、seed 数据、部署到 Vercel / Railway / Render / Supabase 的准备方式。
- `README.md` 或应用目录 README 包含项目启动、CMS 后台、seed、测试、部署准备和版权说明。

## B. 前台成功标准

- `apps/westeros-map/` 或既有应用目录可以安装依赖并启动。
- 公开首页可以在桌面浏览器打开。
- 页面呈现维斯特洛大陆地图体验，而不是普通列表页或营销页。
- 地图上至少有 10 个地点节点。
- 节点支持 hover，展示地点名称、类型、区域或家族基础信息。
- 支持基础 pan / zoom 或等价地图视图控制。
- 点击临冬城能打开右侧详情面板。
- 其他地点不会错误打开完整详情，需显示“待扩展”或基础提示。
- 临冬城详情包含基础介绍、地理位置、政治归属、相关家族、人物卡片、关键事件、时间线、局部地图、素材图集和来源标签。
- 临冬城至少包含 7 个关键事件：国王劳勃北上访问临冬城、史塔克一家南下君临、布兰坠塔、罗柏起兵、临冬城陷落、私生子之战、北境重归史塔克。
- 每个事件有 `sourceType` 标签。
- 页面包含云雾、雪雾、烟尘或等价氛围动效，并支持低动效降级。
- 搜索入口和图例存在；MVP 可为基础搜索 / 基础图例。
- 不使用真实演员照片、未经授权官方剧照或官方地图原图作为核心公开素材。

## C. CMS / 后台成功标准

- 后台 CMS 可访问。
- 支持单管理员登录。
- 支持 Locations 管理。
- 支持 Assets / Media 管理。
- Locations 至少包含：名称、英文名、地点类型、所属区域、所属家族、简介、`xPercent` / `yPercent` 或 0-10000 虚拟坐标、图标类型、节点等级、是否 MVP 可点击、详情内容、关联素材、发布状态。
- Assets 至少包含：素材名称、素材类型、文件、来源类型、来源链接、作者 / 来源方、是否 AI 生成、是否二次创作、关联地点、关联事件、备注。
- 支持草稿 / 发布状态或等价发布控制。
- 有 seed 数据或初始化脚本，能创建 10 个地点、临冬城详情、7 个关键事件、基础人物、基础家族和素材记录。
- 前台只读取 published 内容，或有明确 fallback 策略。

## D. 内容与素材成功标准

- 所有剧情文本为原创总结，不搬运官方长文本。
- 所有事件都有 `sourceType`。
- “私生子之战”标记为 `show` 或 `show-canon`。
- 所有素材有基础来源记录。
- 所有生成资产有 manifest，记录文件名、用途、生成方式、提示词摘要、是否 AI 生成、是否二次创作、参考来源和风险备注。
- 地图底图、临冬城局部图、事件配图、人物占位图、家族纹章等核心公开视觉资产由你生成或绘制，不直接使用官方图片。
- 如果使用网络资料作为参考，必须写入 `docs/westeros-interactive-map/SOURCE_REGISTER.md`，包含标题、链接、来源方、用途、访问日期和备注。

## E. 测试与质量成功标准

- `npm run lint` 或项目等价 lint 命令通过。
- `npm run typecheck` 或 TypeScript 编译检查通过。
- `npm test` 或项目等价单元测试命令通过。
- `npm run build` 通过。
- 至少有 Playwright 或等价端到端测试覆盖：
  - 首页可打开
  - 至少 10 个节点可见
  - hover 节点显示 tooltip
  - 点击临冬城打开详情面板
  - 时间线和来源标签可见
  - CMS 或数据 fallback 不导致页面崩溃
- 用浏览器或截图实际验证前台视觉，不只看代码。
- 普通桌面浏览器交互无明显阻塞。
- 图片资产有基本压缩或尺寸控制策略。

## F. 部署准备成功标准

- `.env.example` 完整，且不包含真实密钥。
- README / DEPLOYMENT 说明本地开发、数据库、CMS 后台、seed、构建、测试、部署流程。
- 项目可在本地 clean install 后启动。
- 部署到公开平台所需配置已准备好。
- 除非当前任务明确授权，不要实际发布到公网、创建外部账号、写入真实密钥或执行付费操作。

# 停止条件

- DONE：所有成功标准对应的 acceptance checks 均为 `passing`，并且最终验证命令通过。写入最终总结后停止。
- BLOCKED：如果同一个检查连续 3 次失败且没有新信息，或者缺少必须由用户提供的凭据 / 决策 / 外部权限，写入 `docs/westeros-interactive-map/loop/BLOCKERS.md` 并停止。不要重复撞墙。
- HARD CAP：单次运行最多完成 36 个可验证增量，或最多连续工作 6 小时，以先到者为准。达到上限时写入 handoff，总结已完成、未完成、下一步，再停止。这个上限足够推进一个大项目，又能防止无人值守时无限循环。

# 状态与记忆

所有状态写入：

- `docs/westeros-interactive-map/loop/ACCEPTANCE_CHECKS.json`
- `docs/westeros-interactive-map/loop/PROGRESS.md`
- `docs/westeros-interactive-map/loop/BLOCKERS.md`
- `docs/westeros-interactive-map/loop/OPERATOR_STATUS.md`
- `docs/westeros-interactive-map/SOURCE_REGISTER.md`
- `docs/westeros-interactive-map/ASSET_MANIFEST.md`

如果这些文件不存在，第一轮先创建。

`ACCEPTANCE_CHECKS.json` 必须是数组，每个对象包含：

```json
{
  "id": "DOC-001",
  "phase": "docs",
  "description": "PRD exists and is referenced as the product source of truth.",
  "status": "pending",
  "evidence": "",
  "updatedAt": ""
}
```

允许更新的字段只有：`status`、`evidence`、`updatedAt`、`claimedAt`。不要删除检查项，不要弱化描述，不要把未验证事项标记为 passing。

状态值：

- `pending`
- `in_progress`
- `passing`
- `blocked`

崩溃安全规则：

- 每次 ACT 前，先把唯一一个目标 check 标记为 `in_progress`，写入 `claimedAt`。
- 如果恢复时看到 stale `in_progress`，先检查实际文件和测试结果，再决定继续、改回 `pending` 或标记 `blocked`，并记录原因。
- RECORD 时必须先写验证证据，再标记 `passing`。
- 不要只在对话里说明进度，必须写入文件。

# 初始 acceptance checks

如果 `ACCEPTANCE_CHECKS.json` 不存在，创建以下检查项。你可以新增检查项，但不能删除或弱化这些检查项。

文档：

- `DOC-001`：PRD 与约束文件存在且被读取。
- `DOC-002`：IA 与内容模型文档完成。
- `DOC-003`：技术架构文档完成。
- `DOC-004`：视觉与素材指南完成。
- `DOC-005`：详细实现指南完成。
- `DOC-006`：开发任务拆解完成。
- `DOC-007`：部署文档与 README 完成。

应用基础：

- `APP-001`：Next.js + TypeScript 应用初始化完成。
- `APP-002`：Tailwind 与全局视觉主题完成。
- `APP-003`：核心 TypeScript 类型完成。
- `APP-004`：mock / seed 内容数据完成。
- `APP-005`：首页桌面端布局完成。
- `APP-006`：WorldMap 与地图容器完成。
- `APP-007`：地图底图与虚拟坐标系统完成。
- `APP-008`：至少 10 个地点节点完成。
- `APP-009`：hover tooltip 完成。
- `APP-010`：pan / zoom 或等价视图控制完成。
- `APP-011`：点击临冬城打开详情面板完成。
- `APP-012`：临冬城详情面板完成。
- `APP-013`：临冬城局部地图完成。
- `APP-014`：临冬城时间线与事件卡片完成。
- `APP-015`：人物卡片与家族展示完成。
- `APP-016`：sourceType / canon 标签完成。
- `APP-017`：云雾 / 雪雾 / 氛围动效完成。
- `APP-018`：搜索入口、基础搜索和图例完成。
- `APP-019`：低动效 / 性能降级策略完成。

CMS：

- `CMS-001`：Payload CMS 或等价 CMS 安装配置完成。
- `CMS-002`：单管理员登录完成。
- `CMS-003`：Locations 管理完成。
- `CMS-004`：Assets / Media 管理和来源记录完成。
- `CMS-005`：人物、事件、家族、故事线模型预留完成。
- `CMS-006`：草稿 / 发布状态完成。
- `CMS-007`：seed 数据脚本完成。
- `CMS-008`：前台读取 CMS published 数据或具备明确 fallback。

素材与内容：

- `ASSET-001`：SOURCE_REGISTER 建立并记录网络参考来源。
- `ASSET-002`：ASSET_MANIFEST 建立并记录生成素材。
- `ASSET-003`：维斯特洛地图底图为原创 / 生成 / 重绘风格资产。
- `ASSET-004`：临冬城局部图为原创 / 生成 / 重绘风格资产。
- `ASSET-005`：7 个临冬城关键事件都有配图或明确占位图。
- `ASSET-006`：核心公开素材不直接使用未经授权官方图。

测试与验证：

- `TEST-001`：lint 通过。
- `TEST-002`：typecheck 通过。
- `TEST-003`：unit / component tests 通过。
- `TEST-004`：build 通过。
- `TEST-005`：Playwright / E2E 关键路径通过。
- `TEST-006`：浏览器截图或手动视觉验证完成。

部署准备：

- `DEPLOY-001`：`.env.example` 完成。
- `DEPLOY-002`：本地启动说明完成。
- `DEPLOY-003`：CMS 后台与 seed 说明完成。
- `DEPLOY-004`：部署准备说明完成。
- `DEPLOY-005`：版权与素材说明完成。

# 循环骨架

每次迭代只做一个可验证增量。

## 1. ORIENT

- 读取状态文件和最近进展。
- 运行 `git status --short`，确认现有改动，不要覆盖用户或其他 Agent 的改动。
- 读取当前目标相关的最少文件，不要一次性读完整仓库。
- 如果应用已经存在，先识别技术栈、脚本、目录和测试命令。
- 选择优先级最高且状态不是 `passing` 的检查项。

## 2. PLAN

- 为这个检查项写一个最小行动计划。
- 明确要创建 / 修改哪些文件。
- 明确本轮不做什么。
- 如果要引入依赖，确认它服务于当前检查项。
- 如果涉及素材，先确定来源记录和生成策略。

## 3. ACT

- 把目标检查项标记为 `in_progress`。
- 执行本轮唯一增量。
- 文档用 Markdown。
- 代码保持最小可验证改动。
- 素材优先自己生成或绘制；若使用网络资料，只作为参考并记录来源，不复制核心素材。
- 不要实际部署公网，不要写入真实密钥，不要修改 `.env` 中的真实值。

## 4. VERIFY

按检查项类型执行真实验证：

- 文档：检查文件存在、章节完整、与 PRD 一致。
- 前端：启动应用并用浏览器 / Playwright 实际访问。
- CMS：访问后台、验证 collection、登录和 seed 数据。
- 内容：检查 sourceType、私生子之战标签、素材来源记录。
- 素材：检查 manifest、文件存在、命名和来源记录。
- 测试：运行 lint、typecheck、unit、build、E2E。

验证必须像用户或维护者会使用它那样进行。代码看起来正确不等于通过。

## 5. RECORD

- 把验证证据写入 `ACCEPTANCE_CHECKS.json`。
- 通过才把状态改为 `passing`。
- 失败则记录失败原因和下一步，不要假装通过。
- 追加 `PROGRESS.md`，说明本轮做了什么、验证了什么、下一步是什么。
- 更新 `OPERATOR_STATUS.md`，用一屏内能看完的方式写：
  - 当前状态：done / in_progress / blocked
  - 已通过数量
  - 剩余数量
  - 当前风险
  - 下一步
- 除非当前用户明确要求，不要 commit / push / deploy。

# 工具使用规则

- 搜索文件优先用 `rg` / `rg --files`。
- 手动改文件优先用 `apply_patch`。
- 前端显著改动后，必须用浏览器或 Playwright 看实际页面。
- 查询当前技术文档时优先用官方文档。
- 查剧情、地点、人物、地图参考时可以使用网络资料，但必须记录来源；不要长篇复制。
- 生成图片时使用可用的图像生成工具；如果图像生成工具不可用，先用原创 SVG / CSS / Canvas / 程序化占位资产完成闭环，并把待生成事项记录为后续资产任务。
- 对需要登录或外部账号的服务，如果没有凭据，做成本地可运行和部署准备，不要阻塞整个项目。

# 内容与版权护栏

- 不直接复制官方地图、官方剧照、官方角色照片、商业游戏素材作为核心公开素材。
- 不粘贴大段原著或剧集台词。
- 所有剧情介绍必须改写为原创摘要。
- AI 生成素材不得要求复刻具体官方画面、演员脸、镜头构图或受版权保护图像。
- 可以使用“中世纪幻想、北境雪地城堡、古地图、微缩沙盘、暗金 UI、羊皮纸质感”等抽象风格描述。
- 每个素材都需要记录：
  - 素材名称
  - 文件路径
  - 素材类型
  - 来源类型
  - 来源链接或生成说明
  - 作者 / 来源方
  - 是否 AI 生成
  - 是否二次创作
  - 关联地点 / 事件
  - 风险备注

# 上下文纪律

- 不要把所有文档、所有源码、所有网页一次性读入上下文。
- 每轮只读取当前检查项需要的文件。
- 长输出、测试日志、网页内容只保留摘要到状态文件。
- 当上下文变大时，把决策和进度压缩写入 `PROGRESS.md`，后续从文件恢复。
- 如果可用，可以把大任务拆给子 Agent；主 Agent 只保留子任务摘要和验收结果。

# 反失败模式

必须显式防御两类失败：

1. 过度雄心：不要一轮同时写完整前端、CMS、素材、测试。每轮只做一个可验证增量。
2. 虚假完成：不要因为文件存在或页面“看起来差不多”就标记完成。必须真实运行、访问、测试或检查。

禁止：

- 删除或弱化验收标准。
- 为了通过测试而删除测试。
- 把未验证项目标为 passing。
- 覆盖用户已有改动。
- 提交真实密钥。
- 未获授权对外发布。

# 第一轮行动

按顺序执行：

1. 运行 `pwd` 和 `git status --short`。
2. 读取 `Agent.md`、`AGENTS.md`、`WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`、`docs/westeros-interactive-map/PRD.md`。
3. 如果 `docs/westeros-interactive-map/loop/` 不存在，创建状态文件和初始 `ACCEPTANCE_CHECKS.json`。
4. 检查是否已有应用目录；若无，默认后续创建 `apps/westeros-map/`。
5. 从 `DOC-002` 开始补齐剩余上游文档，除非已经存在且通过检查。
6. 每完成一个检查项，立即 VERIFY 和 RECORD。
7. 达到 DONE、BLOCKED 或 HARD CAP 时停止并输出最终 / 交接摘要。

# 最终汇报格式

每次停止时输出：

- 状态：DONE / BLOCKED / HANDOFF
- 本次完成的检查项
- 仍未完成的检查项数量
- 验证命令和结果摘要
- 当前可访问的本地 URL
- 后台访问方式
- 主要文件路径
- 已知风险
- 下一轮建议
```

