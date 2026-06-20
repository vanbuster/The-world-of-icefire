# 《维斯特洛互动世界地图》视觉与素材指南

> 阶段：4 - 视觉与素材指南
> 状态：已生成，作为后续视觉实现、AI 生成、素材登记和版权边界依据
> 创建日期：2026-06-18
> 上游文档：
> - `WESTEROS_INTERACTIVE_MAP_CONSTRAINTS.md`
> - `docs/westeros-interactive-map/PRD.md`
> - `docs/westeros-interactive-map/IA_CONTENT_MODEL.md`
> - `docs/westeros-interactive-map/TECH_ARCHITECTURE.md`

## 1. 视觉总目标

项目视觉不是普通网页地图，也不是纯剧情百科页面，而是一个桌面端沉浸式幻想地理沙盘。

关键词：

- 高保真
- 中世纪幻想
- 牛皮纸 / 羊皮纸 / 古地图
- 暗金色 UI
- 博物馆级世界观图鉴
- 类 3D 微缩景观
- 北境雪雾
- 云雾天气
- 战争烟尘
- 家族纹章
- 时间线卷轴
- 旧石城堡
- 历史厚重感

MVP 不强制真 3D。第一版应以 2.5D 高保真为目标：用层次、阴影、景深、地形浮雕、微缩节点、天气层和动效营造“幻想沙盘”感。

## 2. 视觉原则

### 2.1 地图是第一主角

首页第一屏必须让用户感到自己进入了一张活着的维斯特洛地图。不要把首页做成营销落地页或普通信息卡片流。

地图应具备：

- 维斯特洛大陆轮廓感
- 区域差异
- 北境寒冷感
- 长城、山脉、河流、森林、道路等地理符号
- 关键地点节点
- 云雾、雪雾和战争烟尘

### 2.2 古地图 + 微缩景观

视觉不应局限于平面羊皮纸线稿。推荐混合：

- 古地图的纸张、墨迹、边缘磨损
- 微缩景观的城堡、山脉、森林、道路凸起感
- 轻微等距 / 俯视角
- 手绘地形符号
- 暗金 UI 装饰

### 2.3 信息必须可读

氛围不能牺牲可读性：

- 节点名称必须清楚。
- 右侧详情面板正文必须易读。
- 时间线标签和 sourceType 标签必须有足够对比度。
- 动效不能遮挡核心内容。

### 2.4 版权边界优先

所有公开核心视觉资产应优先原创、AI 生成、程序化绘制或参考后重绘。不直接使用未经授权的官方地图、剧照、演员照片、商业游戏截图或商业插画。

## 3. 色彩系统

推荐色彩 token：

| Token | 用途 | 建议色感 |
|---|---|---|
| `parchment` | 地图底色、面板底 | 泛黄羊皮纸 |
| `aged-paper` | 旧纸纹理 | 更深褐黄 |
| `ink` | 文字、地图线条 | 深棕黑 |
| `faded-ink` | 次级文字 | 灰褐 |
| `dark-gold` | 主要描边、重点 UI | 暗金 |
| `burnished-gold` | hover / selected | 旧金属光泽 |
| `winter-blue` | 北境冷色调 | 灰蓝 |
| `snow-mist` | 雪雾 | 冷白透明 |
| `war-smoke` | 战争烟尘 | 灰黑褐 |
| `blood-rust` | 战争 / 危险提示 | 暗红锈色 |
| `forest-deep` | 森林 | 深绿褐 |
| `sea-muted` | 海域 | 灰蓝绿 |

避免：

- 大面积鲜亮现代蓝紫渐变
- 纯黑纯白高反差科幻风
- 卡通高饱和色
- 过度单一棕色导致页面糊成一片

## 4. 字体与排版

### 4.1 字体方向

中文正文应优先易读，标题可略带古典感。

建议：

- 标题：serif / 仿宋感 / 带碑刻感的中文字体 fallback
- 正文：系统中文字体，保证清晰
- 英文地名：小型衬线或全大写小字距控制

### 4.2 排版层级

- 地图节点名称：短、小、清晰。
- 详情面板标题：较大，但不抢地图主角。
- 事件标题：卷轴式层级。
- sourceType 标签：小而明确。
- 素材说明：图注式。

不要在面板里使用 hero 级大字，详情面板是图鉴，不是落地页。

## 5. 组件视觉规范

### 5.1 地图底图

风格：

- 羊皮纸纹理
- 手绘海岸线
- 地形浮雕
- 山脉、森林、河流、道路手绘符号
- 旧墨水边界
- 区域轻微色块

MVP 可用原创 SVG / Canvas / 生成位图组合实现。

### 5.2 地点节点

节点类型：

