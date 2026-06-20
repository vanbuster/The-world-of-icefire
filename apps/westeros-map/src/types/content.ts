export type SourceType =
  | "novel"
  | "show"
  | "show-canon"
  | "mixed"
  | "original-note";

export type CanonLevel =
  | "book-canon"
  | "show-canon"
  | "mixed-canon"
  | "fan-interpretation";

export type PublishStatus = "draft" | "published";

export type LocationDetailLevel = "full" | "preview" | "node-only";

export type LocationType =
  | "castle"
  | "city"
  | "region"
  | "fortress"
  | "port"
  | "sea"
  | "road"
  | "river"
  | "mountain"
  | "forest"
  | "wall"
  | "other";

export type AssetType =
  | "map-base"
  | "local-map"
  | "event-art"
  | "character-art"
  | "house-sigil"
  | "texture"
  | "weather"
  | "ui"
  | "reference";

export type AssetSourceType =
  | "original"
  | "ai-generated"
  | "redrawn-reference"
  | "open-license"
  | "public-reference"
  | "other";

export type AssetLicenseStatus =
  | "original"
  | "open-license"
  | "ai-generated"
  | "reference-only"
  | "unknown";

export type RiskLevel = "low" | "medium" | "high";

export interface SourceReference {
  id: string;
  title: string;
  url?: string;
  sourceParty?: string;
  author?: string;
  accessedAt?: string;
  usageType: "fact" | "visual-reference" | "asset-source" | "license";
  relatedEntityType?: ContentEntityType;
  relatedEntityId?: string;
  notes?: string;
  riskLevel: RiskLevel;
}

export type ContentEntityType =
  | "location"
  | "region"
  | "house"
  | "character"
  | "event"
  | "asset"
  | "storyline"
  | "mapLayer"
  | "weatherLayer";

export interface PublishableEntity {
  id: string;
  slug: string;
  status: PublishStatus;
  sourceType: SourceType;
  canonLevel: CanonLevel;
}

export interface Region extends PublishableEntity {
  nameZh: string;
  nameEn: string;
  type: "kingdom" | "province" | "landform" | "sea" | "frontier";
  description: string;
  dominantHouseId?: string;
  locationIds: string[];
  mapBounds?: MapBounds;
}

export interface MapBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface House extends PublishableEntity {
  nameZh: string;
  nameEn: string;
  motto?: string;
  sigilDescription: string;
  sigilAssetId?: string;
  primaryColor: string;
  secondaryColor: string;
  seatLocationId?: string;
  controlledRegionIds: string[];
  relatedCharacterIds: string[];
  relatedEventIds: string[];
}

export interface Character extends PublishableEntity {
  nameZh: string;
  nameEn: string;
  aliases: string[];
  houseId?: string;
  titles: string[];
  shortBio: string;
  portraitAssetId?: string;
  relatedLocationIds: string[];
  relatedEventIds: string[];
}

export interface Event extends PublishableEntity {
  title: string;
  summary: string;
  description: string;
  primaryLocationId: string;
  relatedLocationIds: string[];
  relatedCharacterIds: string[];
  relatedHouseIds: string[];
  relatedAssetIds: string[];
  storylineIds: string[];
  order: number;
  eraLabel?: string;
  displayDate?: string;
  bookRefLabel?: string;
  showRefLabel?: string;
  isBookEvent: boolean;
  isShowEvent: boolean;
  isOriginalNote: boolean;
}

export interface TimelineEntry extends PublishableEntity {
  title: string;
  eventId: string;
  locationId?: string;
  storylineId?: string;
  order: number;
  displayDate?: string;
  assetId?: string;
}

export interface Storyline extends PublishableEntity {
  title: string;
  summary: string;
  description: string;
  relatedEventIds: string[];
  relatedLocationIds: string[];
  relatedCharacterIds: string[];
  relatedHouseIds: string[];
}

export interface Asset {
  id: string;
  slug: string;
  title: string;
  assetType: AssetType;
  filePath: string;
  alt: string;
  caption?: string;
  description?: string;
  sourceType: AssetSourceType;
  sourceUrl?: string;
  author?: string;
  sourceParty?: string;
  isAIGenerated: boolean;
  isDerivative: boolean;
  generationPromptSummary?: string;
  referenceNotes?: string;
  licenseStatus: AssetLicenseStatus;
  riskLevel: RiskLevel;
  usageScope: string;
  relatedLocationIds: string[];
  relatedEventIds: string[];
  relatedCharacterIds: string[];
  relatedHouseIds: string[];
  notes?: string;
  status: PublishStatus;
}

export interface Location extends PublishableEntity {
  nameZh: string;
  nameEn: string;
  aliases: string[];
  type: LocationType;
  regionId?: string;
  relatedHouseIds: string[];
  shortDescription: string;
  longDescription?: string;
  politicalStatus?: string;
  geography?: string;
  xPercent: number;
  yPercent: number;
  virtualX: number;
  virtualY: number;
  iconType: string;
  nodeLevel: number;
  visibleZoomRange?: [number, number];
  isMvpClickable: boolean;
  detailLevel?: LocationDetailLevel;
  detailSections: DetailSection[];
  relatedCharacterIds: string[];
  relatedEventIds: string[];
  relatedAssetIds: string[];
  localMapAssetId?: string;
}

export interface DetailSection {
  id: string;
  title: string;
  body: string;
  assetIds?: string[];
}
