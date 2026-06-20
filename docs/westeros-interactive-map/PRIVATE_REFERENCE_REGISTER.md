# 《维斯特洛互动世界地图》Private Reference Register

> 用途：记录仅用于本地私有原型和美术研究的原始参考素材。这里可以记录官方剧照、官方视觉、网络图片、地图参考、材质参考等，但这些原始素材不得进入公开前台资产目录。

## 使用规则

- 原始参考素材放入 `apps/westeros-map/private/westeros-reference/` 或其他被 git 忽略的目录。
- 进入 `apps/westeros-map/public/` 的只能是生成、重绘、合成或压缩后的项目资产。
- 任何基于官方剧照、官方地图、演员照片、商业游戏截图产生的资产，默认标记为 `private-prototype`。
- 上线前必须重新审查本文件，将高风险资产替换为原创 / 授权 / 低风险生成资产。

## 字段说明

| 字段 | 说明 |
|---|---|
| ID | 私有参考素材编号 |
| 本地路径 / 外部链接 | 原始素材位置；本地原图应位于 git ignored 目录 |
| 参考类型 | still / map / poster / texture / concept / ui / other |
| 来源方 | HBO / 官方宣传 / 网络页面 / 个人收集 / 生成模型等 |
| 用途 | art direction / img2img / texture / composition / lighting / costume / architecture |
| 关联资产 | 最终生成资产 ID 或前台路径 |
| 是否官方素材 | yes / no / unknown |
| 是否进入前台 | 原始素材必须为 no |
| 使用范围 | private-prototype / public-ready-candidate / blocked |
| 风险备注 | 后续上线前替换或授权说明 |

## 当前记录

