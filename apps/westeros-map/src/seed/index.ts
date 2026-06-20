import path from "node:path";

import type { CollectionSlug, Payload } from "payload";

import {
  mockAssets,
  mockCharacters,
  mockEvents,
  mockHouses,
  mockLocations,
  mockRegions,
  mockStorylines,
} from "@/data/mock";

type IdMap = Map<string, number>;

type SeedContext = {
  payload: Payload;
  regions: IdMap;
  houses: IdMap;
  characters: IdMap;
  events: IdMap;
  media: IdMap;
  locations: IdMap;
  storylines: IdMap;
};

const placeholderFilePath = path.resolve(
  process.cwd(),
  "public/media/seed-placeholder.svg",
);

function relationId(map: IdMap, id: string) {
  return map.get(id);
}

function relationIds(map: IdMap, ids: string[]) {
  return ids
    .map((id) => relationId(map, id))
    .filter((id): id is number => typeof id === "number");
}

async function findExistingByTitle(
  payload: Payload,
  collection: CollectionSlug,
  titleField: string,
  title: string,
) {
  const result = await payload.find({
    collection,
    depth: 0,
    limit: 1,
    where: {
      [titleField]: {
        equals: title,
      },
    },
  });

  return result.docs[0];
}

async function createOrFind(
  payload: Payload,
  collection: CollectionSlug,
  titleField: string,
  title: string,
  data: Record<string, unknown>,
  filePath?: string,
) {
  const existing = await findExistingByTitle(payload, collection, titleField, title);

  if (existing) {
    return existing;
  }

  return payload.create({
    collection,
    data,
    filePath,
  });
}

