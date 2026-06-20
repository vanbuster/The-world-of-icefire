import { describe, expect, it } from "vitest";

import {
  getEventsByLocationId,
  getLocationDetailViewModel,
  getMapLocationViewModels,
} from "@/lib/content/selectors";

describe("content selectors", () => {
  it("builds at least 10 published map location view models", () => {
    const locations = getMapLocationViewModels();
    const winterfell = locations.find((location) => location.id === "winterfell");

    expect(locations.length).toBeGreaterThanOrEqual(10);
    expect(winterfell).toMatchObject({
      nameZh: "临冬城",
      nameEn: "Winterfell",
      detailLevel: "full",
      isClickable: true,
      statusLabel: "完整详情",
    });
    expect(winterfell?.xPercent).toBeGreaterThan(0);
    expect(winterfell?.yPercent).toBeGreaterThan(0);
  });

  it("marks V1 preview locations as clickable preview entries", () => {
    const locations = getMapLocationViewModels();

    expect(locations.find((location) => location.id === "kings-landing")).toMatchObject({
      detailLevel: "preview",
      isClickable: true,
      statusLabel: "预览条目",
    });
    expect(locations.find((location) => location.id === "castle-black")).toMatchObject({
      detailLevel: "preview",
      isClickable: true,
      statusLabel: "预览条目",
    });
    expect(locations.find((location) => location.id === "casterly-rock")).toMatchObject({
      detailLevel: "node-only",
      isClickable: false,
      statusLabel: "节点展示",
    });
  });

  it("sorts Winterfell events and keeps Battle of the Bastards show-canon", () => {
    const events = getEventsByLocationId("winterfell");
    const battle = events.find((event) => event.id === "event-battle-bastards");

    expect(events).toHaveLength(7);
    expect(events.map((event) => event.order)).toEqual([10, 20, 30, 40, 50, 60, 70]);
    expect(battle?.sourceType).toBe("show-canon");
    expect(battle?.canonLevel).toBe("show-canon");
  });

  it("builds the Winterfell detail view model with local map, gallery, people, and houses", () => {
    const detail = getLocationDetailViewModel("winterfell");

    expect(detail?.nameZh).toBe("临冬城");
    expect(detail?.detailLevel).toBe("full");
    expect(detail?.timelineItems).toHaveLength(7);
    expect(detail?.relatedCharacters.length).toBeGreaterThanOrEqual(10);
    expect(detail?.relatedHouses.map((house) => house.id)).toEqual(
      expect.arrayContaining([
        "house-stark",
        "house-baratheon",
        "house-greyjoy",
        "house-bolton",
      ]),
    );
    expect(detail?.relatedHouses.find((house) => house.id === "house-stark")?.sigilAssetPath).toBe(
      "/assets/westeros/generated/v16/houses/house-stark-material-v2.png",
    );
    expect(detail?.localMap?.src).toBe(
      "/assets/westeros/generated/winterfell-local-map-v1.png",
    );
    expect(detail?.galleryAssets.map((asset) => asset.id)).toEqual(
      expect.arrayContaining([
        "asset-robert-arrival",
        "asset-bran-fall",
        "asset-battle-bastards",
        "asset-north-restored",
      ]),
    );
  });

  it("builds preview detail view models for King's Landing and Castle Black", () => {
    const kingsLanding = getLocationDetailViewModel("kings-landing");
    const castleBlack = getLocationDetailViewModel("castle-black");

    expect(kingsLanding?.detailLevel).toBe("preview");
    expect(kingsLanding?.timelineItems.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "event-kings-landing-court",
        "event-kings-landing-coup",
      ]),
    );
    expect(castleBlack?.detailLevel).toBe("preview");
    expect(castleBlack?.timelineItems.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "event-jon-joins-watch",
        "event-wall-frontier-watch",
      ]),
    );
  });
});
