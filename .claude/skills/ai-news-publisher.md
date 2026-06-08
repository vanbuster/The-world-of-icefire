---
name: ai-news
description: 搜索X平台24h AI热点，自动撰写公众号文章，AI配图，发布到草稿箱
args:
  - name: topic
    description: AI热点主题关键词（可选，留空自动搜索24小时热门话题）
---

# AI 热点公众号自动发布

将 X 平台 24 小时内的 AI 热点 → 公众号文章 → AI配图 → 草稿箱。

项目目录: `/Users/van/Desktop/公众号自动发布`

---

## 前置检查

执行以下命令确认环境就绪：

```bash
cd /Users/van/Desktop/公众号自动发布 && pip3 install -q requests python-dotenv markdown-it-py
```

---

## Step 1: 搜索 X 平台热点

### 1.1 构建搜索查询

如果用户提供了 topic 参数，用它作为核心关键词。
如果没有提供，使用以下关键词轮换搜索：`"AI breakthrough"`, `"new AI model release"`, `"AI open source"`, `"LLM update"`

### 1.2 执行搜索

使用 **mcp__exa__web_search_exa** 工具（优先）或 **mcp__tavily__tavily_search** 工具：

**Exa 搜索示例：**
```
query: "AI相关TOPIC site:x.com"
numResults: 10
```

**Tavily 搜索示例：**
```
query: "AI相关TOPIC"
include_domains: ["x.com", "twitter.com"]
time_range: "day"
search_depth: "advanced"
max_results: 10
```

可以并行发起 2-3 个不同关键词的搜索，覆盖面更广。

### 1.3 整理素材

从搜索结果中筛选 3-5 条最有价值的热点，每条包含：
- 核心内容摘要
- 作者/来源账号
- 发布时间
- 原文链接
- 为什么值得写（一句话判断）

### 1.4 展示给用户

用清晰格式展示筛选出的热点，并询问用户：
> 以上是最近 24 小时 X 平台上的 AI 热点，你想写哪个主题？或者给我一个具体的方向。

等待用户确认后再进入 Step 2。

---

## Step 2: 撰写文章

### 2.1 写作要求

你是一位专业的 AI 科技自媒体编辑，为公众号「万不斯特」撰写文章。

- **读者**：对 AI 感兴趣的科技从业者和爱好者
- **字数**：1500 - 2500 字
- **风格**：通俗但不失专业，有独立观点，不是简单翻译
- **结构**：标题 → 引子 → 背景 → 核心内容 → 分析解读 → 总结
- **必含**："这意味着什么"分析段落
- **结尾**：附信息来源链接

### 2.2 图片占位符规则

在文章中必须插入图片占位符：

```
![封面：简洁的科技感封面图，主题相关](image:cover)
```

这张放在文章最前面（h1标题之后）。

文中再插入 1-2 张插图：
```
![具体场景描述](image:1)
![具体场景描述](image:2)
```

**注意**：
- `image:cover` 必须有
- 插图放在段落之间，用来分隔长文
- 描述要具体，方便后续生成配图

### 2.3 文章结构模板

```markdown
# [吸引眼球的标题]

![封面：描述](image:cover)

[2-3句引子，制造悬念或直接抛出最吸引人的信息]

## 事件背景

[发生了什么，谁发布的，什么时候]

## 核心内容

[详细展开，用自己的语言重新组织]

![相关配图描述](image:1)

## 这意味着什么

[独立分析：对行业、对开发者、对普通用户分别意味着什么]

## 总结

[简短有力的收尾]

---
> 信息来源：
> - [来源1标题](链接)
> - [来源2标题](链接)
```

### 2.4 保存文章

将完整的 Markdown 文章保存到 `output/article.md`。

使用 Write 工具写入，路径为：`/Users/van/Desktop/公众号自动发布/output/article.md`

然后向用户展示文章概要（标题 + 字数 + 图片数量），确认继续：
> 文章已生成，接下来将生成配图并发布到草稿箱，是否继续？

---

## Step 3: 生成配图

### 3.1 解析图片标记

从 `output/article.md` 中提取所有 `![描述](image:N)` 标记。
读取文件并用正则匹配。