async function seedAdmin(payload: Payload) {
  const email = process.env.PAYLOAD_ADMIN_EMAIL;
  const password = process.env.PAYLOAD_ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("Skipping admin seed: PAYLOAD_ADMIN_EMAIL/PASSWORD not set.");
    return;
  }

  const existing = await payload.find({
    collection: "users",
    depth: 0,
    limit: 1,
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (existing.docs[0]) {
    console.log(`Admin user already exists: ${email}`);
    return;
  }

  await payload.create({
    collection: "users",
    data: {
      email,
      password,
      name: "Westeros Atlas Admin",
    },
  });
}

async function seedRegions(ctx: SeedContext) {
  for (const region of mockRegions) {
    const doc = await createOrFind(ctx.payload, "regions", "nameZh", region.nameZh, {
      nameZh: region.nameZh,
      nameEn: region.nameEn,
      type: region.type,
      description: region.description,
      sourceType: region.sourceType,
      canonLevel: region.canonLevel,
      status: region.status,
    });

    ctx.regions.set(region.id, doc.id);
  }
}

async function seedMedia(ctx: SeedContext) {
  for (const asset of mockAssets) {
    const doc = await createOrFind(
      ctx.payload,
      "media",
      "title",
      asset.title,
      {
        title: asset.title,
        alt: asset.alt,
        assetType: asset.assetType,
        sourceType: asset.sourceType,
        sourceUrl: asset.sourceUrl,
        author: asset.author,
        sourceParty: asset.sourceParty,
        isAIGenerated: asset.isAIGenerated,
        isDerivative: asset.isDerivative,
        licenseStatus: asset.licenseStatus,
        riskLevel: asset.riskLevel,
        usageScope: asset.usageScope,
        generationPromptSummary: asset.generationPromptSummary,
        referenceNotes: asset.referenceNotes,
        notes: asset.notes,
        status: asset.status,
      },
      placeholderFilePath,
    );

    ctx.media.set(asset.id, doc.id);
  }
}

async function seedHouses(ctx: SeedContext) {
  for (const house of mockHouses) {
    const doc = await createOrFind(ctx.payload, "houses", "nameZh", house.nameZh, {
      nameZh: house.nameZh,
      nameEn: house.nameEn,
      motto: house.motto,
      sigilDescription: house.sigilDescription,
      sigil: relationId(ctx.media, house.sigilAssetId ?? ""),
      primaryColor: house.primaryColor,
      secondaryColor: house.secondaryColor,
      controlledRegions: relationIds(ctx.regions, house.controlledRegionIds),
      sourceType: house.sourceType,
      canonLevel: house.canonLevel,
      status: house.status,
    });

    ctx.houses.set(house.id, doc.id);
  }
}

async function seedCharacters(ctx: SeedContext) {
  for (const character of mockCharacters) {
    const doc = await createOrFind(
      ctx.payload,
      "characters",
      "nameZh",
      character.nameZh,
      {
        nameZh: character.nameZh,
        nameEn: character.nameEn,
        aliases: character.aliases.map((value) => ({ value })),
        house: relationId(ctx.houses, character.houseId ?? ""),
        titles: character.titles.map((value) => ({ value })),
        shortBio: character.shortBio,
        portrait: relationId(ctx.media, character.portraitAssetId ?? ""),
        sourceType: character.sourceType,
        canonLevel: character.canonLevel,
        status: character.status,
      },
    );

    ctx.characters.set(character.id, doc.id);
  }
}

async function seedLocations(ctx: SeedContext) {
  for (const location of mockLocations) {
    const doc = await createOrFind(
      ctx.payload,
      "locations",
      "nameZh",
      location.nameZh,
      {
        nameZh: location.nameZh,
        nameEn: location.nameEn,
        aliases: location.aliases.map((value) => ({ value })),
        type: location.type,
        region: relationId(ctx.regions, location.regionId ?? ""),
        relatedHouses: relationIds(ctx.houses, location.relatedHouseIds),
        shortDescription: location.shortDescription,
        longDescription: location.longDescription,
        politicalStatus: location.politicalStatus,
        geography: location.geography,
        mapPosition: {
          xPercent: location.xPercent,
          yPercent: location.yPercent,
          virtualX: location.virtualX,
          virtualY: location.virtualY,
        },
        iconType: location.iconType,
        nodeLevel: location.nodeLevel,
        visibleZoomRange: {
          min: location.visibleZoomRange?.[0] ?? 0.6,
          max: location.visibleZoomRange?.[1] ?? 3,
        },
        isMvpClickable: location.isMvpClickable,
        detailLevel:
          location.detailLevel ?? (location.isMvpClickable ? "full" : "node-only"),
        detailSections: location.detailSections.map((section) => ({
          title: section.title,
          body: section.body,
          assets: relationIds(ctx.media, section.assetIds ?? []),
        })),
        relatedCharacters: relationIds(ctx.characters, location.relatedCharacterIds),
        relatedEvents: relationIds(ctx.events, location.relatedEventIds),
        relatedAssets: relationIds(ctx.media, location.relatedAssetIds),
        localMap: relationId(ctx.media, location.localMapAssetId ?? ""),
        sourceType: location.sourceType,
        canonLevel: location.canonLevel,
        status: location.status,
      },
    );

    ctx.locations.set(location.id, doc.id);
  }
}

async function seedEvents(ctx: SeedContext) {
  for (const event of mockEvents) {
    const doc = await createOrFind(ctx.payload, "events", "title", event.title, {
      title: event.title,
      summary: event.summary,
      description: event.description,
      primaryLocation: relationId(ctx.locations, event.primaryLocationId),
      relatedLocations: relationIds(ctx.locations, event.relatedLocationIds),
      relatedCharacters: relationIds(ctx.characters, event.relatedCharacterIds),
      relatedHouses: relationIds(ctx.houses, event.relatedHouseIds),
      relatedAssets: relationIds(ctx.media, event.relatedAssetIds),
      order: event.order,
      displayDate: event.displayDate,
      bookRefLabel: event.bookRefLabel,
      showRefLabel: event.showRefLabel,
      isBookEvent: event.isBookEvent,
      isShowEvent: event.isShowEvent,
      isOriginalNote: event.isOriginalNote,
      sourceType: event.sourceType,
      canonLevel: event.canonLevel,
      status: event.status,
    });

    ctx.events.set(event.id, doc.id);
  }
}

async function syncLocationEventRelations(ctx: SeedContext) {
  for (const location of mockLocations) {
    const locationDocId = relationId(ctx.locations, location.id);

    if (!locationDocId) {
      continue;
    }

    await ctx.payload.update({
      collection: "locations",
      id: locationDocId,
      data: {
        relatedEvents: relationIds(ctx.events, location.relatedEventIds),
      },
    });
  }
}

async function seedStorylines(ctx: SeedContext) {
  for (const storyline of mockStorylines) {
    const doc = await createOrFind(
      ctx.payload,
      "storylines",
      "title",
      storyline.title,
      {
        title: storyline.title,
        summary: storyline.summary,
        description: storyline.description,
        relatedEvents: relationIds(ctx.events, storyline.relatedEventIds),
        relatedLocations: relationIds(ctx.locations, storyline.relatedLocationIds),
        relatedCharacters: relationIds(
          ctx.characters,
          storyline.relatedCharacterIds,
        ),
        relatedHouses: relationIds(ctx.houses, storyline.relatedHouseIds),
        sourceType: storyline.sourceType,
        canonLevel: storyline.canonLevel,
        status: storyline.status,
      },
    );

    ctx.storylines.set(storyline.id, doc.id);
  }
}

async function seed() {
  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("@payload-config"),
  ]);
  const payload = await getPayload({ config });
  const ctx: SeedContext = {
    payload,
    regions: new Map(),
    houses: new Map(),
    characters: new Map(),
    events: new Map(),
    media: new Map(),
    locations: new Map(),
    storylines: new Map(),
  };

  await seedAdmin(payload);
  await seedRegions(ctx);
  await seedMedia(ctx);
  await seedHouses(ctx);
  await seedCharacters(ctx);
  await seedLocations(ctx);
  await seedEvents(ctx);
  await syncLocationEventRelations(ctx);
  await seedStorylines(ctx);

  console.log("Westeros Atlas seed complete.");
}

if (process.env.RUN_PAYLOAD_SEED === "true") {
  seed().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
} else {
  console.log(
    "Seed script loaded. Set RUN_PAYLOAD_SEED=true to execute against the configured database.",
  );
}
