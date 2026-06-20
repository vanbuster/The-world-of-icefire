import type { MapTransform } from "@/types";

export const MIN_MAP_ZOOM = 0.75;
export const MAX_MAP_ZOOM = 2.6;
export const ZOOM_STEP = 0.18;
export const PAN_LIMIT = 680;

export function clampZoom(zoom: number) {
  if (Number.isNaN(zoom)) {
    return 1;
  }

  return Math.min(MAX_MAP_ZOOM, Math.max(MIN_MAP_ZOOM, zoom));
}

export function clampPan(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(PAN_LIMIT, Math.max(-PAN_LIMIT, value));
}

export function clampTransform(transform: MapTransform): MapTransform {
  return {
    zoom: clampZoom(transform.zoom),
    panX: clampPan(transform.panX),
    panY: clampPan(transform.panY),
  };
}

export function mapTransformToCss(transform: MapTransform) {
  const clamped = clampTransform(transform);

  return `translate3d(${clamped.panX}px, ${clamped.panY}px, 0) scale(${clamped.zoom})`;
}

export function getNextZoom(currentZoom: number, direction: "in" | "out") {
  const delta = direction === "in" ? ZOOM_STEP : -ZOOM_STEP;

  return clampZoom(currentZoom + delta);
}
