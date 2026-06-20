import { MapBackground } from "./MapBackground";
import { MapNodeLayer } from "./MapNodeLayer";
import { MapViewport } from "./MapViewport";
import { WeatherLayer } from "./WeatherLayer";

export function WorldMap() {
  return (
    <MapViewport>
      <MapBackground imageUrl="/assets/westeros/generated/v17/westeros-sandtable-map-v4-terrain.png" />
      <MapNodeLayer />
      <WeatherLayer />
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 rounded border border-burnished-gold/28 bg-ink/50 px-4 py-3 text-panel-foreground shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-burnished-gold/82">
          Westeros Sandtable
        </p>
        <h2 className="mt-1 text-lg font-semibold">维斯特洛大陆</h2>
      </div>
    </MapViewport>
  );
}
