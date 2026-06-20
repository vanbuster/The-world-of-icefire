import { describe, expect, it } from "vitest";

import {
  coordinatePercentToCss,
  percentToVirtual,
  pixelToVirtual,
  virtualCoordinateToCss,
  virtualToPercent,
  virtualToPixel,
} from "@/lib/map/coordinates";

describe("map coordinate helpers", () => {
  it("converts virtual coordinates to percentages", () => {
    expect(virtualToPercent(5000, 2500)).toEqual({
      xPercent: 50,
      yPercent: 25,
    });
  });

  it("clamps out-of-range virtual and percent coordinates", () => {
    expect(virtualToPercent(-1, 12000)).toEqual({
      xPercent: 0,
      yPercent: 100,
    });
    expect(percentToVirtual(-25, 125)).toEqual({
      virtualX: 0,
      virtualY: 10000,
    });
  });

  it("converts virtual and pixel coordinates through viewport size", () => {
    expect(virtualToPixel(2500, 7500, { width: 1600, height: 900 })).toEqual({
      x: 400,
      y: 675,
    });
    expect(pixelToVirtual(800, 225, { width: 1600, height: 900 })).toEqual({
      virtualX: 5000,
      virtualY: 2500,
    });
  });

  it("returns CSS-safe coordinate positions", () => {
    expect(coordinatePercentToCss({ xPercent: 12.5, yPercent: 88 })).toEqual({
      left: "12.5%",
      top: "88%",
    });
    expect(virtualCoordinateToCss({ virtualX: 10000, virtualY: 0 })).toEqual({
      left: "100%",
      top: "0%",
    });
  });
});
