"use client";

import { useMemo, useState } from "react";

import { getFrontendContentSnapshot } from "@/lib/cms/dataSource";
import { useMapStore } from "@/stores/mapStore";
import type { MapLocationViewModel } from "@/types";

import { MapNode } from "./MapNode";
import { MapTooltip } from "./MapTooltip";

export function MapNodeLayer() {
  const locations = useMemo(
    () => getFrontendContentSnapshot().mapLocations,
    [],
  );
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const selectedLocationId = useMapStore((state) => state.selectedLocationId);
  const pendingLocationId = useMapStore((state) => state.pendingLocationId);
  const openLocationPanel = useMapStore((state) => state.openLocationPanel);
  const showPendingLocation = useMapStore((state) => state.showPendingLocation);
  const hoveredLocation = locations.find(
    (location) => location.id === hoveredLocationId,
  );

  function handleSelect(location: MapLocationViewModel) {
    if (location.isClickable) {
      openLocationPanel(location.id);
      return;
    }

    showPendingLocation(location.id);
  }

  return (
    <div className="absolute inset-0">
      {locations.map((location) => (
        <MapNode
          isHovered={location.id === hoveredLocationId}
          isSelected={
            location.id === selectedLocationId || location.id === pendingLocationId
          }
          key={location.id}
          location={location}
          onHoverChange={setHoveredLocationId}
          onSelect={handleSelect}
        />
      ))}
      <MapTooltip location={hoveredLocation} />
    </div>
  );
}
