import type { LocationDetailViewModel, MapLocationViewModel } from "@/types";

import {
  getLocationDetailViewModel,
  getMapLocationViewModels,
} from "@/lib/content/selectors";

export type ContentDataSource = "mock-fallback" | "payload-cms";

export type FrontendContentSnapshot = {
  source: ContentDataSource;
  mapLocations: MapLocationViewModel[];
  getLocationDetail: (id: string) => LocationDetailViewModel | undefined;
};

function shouldUsePayloadCms() {
  return process.env.NEXT_PUBLIC_CONTENT_SOURCE === "payload";
}

export function getFrontendContentSnapshot(): FrontendContentSnapshot {
  if (shouldUsePayloadCms()) {
    // Payload read queries are intentionally kept behind this boundary.
    // Until a local/production database is explicitly configured and seeded,
    // the public app falls back to published mock content.
    return {
      source: "mock-fallback",
      mapLocations: getMapLocationViewModels(),
      getLocationDetail: getLocationDetailViewModel,
    };
  }

  return {
    source: "mock-fallback",
    mapLocations: getMapLocationViewModels(),
    getLocationDetail: getLocationDetailViewModel,
  };
}