- 城堡：小城堡 / 塔楼符号
- 城市：圆形城墙 / 聚落符号
- 要塞：盾形 / 堡垒符号
- 长城：线性结构
- 港口：锚或海岸符号
- 海域：文字标注

状态：

- 默认
- hover
- selected
- disabled / detail pending
- MVP focus

临冬城节点必须比普通节点更有识别度，但不能夸张到破坏地图比例。

### 5.3 右侧详情面板

风格：

- 羊皮纸底
- 暗金细边框
- 旧书页分隔线
- 可滚动图鉴结构
- 展开 / 收起动画
- 来源标签可见

避免：

- 现代 SaaS 大圆角卡片堆叠
- 过亮玻璃拟态
- 信息过度拥挤

### 5.4 时间线

风格：

- 卷轴 / 古籍目录
- 中轴线或竖向节点
- 每个事件带 sourceType 标签
- 事件配图可以作为小幅插画或横向缩略图

“私生子之战”必须展示剧集线或剧集正典标签。

### 5.5 人物卡片

不得使用真实演员照片。

MVP 推荐：

- 风格化剪影
- 家族色块
- 纹章占位
- 低细节肖像插画
- 旧纸边框

### 5.6 家族纹章

MVP 可用原创简化纹章，不直接复制官方纹章图。

建议：

- 史塔克：狼意象，但重新绘制为原创线条
- 拜拉席恩：鹿角意象，但不复制官方图
- 兰尼斯特：狮子意象，原创简化
- 葛雷乔伊：海怪 / 船锚意象，原创简化
- 波顿：剥皮人意象风险较高，可改为红色 X / 刀痕 / 暗红纹章抽象

## 6. 动效规范

### 6.1 标准动效

- 云雾缓慢漂移
- 北境雪粒子轻微飘落
- 战争烟尘在特定区域轻微扩散
- 节点 hover 微光
- 临冬城 selected 光环
- 地图轻微视差
- 详情面板滑入
- 时间线展开

### 6.2 强动效目标

强动效幻想沙盘可以包括：

- 地图层级景深
- 鼠标移动产生轻微光照变化
- 地点节点像微缩模型一样有阴影
- 雾层在山脉、北境、战场区域差异化
- 事件切换时背景氛围变化

### 6.3 降级策略

必须支持：

- `prefers-reduced-motion`
- UI 中关闭天气 / 动效
- 减少粒子数量
- 关闭 Canvas 天气层
- 使用静态雾纹理替代动态雾
- 保证普通桌面浏览器可运行

## 7. 素材类型清单

MVP 需要的素材类型：

| 类型 | 数量建议 | 用途 | 来源策略 |
|---|---:|---|---|
| 全局地图底图 | 1 | 首页地图 | 原创 / AI 生成 / SVG 绘制 |
| 临冬城局部地图 | 1 | 详情面板 | 原创 / AI 生成 / SVG 绘制 |
| 事件配图 | 7 | 临冬城时间线 | AI 生成 / 原创插画 |
| 人物占位图 | 8-10 | 人物卡片 | 风格化剪影 / 生成 |
| 家族纹章 | 5 | 家族展示 | 原创简化符号 |
| 纸张纹理 | 1-3 | UI 背景 | 程序化 / 生成 |
| 云雾 / 雪 / 烟尘纹理 | 3-5 | 天气层 | 程序化 / 生成 |
| UI 装饰 | 3-5 | 边框、分隔线 | 原创 SVG |

## 8. 图像命名规范

文件命名格式：

```text
主题_用途_YYYY-MM-DD.ext
```

示例：

```text
westeros_global-map_2026-06-18.webp
winterfell_local-map_2026-06-18.webp
winterfell_robert-arrival_2026-06-18.webp
winterfell_bran-fall_2026-06-18.webp
stark_sigil-original_2026-06-18.svg
parchment_texture_2026-06-18.webp
```

规则：

- 使用英文小写和连字符。
- 不使用官方作品名作为伪装来源。
- 不使用演员名、剧照名、官方地图名。
- 每个文件必须进入 `ASSET_MANIFEST.md`。

## 9. 素材目录规范

```text
apps/westeros-map/public/assets/westeros/
├─ maps/
├─ local-maps/
├─ events/
├─ characters/
├─ houses/
├─ textures/
├─ weather/
└─ ui/
```

文档登记：

```text
docs/westeros-interactive-map/ASSET_MANIFEST.md
docs/westeros-interactive-map/SOURCE_REGISTER.md
```

CMS 登记：

- Media / Assets collection 中保留来源字段。
- AI 生成或二次创作必须显式标记。

## 10. AI 生成规范

### 10.1 可用提示词方向

允许使用抽象风格：

```text
medieval fantasy miniature landscape map, parchment texture, hand painted terrain, dark gold ink, snowy northern castle, atmospheric fog, museum archive illustration, original fantasy cartography, no text, no official map, no actors
```

