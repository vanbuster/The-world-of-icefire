import type { EngineMaterialSet, EngineTerrainTile } from "@/types";

export const engineMaterialSets: EngineMaterialSet[] = [
  {
    id: "material-north-winter-v1",
    name: "Northern Winter Sandtable Materials V1",
    sourceTool: "ai-generated",
    exportFormat: "png-tile",
    swatches: ["#d7d9cf", "#8b8d83", "#3d453c", "#232826", "#b7a36a"],
    texturePaths: [],
    notes:
      "Placeholder material set for snow, grey stone, pine forest, frozen road, and aged gold UI trim. Future versions can be authored in Unity, Unreal, Blender, or Spline.",
  },
];

export const engineTerrainTiles: EngineTerrainTile[] = [
  {
    id: "tile-north-winterfell-v1",
    title: "North / Winterfell Sandtable Tile V1",
    regionId: "region-north",
    relatedLocationIds: ["winterfell"],
    summary:
      "A V1.8 validation tile for testing modular terrain, landmark, forest, route, water, weather, and anchor layers around Winterfell.",
    sourceTool: "threejs-procedural",
    exportFormat: "procedural-css",
    riskLevel: "medium",
    materialSetIds: ["material-north-winter-v1"],
    layers: [
      {
        id: "layer-north-terrain",
        kind: "terrain",
        name: "Snowfield Relief",
        description: "Layered snow and grey-green terrain relief for the North.",
        enabledByDefault: true,
        sourceTool: "threejs-procedural",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-winterfell-landmark",
        kind: "landmark",
        name: "Winterfell Landmark Prefab",
        description:
          "Grey stone castle landmark placeholder for future engine-authored prefab replacement.",
        enabledByDefault: true,
        sourceTool: "ai-generated",
        exportFormat: "png-tile",
      },
      {
        id: "layer-wolfswood-forest",
        kind: "forest",
        name: "Wolfswood Edge",
        description: "Pine forest clusters west of Winterfell.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-kingsroad-route",
        kind: "route",
        name: "Kingsroad North Segment",
        description: "Subtle road curve used to test route layer editability.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-white-knife-water",
        kind: "water",
        name: "White Knife Hint",
        description: "Frozen river hint used to validate future WaterLayer data.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "layer-northern-snow-weather",
        kind: "weather",
        name: "Northern Snow Haze",
        description:
          "Light snow and fog overlay for atmosphere and performance testing.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
      {
        id: "anchor-winterfell",
        kind: "anchor",
        name: "Winterfell Location Anchor",
        description:
          "Clickable anchor linking the tile back to the existing Winterfell detail model.",
        enabledByDefault: true,
        sourceTool: "manual-web",
        exportFormat: "procedural-css",
      },
    ],
    anchors: [
      {
        id: "anchor-winterfell",
        locationId: "winterfell",
        label: "临冬城",
        xPercent: 52,
        yPercent: 44,
        zHint: 0.34,
        scale: 1,
        rotationDeg: -8,
      },
    ],
    productionNotes: [
      "This is a web-authored validation stand-in for a future Unity / Unreal / Blender tile.",
      "Each layer is replaceable by a future glTF, GLB, PNG tile, sprite atlas, or heightmap export.",
      "The goal is to validate asset boundaries before investing in full engine production.",
    ],
  },
];
