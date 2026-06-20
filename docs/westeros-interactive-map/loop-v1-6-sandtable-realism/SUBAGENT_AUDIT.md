# Subagent Audit - V1.6 Sandtable Realism

> 状态：completed
> 子代理：Carver
> 创建时间：2026-06-20

## 核心判断

当前最拖累“沙盘质感”的不是单一素材，而是“高细节底图 + 仪表盘式 UI 标记”的混搭：底图已经有 2.5D 质感，但城市节点、家族按钮、说明卡、面板边框仍偏 Web 控制台，导致用户感知不是沙盘。

## 最影响质感的文件 / 组件

- `apps/westeros-map/src/components/map/MapBackground.tsx`
  - 当前用 `bg-cover bg-center` 渲染单张 PNG。
  - 配合 `MAX_MAP_ZOOM = 2.6`，放大必然暴露模糊和噪点。
  - V1.6 应优先改成高分辨率源图、分层图或瓦片化。
- `apps/westeros-map/src/components/map/MapNode.tsx`
  - 城市 / 城堡按钮仍是 lucide 图标圆点，像后台地图 pin。
  - V1.6 应改为微缩旗针、金属牌、地标模型或沙盘标识。
- `apps/westeros-map/src/components/map/WorldMap.tsx`
  - 左下大说明卡压住地图，且仍有开发态文案。
  - V1.6 应移除或改为更轻的沙盘铭牌。
- `apps/westeros-map/src/components/layout/BottomLegendBar.tsx`
- `apps/westeros-map/src/components/house/HouseBadge.tsx`
  - 纹章已可区分，但仍是 96px SVG app-icon 风格。
  - 应升级为布料、刺绣、金属压印或旧化浮雕质感。
- `apps/westeros-map/src/components/layout/AppShell.tsx`
  - 外层框架使地图像“图片被框起来”，不是“沙盘台面”。

## V1.6 建议验收标准

- 全局地图源图清晰度：若保留 `MAX_MAP_ZOOM = 2.6`，应使用 4K 级或瓦片 / 分层资产。
- 100% / 160% / 260% 三档截图：中心、北境、君临局部不应出现明显插值糊、AI 噪点块、文字状伪影。
- 城市 / 城堡节点材质：节点不再只用 lucide 线性图标，至少区分城堡模型、城市铭牌、港口锚标、长城哨塔等视觉语言。
- 家族纹章写实度：五大家族按钮和详情徽章应有材质版本。
- 沙盘沉浸：默认首屏不得出现 “MVP / 下一阶段” 等开发态文案。
- 视觉回归：不能只检查路径，应增加截图或局部 crop 验收。

## 建议截图

- `1440x900-home-sandtable-v16.png`
- `1920x1080-home-sandtable-v16.png`
- `1440x900-map-zoom-160-v16.png`
- `1440x900-map-zoom-max-v16.png`
- `1440x900-house-sigils-material-v16.png`
- `1440x900-winterfell-detail-v16.png`

## 优先替换资产

1. `apps/westeros-map/public/assets/westeros/generated/westeros-sandtable-map-v1.png`
2. `apps/westeros-map/public/assets/westeros/houses/house-*-sigil-v1.svg`
3. `MapNode` 所用城市 / 城堡图标资产，目前缺少沙盘地标标记资产。
4. `apps/westeros-map/public/assets/westeros/generated/winterfell-local-map-v1.png`
