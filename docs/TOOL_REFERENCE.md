# Agent 工具集成参考

> 本文档供所有 Agent（Claude / Hermes / Codex）快速查阅可用工具的接入方式和使用方法。

## 1. CodeGraph — 代码语义图谱

**状态**：✅ 已接入（MCP Server）
**位置**：`hermes/CodeGraph/`
**MCP 配置**：`.mcp.json`（项目根目录）

### 核心工具（68 个，常用 10 个）

| 工具 | 用途 | 典型场景 |
|------|------|----------|
| `codegraph_get_ai_context` | 意图感知的代码上下文 | 修改/调试/解释代码前获取完整上下文 |
| `codegraph_get_edit_context` | 编辑前的完整准备信息 | 改代码前查看 callers/tests/git history |
| `codegraph_analyze_impact` | 变更影响分析 | 修改前评估影响范围 |
| `codegraph_symbol_search` | 符号搜索（BM25+语义） | 找函数/类/变量 |
| `codegraph_get_callers` | 查调用者 | 谁调了这个函数 |
| `codegraph_get_callees` | 查被调用者 | 这个函数调了谁 |
| `codegraph_find_related_tests` | 找测试 | 改完代码找对应测试 |
| `codegraph_memory_store` | 持久化记忆 | 跨会话保存洞察 |
| `codegraph_search_by_pattern` | 正则搜索 | 按模式搜索函数体 |
| `codegraph_get_module_summary` | 模块概览 | 快速了解目录结构 |

### Agent 工作流

```
理解代码：symbol_search → get_ai_context(intent=explain)
修改代码：get_edit_context → analyze_impact → 修改 → find_related_tests → 验证
调试问题：search_by_error → get_callers → get_ai_context(intent=debug)
```

### Profile 配置

可通过 `.mcp.json` 的 `args` 添加 `--profile core|graph|memory|security|all` 控制暴露的工具范围。

---

## 2. Understand-Anything — 代码库知识图谱

**状态**：✅ 已安装（插件）
**位置**：`hermes/coding/Understand-Anything/`
**安装**：`/plugin marketplace add Lum1104/Understand-Anything` → `/plugin install understand-anything@understand-anything`

### 可用命令（8 个）

| 命令 | 用途 |
|------|------|
| `/understand --language zh` | 分析代码库，生成交互式知识图谱 |
| `/understand-dashboard` | 启动 Web 可视化面板 |
| `/understand-chat <问题>` | 用自然语言提问代码库 |
| `/understand-diff` | 分析 git diff 对图谱的影响 |
| `/understand-explain <路径>` | 深入解释特定文件/函数/模块 |
| `/understand-onboard` | 生成项目上手指南 |
| `/understand-domain` | 提取业务领域知识图谱 |
| `/understand-knowledge` | 分析知识库（Karpathy 模式 Wiki） |

### 典型场景

- 接手新项目 → `/understand --language zh` 生成全景图谱
- 代码审查 → `/understand-diff` 看变更影响
- 学习架构 → `/understand-explain src/auth/`
- 知识提取 → `/understand-knowledge` 分析 Obsidian Vault

---

## 3. Presenton — AI 演示文稿生成

**状态**：✅ Docker 已部署，SiliconFlow DeepSeek-V3 作为 LLM
**位置**：`hermes/presenton/`
**API**：`http://localhost:5100/api/v1/`
**MCP**：`http://localhost:5100/mcp`
**认证**：`van` / `van2026presenton`

### 部署信息

- **镜像**：`ghcr.io/presenton/presenton:latest`（amd64，Rosetta 模拟）
- **端口**：5100（5000 被 macOS ControlCenter 占用）
- **Web UI**：http://localhost:5100
- **.env**：已配置 GLM-4-Flash 作为 LLM

### 管理命令

```bash
# 启动
docker start presenton

# 停止
docker stop presenton

# 查看日志
docker logs presenton --tail 50

# 重启
docker restart presenton
```

### Agent 调用方式

**方式一：REST API（curl）**
```bash
# 生成 PPT
curl -u van:van2026presenton \
  -X POST http://localhost:5100/api/v1/ppt/presentation/generate \
  -H "Content-Type: application/json" \
  -d '{"content": "主题", "n_slides": 5, "language": "Chinese", "export_as": "pptx"}'

# 从文件生成
curl -u van:van2026presenton \
  -F "files=@report.pdf" \
  http://localhost:5100/api/v1/ppt/files/upload
# 然后用返回的路径调 generate
```

**方式二：MCP（推荐，Docker 启动后配置）**

在 `.mcp.json` 中添加：
```json
{
  "mcpServers": {
    "presenton": {
      "url": "http://localhost:5100/mcp",
      "headers": {"Authorization": "Basic dnZhhjIwMjZwcmVzZW50b24="}
    }
  }
}
```

### 关键 API

| 端点 | 方法 | 用途 |
|------|------|------|
| `/api/v1/ppt/presentation/generate` | POST | 同步生成 PPT（首次慢，需下 HF 模型） |
| `/api/v1/ppt/presentation/generate/async` | POST | 异步生成 |
| `/api/v1/ppt/files/upload` | POST | 上传文件（PDF/Word→PPT） |
| `/api/v1/ppt/template/all` | GET | 列出模板（general/modern/standard/swift） |
| `/api/v1/ppt/presentation/{id}` | GET | 获取演示文稿 |

---

## 4. claude-plugins-official — 官方插件目录

**状态**：✅ 已 clone + 7 个推荐插件已安装
**位置**：`claude-plugins-official/`
**插件数**：51（36 内部 + 15 外部）

### 已安装插件

| 插件 | 用途 |
|------|------|
| context7 | 拉取最新版本文档到上下文 |
| github | GitHub API（Issue/PR/Review） |
| playground | 快速原型 HTML 可视化 |
| skill-creator | 创建和测试自定义 Skill |
| commit-commands | 简化 git 提交流程 |
| claude-md-management | 维护 CLAUDE.md 质量 |
| explanatory-output-style | 学习模式，解释实现原因 |

### 安装更多插件

```bash
/plugin install {插件名}@claude-plugins-official
# 或浏览插件市场
/plugin → Discover
```

---

## 快速决策表

| 我想做... | 用什么 | 状态 |
|-----------|--------|------|
| 理解陌生代码库 | Understand-Anything `/understand` | ✅ 已安装 |
| 分析代码变更影响 | CodeGraph `analyze_impact` | ✅ 已接入 |
| 找函数调用链 | CodeGraph `get_callers/callees` | ✅ 已接入 |
| 生成演示 PPT | Presenton API/MCP | ✅ 已验证可用 |
| 查最新框架文档 | context7 插件 | ✅ 已安装 |
| 创建可复用工作流 | skill-creator 插件 | ✅ 已安装 |
| GitHub 操作 | github 插件 | ✅ 已安装 |
| 快速 HTML 原型 | playground 插件 | ✅ 已安装 |
