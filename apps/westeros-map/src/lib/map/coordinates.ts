import type { CSSProperties } from "react";

import type {
  CoordinatePercent,
  MapViewportSize,
  PixelCoordinate,
  VirtualCoordinate,
} from "@/types";

export const MAP_VIRTUAL_SIZE = 10000;
export const MAP_MIN_COORDINATE = 0;
export const MAP_MAX_COORDINATE = MAP_VIRTUAL_SIZE;

function clampCoordinate(value: number) {
  if (Number.isNaN(value)) {
    return MAP_MIN_COORDINATE;
  }

  return Math.min(MAP_MAX_COORDINATE, Math.max(MAP_MIN_COORDINATE, value));
}

function clampPercent(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, value));
}

export function virtualToPercent(
  virtualX: number,
  virtualY: number,
): CoordinatePercent {
  return {
    xPercent: (clampCoordinate(virtualX) / MAP_VIRTUAL_SIZE) * 100,
    yPercent: (clampCoordinate(virtualY) / MAP_VIRTUAL_SIZE) * 100,
  };
}

export function percentToVirtual(
  xPercent: number,
  yPercent: number,
): VirtualCoordinate {
  return {
    virtualX: (clampPercent(xPercent) / 100) * MAP_VIRTUAL_SIZE,
    virtualY: (clampPercent(yPercent) / 100) * MAP_VIRTUAL_SIZE,
  };
}

export function virtualToPixel(
  virtualX: number,
  virtualY: number,
  viewport: MapViewportSize,
): PixelCoordinate {
  const percent = virtualToPercent(virtualX, virtualY);

  return {
    x: (percent.xPercent / 100) * viewport.width,
    y: (percent.yPercent / 100) * viewport.height,
  };
}

export function pixelToVirtual(
  pixelX: number,
  pixelY: number,
  viewport: MapViewportSize,
): VirtualCoordinate {
  if (viewport.width <= 0 || viewport.height <= 0) {
    return { virtualX: 0, virtualY: 0 };
  }

  return percentToVirtual(
    (pixelX / viewport.width) * 100,
    (pixelY / viewport.height) * 100,
  );
}

export function coordinatePercentToCss(
  coordinate: CoordinatePercent,
): Pick<CSSProperties, "left" | "top"> {
  return {
    left: `${clampPercent(coordinate.xPercent)}%`,
    top: `${clampPercent(coordinate.yPercent)}%`,
  };
}

export function virtualCoordinateToCss(
  coordinate: VirtualCoordinate,
): Pick<CSSProperties, "left" | "top"> {
  return coordinatePercentToCss(
    virtualToPercent(coordinate.virtualX, coordinate.virtualY),
  );
}
