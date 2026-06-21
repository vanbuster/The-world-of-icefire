import { expect, test } from "@playwright/test";

test("renders the desktop map shell and location nodes", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("维斯特洛互动世界地图")).toBeVisible();
  await expect(page.getByText("Sandtable Viewport")).toBeVisible();
  await expect(page.getByText(/MVP/)).toHaveCount(0);

  const nodes = page.locator("[data-location-id]");
  await expect(nodes).toHaveCount(12);
  await expect(page.locator('[data-location-id="winterfell"]')).toBeVisible();

  const mapImage = page.locator("[data-map-background-image]");
  await expect(mapImage).toHaveAttribute(
    "src",
    /westeros-sandtable-map-v4-terrain\.png/,
  );
  const naturalSize = await mapImage.evaluate((image) => {
    const img = image as HTMLImageElement;
    return { width: img.naturalWidth, height: img.naturalHeight };
  });
  expect(naturalSize.width).toBeGreaterThanOrEqual(3000);
  expect(naturalSize.height).toBeGreaterThanOrEqual(2000);

  await expect(page.locator("[data-map-node-art]")).toHaveCount(12);

  const expectedNodeArt = [
    ["winterfell", "map-node-winterfell-v1.png"],
    ["kings-landing", "map-node-kings-landing-v1.png"],
    ["the-wall", "map-node-the-wall-v1.png"],
    ["castle-black", "map-node-castle-black-v1.png"],
    ["the-eyrie", "map-node-the-eyrie-v1.png"],
    ["riverrun", "map-node-riverrun-v1.png"],
    ["harrenhal", "map-node-harrenhal-v1.png"],
    ["casterly-rock", "map-node-casterly-rock-v1.png"],
    ["highgarden", "map-node-highgarden-v1.png"],
    ["storms-end", "map-node-storms-end-v1.png"],
    ["pyke", "map-node-pyke-v1.png"],
    ["sunspear", "map-node-sunspear-v1.png"],
  ] as const;

  const renderedArtPaths = await page
    .locator("[data-map-node-art]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-map-node-art")),
    );
  expect(new Set(renderedArtPaths).size).toBe(12);

  for (const [locationId, fileName] of expectedNodeArt) {
    const node = page.locator(`[data-location-id="${locationId}"]`);
    const art = node.locator("[data-map-node-art]");
    const image = node.locator("[data-map-node-art-image]");

    await expect(art).toHaveAttribute(
      "data-map-node-art",
      new RegExp(fileName),
    );
    await expect(art).toHaveAttribute("data-map-node-art-key", locationId);

    const backgroundImage = await image.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    );
    expect(backgroundImage).toContain(fileName);
    expect(backgroundImage).not.toContain("map-node-castle-v2.png");
  }
});

test("shows a location tooltip on Winterfell hover", async ({ page }) => {
  await page.goto("/");

  await page.locator('[data-location-id="winterfell"]').hover();

  const tooltip = page.locator("[data-map-tooltip]");
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText("临冬城");
  await expect(tooltip).toContainText("Winterfell");
  await expect(tooltip).toContainText("类型");
  await expect(tooltip).toContainText("区域");
  await expect(tooltip).toContainText("关联家族");
  await expect(tooltip).toContainText("史塔克家族");
});

test("supports zoom controls, reset, and drag panning", async ({ page }) => {
  await page.goto("/");

  const zoomLabel = page.locator("[data-map-zoom-label]");
  const transformLayer = page.locator("[data-map-transform-layer]");

  await expect(zoomLabel).toHaveText("100%");

  await page.locator("[data-map-zoom-in]").click();
  await expect(zoomLabel).toHaveText("118%");

  await page.locator("[data-map-zoom-out]").click();
  await expect(zoomLabel).toHaveText("100%");

  const viewportBox = await page.locator("[data-map-viewport]").boundingBox();
  expect(viewportBox).not.toBeNull();

  const startX = viewportBox!.x + 140;
  const startY = viewportBox!.y + 280;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await expect(page.locator("[data-map-viewport]")).toHaveAttribute(
    "data-map-dragging",
    "true",
  );
  await page.mouse.move(startX + 60, startY + 40);
  await page.mouse.up();
  await expect(page.locator("[data-map-viewport]")).toHaveAttribute(
    "data-map-dragging",
    "false",
  );

  await expect(transformLayer).toHaveAttribute(
    "style",
    /translate3d\(60px, 40px, 0px\)/,
  );

  await page.locator("[data-map-reset]").click();
  await expect(transformLayer).toHaveAttribute(
    "style",
    /translate3d\(0px, 0px, 0px\) scale\(1\)/,
  );
});

