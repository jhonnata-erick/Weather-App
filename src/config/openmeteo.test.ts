import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { openmeteoStaleTime } from "./openmeteo.ts";

describe("openmeteoStaleTime()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("Should return 300 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:10:00"));

    expect(openmeteoStaleTime()).toBe(300);
  });
  it("Should return 180 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:27:00"));

    expect(openmeteoStaleTime()).toBe(180);
  });
  it("Should return 265 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:40:35"));

    expect(openmeteoStaleTime()).toBe(265);
  });
  it("Should return 39 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:44:21"));

    expect(openmeteoStaleTime()).toBe(39);
  });
  it("Should return 60 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:59:00"));

    expect(openmeteoStaleTime()).toBe(1 * 60);
  });
  it(`Should return ${15 * 60} seconds`, () => {
    vi.setSystemTime(new Date("2011-10-10T10:30:00"));
    expect(openmeteoStaleTime()).toBe(15 * 60);
  });
});
