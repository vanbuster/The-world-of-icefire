# Westeros V1.8 Engine Asset Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a V1.8 standard validation that proves an engine-authored / 3D-authored asset pipeline can coexist with the current web map and CMS direction.

**Architecture:** Keep the V1.7 map intact and add an experimental Engine Asset Lab. The lab uses typed modular asset metadata, mock/generated sample assets, and a North / Winterfell sandtable tile view to validate terrain, landmark, forest, road, water, weather, and anchor layers before committing to Unity WebGL or a full 3D engine runtime.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing Zustand map store, existing mock data selectors, Playwright, Vitest. Do not add Unity / Unreal project files in this first execution pass.

---

## File Structure

- Create: `apps/westeros-map/src/types/engineAsset.ts`
  - Defines V1.8 asset pipeline entities: terrain tiles, landmark prefabs, material sets, layers, and anchors.
- Create: `apps/westeros-map/src/data/mock/engineAssetLab.ts`
  - Contains a North / Winterfell sample tile manifest and layer metadata.
- Create: `apps/westeros-map/src/components/engine-lab/EngineAssetLab.tsx`
  - Main lab surface.
- Create: `apps/westeros-map/src/components/engine-lab/EngineTileViewport.tsx`
  - Renders modular tile layers.
- Create: `apps/westeros-map/src/components/engine-lab/EngineAssetInspector.tsx`
  - Shows metadata and pipeline status.
- Create: `apps/westeros-map/src/components/engine-lab/EngineLayerToggleBar.tsx`
  - Toggles terrain, landmark, forest, road, water, weather, anchors.
- Create: `apps/westeros-map/src/app/(frontend)/engine-lab/page.tsx`
  - Experimental route.
- Modify: `apps/westeros-map/src/components/layout/SideNav.tsx`
  - Adds lab navigation entry without replacing current map.
- Modify: `apps/westeros-map/src/types/index.ts`
  - Exports engine asset types.
- Modify: `apps/westeros-map/tests/e2e/map.spec.ts`
  - Adds E2E coverage for Engine Asset Lab while preserving V1.7 tests.
- Modify: `docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md`
  - Adds V1.8 execution evidence after implementation.
- Modify: `docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/ACCEPTANCE_CHECKS.json`
  - Updates checks as tasks pass.

## Task 1: Define Engine Asset Types

**Files:**
- Create: `apps/westeros-map/src/types/engineAsset.ts`
- Modify: `apps/westeros-map/src/types/index.ts`

- [ ] **Step 1: Add the type file**

Create `apps/westeros-map/src/types/engineAsset.ts` with:

```ts
export type EngineAssetSourceTool =
  | "unity"
  | "unreal"
  | "blender"
  | "spline"
  | "threejs-procedural"
  | "ai-generated"
  | "manual-web";

export type EngineAssetExportFormat =
  | "gltf"
  | "glb"
  | "png-tile"
  | "sprite-atlas"
  | "heightmap"
  | "procedural-css"
  | "procedural-canvas";

export type EngineLayerKind =
  | "terrain"
  | "landmark"
  | "forest"
  | "route"
  | "water"
  | "weather"
  | "anchor";

export type EngineAssetRiskLevel = "low" | "medium" | "high";

export type EngineMaterialSet = {
  id: string;
  name: string;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  swatches: string[];
  texturePaths: string[];
  notes: string;
};

export type EngineLayer = {
  id: string;
  kind: EngineLayerKind;
  name: string;
  description: string;
  enabledByDefault: boolean;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  publicAssetPath?: string;
  sourceAssetPath?: string;
};

export type EngineMapAnchor = {
  id: string;
  locationId: string;
  label: string;
  xPercent: number;
  yPercent: number;
  zHint: number;
  scale: number;
  rotationDeg: number;
};

export type EngineTerrainTile = {
  id: string;
  title: string;
  regionId: string;
  relatedLocationIds: string[];
  summary: string;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  riskLevel: EngineAssetRiskLevel;
  materialSetIds: string[];
  layers: EngineLayer[];
  anchors: EngineMapAnchor[];
  productionNotes: string[];
};
```

