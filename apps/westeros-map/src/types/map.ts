import type { LocationType } from "./content";

export interface CoordinatePercent {
  xPercent: number;
  yPercent: number;
}

export interface VirtualCoordinate {
  virtualX: number;
  virtualY: number;
}

export interface PixelCoordinate {
  x: number;
  y: number;
}

export interface MapTransform {
  zoom: number;
  panX: number;
  panY: number;
}

export interface ZoomRange {
  min: number;
  max: number;
}

export interface MapNodeStyle {
  iconType: string;
  nodeLevel: number;
  locationType: LocationType;
  isClickable: boolean;
  isSelected: boolean;
  isHovered: boolean;
}

export type MapLayerType =
  | "region"
  | "road"
  | "river"
  | "mountain"
  | "forest"
  | "wall"
  | "sea"
  | "label";

export interface MapLayer {
  id: string;
  name: string;
  layerType: MapLayerType;
  geometryType: "raster" | "svg" | "path" | "points";
  assetId?: string;
  zIndex: number;
  visibleByDefault: boolean;
  visibleZoomRange?: ZoomRange;
  styleToken?: string;
  status: "draft" | "published";
}

export type WeatherType = "cloud" | "fog" | "snow" | "smoke" | "ash";

export interface WeatherLayer {
  id: string;
  name: string;
  weatherType: WeatherType;
  regionIds: string[];
  intensity: "low" | "medium" | "high";
  animationMode: "css" | "canvas" | "static";
  assetId?: string;
  visibleByDefault: boolean;
  reducedMotionFallback: "hidden" | "static" | "reduced";
  status: "draft" | "published";
}

export interface MapViewportSize {
  width: number;
  height: number;
}
