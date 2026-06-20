import { BookOpen, Compass, Crown, MapPinned } from "lucide-react";

import { AssetGallery } from "@/components/gallery/AssetGallery";
import { CharacterGrid } from "@/components/character/CharacterGrid";
import { HouseBadge } from "@/components/house/HouseBadge";
import { Timeline } from "@/components/timeline/Timeline";
import type { LocationDetailViewModel } from "@/types";

import { LocalMap } from "./LocalMap";

type LocationPanelProps = {
  location: LocationDetailViewModel;
};

export function LocationPanel({ location }: LocationPanelProps) {
  return (
    <div
      className="min-h-0 flex-1 overflow-y-auto p-5"
      data-location-detail={location.id}
      data-location-detail-level={location.detailLevel}
      data-winterfell-detail={location.id === "winterfell" ? true : undefined}
    >
      <section className="rounded border border-burnished-gold/28 bg-ink/24 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-burnished-gold">
          {location.detailLevel === "preview" ? "V1 预览条目" : location.sourceSummary}
        </p>
        <p className="mt-3 text-sm leading-7 text-fog">{location.intro}</p>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-3" data-winterfell-facts>
        <div className="rounded border border-dark-gold/22 bg-ink/26 p-3">
          <p className="flex items-center gap-2 text-xs text-fog/60">
            <Compass size={13} strokeWidth={1.8} />
            地理位置
          </p>
          <p className="mt-2 text-sm leading-6 text-panel-foreground">
            {location.geography ?? "待补充"}
          </p>
        </div>
        <div className="rounded border border-dark-gold/22 bg-ink/26 p-3">
          <p className="flex items-center gap-2 text-xs text-fog/60">
            <Crown size={13} strokeWidth={1.8} />
            政治归属
          </p>
          <p className="mt-2 text-sm leading-6 text-panel-foreground">
            {location.politicalStatus ?? "待补充"}
          </p>
        </div>
        <div className="rounded border border-dark-gold/22 bg-ink/26 p-3">
          <p className="flex items-center gap-2 text-xs text-fog/60">
            <MapPinned size={13} strokeWidth={1.8} />
            所属区域
          </p>
          <p className="mt-2 text-sm leading-6 text-panel-foreground">
            {location.region ?? "未标记"}
          </p>
        </div>
      </section>

      <div className="mt-5 space-y-5">
        <LocalMap
          asset={location.localMap}
          locationName={location.nameZh}
          regionName={location.region}
        />

        <section className="space-y-3" data-winterfell-houses>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-panel-foreground">
              相关家族
            </h3>
            <span className="text-xs text-fog/58">
              {location.relatedHouses.length} 个
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {location.relatedHouses.map((house) => (
              <HouseBadge house={house} key={house.id} />
            ))}
          </div>
        </section>

        <Timeline items={location.timelineItems} locationId={location.id} />
        <CharacterGrid characters={location.relatedCharacters} />
        <AssetGallery assets={location.galleryAssets} />

        <section className="rounded border border-dark-gold/22 bg-ink/26 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-panel-foreground">
            <BookOpen size={14} strokeWidth={1.8} />
            相关故事线入口
          </p>
          <p className="mt-3 text-xs leading-6 text-fog">
            北境主线、史塔克家族线、五王之战、剧集线北境收复。后续版本会将故事线独立成可点击入口。
          </p>
        </section>
      </div>
    </div>
  );
}