### 3.2 为每张图生成

对每张图片，将中文描述翻译为详细的英文 prompt，然后调用脚本生成：

**封面图（image:cover）**：
```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/image_gen.py \
  --prompt "ENGLISH_PROMPT, digital art, tech style, vibrant colors, professional" \
  --size "1:1" \
  --output output/img_cover.png
```

**文中插图（image:1, image:2, ...）**：
```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/image_gen.py \
  --prompt "ENGLISH_PROMPT, illustration, clean modern style" \
  --size "16:9" \
  --output output/img_1.png
```

**重要**：
- 每张图生成需要 30-60 秒，请耐心等待
- 如果某张图生成失败，跳过继续下一张，记录失败的图片ID
- 可以串行执行（API限制），不要并行

### 3.3 汇报结果

告诉用户每张图的生成状态（成功/失败）。

---

## Step 4: 上传图片到微信

### 4.1 上传封面图（永久素材）

```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/wechat.py upload-image \
  --filepath output/img_cover.png
```

记录返回的 `media_id` → 这就是 `thumb_media_id`。

### 4.2 上传文中插图（内容图片）

对每张文中插图（image:1, image:2, ...）：

```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/wechat.py upload-content-img \
  --filepath output/img_1.png
```

记录返回的 `url` → 这是微信内部URL，用于HTML中的 `<img src>`。

### 4.3 错误处理

- 如果遇到 `invalid ip ... not in whitelist` 错误：
  提示用户去 [微信公众平台](https://mp.weixin.qq.com) → 设置与开发 → 基本配置 → IP白名单，添加错误信息中的IP地址。
- 如果遇到 token 错误：脚本会自动刷新 token，重试一次。

---

## Step 5: 转换 HTML 并发布到草稿箱

### 5.1 构建 image map

根据 Step 4 的结果，构建 JSON 映射：
```json
{"cover": "https://mmbiz.qpic.cn/...", "1": "https://mmbiz.qpic.cn/...", "2": "https://mmbiz.qpic.cn/..."}
```

注意：封面图的 URL 也要包含（如果上传内容图有返回URL的话用那个，否则用永久素材的URL）。

### 5.2 转换 Markdown → HTML

```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/md2wechat.py \
  --input output/article.md \
  --output output/article.html \
  --images '{"cover":"WECHAT_URL","1":"WECHAT_URL"}'
```

注意 `--images` 参数需要用单引号包裹 JSON 字符串，避免 shell 解析问题。如果 URL 中有特殊字符，需要正确转义。

### 5.3 创建草稿

从 article.md 中提取：
- **title**: 第一个 h1 标题的内容
- **digest**: 文章前 54 个字（微信摘要限制）

```bash
cd /Users/van/Desktop/公众号自动发布 && python3 helpers/wechat.py create-draft \
  --title "文章标题" \
  --content-file output/article.html \
  --thumb-media-id "THUMB_MEDIA_ID" \
  --author "万不斯特" \
  --digest "文章摘要前54字"
```

---

## Step 6: 返回结果

向用户展示最终结果：

```
✅ 文章已发布到草稿箱！

📝 标题：xxx
👤 作者：万不斯特
📊 字数：xxx
🖼️ 配图：x 张

🔗 请到微信公众号后台检查：
   https://mp.weixin.qq.com

⚠️  请仔细检查内容、排版和图片后再发布！
```

---

## 异常处理

| 场景 | 处理方式 |
|------|----------|
| 搜索无结果 | 换关键词重试，或提示用户指定主题 |
| 图片生成超时 | 跳过该图，用文字替代 |
| 微信IP白名单错误 | 提示用户添加IP到白名单 |
| Token过期 | 脚本自动刷新，无需处理 |
| 草稿创建失败 | 展示错误信息，建议用户检查 |

---

## 注意事项

- 每个步骤完成后都要向用户简短汇报进度
- 涉及用户决策的步骤（选题确认、文章确认）必须等待用户回复
- 所有文件操作都在 `/Users/van/Desktop/公众号自动发布/output/` 目录下
- 图片生成使用 API Mart 的 `gemini-2.5-flash-image-preview` 模型
