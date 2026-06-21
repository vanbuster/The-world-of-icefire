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
        <div className="absolute inset-0" data-engine-layer="forest">
          <div className="absolute left-[10%] top-[28%] h-[26%] w-[28%] rounded-full bg-emerald-950/72 blur-[2px]" />
          <div className="absolute left-[17%] top-[36%] h-[18%] w-[36%] rounded-full bg-green-900/56 blur-[3px]" />
          <div className="absolute left-[8%] top-[48%] h-[16%] w-[24%] rounded-full bg-slate-900/70 blur-[2px]" />
        </div>
      ) : null}

      {showRoute ? (
        <div
          className="absolute left-[24%] top-[21%] h-[66%] w-[4px] rounded-full bg-fog/38 shadow-[0_0_18px_rgba(217,202,166,0.3)]"
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
              style={{
                left: `${anchor.xPercent}%`,
                top: `${anchor.yPercent}%`,
              }}
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
