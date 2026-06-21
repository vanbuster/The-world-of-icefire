"use client";

import { useMemo, useState } from "react";
import { engineMaterialSets, engineTerrainTiles } from "@/data/mock/engineAssetLab";
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
    <main
      className="min-h-screen bg-ink text-panel-foreground"
      data-engine-lab
    >
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-5 px-6 py-5">
        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="rounded border border-burnished-gold/30 bg-panel/74 p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-burnished-gold">
              V1.8 Engine Asset Lab
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-panel-foreground">
              北境 / 临冬城沙盘资产管线验证
            </h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-fog/78">
              验证 C 方案：引擎或 3D 工具负责生产可编辑地形与地标资产，网页继续负责运行、CMS、地点详情和部署。
            </p>
          </header>

          <EngineLayerToggleBar
            enabledKinds={enabledKinds}
            layers={tile.layers}
            onToggle={toggleLayer}
          />

          <EngineTileViewport enabledLayers={enabledLayers} tile={tile} />
        </section>

        <EngineAssetInspector
          enabledLayers={enabledLayers}
          materialSets={engineMaterialSets}
          tile={tile}
        />
      </div>
    </main>
  );
}
