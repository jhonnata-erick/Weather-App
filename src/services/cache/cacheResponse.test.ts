import { describe, it, expect, test } from "vitest";
import { CacheData } from "./cacheResponse.ts";

const storage = [
  {
    key: "key1",
    data: {
      random: "randomData1",
    },
    timeTostale: 1000,
  },
  {
    key: "key2",
    data: {
      random: "randomData2",
    },
    timeTostale: 1200,
  },
];
function testfunc() {
  return 5 - 2;
}
describe("cacheResponse.ts", () => {
  it("should return the cached data and clean the repeated keys", () => {
    const cachedTestFunc = CacheData(testfunc, 30);
    expect(() => {});
  });
});
