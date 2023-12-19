import { z } from "zod";
import { test, expect, describe, beforeEach } from "vitest";

import useFormErrors from "./useFormErrors";
import { renderHook, type RenderHookResult } from "../../utils/test/test-utils";

const mockSchema = z.object({
  name: z.string().min(1),
  positive_num: z.number().positive(),
  any_num: z.number(),
  optional: z.string().optional(),
});

const mockConforms: z.infer<typeof mockSchema> = {
  name: "mock",
  positive_num: 8,
  any_num: -100,
};

type HookReturn = ReturnType<typeof useFormErrors<typeof mockSchema.shape>>;

describe("Use form errors", () => {
  let hook: RenderHookResult<HookReturn, unknown>;

  beforeEach(() => {
    hook = renderHook(() => useFormErrors(mockSchema));
  });

  test("should return parseErrors function", () => {
    expect(hook.result.current.parseErrors).toBeDefined();
  });

  describe("when passed a valid object", () => {
    test("should return true", () => {
      const parsed = hook.result.current.parseErrors(mockConforms);

      expect(parsed).toBe(true);
      expect(hook.result.current.errors).toBeUndefined();
    });
  });

  describe("when passed a non-valid object", () => {
    test("should return false and an error object", () => {
      const parsed = hook.result.current.parseErrors({
        name: undefined,
        positive_num: -100,
        any_num: "string",
      });

      expect(parsed).toBe(false);

      hook.rerender();

      expect(hook.result.current.errors).toBeDefined();
      expect(hook.result.current.errors).toBeTypeOf("object");
      expect(hook.result.current.errors).toHaveProperty("name");
      expect(hook.result.current.errors).toHaveProperty("positive_num");
      expect(hook.result.current.errors).toHaveProperty("any_num");
    });
  });
});
