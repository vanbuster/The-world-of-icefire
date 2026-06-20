# Westeros V1.8 Engine Asset Pipeline Design

## 1. Purpose

V1.8 validates whether the map should evolve from a single generated 2.5D background into a modular asset pipeline:

```text
Engine / 3D tools author assets -> Web runtime displays and interacts -> CMS manages content and metadata
```

The user prefers this direction because engine-authored maps can have stronger material quality, local editability, and more playful interaction than flat images. At the same time, the user has no modeling or engine background, so V1.8 must avoid making full Unity / Unreal production knowledge a prerequisite.

## 2. Decision

Use C方案 as the V1.8 main path:

- Unity / Unreal / Blender / Spline or equivalent 3D tools are treated as asset authoring tools.
- Next.js remains the main product shell and deployment target.
- Payload CMS remains the long-term content management target.
- Three.js / React Three Fiber / PixiJS are candidate web runtime layers for later execution.
- Unity WebGL is a small validation branch, not the default migration.

## 3. Validation Region

The V1.8 sample region is:

```text
North / Winterfell sandtable tile
```

Reasons:

- Winterfell is already the MVP detail location.
- Existing data includes location, characters, events, houses, local map, and event art.
- The North validates snow, pine forest, grey stone castle, roads, river hints, fog, and localized weather.
- The scope is small enough to evaluate pipeline quality without rebuilding all Westeros.

## 4. Success Questions

V1.8 must answer:

1. Does an engine-authored / 3D-authored asset look meaningfully better than the V4 generated map?
2. Can terrain, landmark, road, forest, water, material, and weather elements be replaced independently?
3. Can the web app load the sample asset without breaking the current V1.7 map?
4. Can the sample asset connect to existing location anchors and detail panel behavior?
5. Can CMS metadata represent source files, exported files, coordinates, materials, and versioning?
6. Can a non-modeler user continue producing assets through AI, templates, procedural tools, or simple 3D tools?
7. Should the next milestone go deeper into engine-authored web runtime, Unity WebGL, or refined 2.5D web?

## 5. Non-Goals

V1.8 does not:

- Build the full Westeros map in Unity or Unreal.
- Replace the current V1.7 map as the production home screen.
- Add character control, combat, economy, or game systems.
- Require the user to manually model complex assets.
- Perform a public deployment.
- Complete copyright readiness for public release.

## 6. Proposed Product Surface

Add an experimental route or panel named:

```text
Engine Asset Lab
```

This surface should:

- Explain that it is a V1.8 experiment.
- Show the North / Winterfell sample tile.
- Show modular layers: terrain, landmark, forest, road, water, weather.
- Show at least one location anchor linked to the existing Winterfell detail behavior.
- Show asset metadata in a compact inspector.
- Leave the V1.7 main map untouched.

## 7. Asset Model

V1.8 should define these conceptual asset units:

| Unit | Meaning |
|---|---|
| TerrainTile | A bounded terrain module, such as North snowfield or Wolfswood edge. |
| LandmarkPrefab | A landmark asset, such as Winterfell castle. |
| MaterialSet | Reusable material group for snow, stone, wood, river, gold trim, fog. |
| RouteLayer | Roads and paths, including kingsroad and local roads. |
| WaterLayer | Rivers, lakes, and coastlines. |
| ForestLayer | Tree clusters and forest masks. |
| WeatherPreset | Snow, fog, cloud shadow, smoke, storm. |
| MapAnchor | 2D / 3D coordinate anchor linked to CMS Location records. |

## 8. Technical Direction

Initial implementation should prefer a low-risk web validation:

- Keep current Next.js app.
- Add a V1.8 lab route or component.
- Use generated/procedural assets first if no engine runtime is available.
- Store a manifest describing the sample tile and layers.
- Use CSS/Canvas/SVG/Three-compatible structure so the implementation can later migrate to Three.js or engine-exported glTF.
- Do not add Unity or Unreal project files unless the environment is confirmed.

If adding dependencies:

- Prefer one focused runtime dependency at a time.
- Three.js / React Three Fiber may be used for web 3D.
- PixiJS may be used for high-performance 2.5D sprites and layers.
- Avoid adding both major runtimes in the same first pass.

## 9. CMS Direction

V1.8 does not need a full CMS migration, but it must specify fields for future collections:

- `TerrainTiles`
- `LandmarkPrefabs`
- `MaterialSets`
- `MapAnchors`
- `RouteLayers`
- `WaterLayers`
- `ForestLayers`
- `WeatherPresets`

Each should track:

- title
- slug
- source file
- exported file
- related location / region
- version
- source type
- license status
- AI generated flag
- derivative flag
- author / tool
- notes

## 10. Acceptance Criteria

- V1.8 loop is active.
- Design and implementation plan exist.
- Geography knowledge base and project constraints mention the V1.8 route.
- Engine Asset Lab exists or is explicitly planned as the first execution task.
- Sample asset pipeline can represent terrain, landmark, route, water, forest, weather, and anchor layers.
- Existing V1.7 main map remains intact.
- Final recommendation states whether to continue engine-authored web runtime, Unity WebGL, or high-fidelity 2.5D web.

## 11. Recommended Next Step

Create a bite-sized implementation plan for a first standard validation:

1. Add V1.8 asset model types and mock manifest.
2. Add a lab route or panel.
3. Build a North / Winterfell tile view using generated/procedural modular layers.
4. Connect one Winterfell anchor to existing detail behavior.
5. Add tests and screenshots.
6. Update docs and decide the next architecture path.

