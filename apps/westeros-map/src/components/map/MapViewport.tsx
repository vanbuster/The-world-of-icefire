"use client";

import type { PointerEvent, ReactNode, WheelEvent } from "react";
import { useRef, useState } from "react";
import {
  CircleOff,
  Cloud,
  Move,
  Minus,
  Plus,
  RotateCcw,
  Snowflake,
} from "lucide-react";

import { mapTransformToCss } from "@/lib/map/transform";
import { type WeatherIntensity, useMapStore } from "@/stores/mapStore";

type MapViewportProps = {
  children: ReactNode;
};

export function MapViewport({ children }: MapViewportProps) {
  const zoom = useMapStore((state) => state.zoom);
  const panX = useMapStore((state) => state.panX);
  const panY = useMapStore((state) => state.panY);
  const zoomIn = useMapStore((state) => state.zoomIn);
  const zoomOut = useMapStore((state) => state.zoomOut);
  const setZoom = useMapStore((state) => state.setZoom);
  const offsetPan = useMapStore((state) => state.offsetPan);
  const resetView = useMapStore((state) => state.resetView);
  const weatherIntensity = useMapStore((state) => state.weatherIntensity);
  const setWeatherIntensity = useMapStore((state) => state.setWeatherIntensity);
  const [isDragging, setIsDragging] = useState(false);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  const transform = { zoom, panX, panY };
  const zoomTier = zoom >= 2.2 ? "max" : zoom >= 1.5 ? "near" : "wide";

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const target = event.target;

    if (target instanceof Element && target.closest("button")) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!lastPointerRef.current) {
      return;
    }

    const deltaX = event.clientX - lastPointerRef.current.x;
    const deltaY = event.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    offsetPan(deltaX, deltaY);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (lastPointerRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    lastPointerRef.current = null;
    setIsDragging(false);
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    setZoom(zoom + (event.deltaY < 0 ? 0.12 : -0.12));
  }

  const weatherControls: Array<{
    icon: typeof Snowflake;
    label: string;
    mode: WeatherIntensity;
  }> = [
    { icon: Snowflake, label: "强天气层", mode: "high" },
    { icon: Cloud, label: "低天气层", mode: "low" },
    { icon: CircleOff, label: "关闭天气层", mode: "off" },
  ];

  return (
    <div
      className={[
        "sandtable-viewport relative h-full min-h-[620px] overflow-hidden bg-ink",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      ].join(" ")}
      data-map-dragging={isDragging}
      data-map-viewport
      data-sandtable-zoom-tier={zoomTier}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      <div className="pointer-events-none absolute left-5 top-5 z-20 rounded border border-aged-paper/35 bg-parchment/62 px-3 py-2 text-xs font-medium uppercase tracking-[0.22em] text-faded-ink">
        Sandtable Viewport
      </div>
      <div className="absolute right-5 top-5 z-30 flex items-center gap-2 rounded border border-dark-gold/32 bg-panel/82 p-1 text-fog shadow-[0_12px_28px_rgba(21,17,13,0.34)]">
        <div className="flex items-center gap-1 border-r border-dark-gold/25 pr-1">
          {weatherControls.map(({ icon: Icon, label, mode }) => {
            const isActive = weatherIntensity === mode;

            return (
              <button
                aria-label={label}
                className={[
                  "grid h-8 w-8 place-items-center rounded transition hover:bg-dark-gold/22 hover:text-burnished-gold",
                  isActive ? "bg-dark-gold/28 text-burnished-gold" : "text-fog",
                ].join(" ")}
                data-weather-control={mode}
                data-weather-control-active={isActive}
                key={mode}
                onClick={() => setWeatherIntensity(mode)}
                title={label}
                type="button"
              >
                <Icon size={15} strokeWidth={1.9} />
              </button>
            );
          })}
        </div>
        <button
          aria-label="放大地图"
          className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/22 hover:text-burnished-gold"
          data-map-zoom-in
          onClick={zoomIn}
          type="button"
        >
          <Plus size={15} strokeWidth={1.9} />
        </button>
        <button
          aria-label="缩小地图"
          className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/22 hover:text-burnished-gold"
          data-map-zoom-out
          onClick={zoomOut}
          type="button"
        >
          <Minus size={15} strokeWidth={1.9} />
        </button>
        <button
          aria-label="重置地图视图"
          className="grid h-8 w-8 place-items-center rounded text-fog transition hover:bg-dark-gold/22 hover:text-burnished-gold"
          data-map-reset
          onClick={resetView}
          type="button"
        >
          <RotateCcw size={15} strokeWidth={1.9} />
        </button>
        <div className="flex h-8 items-center gap-1 rounded border border-dark-gold/22 bg-ink/35 px-2 text-[11px] tabular-nums text-fog">
          <Move size={13} strokeWidth={1.9} />
          <span data-map-zoom-label>{Math.round(zoom * 100)}%</span>
        </div>
      </div>
      <div
        className="sandtable-transform relative h-full min-h-[620px] overflow-hidden transition-transform duration-150 ease-out"
        data-map-transform-layer
        style={{
          transform: mapTransformToCss(transform),
          transformOrigin: "50% 50%",
        }}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 sandtable-glass" />
    </div>
  );
}
