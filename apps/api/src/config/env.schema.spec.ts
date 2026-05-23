import { validateEnv } from "./env.schema";

describe("env.schema", () => {
  it("applies defaults when no values are provided", () => {
    const env = validateEnv({});
    expect(env.NODE_ENV).toBe("development");
    expect(env.PORT).toBe(4000);
    expect(env.LOG_LEVEL).toBe("info");
    expect(env.DATABASE_URL).toBeUndefined();
    expect(env.REDIS_URL).toBeUndefined();
  });

  it("accepts valid DATABASE_URL and REDIS_URL", () => {
    const env = validateEnv({
      DATABASE_URL: "postgresql://user:pass@localhost:5432/db",
      REDIS_URL: "redis://:pass@localhost:6379",
    });
    expect(env.DATABASE_URL).toBe("postgresql://user:pass@localhost:5432/db");
    expect(env.REDIS_URL).toBe("redis://:pass@localhost:6379");
  });

  it("rejects DATABASE_URL with wrong protocol", () => {
    expect(() => validateEnv({ DATABASE_URL: "mysql://localhost/db" })).toThrow();
  });

  it("rejects REDIS_URL with wrong protocol", () => {
    expect(() => validateEnv({ REDIS_URL: "http://localhost/" })).toThrow();
  });

  it("coerces PORT from string to number", () => {
    const env = validateEnv({ PORT: "5000" });
    expect(env.PORT).toBe(5000);
  });

  it("rejects an invalid NODE_ENV", () => {
    expect(() => validateEnv({ NODE_ENV: "staging" })).toThrow();
  });
});
