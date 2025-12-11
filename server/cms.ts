import { eq, and, desc } from "drizzle-orm";
import {
  pageContent,
  mediaAssets,
  galleryItems,
  InsertPageContent,
  InsertMediaAsset,
  InsertGalleryItem,
} from "../drizzle/schema";
import { getDb } from "./db";

// ==================== Page Content Operations ====================

export async function getAllPageContent() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(pageContent).orderBy(pageContent.pageId, pageContent.displayOrder);
}

export async function getPageContentByPage(pageId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(pageContent)
    .where(and(eq(pageContent.pageId, pageId), eq(pageContent.isActive, true)))
    .orderBy(pageContent.displayOrder);
}

export async function getPageContentById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(pageContent).where(eq(pageContent.id, id)).limit(1);
  return result[0];
}

export async function createPageContent(data: InsertPageContent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(pageContent).values(data);
  return result;
}

export async function updatePageContent(id: number, data: Partial<InsertPageContent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(pageContent).set(data).where(eq(pageContent.id, id));
  return await getPageContentById(id);
}

export async function deletePageContent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(pageContent).where(eq(pageContent.id, id));
  return { success: true };
}

// ==================== Media Assets Operations ====================

export async function getAllMediaAssets() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function getMediaAssetsByContext(usageContext: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select()
    .from(mediaAssets)
    .where(eq(mediaAssets.usageContext, usageContext))
    .orderBy(desc(mediaAssets.createdAt));
}

export async function getMediaAssetById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  return result[0];
}

export async function createMediaAsset(data: InsertMediaAsset) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(mediaAssets).values(data);
  return result;
}

export async function updateMediaAsset(id: number, data: Partial<InsertMediaAsset>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(mediaAssets).set(data).where(eq(mediaAssets.id, id));
  return await getMediaAssetById(id);
}

export async function deleteMediaAsset(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  return { success: true };
}

// ==================== Gallery Items Operations ====================

export async function getAllGalleryItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select({
      id: galleryItems.id,
      mediaAssetId: galleryItems.mediaAssetId,
      title: galleryItems.title,
      description: galleryItems.description,
      category: galleryItems.category,
      displayOrder: galleryItems.displayOrder,
      isActive: galleryItems.isActive,
      createdAt: galleryItems.createdAt,
      updatedAt: galleryItems.updatedAt,
      // Join with media assets to get the image URL
      imageUrl: mediaAssets.url,
      altText: mediaAssets.altText,
    })
    .from(galleryItems)
    .leftJoin(mediaAssets, eq(galleryItems.mediaAssetId, mediaAssets.id))
    .orderBy(galleryItems.displayOrder);
}

export async function getActiveGalleryItems() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return await db
    .select({
      id: galleryItems.id,
      mediaAssetId: galleryItems.mediaAssetId,
      title: galleryItems.title,
      description: galleryItems.description,
      category: galleryItems.category,
      displayOrder: galleryItems.displayOrder,
      imageUrl: mediaAssets.url,
      altText: mediaAssets.altText,
    })
    .from(galleryItems)
    .leftJoin(mediaAssets, eq(galleryItems.mediaAssetId, mediaAssets.id))
    .where(eq(galleryItems.isActive, true))
    .orderBy(galleryItems.displayOrder);
}

export async function getGalleryItemById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
  return result[0];
}

export async function createGalleryItem(data: InsertGalleryItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(galleryItems).values(data);
  return result;
}

export async function updateGalleryItem(id: number, data: Partial<InsertGalleryItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(galleryItems).set(data).where(eq(galleryItems.id, id));
  return await getGalleryItemById(id);
}

export async function deleteGalleryItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(galleryItems).where(eq(galleryItems.id, id));
  return { success: true };
}