- [ ] **Step 2: Export types**

Append to `apps/westeros-map/src/types/index.ts`:

```ts
export type * from "./engineAsset";
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: `tsc --noEmit` exits 0.

## Task 2: Create Mock Engine Asset Manifest

**Files:**
- Create: `apps/westeros-map/src/data/mock/engineAssetLab.ts`

- [ ] **Step 1: Create manifest data**

Create `apps/westeros-map/src/data/mock/engineAssetLab.ts`:

```ts
import type { EngineMaterialSet, EngineTerrainTile } from "@/types";

export const engineMaterialSets: EngineMaterialSet[] = [
  {
    id: "material-north-winter-v1",
    name: "Northern Winter Sandtable Materials V1",
    sourceTool: "ai-generated",
    exportFormat: "png-tile",
    swatches: ["#d7d9cf", "#8b8d83", "#3d453c", "#232826", "#b7a36a"],
    texturePaths: [],
    notes:
      "Placeholder material set for snow, grey stone, pine forest, frozen road, and aged gold UI trim. Future versions can be authored in Unity, Unreal, Blender, or Spline.",
  },
];

export const engineTerrainTiles: EngineTerrainTile[] = [
  {
    id: "tile-north-winterfell-v1",
    title: "North / Winterfell Sandtable Tile V1",
    regionId: "region-north",
    relatedLocationIds: ["winterfell"],
    summary:
      "A V1.8 validation tile for testing modular terrain, landmark, forest, route, water, weather, and anchor layers around Winterfell.",
    sourceTool: "threejs-procedural",
    exportFormat: "procedural-css",
    riskLevel: "medium",
    materialSetIds: ["material-north-winter-v1"],
    layers: [
      {
        id: "layer-north-terrain",
        kind: "terrain",
        name: "Snowfield Relief",
        description: "Layered snow and grey-green terrain relief for the North.",
        enabledByDefault: true,
        sourceTool: "threejs-procedural",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-winterfell-landmark",
        kind: "landmark",
        name: "Winterfell Landmark Prefab",
        description: "Grey stone castle landmark placeholder for future engine-authored prefab replacement.",
        enabledByDefault: true,
        sourceTool: "ai-generated",
        exportFormat: "png-tile",
      },
      {
        id: "layer-wolfswood-forest",
        kind: "forest",
        name: "Wolfswood Edge",
        description: "Pine forest clusters west of Winterfell.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-kingsroad-route",
        kind: "route",
        name: "Kingsroad North Segment",
        description: "Subtle road curve used to test route layer editability.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-white-knife-water",
        kind: "water",
        name: "White Knife Hint",
        description: "Frozen river hint used to validate future WaterLayer data.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-northern-snow-weather",
        kind: "weather",
        name: "Northern Snow Haze",
        description: "Light snow and fog overlay for atmosphere and performance testing.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "anchor-winterfell",
        kind: "anchor",
        name: "Winterfell Location Anchor",
        description: "Clickable anchor linking the tile back to the existing Winterfell detail model.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
    ],
    anchors: [
      {
        id: "anchor-winterfell",
        locationId: "winterfell",
        label: "临冬城",
        xPercent: 52,
        yPercent: 44,
        zHint: 0.34,
        scale: 1,
        rotationDeg: -8,
      },
    ],
    productionNotes: [
      "This is a web-authored validation stand-in for a future Unity / Unreal / Blender tile.",
      "Each layer is replaceable by a future glTF, GLB, PNG tile, sprite atlas, or heightmap export.",
      "The goal is to validate asset boundaries before investing in full engine production.",
    ],
  },
];
```

- [ ] **Step 2: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: exits 0.

## Task 3: Build Engine Asset Lab Route

**Files:**
- Create: `apps/westeros-map/src/app/(frontend)/engine-lab/page.tsx`
- Create: `apps/westeros-map/src/components/engine-lab/EngineAssetLab.tsx`
- Create: `apps/westeros-map/src/components/engine-lab/EngineTileViewport.tsx`
- Create: `apps/westeros-map/src/components/engine-lab/EngineAssetInspector.tsx`
- Create: `apps/westeros-map/src/components/engine-lab/EngineLayerToggleBar.tsx`

- [ ] **Step 1: Create the route**

Create `apps/westeros-map/src/app/(frontend)/engine-lab/page.tsx`:

```tsx
import { EngineAssetLab } from "@/components/engine-lab/EngineAssetLab";

export default function EngineLabPage() {
  return <EngineAssetLab />;
}
```

- [ ] **Step 2: Create the lab shell**

Create `apps/westeros-map/src/components/engine-lab/EngineAssetLab.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { engineTerrainTiles } from "@/data/mock/engineAssetLab";
import type { EngineLayerKind } from "@/types";
import { EngineAssetInspector } from "./EngineAssetInspector";
import { EngineLayerToggleBar } from "./EngineLayerToggleBar";
import { EngineTileViewport } from "./EngineTileViewport";

export function EngineAssetLab() {
  const tile = engineTerrainTiles[0];
  const [enabledKinds, setEnabledKinds] = useState<Set<EngineLayerKind>>(
    () =>
      new Set(
        tile.layers
          .filter((layer) => layer.enabledByDefault)
          .map((layer) => layer.kind),
      ),
  );

  const enabledLayers = useMemo(
    () => tile.layers.filter((layer) => enabledKinds.has(layer.kind)),
    [enabledKinds, tile.layers],
  );

  const toggleLayer = (kind: EngineLayerKind) => {
    setEnabledKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) {
        next.delete(kind);
      } else {
        next.add(kind);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-ink text-panel-foreground" data-engine-lab>
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-5 px-6 py-5">
        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded border border-burnished-gold/30 bg-panel/74 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-burnished-gold">
              V1.8 Engine Asset Lab
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-aged-paper">
              北境 / 临冬城沙盘资产管线验证
            </h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-aged-paper/72">
              这里验证 C 方案：引擎或 3D 工具负责生产可编辑地形与地标资产，网页继续负责运行、CMS、地点详情和部署。
            </p>
          </header>

          <EngineLayerToggleBar
            enabledKinds={enabledKinds}
            layers={tile.layers}
            onToggle={toggleLayer}
          />

          <EngineTileViewport enabledLayers={enabledLayers} tile={tile} />
        </section>

        <EngineAssetInspector enabledLayers={enabledLayers} tile={tile} />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Implement toggle bar**

Create `apps/westeros-map/src/components/engine-lab/EngineLayerToggleBar.tsx`:

```tsx
import type { EngineLayer, EngineLayerKind } from "@/types";

type EngineLayerToggleBarProps = {
  layers: EngineLayer[];
  enabledKinds: Set<EngineLayerKind>;
  onToggle: (kind: EngineLayerKind) => void;
};

const labelMap: Record<EngineLayerKind, string> = {
  terrain: "地形",
  landmark: "地标",
  forest: "森林",
  route: "道路",
  water: "水系",
  weather: "天气",
  anchor: "锚点",
};

export function EngineLayerToggleBar({
  enabledKinds,
  layers,
  onToggle,
}: EngineLayerToggleBarProps) {
  const kinds = Array.from(new Set(layers.map((layer) => layer.kind)));

  return (
    <div
      className="flex flex-wrap gap-2 rounded border border-burnished-gold/24 bg-panel/62 p-3"
      data-engine-layer-toggles
    >
      {kinds.map((kind) => {
        const enabled = enabledKinds.has(kind);

        return (
          <button
            className={[
              "rounded border px-3 py-2 text-xs font-semibold transition",
              enabled
                ? "border-burnished-gold bg-burnished-gold/18 text-aged-paper"
                : "border-aged-paper/18 bg-ink/36 text-aged-paper/58",
            ].join(" ")}
            data-engine-layer-toggle={kind}
            key={kind}
            onClick={() => onToggle(kind)}
            type="button"
          >
            {labelMap[kind]}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Implement tile viewport**

Create `apps/westeros-map/src/components/engine-lab/EngineTileViewport.tsx` with layered CSS terrain. Keep it deterministic and data-driven:

```tsx
import type { EngineLayer, EngineTerrainTile } from "@/types";

type EngineTileViewportProps = {
  tile: EngineTerrainTile;
  enabledLayers: EngineLayer[];
};

const hasLayer = (layers: EngineLayer[], kind: EngineLayer["kind"]) =>
  layers.some((layer) => layer.kind === kind);

export function EngineTileViewport({
  enabledLayers,
  tile,
}: EngineTileViewportProps) {
  const showTerrain = hasLayer(enabledLayers, "terrain");
  const showLandmark = hasLayer(enabledLayers, "landmark");
  const showForest = hasLayer(enabledLayers, "forest");
  const showRoute = hasLayer(enabledLayers, "route");
  const showWater = hasLayer(enabledLayers, "water");
  const showWeather = hasLayer(enabledLayers, "weather");
  const showAnchor = hasLayer(enabledLayers, "anchor");

  return (
    <section
      className="relative min-h-[620px] overflow-hidden rounded border border-burnished-gold/32 bg-[#141612] shadow-[0_24px_90px_rgba(0,0,0,0.42)]"
      data-engine-tile={tile.id}
    >
      {showTerrain ? (
        <div
          className="absolute inset-0"
          data-engine-layer="terrain"
          style={{
            background:
              "radial-gradient(circle at 48% 38%, rgba(221,224,212,0.86), rgba(113,122,100,0.78) 30%, rgba(44,58,44,0.82) 56%, rgba(22,25,22,0.98) 100%)",
          }}
        />
      ) : null}

      {showWater ? (
        <div
          className="absolute left-[15%] top-[54%] h-[7%] w-[72%] rounded-full bg-cyan-200/30 blur-[1px]"
          data-engine-layer="water"
          style={{ transform: "rotate(-13deg)" }}
        />
      ) : null}

      {showForest ? (
        <div data-engine-layer="forest">
          <div className="absolute left-[10%] top-[28%] h-[26%] w-[28%] rounded-full bg-emerald-950/72 blur-[2px]" />
          <div className="absolute left-[17%] top-[36%] h-[18%] w-[36%] rounded-full bg-green-900/56 blur-[3px]" />
          <div className="absolute left-[8%] top-[48%] h-[16%] w-[24%] rounded-full bg-slate-900/70 blur-[2px]" />
        </div>
      ) : null}

      {showRoute ? (
        <div
          className="absolute left-[24%] top-[21%] h-[66%] w-[4px] rounded-full bg-aged-paper/38 shadow-[0_0_18px_rgba(217,202,166,0.3)]"
          data-engine-layer="route"
          style={{ transform: "rotate(22deg)" }}
        />
      ) : null}

      {showLandmark ? (
        <div
          className="absolute left-[50%] top-[42%] h-44 w-56 -translate-x-1/2 -translate-y-1/2"
          data-engine-layer="landmark"
        >
          <div className="absolute bottom-4 left-1/2 h-28 w-44 -translate-x-1/2 rounded border border-burnished-gold/34 bg-stone-500/84 shadow-[0_26px_50px_rgba(0,0,0,0.46)]" />
          <div className="absolute bottom-20 left-1/2 h-24 w-20 -translate-x-1/2 rounded-t border border-burnished-gold/38 bg-stone-400/88" />
          <div className="absolute bottom-8 left-8 h-20 w-12 rounded-t border border-burnished-gold/30 bg-stone-600/86" />
          <div className="absolute bottom-8 right-8 h-20 w-12 rounded-t border border-burnished-gold/30 bg-stone-600/86" />
          <div className="absolute bottom-0 left-1/2 h-8 w-64 -translate-x-1/2 rounded-full bg-black/38 blur-md" />
        </div>
      ) : null}

      {showAnchor
        ? tile.anchors.map((anchor) => (
            <button
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burnished-gold bg-ink/82 px-3 py-2 text-xs font-semibold text-burnished-gold shadow-[0_0_28px_rgba(212,168,77,0.36)]"
              data-engine-anchor={anchor.locationId}
              key={anchor.id}
              style={{ left: `${anchor.xPercent}%`, top: `${anchor.yPercent}%` }}
              type="button"
            >
              {anchor.label}
            </button>
          ))
        : null}

      {showWeather ? (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.18),transparent_16%),linear-gradient(115deg,rgba(255,255,255,0.10),transparent_45%,rgba(255,255,255,0.08))]"
          data-engine-layer="weather"
        />
      ) : null}
    </section>
  );
}
```

- [ ] **Step 5: Implement inspector**

Create `apps/westeros-map/src/components/engine-lab/EngineAssetInspector.tsx`:

```tsx
import type { EngineLayer, EngineTerrainTile } from "@/types";

