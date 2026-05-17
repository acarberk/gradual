import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("@gradual/shared bootstrap", () => {
  it("Zod is wired and parsing works", () => {
    const schema = z.object({ name: z.string() });
    const parsed = schema.parse({ name: "gradual" });
    expect(parsed.name).toBe("gradual");
  });
});
