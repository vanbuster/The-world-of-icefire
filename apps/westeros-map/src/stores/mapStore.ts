"use client";

import { create } from "zustand";

import {
  clampPan,
  clampTransform,
  getNextZoom,
  MIN_MAP_ZOOM,
  MAX_MAP_ZOOM,
} from "@/lib/map/transform";
import type { MapTransform } from "@/types";

export type WeatherIntensity = "high" | "low" | "off";

type MapStoreState = MapTransform & {
  minZoom: number;
  maxZoom: number;
  weatherIntensity: WeatherIntensity;
  selectedLocationId: string | null;
  pendingLocationId: string | null;
  isPanelOpen: boolean;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setPan: (panX: number, panY: number) => void;
  offsetPan: (deltaX: number, deltaY: number) => void;
  resetView: () => void;
  setWeatherIntensity: (intensity: WeatherIntensity) => void;
  openLocationPanel: (locationId: string) => void;
  showPendingLocation: (locationId: string) => void;
  closePanel: () => void;
};

const initialTransform: MapTransform = {
  zoom: 1,
  panX: 0,
  panY: 0,
};

export const useMapStore = create<MapStoreState>((set) => ({
  ...initialTransform,
  minZoom: MIN_MAP_ZOOM,
  maxZoom: MAX_MAP_ZOOM,
  weatherIntensity: "high",
  selectedLocationId: null,
  pendingLocationId: null,
  isPanelOpen: false,
  setZoom: (zoom) =>
    set((state) => clampTransform({ ...state, zoom })),
  zoomIn: () =>
    set((state) => clampTransform({ ...state, zoom: getNextZoom(state.zoom, "in") })),
  zoomOut: () =>
    set((state) =>
      clampTransform({ ...state, zoom: getNextZoom(state.zoom, "out") }),
    ),
  setPan: (panX, panY) =>
    set((state) => ({
      ...state,
      panX: clampPan(panX),
      panY: clampPan(panY),
    })),
  offsetPan: (deltaX, deltaY) =>
    set((state) => ({
      ...state,
      panX: clampPan(state.panX + deltaX),
      panY: clampPan(state.panY + deltaY),
    })),
  resetView: () => set(initialTransform),
  setWeatherIntensity: (weatherIntensity) => set({ weatherIntensity }),
  openLocationPanel: (locationId) =>
    set({
      selectedLocationId: locationId,
      pendingLocationId: null,
      isPanelOpen: true,
    }),
  showPendingLocation: (locationId) =>
    set({
      selectedLocationId: null,
      pendingLocationId: locationId,
      isPanelOpen: true,
    }),
  closePanel: () =>
    set({
      selectedLocationId: null,
      pendingLocationId: null,
      isPanelOpen: false,
    }),
}));