type EngineAssetInspectorProps = {
  tile: EngineTerrainTile;
  enabledLayers: EngineLayer[];
};

export function EngineAssetInspector({
  enabledLayers,
  tile,
}: EngineAssetInspectorProps) {
  return (
    <aside
      className="w-[360px] shrink-0 overflow-hidden rounded border border-burnished-gold/28 bg-panel/74 p-5"
      data-engine-asset-inspector
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-burnished-gold">
        Asset Manifest
      </p>
      <h2 className="mt-2 text-xl font-semibold text-aged-paper">{tile.title}</h2>
      <p className="mt-3 text-sm leading-6 text-aged-paper/68">{tile.summary}</p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="rounded border border-aged-paper/14 bg-ink/28 p-3">
          <dt className="text-aged-paper/48">Source Tool</dt>
          <dd className="mt-1 font-semibold text-aged-paper">{tile.sourceTool}</dd>
        </div>
        <div className="rounded border border-aged-paper/14 bg-ink/28 p-3">
          <dt className="text-aged-paper/48">Export Format</dt>
          <dd className="mt-1 font-semibold text-aged-paper">{tile.exportFormat}</dd>
        </div>
        <div className="rounded border border-aged-paper/14 bg-ink/28 p-3">
          <dt className="text-aged-paper/48">Enabled Layers</dt>
          <dd className="mt-1 font-semibold text-aged-paper">
            {enabledLayers.length} / {tile.layers.length}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-burnished-gold">Production Notes</h3>
        <ul className="mt-3 space-y-2 text-xs leading-5 text-aged-paper/64">
          {tile.productionNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
```

- [ ] **Step 6: Run route smoke check**

Run:

```bash
npm run typecheck
npm run lint
```

Expected: both exit 0.

## Task 4: Add Navigation and E2E Coverage

**Files:**
- Modify: `apps/westeros-map/src/components/layout/SideNav.tsx`
- Modify: `apps/westeros-map/tests/e2e/map.spec.ts`

- [ ] **Step 1: Inspect SideNav**

Run:

```bash
sed -n '1,220p' src/components/layout/SideNav.tsx
```

Expected: identify the existing navigation array or JSX structure.

- [ ] **Step 2: Add a lab nav entry**

Add a visible entry labeled `资产实验室` or `Engine Lab` that links to `/engine-lab`. Follow the existing SideNav pattern. Do not remove existing navigation entries.

- [ ] **Step 3: Add E2E test**

Append a Playwright test to `apps/westeros-map/tests/e2e/map.spec.ts`:

```ts
test("renders the V1.8 engine asset lab validation surface", async ({ page }) => {
  await page.goto("/engine-lab");

  await expect(page.locator("[data-engine-lab]")).toBeVisible();
  await expect(page.getByRole("heading", { name: /北境 \\/ 临冬城沙盘资产管线验证/ })).toBeVisible();
  await expect(page.locator("[data-engine-tile='tile-north-winterfell-v1']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='terrain']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='landmark']")).toBeVisible();
  await expect(page.locator("[data-engine-anchor='winterfell']")).toBeVisible();
  await expect(page.locator("[data-engine-asset-inspector"])).toBeVisible();

  await page.locator("[data-engine-layer-toggle='weather']").click();
  await expect(page.locator("[data-engine-layer='weather']")).toHaveCount(0);
});
```

If the exact heading regex is hard to escape, use:

```ts
await expect(page.getByText("北境 / 临冬城沙盘资产管线验证")).toBeVisible();
```

- [ ] **Step 4: Run E2E**

Run:

```bash
npm run test:e2e
```

Expected: all existing tests plus the new engine lab test pass.

## Task 5: Update Docs and Loop Status

**Files:**
- Modify: `docs/westeros-interactive-map/WESTEROS_GEOGRAPHY_KNOWLEDGE_BASE.md`
- Modify: `docs/westeros-interactive-map/ASSET_MANIFEST.md`
- Modify: `docs/westeros-interactive-map/PRIVATE_REFERENCE_REGISTER.md`
- Modify: `docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/ACCEPTANCE_CHECKS.json`
- Modify: `docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/OPERATOR_STATUS.md`
- Modify: `docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/PROGRESS.md`

- [ ] **Step 1: Update knowledge base**

Add execution evidence under section `13. V1.8 引擎资产管线验证`:

```markdown
### 13.7 V1.8 执行证据

- Engine Asset Lab route: `/engine-lab`
- Sample tile id: `tile-north-winterfell-v1`
- Sample anchor: `winterfell`
- Current runtime: Web-authored validation surface
- Future export targets: glTF / GLB / PNG tile / sprite atlas / heightmap
```

- [ ] **Step 2: Update asset manifest**

Add a row documenting the validation tile manifest:

```markdown
| asset-engine-lab-winterfell-tile-v1 | apps/westeros-map/src/data/mock/engineAssetLab.ts | 北境 / 临冬城沙盘资产管线样例 V1 | terrain-tile / validation | mock / procedural / future-engine-authored | Codex + future engine asset pipeline | 否 | 否 | winterfell / region-north | V1.8 标准验证样例，用于定义 TerrainTile、LandmarkPrefab、MaterialSet、RouteLayer、WaterLayer、ForestLayer、WeatherPreset、MapAnchor 等未来资产单元。 | 低风险；当前为代码生成验证，不含第三方模型。 |
```

- [ ] **Step 3: Update acceptance checks**

Set these checks to `passing` with concrete evidence:

- `ENG-003`
- `ENG-004`
- `ENG-005`
- `ENG-006`
- `ENG-007`
- `ENG-008`
- `ENG-009`

Leave screenshot and final verification checks pending until screenshots and full verification are complete.

- [ ] **Step 4: Run JSON validation**

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('docs/westeros-interactive-map/loop-v1-8-engine-asset-pipeline/ACCEPTANCE_CHECKS.json','utf8')); console.log('ok')"
```

Expected: prints `ok`.

## Task 6: Final Verification and Screenshots

**Files:**
- Create screenshots under `apps/westeros-map/test-results/visual-v1-8-engine-asset-pipeline/`
- Modify V1.8 status docs with final evidence.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:e2e
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Capture screenshots**

Capture:

```text
apps/westeros-map/test-results/visual-v1-8-engine-asset-pipeline/1440x900-engine-lab.png
apps/westeros-map/test-results/visual-v1-8-engine-asset-pipeline/1920x1080-engine-lab.png
apps/westeros-map/test-results/visual-v1-8-engine-asset-pipeline/1440x900-engine-lab-weather-off.png
```

- [ ] **Step 3: Update final loop status**

Update `ACCEPTANCE_CHECKS.json` so `ENG-010` and `ENG-011` are passing.

Set `ENG-012` to passing with this recommendation unless implementation evidence contradicts it:

```text
Continue engine-authored web runtime validation. Keep the production site as high-fidelity Web 2.5D while using engine / 3D tools as an asset authoring pipeline. Do not migrate the whole project to Unity / Unreal runtime yet.
```

- [ ] **Step 4: Final response**

Report:

- Lab URL: `http://localhost:3000/engine-lab`
- Current recommendation.
- Verification commands and results.
- Screenshots.
- Remaining risk.

