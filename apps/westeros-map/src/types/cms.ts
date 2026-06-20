import type {
  Asset,
  Character,
  Event,
  House,
  Location,
  Region,
  SourceReference,
  Storyline,
  TimelineEntry,
} from "./content";
import type { MapLayer, WeatherLayer } from "./map";

export interface CmsDocument {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CmsLocation = Location & CmsDocument;
export type CmsRegion = Region & CmsDocument;
export type CmsHouse = House & CmsDocument;
export type CmsCharacter = Character & CmsDocument;
export type CmsEvent = Event & CmsDocument;
export type CmsTimelineEntry = TimelineEntry & CmsDocument;
export type CmsStoryline = Storyline & CmsDocument;
export type CmsAsset = Asset & CmsDocument;
export type CmsMapLayer = MapLayer & CmsDocument;
export type CmsWeatherLayer = WeatherLayer & CmsDocument;
export type CmsSourceReference = SourceReference & CmsDocument;

export interface CmsCollectionResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface CmsQueryOptions {
  depth?: number;
  limit?: number;
  page?: number;
  draft?: boolean;
}

export interface CmsClientConfig {
  baseUrl: string;
  useMockFallback: boolean;
}
