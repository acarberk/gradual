import { PrismaService } from "./prisma.service";

describe("PrismaService", () => {
  it("is a function that extends PrismaClient", () => {
    expect(typeof PrismaService).toBe("function");
    expect(PrismaService.prototype.constructor.name).toBe("PrismaService");
  });

  it("declares onModuleInit and onModuleDestroy lifecycle hooks", () => {
    expect(typeof PrismaService.prototype.onModuleInit).toBe("function");
    expect(typeof PrismaService.prototype.onModuleDestroy).toBe("function");
  });
});
