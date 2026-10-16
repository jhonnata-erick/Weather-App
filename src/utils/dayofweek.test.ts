import { describe, it, expect } from "vitest";
import { getDayOfWeek } from "./dayofweek.ts";

describe("dayofweek.ts, ", () => {
  it("The date string 10/11/2026 should return Sunday", () => {
    const date = new Date("10/11/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Sunday");
  });
  it("The date string 10/12/2026 should return Monday", () => {
    const date = new Date("10/12/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Monday");
  });
  it("The date string 10/13/2026 should return Tuesday", () => {
    const date = new Date("10/13/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Tuesday");
  });
  it("The date string 10/07/2026 should return Wednesday", () => {
    const date = new Date("10/07/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Wednesday");
  });
  it("The date string 10/15/2026 should return Thursday", () => {
    const date = new Date("10/15/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Thursday");
  });
  it("The date string 10/16/2026 should return Friday", () => {
    const date = new Date("10/16/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Friday");
  });
  it("The date string 10/17/2026 should return Saturday", () => {
    const date = new Date("10/17/2026").toDateString();
    expect(getDayOfWeek(date)).toBe("Saturday");
  });
  it("Should return Today", () => {
    const date = new Date().toDateString();

    expect(getDayOfWeek(date)).toBe("Today");
  });
});
