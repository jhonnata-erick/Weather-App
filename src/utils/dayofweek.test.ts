import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getDayOfWeek } from "./dayofweek.ts";

describe("getDayOfWeek", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 3, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
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

    expect(getDayOfWeek(date)).toBe(expected);
  });

  it("returns Today for the current date", () => {
    const today = new Date().toDateString();

    expect(getDayOfWeek(today)).toBe("Today");
  });
});
