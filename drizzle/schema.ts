import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Page content sections - stores editable text blocks for each page
 */
export const pageContent = mysqlTable("page_content", {
  id: int("id").autoincrement().primaryKey(),
  /** Page identifier (e.g., 'home', 'commemorative-plaques', 'unveiling-plaques') */
  pageId: varchar("pageId", { length: 100 }).notNull(),
  /** Section identifier within the page (e.g., 'hero-title', 'hero-subtitle', 'feature-1-title') */
  sectionId: varchar("sectionId", { length: 100 }).notNull(),
  /** The actual content text */
  content: text("content").notNull(),
  /** Content type for rendering (text, markdown, html) */
  contentType: mysqlEnum("contentType", ["text", "markdown", "html"]).default("text").notNull(),
  /** Display order for sections on the same page */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this content is currently active/visible */
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = typeof pageContent.$inferInsert;

/**
 * Media assets - stores images and other media files
 */
export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  /** Original filename */
  filename: varchar("filename", { length: 255 }).notNull(),
  /** S3 file key */
  fileKey: varchar("fileKey", { length: 500 }).notNull(),
  /** Public URL to access the file */
  url: text("url").notNull(),
  /** MIME type (e.g., 'image/png', 'image/jpeg') */
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  /** File size in bytes */
  fileSize: int("fileSize").notNull(),
  /** Alt text for accessibility */
  altText: text("altText"),
  /** Where this asset is used (e.g., 'home-hero', 'gallery') */
  usageContext: varchar("usageContext", { length: 100 }),
  /** User who uploaded this asset */
  uploadedBy: int("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

/**
 * Gallery items - stores gallery images with metadata
 */
export const galleryItems = mysqlTable("gallery_items", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to media asset */
  mediaAssetId: int("mediaAssetId").notNull(),
  /** Title of the gallery item */
  title: varchar("title", { length: 255 }).notNull(),
  /** Description of the project */
  description: text("description"),
  /** Project category (e.g., 'slate', 'bronze', 'brass') */
  category: varchar("category", { length: 100 }),
  /** Display order in gallery */
  displayOrder: int("displayOrder").default(0).notNull(),
  /** Whether this item is currently visible */
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;