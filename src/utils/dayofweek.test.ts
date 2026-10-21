import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDayOfWeek } from "./dayofweek.ts";

describe("getDayOfWeek", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 3, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it.each([
    [4, "Sunday"],
    [5, "Monday"],
    [6, "Tuesday"],
    [7, "Wednesday"],
    [8, "Thursday"],
    [9, "Friday"],
    [10, "Saturday"],
  ])("returns %s's weekday name", (day, expected) => {
    const date = new Date(2026, 9, day, 12).toDateString();

    expect(getDayOfWeek({ date: date })).toBe(expected);
  });

  it("returns Today for the current date", () => {
    const today = new Date().toDateString();

    expect(getDayOfWeek({ date: today })).toBe("Today");
  });

  it("compares Open-Meteo calendar dates without shifting the day by timezone", () => {
    expect(
      getDayOfWeek({
        date: "2026-10-16",
        now: "2026-10-16T12:30:00",
      }),
    ).toBe("Today");
    expect(
      getDayOfWeek({
        date: "2026-10-17",
        now: "2026-10-16T12:30:00",
      }),
    ).toBe("Saturday");
  });

  it.each([
    ["UTC", "Sunday"],
    ["America/Los_Angeles", "Saturday"],
    ["Asia/Tokyo", "Sunday"],
    ["Pacific/Kiritimati", "Sunday"],
  ])("returns the weekday in the %s timezone", (timezone, expected) => {
    vi.stubEnv("TZ", timezone);

    expect(
      getDayOfWeek({
        date: "2026-10-04T00:30:00Z",
        now: "2026-10-01T12:00:00Z",
      }),
    ).toBe(expected);
  });
});
