# 《维斯特洛互动世界地图》Public-Ready Cleanup Report

> 日期：2026-06-19
> 适用循环：`docs/westeros-interactive-map/loop-v1-unified-visual-release/`
> 当前结论：当前视觉版本适合本地私有原型与美术验收；不应直接视为 public-ready 发布包。

## 1. 当前资产范围判断

### 可保留为本地私有原型

- `apps/westeros-map/public/assets/westeros/generated/westeros-sandtable-map-v1.png`
- `apps/westeros-map/public/assets/westeros/generated/winterfell-local-map-v1.png`
- `apps/westeros-map/public/assets/westeros/generated/events/*.png`
- `apps/westeros-map/public/assets/westeros/houses/house-*-sigil-v1.svg`

原因：这些资产为生成、裁切或重绘资产，未直接放入官方剧照、演员照片或官方地图原图；但它们仍基于《冰与火之歌 / 权力的游戏》世界观、事件和家族纹章描述，当前统一按 `private-prototype` 记录。

### 仅作私有源文件，不进入公开包

- `apps/westeros-map/private/generated-working/art-direction-contact-sheet-v1-source.png`
- `apps/westeros-map/private/generated-working/westeros-sandtable-map-v1-source.png`
- `apps/westeros-map/private/generated-working/winterfell-local-map-v1-source.png`
- `apps/westeros-map/private/generated-working/winterfell-event-contact-sheet-v1-source.png`

原因：这些文件用于生成链追溯和美术审阅，目录已被 git ignore，不应进入公开发布资产目录。

### 上线前必须阻断

- 任何未来收集的官方剧照原图、官方地图原图、演员肖像、商业游戏截图。
- 任何未登记来源、未标记 `usageScope`、未说明风险等级的素材。
- 任何在 `apps/westeros-map/public/` 中直接复刻官方纹章、官方地图或剧照构图的资产。

## 2. CMS 与 Manifest 清理状态

- Payload `Media` collection 已包含 `licenseStatus`、`riskLevel`、`usageScope`。
- `usageScope` 已改为受控选项：
  - `private-prototype`
  - `public-ready-candidate`
  - `blocked`
- `ASSET_MANIFEST.md` 已记录当前进入前台的生成 / 重绘资产、来源链、风险备注与使用范围。
- `PRIVATE_REFERENCE_REGISTER.md` 已记录当前生成源文件路径和 prompt 摘要。

## 3. 公开发布前必须完成的动作

1. 重新审查 `ASSET_MANIFEST.md` 中所有 `private-prototype` 资产。
2. 将可公开使用的资产改为 `public-ready-candidate`，并补充授权或原创说明。
3. 将不可公开使用或风险过高资产改为 `blocked`，并从前台引用中替换。
4. 扫描 `apps/westeros-map/public/`，确认没有官方剧照、演员照片、官方地图原图或未授权素材。
5. 扫描 `apps/westeros-map/private/`，确认该目录仍被 git ignore，且不会被部署。
6. 运行完整验证：
   - `npm run payload:generate-types`
   - `npm run payload:generate-importmap`
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test:unit`
   - `npm run test:e2e`
   - `npm run build`

## 4. 当前可部署性结论

- 本地验收：可以继续使用 `http://localhost:3000` 查看。
- 私有 demo：可以用于个人本地展示和内部视觉评审。
- 公开网站：上线前必须完成第 3 节清理动作。