test("opens full, preview, and pending location details", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("[data-detail-panel-state='closed']")).toBeVisible();

  await page.locator('[data-location-id="winterfell"]').click();
  const openPanel = page.locator("[data-detail-panel-state='open']");
  await expect(openPanel).toBeVisible();
  await expect(
    openPanel.getByRole("heading", { name: "临冬城", exact: true }),
  ).toBeVisible();
  await expect(openPanel.locator("[data-winterfell-detail]")).toBeVisible();
  await expect(openPanel.locator("[data-winterfell-local-map]")).toBeVisible();
  await expect(openPanel.locator("[data-winterfell-timeline]")).toBeVisible();
  await expect(openPanel.locator("[data-winterfell-characters]")).toBeVisible();
  await expect(openPanel.locator("[data-winterfell-gallery]")).toBeVisible();
  await expect(
    openPanel.getByRole("heading", { name: "私生子之战" }),
  ).toBeVisible();

  await page.locator('[data-location-id="kings-landing"]').click();
  await expect(page.locator("[data-detail-panel-state='open']")).toBeVisible();
  await expect(page.locator("[data-location-detail='kings-landing']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "君临", exact: true })).toBeVisible();
  await expect(page.getByText("V1 预览条目").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "艾德进入君临政局" })).toBeVisible();

  await page.locator('[data-location-id="castle-black"]').click();
  await expect(page.locator("[data-detail-panel-state='open']")).toBeVisible();
  await expect(page.locator("[data-location-detail='castle-black']")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "黑城堡", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "琼恩加入守夜人" })).toBeVisible();

  await page.locator('[data-location-id="casterly-rock"]').click();
  const pendingPanel = page.locator("[data-detail-panel-state='pending']");
  await expect(pendingPanel).toBeVisible();
  await expect(pendingPanel.getByText("凯岩城", { exact: true })).toBeVisible();
  await expect(pendingPanel.getByText("详情待扩展")).toBeVisible();
});

test("shows Winterfell local map landmarks", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-location-id="winterfell"]').click();

  const localMap = page.locator("[data-winterfell-local-map]");
  await expect(localMap).toBeVisible();
  await expect(localMap.getByText("临冬城", { exact: true })).toBeVisible();
  await expect(localMap.getByText("狼林")).toBeVisible();
  await expect(localMap.getByText("白刀河")).toBeVisible();
  await expect(localMap.getByText("临冬镇")).toBeVisible();
});

test("shows seven required Winterfell events and show-canon labels", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-location-id="winterfell"]').click();

  const timeline = page.locator("[data-winterfell-timeline]");
  await expect(timeline.locator("[data-event-id]")).toHaveCount(7);
  await expect(timeline.locator("[data-event-art]")).toHaveCount(7);

  for (const title of [
    "国王劳勃北上访问临冬城",
    "史塔克一家南下君临",
    "布兰坠塔",
    "罗柏起兵",
    "临冬城陷落",
    "私生子之战",
    "北境重归史塔克",
  ]) {
    await expect(timeline.getByRole("heading", { name: title })).toBeVisible();
  }

  const battle = timeline.locator('[data-event-id="event-battle-bastards"]');
  await expect(battle.locator("[data-source-type='show-canon']")).toBeVisible();
  await expect(battle.locator("[data-canon-level='show-canon']")).toBeVisible();
  await expect(battle.getByText("剧集正典")).toHaveCount(2);
});

test("shows Winterfell character cards and related houses", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-location-id="winterfell"]').click();

  await expect(page.locator("[data-winterfell-houses] [data-house-id]")).toHaveCount(
    4,
  );
  await expect(
    page.locator("[data-winterfell-characters] [data-character-id]"),
  ).toHaveCount(10);

  await expect(page.getByText("史塔克家族").first()).toBeVisible();
  await expect(page.getByText("波顿家族").first()).toBeVisible();
  await expect(page.getByText("艾德·史塔克")).toBeVisible();
  await expect(page.getByText("琼恩·雪诺")).toBeVisible();
  await expect(page.getByText("珊莎·史塔克")).toBeVisible();
});

test("renders distinct house sigil art in bottom buttons and detail badges", async ({
  page,
}) => {
  await page.goto("/");

  const expectedSigils = [
    ["史塔克", "house-stark-material-v2.png"],
    ["拜拉席恩", "house-baratheon-material-v2.png"],
    ["兰尼斯特", "house-lannister-material-v2.png"],
    ["葛雷乔伊", "house-greyjoy-material-v2.png"],
    ["波顿", "house-bolton-material-v2.png"],
  ] as const;

  await expect(page.locator("[data-house-sigil-button]")).toHaveCount(5);

  for (const [houseLabel, fileName] of expectedSigils) {
    const button = page.locator(`[data-house-sigil-button="${houseLabel}"]`);
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-label", `${houseLabel}家族旗帜`);

    const backgroundImage = await button
      .locator("span")
      .evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(backgroundImage).toContain(fileName);
  }

  await page.locator('[data-location-id="winterfell"]').click();
  const starkBadgeImage = await page
    .locator('[data-winterfell-houses] [data-house-id="house-stark"] span[role="img"] span')
    .evaluate((element) => getComputedStyle(element).backgroundImage);
  expect(starkBadgeImage).toContain("house-stark-material-v2.png");
});

