import {
  mockAssets,
  mockCharacters,
  mockEvents,
  mockHouses,
  mockLocations,
  mockRegions,
} from "@/data/mock";
import { virtualToPercent } from "@/lib/map/coordinates";
import type {
  Asset,
  Character,
  Event,
  House,
  LocationDetailLevel,
  Location,
  MapLocationViewModel,
  Region,
} from "@/types";
import {
  getAssetLicenseLabel,
  getAssetSourceLabel,
  getCanonLevelLabel,
  getSourceTypeLabel,
} from "./sourceLabels";

function isPublished<T extends { status: string }>(entity: T) {
  return entity.status === "published";
}

export function getPublishedRegions(): Region[] {
  return mockRegions.filter(isPublished);
}

export function getPublishedHouses(): House[] {
  return mockHouses.filter(isPublished);
}

export function getPublishedCharacters(): Character[] {
  return mockCharacters.filter(isPublished);
}

export function getPublishedEvents(): Event[] {
  return mockEvents.filter(isPublished);
}

export function getPublishedAssets(): Asset[] {
  return mockAssets.filter(isPublished);
}

export function getPublishedLocations(): Location[] {
  return mockLocations.filter(isPublished);
}

export function getRegionById(id?: string) {
  if (!id) {
    return undefined;
  }

  return getPublishedRegions().find((region) => region.id === id);
}

export function getHousesByIds(ids: string[]) {
  const idSet = new Set(ids);

  return getPublishedHouses().filter((house) => idSet.has(house.id));
}

export function getCharactersByIds(ids: string[]) {
  const idSet = new Set(ids);

  return getPublishedCharacters().filter((character) => idSet.has(character.id));
}

export function getAssetsByIds(ids: string[]) {
  const idSet = new Set(ids);

  return getPublishedAssets().filter((asset) => idSet.has(asset.id));
}

export function getAssetById(id?: string) {
  if (!id) {
    return undefined;
  }

  return getPublishedAssets().find((asset) => asset.id === id);
}

export function getLocationById(id: string) {
  return getPublishedLocations().find((location) => location.id === id);
}

export function getEventsByLocationId(locationId: string) {
  return getPublishedEvents()
    .filter(
      (event) =>
        event.primaryLocationId === locationId ||
        event.relatedLocationIds.includes(locationId),
    )
    .sort((a, b) => a.order - b.order);
}

function getLocationDetailLevel(location: Location): LocationDetailLevel {
  if (location.detailLevel) {
    return location.detailLevel;
  }

  return location.isMvpClickable ? "full" : "node-only";
}

export function getMapLocationViewModels(): MapLocationViewModel[] {
  return getPublishedLocations()
    .map((location) => {
      const region = getRegionById(location.regionId);
      const houses = getHousesByIds(location.relatedHouseIds);
      const coordinate = virtualToPercent(location.virtualX, location.virtualY);
      const detailLevel = getLocationDetailLevel(location);

      return {
        id: location.id,
        slug: location.slug,
        nameZh: location.nameZh,
        nameEn: location.nameEn,
        type: location.type,
        regionName: region?.nameZh,
        houseNames: houses.map((house) => house.nameZh),
        xPercent: coordinate.xPercent,
        yPercent: coordinate.yPercent,
        virtualX: location.virtualX,
        virtualY: location.virtualY,
        iconType: location.iconType,
        nodeLevel: location.nodeLevel,
        detailLevel,
        isClickable: detailLevel !== "node-only",
        statusLabel:
          detailLevel === "full"
            ? "完整详情"
            : detailLevel === "preview"
              ? "预览条目"
              : "节点展示",
      };
    })
    .sort((a, b) => a.nodeLevel - b.nodeLevel || a.id.localeCompare(b.id));
}

function createHouseBadgeViewModel(house: House) {
  const sigil = getAssetById(house.sigilAssetId);

  return {
    id: house.id,
    nameZh: house.nameZh,
    nameEn: house.nameEn,
    sigilDescription: house.sigilDescription,
    sigilAssetPath: sigil?.filePath,
    primaryColor: house.primaryColor,
    secondaryColor: house.secondaryColor,
  };
}

function createAssetViewModel(asset: Asset) {
  return {
    id: asset.id,
    title: asset.title,
    assetType: asset.assetType,
    src: asset.filePath,
    alt: asset.alt,
    caption: asset.caption,
    isAIGenerated: asset.isAIGenerated,
    isDerivative: asset.isDerivative,
    sourceLabel: `${getAssetSourceLabel(asset.sourceType)} / ${getAssetLicenseLabel(
      asset.licenseStatus,
    )}`,
    riskLevel: asset.riskLevel,
  };
}

function createCharacterCardViewModel(character: Character) {
  const house = character.houseId
    ? getHousesByIds([character.houseId])[0]
    : undefined;
  const portrait = getAssetById(character.portraitAssetId);

  return {
    id: character.id,
    nameZh: character.nameZh,
    nameEn: character.nameEn,
    house: house ? createHouseBadgeViewModel(house) : undefined,
    titles: character.titles,
    shortBio: character.shortBio,
    portraitAssetPath: portrait?.filePath,
    sourceLabel: getSourceTypeLabel(character.sourceType),
    canonLabel: getCanonLevelLabel(character.canonLevel),
  };
}

function createTimelineItemViewModel(event: Event) {
  const asset = getAssetsByIds(event.relatedAssetIds)[0];
  const characters = getCharactersByIds(event.relatedCharacterIds);
  const houses = getHousesByIds(event.relatedHouseIds);

  return {
    id: event.id,
    title: event.title,
    summary: event.summary,
    description: event.description,
    order: event.order,
    displayDate: event.displayDate,
    sourceLabel: getSourceTypeLabel(event.sourceType),
    canonLabel: getCanonLevelLabel(event.canonLevel),
    asset: asset ? createAssetViewModel(asset) : undefined,
    relatedCharacters: characters.map(createCharacterCardViewModel),
    relatedHouses: houses.map(createHouseBadgeViewModel),
  };
}

export function getLocationDetailViewModel(id: string) {
  const location = getLocationById(id);

  if (!location) {
    return undefined;
  }

  const region = getRegionById(location.regionId);
  const houses = getHousesByIds(location.relatedHouseIds);
  const characters = getCharactersByIds(location.relatedCharacterIds);
  const events = getEventsByLocationId(location.id);
  const assets = getAssetsByIds(location.relatedAssetIds);
  const localMap = getAssetById(location.localMapAssetId);

  return {
    id: location.id,
    slug: location.slug,
    nameZh: location.nameZh,
    nameEn: location.nameEn,
    type: location.type,
    region: region?.nameZh,
    politicalStatus: location.politicalStatus,
    geography: location.geography,
    intro: location.longDescription ?? location.shortDescription,
    detailLevel: getLocationDetailLevel(location),
    relatedHouses: houses.map(createHouseBadgeViewModel),
    relatedCharacters: characters.map(createCharacterCardViewModel),
    timelineItems: events.map(createTimelineItemViewModel),
    galleryAssets: assets.map(createAssetViewModel),
    localMap: localMap ? createAssetViewModel(localMap) : undefined,
    sourceSummary: getSourceTypeLabel(location.sourceType).label,
  };
}
