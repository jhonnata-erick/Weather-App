import { describe, it, expect } from "vitest";
import { validateLocation } from "./lat&lon.validation.ts";

describe("lat&lon.validation.ts", () => {
  it("Returning false to NaN args", () => {
    expect(validateLocation({ lat: NaN, lon: NaN })).toBe(false);
  });
  it("Returning false to undefined args", () => {
    expect(
      validateLocation({ lat: Number(undefined), lon: Number(undefined) }),
    ).toBe(false);
  });
  it("Should return false to invalid latitude (lower than -90 and higher than 90) and longitude (lower than -180 and higher than 180)", () => {
    expect(validateLocation({ lat: -95, lon: 181 })).toBe(false);
  });
  it("Should return true to valid latitude and longitude", () => {
    expect(validateLocation({ lat: -89, lon: 179 })).toBe(true);
  });
});
