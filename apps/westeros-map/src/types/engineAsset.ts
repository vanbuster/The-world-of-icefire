export type EngineAssetSourceTool =
  | "unity"
  | "unreal"
  | "blender"
  | "spline"
  | "threejs-procedural"
  | "ai-generated"
  | "manual-web";

export type EngineAssetExportFormat =
  | "gltf"
  | "glb"
  | "png-tile"
  | "sprite-atlas"
  | "heightmap"
  | "procedural-css"
  | "procedural-canvas";

export type EngineLayerKind =
  | "terrain"
  | "landmark"
  | "forest"
  | "route"
  | "water"
  | "weather"
  | "anchor";

export type EngineAssetRiskLevel = "low" | "medium" | "high";

export type EngineMaterialSet = {
  id: string;
  name: string;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  swatches: string[];
  texturePaths: string[];
  notes: string;
};

export type EngineLayer = {
  id: string;
  kind: EngineLayerKind;
  name: string;
  description: string;
  enabledByDefault: boolean;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  publicAssetPath?: string;
  sourceAssetPath?: string;
};

export type EngineMapAnchor = {
  id: string;
  locationId: string;
  label: string;
  xPercent: number;
  yPercent: number;
  zHint: number;
  scale: number;
  rotationDeg: number;
};

export type EngineTerrainTile = {
  id: string;
  title: string;
  regionId: string;
  relatedLocationIds: string[];
  summary: string;
  sourceTool: EngineAssetSourceTool;
  exportFormat: EngineAssetExportFormat;
  riskLevel: EngineAssetRiskLevel;
  materialSetIds: string[];
  layers: EngineLayer[];
  anchors: EngineMapAnchor[];
  productionNotes: string[];
};
