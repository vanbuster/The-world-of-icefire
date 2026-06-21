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
                ? "border-burnished-gold bg-burnished-gold/18 text-panel-foreground"
                : "border-fog/18 bg-ink/36 text-fog/64 hover:border-burnished-gold/38 hover:text-panel-foreground",
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