test("renders animated atmospheric weather layers", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("[data-weather-layer]")).toHaveAttribute(
    "data-weather-mode",
    "high",
  );
  await expect(page.locator("[data-cloud-layer]")).toBeVisible();
  await expect(page.locator("[data-cloud-layer]")).toHaveAttribute(
    "data-weather-texture",
    "cloud-haze",
  );
  await expect(page.locator("[data-snow-layer] .map-snow-particle")).toHaveCount(
    30,
  );
  await expect(page.locator("[data-snow-layer]")).toHaveAttribute(
    "data-weather-texture",
    "northern-snow",
  );
  await expect(page.locator("[data-smoke-layer]")).toBeVisible();
  await expect(page.locator("[data-smoke-layer]")).toHaveAttribute(
    "data-weather-texture",
    "war-smoke",
  );

  const cloudAnimation = await page
    .locator("[data-cloud-layer]")
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(cloudAnimation).toContain("map-cloud-drift");
});

test("supports weather intensity controls", async ({ page }) => {
  await page.goto("/");

  await page.locator("[data-weather-control='low']").click();
  await expect(page.locator("[data-weather-layer]")).toHaveAttribute(
    "data-weather-mode",
    "low",
  );
  await expect(page.locator("[data-snow-layer] .map-snow-particle")).toHaveCount(
    10,
  );
  await expect(page.locator("[data-smoke-layer]")).toHaveCount(0);

  await page.locator("[data-weather-control='off']").click();
  await expect(page.locator("[data-weather-layer]")).toHaveAttribute(
    "data-weather-mode",
    "off",
  );
  await expect(page.locator("[data-cloud-layer]")).toHaveCount(0);
  await expect(page.locator("[data-snow-layer] .map-snow-particle")).toHaveCount(
    0,
  );

  await page.locator("[data-weather-control='high']").click();
  await expect(page.locator("[data-weather-layer]")).toHaveAttribute(
    "data-weather-mode",
    "high",
  );
});

test("supports basic location search and keeps the legend visible", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("[data-bottom-legend]")).toBeVisible();

  const searchInput = page.locator("[data-search-input]");
  await expect(searchInput).toHaveAttribute(
    "placeholder",
    "百科检索：地点、人物、事件、家族",
  );
  await searchInput.fill("临冬");
  await expect(page.locator("[data-search-results]")).toBeVisible();
  await expect(page.getByText("Westeros Index")).toBeVisible();
  await page.locator("[data-search-result='winterfell']").click();
  await expect(page.locator("[data-detail-panel-state='open']")).toBeVisible();

  await searchInput.click();
  await searchInput.fill("君临");
  await expect(page.locator("[data-search-results]")).toBeVisible();
  await page.locator("[data-search-result='kings-landing']").click();
  await expect(page.locator("[data-detail-panel-state='open']")).toBeVisible();
  await expect(
    page.locator("[data-detail-panel-state='open']").getByRole("heading", {
      name: "君临",
      exact: true,
    }),
  ).toBeVisible();

  await searchInput.click();
  await searchInput.fill("黑城堡");
  await page.locator("[data-search-result='castle-black']").click();
  await expect(page.locator("[data-location-detail='castle-black']")).toBeVisible();
});

test.describe("reduced motion", () => {
  test("hides snow particles while preserving map content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("[data-weather-layer]")).toBeVisible();
    await expect(page.locator("[data-location-id]")).toHaveCount(12);
    await expect(
      page.locator("[data-snow-layer] .map-snow-particle").first(),
    ).toBeHidden();

    const cloudDuration = await page
      .locator("[data-cloud-layer]")
      .evaluate((element) => getComputedStyle(element).animationDuration);
    expect(["0.001ms", "1e-06s"]).toContain(cloudDuration);
  });
});

test("renders the V1.8 engine asset lab validation surface", async ({
  page,
}) => {
  await page.goto("/engine-lab");

  await expect(page.locator("[data-engine-lab]")).toBeVisible();
  await expect(
    page.getByText("北境 / 临冬城沙盘资产管线验证"),
  ).toBeVisible();
  await expect(
    page.locator("[data-engine-tile='tile-north-winterfell-v1']"),
  ).toBeVisible();
  await expect(page.locator("[data-engine-layer='terrain']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='landmark']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='forest']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='route']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='water']")).toBeVisible();
  await expect(page.locator("[data-engine-layer='weather']")).toBeVisible();
  await expect(page.locator("[data-engine-anchor='winterfell']")).toBeVisible();
  await expect(page.locator("[data-engine-asset-inspector]")).toBeVisible();

  await page.locator("[data-engine-layer-toggle='weather']").click();
  await expect(page.locator("[data-engine-layer='weather']")).toHaveCount(0);
});
