import { Castle, MapPin } from "lucide-react";

import { virtualCoordinateToCss } from "@/lib/map/coordinates";
import type { LocationType, MapLocationViewModel } from "@/types";

const typeLabelMap = {
  castle: "城堡",
  city: "城市",
  region: "地区",
  fortress: "要塞",
  port: "港口",
  sea: "海域",
  road: "道路",
  river: "河流",
  mountain: "山脉",
  forest: "森林",
  wall: "长城",
  other: "地点",
} satisfies Record<LocationType, string>;

type MapTooltipProps = {
  location?: MapLocationViewModel;
};

export function MapTooltip({ location }: MapTooltipProps) {
  if (!location) {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute z-40 w-64 translate-x-5 -translate-y-1/2 rounded border border-burnished-gold/55 bg-panel/94 p-3 text-panel-foreground shadow-[0_18px_46px_rgba(21,17,13,0.46)] backdrop-blur"
      data-map-tooltip
      style={virtualCoordinateToCss(location)}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded border border-dark-gold/40 bg-ink/60 text-burnished-gold">
          <Castle size={15} strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-5">{location.nameZh}</p>
          <p className="mt-0.5 truncate text-xs text-fog/70">{location.nameEn}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded border border-dark-gold/20 bg-ink/34 px-2 py-1.5">
          <p className="text-fog/55">类型</p>
          <p className="mt-1 text-panel-foreground">
            {typeLabelMap[location.type]}
          </p>
        </div>
        <div className="rounded border border-dark-gold/20 bg-ink/34 px-2 py-1.5">
          <p className="text-fog/55">区域</p>
          <p className="mt-1 truncate text-panel-foreground">
            {location.regionName ?? "未标记"}
          </p>
        </div>
      </div>

      <div className="mt-2 rounded border border-dark-gold/20 bg-ink/30 px-2 py-2 text-xs">
        <p className="mb-1 flex items-center gap-1.5 text-fog/55">
          <MapPin size={12} strokeWidth={1.8} />
          关联家族
        </p>
        <p className="leading-5 text-panel-foreground">
          {location.houseNames.length > 0
            ? location.houseNames.join(" / ")
            : "暂无明确家族"}
        </p>
      </div>

      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-burnished-gold/80">
        {location.statusLabel}
      </p>
    </div>
  );
}
