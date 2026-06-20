# Westeros Interactive Map

桌面端优先的《维斯特洛互动世界地图》前台 + Payload CMS 后台。这是第一版初版 demo：先把可点击地图、临冬城详情、基础 CMS 和高保真视觉基底跑通，后续继续向 V1.8 的模块化 2.5D / 3D 资产管线演进。

## Local Start

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- CMS Admin: `http://localhost:3000/admin`
- REST API: `http://localhost:3000/api`
- GraphQL: `http://localhost:3000/api/graphql`

## Environment

Copy `.env.example` to `.env.local` and fill local values:

```bash
cp .env.example .env.local
```

Required local variables:

- `PAYLOAD_SECRET`
- `SQLITE_DATABASE_URI` for default local CMS storage, or `DATABASE_URI` when using PostgreSQL
- `PAYLOAD_ADMIN_EMAIL`
- `PAYLOAD_ADMIN_PASSWORD`

Do not commit real secrets.

When `DATABASE_URI` is omitted, Payload uses the local SQLite fallback at
`file:./payload-dev.db`. Set `DATABASE_URI` only when you deliberately want the
PostgreSQL adapter.

## CMS Login Model

MVP uses a single Payload `users` auth collection as the admin login source.

- No multi-role permission system in MVP.
- The first local admin should be created through Payload's first-user flow or a local seed/bootstrap script.
- Future roles can extend from `users` if the project needs editor/reviewer accounts.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run payload
npm run payload:generate-types
npm run payload:generate-importmap
npm run seed
```

For a production smoke check:

```bash
npm run build
npm run start -- -p 3001
```

## Current Demo Scope

- 12 map location nodes.
- Winterfell clickable detail panel.
- V1 preview detail panels for King's Landing and Castle Black.
- Hover tooltip.
- Pan/zoom/reset controls.
- Weather layer with high / low / off controls and reduced-motion fallback.
- Encyclopedia-style location search entry.
- Original SVG V1 assets for the global map, Winterfell local map, seven Winterfell events, and core house sigils.
- Payload admin configured with Users, Media, Locations, Regions, Houses, Characters, Events, and Storylines collections.
- Source register and asset manifest maintained under `docs/westeros-interactive-map/`.

## V1.7 Acceptance Entry

The completed V1.7 loop is tracked at:

```text
../../docs/westeros-interactive-map/loop-v1-7-canonical-terrain-icons/
```

Use these commands for local acceptance:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run payload:generate-importmap
npm run payload:generate-types
npm run build
npm run start -- -p 3001
```

## V1.8 Next Loop

The active next loop is:

```text
../../docs/westeros-interactive-map/ACTIVE_LOOP.md
```

V1.8 validates the C plan: keep the production site as a high-fidelity Web app, while using Unity / Unreal / Blender / Spline / Three.js-style tools as a modular asset authoring pipeline for terrain tiles, landmarks, layers, and anchors.

## Boundaries

- Do not use official map images or official stills as public core assets without permission.
- Keep all generated/redrawn/reference assets recorded in the CMS media/source fields and project manifests.
- Database migrations and production deployment require explicit operator confirmation.
