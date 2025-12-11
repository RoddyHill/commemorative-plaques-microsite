import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@stonesign.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("CMS Content Management", () => {
  let createdContentId: number | undefined;

  it("admin can create page content", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.create({
      pageId: "test-page",
      sectionId: "test-section",
      content: "Test content",
      contentType: "text",
      displayOrder: 0,
      isActive: true,
    });

    expect(result).toBeDefined();
    // The result is a MySQL insert result, get the insertId
    const insertId = (result as any).insertId || (result as any)[0]?.insertId;
    expect(insertId).toBeGreaterThan(0);
    createdContentId = Number(insertId);
    console.log("Created content ID:", createdContentId);
  });

  it("public can retrieve page content", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.getByPage({ pageId: "test-page" });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can retrieve all content", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.getAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can update page content", async () => {
    if (!createdContentId) {
      throw new Error("Content ID not set from previous test");
    }

    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.update({
      id: createdContentId,
      content: "Updated content",
    });

    expect(result).toBeDefined();
    expect(result?.content).toBe("Updated content");
  });

  it("admin can delete page content", async () => {
    if (!createdContentId) {
      throw new Error("Content ID not set from previous test");
    }

    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.delete({ id: createdContentId });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("non-admin cannot create content", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.content.create({
        pageId: "test-page",
        sectionId: "test-section",
        content: "Test content",
        contentType: "text",
        displayOrder: 0,
        isActive: true,
      })
    ).rejects.toThrow();
  });
});

describe("CMS Media Management", () => {
  it("public can retrieve all media assets", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.media.getAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("public can retrieve media by context", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.media.getByContext({ usageContext: "home-hero" });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can upload media (with valid base64)", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create a small 1x1 PNG image in base64
    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    const result = await caller.media.upload({
      filename: "test-image.png",
      fileData: testImageBase64,
      mimeType: "image/png",
      altText: "Test image",
      usageContext: "test",
    });

    expect(result).toBeDefined();
    expect(result.url).toBeDefined();
    expect(result.fileKey).toBeDefined();
  });

  it("non-admin cannot upload media", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    await expect(
      caller.media.upload({
        filename: "test-image.png",
        fileData: testImageBase64,
        mimeType: "image/png",
        altText: "Test image",
        usageContext: "test",
      })
    ).rejects.toThrow();
  });
});

describe("CMS Gallery Management", () => {
  it("public can retrieve active gallery items", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gallery.getActive();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("admin can retrieve all gallery items", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.gallery.getAll();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("non-admin cannot access all gallery items", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.gallery.getAll()).rejects.toThrow();
  });
});