| ID | 本地路径 / 外部链接 | 参考类型 | 来源方 | 用途 | 关联资产 | 是否官方素材 | 是否进入前台 | 使用范围 | 风险备注 |
|---|---|---|---|---|---|---|---|---|---|
| PRIV-REF-000 | 待收集 | other | 待定 | V1.5 loop 初始占位 | 待生成 | unknown | no | private-prototype | 本文件为登记模板；真实参考素材收集后逐条补充。 |
| PRIV-REF-001 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_06260a3f6e84a5e7016a3507b3685081919f6f279645bd9c0f.png`；项目副本：`apps/westeros-map/private/generated-working/art-direction-contact-sheet-v1-source.png` | concept | Codex built-in image generation | art direction / composition / terrain language | asset-art-direction-contact-sheet-v1 | no | no | private-prototype | 生成 prompt 摘要：3x2 高保真幻想沙盘地图方向，暗金 UI、雪雾、微缩城堡、古地图和策略地图界面；不含官方剧照或演员肖像。 |
| PRIV-REF-002 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_06260a3f6e84a5e7016a350902e790819189434464ce28dd57.png`；项目副本：`apps/westeros-map/private/generated-working/westeros-sandtable-map-v1-source.png` | map | Codex built-in image generation | map-base / frontend replacement / terrain and atmosphere | asset-westeros-sandtable-map-v1 | no | generated derivative enters frontend, original source copy does not | private-prototype | 生成 prompt 摘要：宽屏 2.5D 幻想大陆沙盘底图，长城、雪地、河流、山脉、森林、海岸和城堡；未使用官方剧照输入。 |
| PRIV-REF-003 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_06260a3f6e84a5e7016a350cf26a0881918c02bf3155e11a65.png`；项目副本：`apps/westeros-map/private/generated-working/winterfell-local-map-v1-source.png` | map | Codex built-in image generation | local-map / Winterfell detail panel / architecture and snow terrain | asset-winterfell-local-map-v1 | no | generated derivative enters frontend, original source copy does not | private-prototype | 生成 prompt 摘要：北境古堡、临冬镇、狼林、河谷、道路、雪雾和旧地图材质；未使用官方剧照输入。 |
| PRIV-REF-004 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_072deaf351b74f09016a355180dadc8191959e384b1bd58a4c.png`；项目副本：`apps/westeros-map/private/generated-working/winterfell-event-contact-sheet-v1-source.png` | concept / event-art-source | Codex built-in image generation | event art / Winterfell timeline / cropped frontend assets | asset-winterfell-event-contact-sheet-v1；asset-robert-arrival；asset-starks-leave；asset-bran-fall；asset-robb-banners；asset-winterfell-falls；asset-battle-bastards；asset-north-restored | no | cropped generated derivatives enter frontend, original source copy does not | private-prototype | 生成 prompt 摘要：七张临冬城事件图，包含王家队伍抵达、北境车队南下、高塔坠落暗示、北境旗帜集结、城堡陷落、雪原战场、北境大厅重归史塔克；无文本、无演员肖像、无官方剧照输入。 |
| PRIV-REF-005 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_072deaf351b74f09016a3583cc3e748191bd94e45bb19c3ec6.png`；项目副本：`apps/westeros-map/private/generated-working/v16/westeros-sandtable-map-v2-source.png` | map | Codex built-in image generation | V1.6 sandtable map / higher-detail terrain and miniature model base | asset-westeros-sandtable-map-v2 | no | generated derivative enters frontend, original source copy does not | private-prototype | 生成 prompt 摘要：更高清、少噪点、无文字标签的 2.5D 维斯特洛风格幻想沙盘底图；本地处理后输出 3072x2048；已被 V3 原著地理约束版替换。 |
| PRIV-REF-006 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_072deaf351b74f09016a35848782648191a7e1ae008be3e06e.png`；项目副本：`apps/westeros-map/private/generated-working/v16/house-sigils-material-v2-source.png` | house-sigil-source | Codex built-in image generation | V1.6 material house sigils / metal enamel and fabric texture | asset-sigil-stark；asset-sigil-baratheon；asset-sigil-lannister；asset-sigil-greyjoy；asset-sigil-bolton | no | cropped generated derivatives enter frontend, original source copy does not | private-prototype | 生成 prompt 摘要：五大家族写实材质纹章 contact sheet，金属边框、珐琅、刺绣、旧化质感；未使用官方纹章图输入。 |
| PRIV-REF-007 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_072deaf351b74f09016a3584f059648191a2f48ebf152afe8c.png`；项目副本：`apps/westeros-map/private/generated-working/v16/map-node-buttons-v2-source.png` | map-node-source | Codex built-in image generation | V1.6 miniature sandtable node buttons | asset-node-castle-v2；asset-node-city-v2；asset-node-wall-v2；asset-node-port-v2；asset-node-mountain-v2；asset-node-forest-v2 | no | cropped generated derivatives enter frontend, original source copy does not | private-prototype | 生成 prompt 摘要：六个微缩沙盘节点按钮 contact sheet，城堡、城市、长城、港口、山地要塞、森林地区，替代 lucide 线性图标。 |
| PRIV-REF-008 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_0627cd6024f55c2b016a360dfc49408191af9e0a6e6788bf29.png`；项目副本：`apps/westeros-map/private/generated-working/v16/westeros-sandtable-map-v3-canon-source.png` | map | Codex built-in image generation | V1.6 lore-constrained sandtable map / geography correction | asset-westeros-map | no | generated derivative enters frontend, original source copy does not | private-prototype | 生成 prompt 摘要：基于 `WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md`，要求去除随机城市、约束鹰巢城高山峡谷、君临黑水河口、高庭西南曼德河流域、派克离岸和多恩东南海岸；本地处理后输出 3074x2046。 |
| PRIV-REF-009 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_0e1d37cc52af089c016a366cd8171c8191a29b348a635aff0f.png`；项目副本：`apps/westeros-map/private/generated-working/v17/location-node-icons-contact-sheet-v1-source.png` | map-node-source | Codex built-in image generation | V1.7 location-specific node icons / contact sheet cropping | asset-node-winterfell-v1；asset-node-kings-landing-v1；asset-node-the-wall-v1；asset-node-castle-black-v1；asset-node-the-eyrie-v1；asset-node-riverrun-v1；asset-node-harrenhal-v1；asset-node-casterly-rock-v1；asset-node-highgarden-v1；asset-node-storms-end-v1；asset-node-pyke-v1；asset-node-sunspear-v1 | no | cropped generated derivatives enter frontend, original source copy does not | private-prototype | 生成 prompt 摘要：4x3 地点专属圆章按钮，逐一表达临冬城雪堡、君临河口、高墙冰墙、黑城堡、鹰巢城峭壁、奔流城河汇、赫伦堡废墟、凯岩城金岩、高庭园林、风息堡海崖、派克黑礁、阳戟城多恩海岸；无文字、无演员肖像、无官方素材输入。 |
| PRIV-REF-010 | `/Users/van/.codex/generated_images/019ea520-d86d-7680-82be-19e577c136bd/ig_0e1d37cc52af089c016a366e2fcfc88191ba11e584268c267e.png`；项目副本：`apps/westeros-map/private/generated-working/v17/westeros-sandtable-map-v4-terrain-source.png` | map | Codex built-in image generation | V1.7 terrain-rich map / geography correction | asset-westeros-map | no | generated derivative enters frontend, original source copy does not | private-prototype | 生成 prompt 摘要：基于 V1.7 地貌增强 brief，强化河间地与河湾地河网、谷地山脉、君临河口、高庭园林、多恩沙漠、派克离岸黑礁、风暴地海崖和北境寒冷稀疏；本地处理后输出 3762x2117。 |

## V1.5 外部视觉参考包（未下载）

> 说明：以下条目仅登记为私有视觉研究入口；未下载原图，未进入 `apps/westeros-map/public/`。若未来下载原始图，必须放入 git ignored 私有目录并新增本地路径记录。

| ID | 外部链接 | 参考类型 | 来源方 | 用途 | 关联资产 | 是否官方素材 | 是否进入前台 | 使用范围 | 风险备注 |
|---|---|---|---|---|---|---|---|---|---|
| PRIV-REF-101 | https://www.hbo.com/game-of-thrones | official mood | HBO | official still mood / dark fantasy tone | art direction | yes | no | private-prototype | 官方页面只作私有风格观察，不下载或复刻。 |
| PRIV-REF-102 | https://www.hbo.com/game-of-thrones/season-01/1-winter-is-coming | official still | HBO | Winterfell arrival mood / northern castle lighting | asset-robert-arrival | yes | no | private-prototype | 官方剧集页只作构图与气氛参考。 |
| PRIV-REF-103 | https://www.hbo.com/game-of-thrones/season-06/9-battle-of-the-bastards | official still | HBO | battlefield smoke / snow / cavalry silhouette mood | asset-battle-bastards | yes | no | private-prototype | 剧集线事件参考，不复制剧照画面。 |
| PRIV-REF-104 | https://www.hbo.com/game-of-thrones/season-06/10-the-winds-of-winter | official still | HBO | northern restoration / hall torchlight mood | asset-north-restored | yes | no | private-prototype | 剧集线结局氛围参考。 |
| PRIV-REF-105 | https://awoiaf.westeros.org/index.php/Winterfell | lore / architecture | A Wiki of Ice and Fire | Winterfell location and architecture concept | local map / event art | unknown | no | private-prototype | 文本事实与地点关系参考，不下载图片。 |
| PRIV-REF-106 | https://awoiaf.westeros.org/index.php/House_Stark | sigil / house | A Wiki of Ice and Fire | Stark direwolf color language | asset-sigil-stark | unknown | no | private-prototype | 只参考文字纹章描述。 |
| PRIV-REF-107 | https://awoiaf.westeros.org/index.php/House_Baratheon | sigil / house | A Wiki of Ice and Fire | Baratheon stag color language | asset-sigil-baratheon | unknown | no | private-prototype | 只参考文字纹章描述。 |
| PRIV-REF-108 | https://awoiaf.westeros.org/index.php/House_Lannister | sigil / house | A Wiki of Ice and Fire | Lannister lion color language | asset-sigil-lannister | unknown | no | private-prototype | 只参考文字纹章描述。 |
| PRIV-REF-109 | https://awoiaf.westeros.org/index.php/House_Greyjoy | sigil / house | A Wiki of Ice and Fire | Greyjoy kraken color language | asset-sigil-greyjoy | unknown | no | private-prototype | 只参考文字纹章描述。 |
| PRIV-REF-110 | https://awoiaf.westeros.org/index.php/House_Bolton | sigil / house | A Wiki of Ice and Fire | Bolton red/pink color language | asset-sigil-bolton | unknown | no | private-prototype | 只参考文字纹章描述并抽象化。 |
| PRIV-REF-111 | https://www.loc.gov/maps/ | map language | Library of Congress | antique atlas framing / label hierarchy | map UI / legend | no | no | public-ready-candidate | 公共馆藏入口，只作风格研究。 |
| PRIV-REF-112 | https://www.loc.gov/collections/general-maps/articles-and-essays/ptolemys-geographia/ | map language | Library of Congress | medieval coastline / border / mountain symbol language | map base | no | no | public-ready-candidate | 不复制具体地图。 |
| PRIV-REF-113 | https://www.davidrumsey.com/ | map language | David Rumsey Map Collection | aged map palette / paper and ink mood | map base / UI | no | no | public-ready-candidate | 只参考馆藏视觉规律。 |
| PRIV-REF-114 | https://commons.wikimedia.org/wiki/Category:Parchment | texture | Wikimedia Commons | parchment and old paper material mood | UI panels / map texture | no | no | public-ready-candidate | 不直接下载使用。 |
| PRIV-REF-115 | https://commons.wikimedia.org/wiki/Category:Medieval_maps | map language | Wikimedia Commons | medieval map icon density and edge treatments | map base / legend | no | no | public-ready-candidate | 只作视觉研究入口。 |
| PRIV-REF-116 | https://commons.wikimedia.org/wiki/Category:Illuminated_manuscripts | UI mood | Wikimedia Commons | gold manuscript border and museum atlas detail | panel / button styling | no | no | public-ready-candidate | 不复制具体插画。 |
| PRIV-REF-117 | https://www.metmuseum.org/art/collection/search?department=7 | UI mood | The Metropolitan Museum of Art | medieval metalwork / enamel / ornament mood | buttons / house badges | no | no | public-ready-candidate | 只研究工艺质感。 |
| PRIV-REF-118 | https://www.nationaltrust.org.uk/visit/northern-ireland/castle-ward | architecture | National Trust | northern stone castle / courtyard reference | Winterfell architecture | no | no | private-prototype | 现实建筑参考，不下载图片。 |
| PRIV-REF-119 | https://commons.wikimedia.org/wiki/Category:Castles_in_Northern_Ireland | architecture | Wikimedia Commons | rough stone, towers, courtyards | castle iconography | no | no | public-ready-candidate | 只作公开建筑形态研究入口。 |
| PRIV-REF-120 | https://commons.wikimedia.org/wiki/Category:Snow | weather | Wikimedia Commons | snow particle density / winter haze | asset-northern-snow-texture-v1 | no | no | public-ready-candidate | 程序纹理不复制照片。 |
| PRIV-REF-121 | https://commons.wikimedia.org/wiki/Category:Fog | weather | Wikimedia Commons | fog translucency / cloud haze | asset-cloud-haze-texture-v1 | no | no | public-ready-candidate | 程序纹理不复制照片。 |
| PRIV-REF-122 | https://commons.wikimedia.org/wiki/Category:Smoke | weather | Wikimedia Commons | smoke opacity / drift shape | asset-war-smoke-texture-v1 | no | no | public-ready-candidate | 程序纹理不复制照片。 |
| PRIV-REF-123 | https://www.rijksmuseum.nl/en/collection | UI mood | Rijksmuseum | museum catalog hierarchy / artwork metadata presentation | detail panel / source labels | no | no | public-ready-candidate | 只参考信息密度和收藏展示方式。 |
| PRIV-REF-124 | https://www.britishmuseum.org/collection | UI mood | The British Museum | object page hierarchy / provenance presentation | CMS source fields / detail panel | no | no | public-ready-candidate | 只参考博物馆级图鉴组织。 |

## V1.6 沙盘写实化外部视觉参考包（未下载）

| ID | 外部链接 | 参考类型 | 来源方 | 用途 | 关联资产 | 是否官方素材 | 是否进入前台 | 使用范围 | 风险备注 |
|---|---|---|---|---|---|---|---|---|---|
| PRIV-REF-201 | https://www.hbo.com/game-of-thrones | official mood | HBO | 维斯特洛整体暗色幻想氛围、剧集材质感私有参考 | V1.6 art direction | yes | no | private-prototype | 只作私有氛围研究，不下载原图。 |
| PRIV-REF-202 | https://awoiaf.westeros.org/index.php/Westeros | lore / geography | A Wiki of Ice and Fire | 维斯特洛区域、地理、势力关系核对 | asset-westeros-map | unknown | no | private-prototype | 文本事实参考，不复制地图图像。 |
| PRIV-REF-203 | https://awoiaf.westeros.org/index.php/Map:Westeros | map reference | A Wiki of Ice and Fire | 地点相对关系与地理分布核对 | asset-westeros-map | unknown | no | private-prototype | 只作位置概念参考，不复制原图。 |
| PRIV-REF-204 | https://www.loc.gov/maps/ | antique map | Library of Congress | 历史地图边框、图例、地形符号研究 | map frame / UI | no | no | public-ready-candidate | 公共馆藏入口，不复制具体地图。 |
| PRIV-REF-205 | https://www.davidrumsey.com/ | antique map | David Rumsey Map Collection | 古地图色调、海岸线、旧纸纹理研究 | map base / UI | no | no | public-ready-candidate | 只参考馆藏视觉语言。 |
| PRIV-REF-206 | https://commons.wikimedia.org/wiki/Category:Relief_maps | relief map | Wikimedia Commons | 浮雕地图、沙盘地形层次参考 | asset-westeros-map | no | no | public-ready-candidate | 不直接使用图片。 |
| PRIV-REF-207 | https://commons.wikimedia.org/wiki/Category:Topographic_models | topographic model | Wikimedia Commons | 立体地形模型与微缩沙盘参考 | asset-westeros-map | no | no | public-ready-candidate | 不直接使用图片。 |
| PRIV-REF-208 | https://commons.wikimedia.org/wiki/Category:Heraldry | heraldry | Wikimedia Commons | 纹章材质、盾形、金属边框参考 | V1.6 house sigils | no | no | public-ready-candidate | 不复制具体纹章。 |
| PRIV-REF-209 | https://www.metmuseum.org/art/collection/search?department=7 | medieval material | The Metropolitan Museum of Art | 中世纪金属、珐琅、旧化材质参考 | V1.6 house sigils / node buttons | no | no | public-ready-candidate | 只研究材质，不复制藏品。 |
| PRIV-REF-210 | https://www.britishmuseum.org/collection | museum UI / artifact | The British Museum | 博物馆级器物展示、说明层次参考 | UI / detail panel | no | no | public-ready-candidate | 只参考信息组织。 |
| PRIV-REF-211 | https://commons.wikimedia.org/wiki/Category:Miniature_models | miniature model | Wikimedia Commons | 微缩模型光影和材质参考 | map nodes / sandtable | no | no | public-ready-candidate | 不直接使用图片。 |
| PRIV-REF-212 | https://commons.wikimedia.org/wiki/Category:Buttons | UI material | Wikimedia Commons | 实物按钮 / 金属按钮触感参考 | bottom controls / node buttons | no | no | public-ready-candidate | 只参考物理按钮语言。 |