事件图方向：

```text
original medieval fantasy illustration, snowy stone castle courtyard, northern banners, cinematic but not from any existing film frame, parchment-toned, dark gold highlights, no recognizable actors, no official costumes
```

局部地图方向：

```text
original hand-drawn local map of a northern fantasy castle and nearby town, parchment paper, ink lines, miniature terrain, forest, river, roads, no official map copy, no labels
```

### 10.2 禁止提示词方向

不得要求：

- 复制 HBO 画面
- 复制官方地图
- 生成某位演员脸
- 复刻某个剧照镜头
- 复刻商业插画风格到可识别程度
- 生成包含官方 logo 或原始版权图样

### 10.3 生成后处理

生成后必须：

- 压缩为 web 友好尺寸。
- 记录到 `ASSET_MANIFEST.md`。
- 如果有参考来源，记录到 `SOURCE_REGISTER.md`。
- 在 CMS Asset 字段中标记 `isAIGenerated`。
- 必要时增加 `riskLevel`。

## 11. 网络参考来源规范

允许查找：

- 公共百科页面
- 作品 wiki 的地点 / 事件摘要
- 地图地理关系说明
- 公开许可证素材库
- 中世纪地图、古地图、纹理设计参考

使用规则：

- 网络资料只作事实核对、地理关系和视觉参考。
- 不长篇复制。
- 不把未经授权图像作为核心素材。
- 每个参考写入 `SOURCE_REGISTER.md`。

来源登记字段：

- ID
- 标题
- 链接
- 来源方
- 用途
- 访问日期
- 备注

## 12. 版权风险分级

| riskLevel | 含义 | 处理 |
|---|---|---|
| low | 原创、程序化生成、无特定版权参考 | 可公开使用 |
| medium | 参考公开资料后重绘 / AI 二次创作 | 保留来源和备注 |
| high | 接近官方视觉、剧照构图、演员形象或商业素材 | 不用于公开核心素材 |

公开网站核心素材只能使用 low 或审慎处理后的 medium。

## 13. Asset Manifest 记录模板

每个资产至少记录：

```text
ID
文件路径
素材名称
素材类型
来源类型
作者 / 来源方
是否 AI 生成
是否二次创作
关联地点 / 事件
生成说明 / 来源链接
风险备注
```

示例：

```text
AST-001 | apps/westeros-map/public/assets/westeros/maps/westeros_global-map_2026-06-18.webp | 维斯特洛全局地图底图 | map-base | ai-generated + original repaint | Codex generated | yes | yes | global map | medieval fantasy parchment miniature map, no official map copy | medium, generated from abstract style only
```

## 14. Source Register 记录模板

示例：

```text
SRC-001 | Winterfell overview reference | https://... | public wiki | location facts and event order reference | 2026-06-18 | used for factual orientation only, no text copied
```

## 15. MVP 资产交付清单

MVP 资产最小闭环：

- [ ] 维斯特洛全局地图底图
- [ ] 临冬城局部地图
- [ ] 国王劳勃北上访问临冬城事件图
- [ ] 史塔克一家南下君临事件图
- [ ] 布兰坠塔事件图
- [ ] 罗柏起兵事件图
- [ ] 临冬城陷落事件图
- [ ] 私生子之战事件图
- [ ] 北境重归史塔克事件图
- [ ] 史塔克家族纹章
- [ ] 拜拉席恩家族纹章
- [ ] 兰尼斯特家族纹章
- [ ] 葛雷乔伊家族纹章
- [ ] 波顿家族纹章
- [ ] 人物占位图或剪影系统
- [ ] 羊皮纸纹理
- [ ] 雪雾 / 云雾 / 烟尘纹理

如果图像生成工具不可用，MVP 可先用原创 SVG / CSS / 程序化图形完成闭环，并在 manifest 中标记为 placeholder。

## 16. 视觉验收标准

- 地图是第一视觉主体。
- 页面具有古地图和中世纪幻想感。
- 临冬城节点有明确焦点。
- 右侧详情面板像世界观图鉴，而不是普通卡片。
- 云雾 / 雪雾 / 战争烟尘至少有基础表现。
- sourceType 标签清晰可辨。
- 素材没有直接复制未经授权官方图。
- 每个素材都有 manifest 记录。
- 低动效模式下页面仍完整可用。

## 17. 后续视觉迭代

V1：

- 完成 2.5D 地图底图
- 完成临冬城详情素材
- 完成基础天气层
- 完成家族纹章占位

V2：

- 扩展更多地点局部图
- 增加更多事件配图
- 增加百科搜索视觉系统
- 增加家族势力层

V3：

- PixiJS / Three.js 地图渲染
- 更强地形高度和微缩模型
- 人物旅行路线
- 战争态势动画
- 更高级地图编辑器

