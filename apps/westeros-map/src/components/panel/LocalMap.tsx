import type { AssetViewModel } from "@/types";

type LocalMapProps = {
  asset?: AssetViewModel;
  locationName: string;
  regionName?: string;
};

export function LocalMap({ asset, locationName, regionName }: LocalMapProps) {
  const isWinterfellMap = Boolean(asset?.src.includes("winterfell"));

  return (
    <section
      className="space-y-3"
      data-location-local-map={locationName}
      data-winterfell-local-map={isWinterfellMap ? true : undefined}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-panel-foreground">局部地图</h3>
        <span className="text-xs text-fog/58">{asset?.sourceLabel ?? "V1 预览"}</span>
      </div>
      <div
        className="parchment-surface map-grain relative h-48 overflow-hidden rounded border border-dark-gold/28 bg-cover bg-center"
        style={
          asset
            ? {
                backgroundImage: `linear-gradient(rgba(28,18,12,0.08), rgba(28,18,12,0.22)), url(${asset.src})`,
              }
            : undefined
        }
      >
        {isWinterfellMap ? (
          <>
            <div className="absolute left-[39%] top-[34%] rounded border border-burnished-gold/55 bg-ink/70 px-2 py-1 text-xs text-burnished-gold">
              临冬城
            </div>
            <div className="absolute left-[18%] top-[22%] rounded border border-forest-deep/35 bg-forest-deep/16 px-2 py-1 text-xs text-faded-ink">
              狼林
            </div>
            <div className="absolute bottom-[22%] right-[20%] rounded border border-sea-muted/35 bg-sea-muted/14 px-2 py-1 text-xs text-faded-ink">
              白刀河
            </div>
            <div className="absolute bottom-[30%] left-[41%] rounded border border-aged-paper/35 bg-parchment/52 px-2 py-1 text-xs text-faded-ink">
              临冬镇
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-[36%] top-[32%] rounded border border-burnished-gold/55 bg-ink/70 px-2 py-1 text-xs text-burnished-gold">
              {locationName}
            </div>
            <div className="absolute left-[14%] top-[20%] rounded border border-aged-paper/35 bg-parchment/44 px-2 py-1 text-xs text-faded-ink">
              {regionName ?? "所属区域"}
            </div>
            <div className="absolute bottom-[22%] right-[18%] rounded border border-sea-muted/35 bg-sea-muted/14 px-2 py-1 text-xs text-faded-ink">
              事件线
            </div>
            <div className="absolute bottom-[30%] left-[26%] rounded border border-dark-gold/28 bg-ink/42 px-2 py-1 text-xs text-fog">
              V1 预览地图
            </div>
          </>
        )}
      </div>
    </section>
  );
}
