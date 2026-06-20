import type {
  AssetType,
  CanonLevel,
  LocationDetailLevel,
  LocationType,
  RiskLevel,
  SourceType,
} from "./content";

export interface SourceLabelViewModel {
  sourceType: SourceType;
  label: string;
  description: string;
}

export interface CanonLabelViewModel {
  canonLevel: CanonLevel;
  label: string;
  description: string;
}

export interface HouseBadgeViewModel {
  id: string;
  nameZh: string;
  nameEn: string;
  sigilDescription: string;
  sigilAssetPath?: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface CharacterCardViewModel {
  id: string;
  nameZh: string;
  nameEn: string;
  house?: HouseBadgeViewModel;
  titles: string[];
  shortBio: string;
  portraitAssetPath?: string;
  sourceLabel: SourceLabelViewModel;
  canonLabel: CanonLabelViewModel;
}

export interface AssetViewModel {
  id: string;
  title: string;
  assetType: AssetType;
  src: string;
  alt: string;
  caption?: string;
  isAIGenerated: boolean;
  isDerivative: boolean;
  sourceLabel: string;
  riskLevel: RiskLevel;
}

export interface TimelineItemViewModel {
  id: string;
  title: string;
  summary: string;
  description: string;
  order: number;
  displayDate?: string;
  sourceLabel: SourceLabelViewModel;
  canonLabel: CanonLabelViewModel;
  asset?: AssetViewModel;
  relatedCharacters: CharacterCardViewModel[];
  relatedHouses: HouseBadgeViewModel[];
}

export interface MapLocationViewModel {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  type: LocationType;
  regionName?: string;
  houseNames: string[];
  xPercent: number;
  yPercent: number;
  virtualX: number;
  virtualY: number;
  iconType: string;
  nodeLevel: number;
  detailLevel: LocationDetailLevel;
  isClickable: boolean;
  statusLabel: string;
}

export interface LocationDetailViewModel {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  type: LocationType;
  region?: string;
  politicalStatus?: string;
  geography?: string;
  intro: string;
  detailLevel: LocationDetailLevel;
  relatedHouses: HouseBadgeViewModel[];
  relatedCharacters: CharacterCardViewModel[];
  timelineItems: TimelineItemViewModel[];
  galleryAssets: AssetViewModel[];
  localMap?: AssetViewModel;
  sourceSummary: string;
}
