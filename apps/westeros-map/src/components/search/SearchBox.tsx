"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { getFrontendContentSnapshot } from "@/lib/cms/dataSource";
import { useMapStore } from "@/stores/mapStore";
import type { MapLocationViewModel } from "@/types";

function matchLocation(location: MapLocationViewModel, query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return false;
  }

  return (
    location.nameZh.toLowerCase().includes(normalized) ||
    location.nameEn.toLowerCase().includes(normalized) ||
    location.houseNames.some((house) => house.toLowerCase().includes(normalized)) ||
    location.regionName?.toLowerCase().includes(normalized)
  );
}

export function SearchBox() {
  const locations = useMemo(
    () => getFrontendContentSnapshot().mapLocations,
    [],
  );
  const openLocationPanel = useMapStore((state) => state.openLocationPanel);
  const showPendingLocation = useMapStore((state) => state.showPendingLocation);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(
    () => locations.filter((location) => matchLocation(location, query)).slice(0, 6),
    [locations, query],
  );

  function selectLocation(location: MapLocationViewModel) {
    if (location.isClickable) {
      openLocationPanel(location.id);
    } else {
      showPendingLocation(location.id);
    }

    setQuery("");
    setIsFocused(false);
  }

  const shouldShowResults = isFocused && query.trim().length > 0;

  return (
    <div className="relative w-[460px]" data-search-box>
      <div className="flex h-10 items-center gap-3 rounded border border-dark-gold/35 bg-ink/55 px-3 text-sm text-fog">
        <Search size={16} className="text-burnished-gold" strokeWidth={1.8} />
        <input
          aria-label="搜索地点"
          className="min-w-0 flex-1 bg-transparent text-sm text-panel-foreground outline-none placeholder:text-fog/58"
          data-search-input
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder="百科检索：地点、人物、事件、家族"
          value={query}
        />
        <span className="rounded border border-dark-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-burnished-gold">
          Search
        </span>
      </div>

      {shouldShowResults ? (
        <div
          className="absolute left-0 right-0 top-12 z-50 rounded border border-dark-gold/35 bg-panel/96 p-2 shadow-[0_18px_46px_rgba(21,17,13,0.52)] backdrop-blur"
          data-search-results
        >
          <div className="border-b border-dark-gold/20 px-3 pb-2 pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-burnished-gold">
              Westeros Index
            </p>
            <p className="mt-1 text-xs text-fog/58">
              V1 先检索地点；后续扩展人物、事件、家族与故事线。
            </p>
          </div>
          {results.length > 0 ? (
            results.map((location) => (
              <button
                className="flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-left text-sm text-fog transition hover:bg-dark-gold/16 hover:text-panel-foreground"
                data-search-result={location.id}
                key={location.id}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectLocation(location)}
                type="button"
              >
                <span>
                  <span className="block font-medium">{location.nameZh}</span>
                  <span className="mt-0.5 block text-xs text-fog/58">
                    {location.nameEn} / {location.regionName ?? "未标记区域"}
                  </span>
                </span>
                <span className="rounded border border-dark-gold/22 px-2 py-0.5 text-[10px] text-burnished-gold">
                  {location.statusLabel}
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-fog/68" data-search-empty>
              未找到匹配地点
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
