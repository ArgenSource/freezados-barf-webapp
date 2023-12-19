import { expect, describe, test } from "vitest";

import { calculateFreezerTime } from "./calculateFreezerTime";
import { FREEZE_STATES } from "../components/Food/constants";

type CalcFreezeTimeParam = Parameters<typeof calculateFreezerTime>[0];

const mockNotReady: CalcFreezeTimeParam = {
  foodType: "CHICKEN",
  freezedAt: new Date(),
};

const mockReady: CalcFreezeTimeParam = {
  foodType: "COW",
  freezedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
};

const mockStopped: CalcFreezeTimeParam = {
  foodType: "FISH",
  freezedAt: null,
};

describe("Calculate freezer time helper function", () => {
  test("should return an object with a state of not ready", () => {
    const res = calculateFreezerTime(mockNotReady);
    expect(res).toBeTypeOf("object");
    expect(res).toHaveProperty("state");
    expect(res.state).toBeTypeOf("string");
  });
  describe("when food is not ready", () => {
    const res = calculateFreezerTime(mockNotReady);
    test("state should be counting, time should be string", () => {
      expect(res.state).toBe(FREEZE_STATES.COUNTING);
      expect(res).toHaveProperty("time");
      if (res.state == FREEZE_STATES.COUNTING) {
        expect(res.time).toBeDefined();
        expect(res.time).toBeTypeOf("string");
      }
    });
  });
  describe("when food is ready", () => {
    const res = calculateFreezerTime(mockReady);
    test("state should be ready", () => {
      expect(res.state).toBe(FREEZE_STATES.READY);
    });
  });

  describe("when is stopped", () => {
    const res = calculateFreezerTime(mockStopped);
    test("state should be stopped", () => {
      expect(res.state).toBe(FREEZE_STATES.STOPPED);
    });
  });
});
