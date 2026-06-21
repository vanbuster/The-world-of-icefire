import type { EngineLayer, EngineMaterialSet, EngineTerrainTile } from "@/types";

type EngineAssetInspectorProps = {
  tile: EngineTerrainTile;
  enabledLayers: EngineLayer[];
  materialSets: EngineMaterialSet[];
};

export function EngineAssetInspector({
  enabledLayers,
  materialSets,
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
      <h2 className="mt-2 text-xl font-semibold text-panel-foreground">
        {tile.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-fog/72">{tile.summary}</p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="rounded border border-fog/14 bg-ink/28 p-3">
          <dt className="text-fog/48">Source Tool</dt>
          <dd className="mt-1 font-semibold text-panel-foreground">
            {tile.sourceTool}
          </dd>
        </div>
        <div className="rounded border border-fog/14 bg-ink/28 p-3">
          <dt className="text-fog/48">Export Format</dt>
          <dd className="mt-1 font-semibold text-panel-foreground">
            {tile.exportFormat}
          </dd>
        </div>
        <div className="rounded border border-fog/14 bg-ink/28 p-3">
          <dt className="text-fog/48">Enabled Layers</dt>
          <dd className="mt-1 font-semibold text-panel-foreground">
            {enabledLayers.length} / {tile.layers.length}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-burnished-gold">
          Material Sets
        </h3>
        <div className="mt-3 space-y-3">
          {materialSets.map((material) => (
            <div
              className="rounded border border-fog/14 bg-ink/24 p-3"
              key={material.id}
            >
              <p className="text-xs font-semibold text-panel-foreground">
                {material.name}
              </p>
              <div className="mt-3 flex gap-1" aria-label="material swatches">
                {material.swatches.map((swatch) => (
                  <span
                    className="h-5 w-8 rounded border border-fog/20"
                    key={swatch}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-burnished-gold">
          Production Notes
        </h3>
        <ul className="mt-3 space-y-2 text-xs leading-5 text-fog/68">
          {tile.productionNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
