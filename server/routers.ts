import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as cms from "./cms";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // CMS Content Management
  content: router({
    // Public: Get content for a specific page
    getByPage: publicProcedure
      .input(z.object({ pageId: z.string() }))
      .query(async ({ input }) => {
        return await cms.getPageContentByPage(input.pageId);
      }),
    
    // Admin: Get all content
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.getAllPageContent();
      }),
    
    // Admin: Create new content
    create: protectedProcedure
      .input(z.object({
        pageId: z.string(),
        sectionId: z.string(),
        content: z.string(),
        contentType: z.enum(["text", "markdown", "html"]).default("text"),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.createPageContent(input);
      }),
    
    // Admin: Update content
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        pageId: z.string().optional(),
        sectionId: z.string().optional(),
        content: z.string().optional(),
        contentType: z.enum(["text", "markdown", "html"]).optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return await cms.updatePageContent(id, data);
      }),
    
    // Admin: Delete content
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.deletePageContent(input.id);
      }),
  }),

  // CMS Media Management
  media: router({
    // Public: Get all media assets
    getAll: publicProcedure.query(async () => {
      return await cms.getAllMediaAssets();
    }),
    
    // Public: Get media by context
    getByContext: publicProcedure
      .input(z.object({ usageContext: z.string() }))
      .query(async ({ input }) => {
        return await cms.getMediaAssetsByContext(input.usageContext);
      }),
    
    // Admin: Upload new media
    upload: protectedProcedure
      .input(z.object({
        filename: z.string(),
        fileData: z.string(), // base64 encoded
        mimeType: z.string(),
        altText: z.string().optional(),
        usageContext: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        
        // Decode base64 and upload to S3
        const buffer = Buffer.from(input.fileData, 'base64');
        const fileKey = `cms-media/${nanoid()}-${input.filename}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        
        // Save to database
        await cms.createMediaAsset({
          filename: input.filename,
          fileKey,
          url,
          mimeType: input.mimeType,
          fileSize: buffer.length,
          altText: input.altText || null,
          usageContext: input.usageContext || null,
          uploadedBy: ctx.user.id,
        });
        
        return { url, fileKey };
      }),
    
    // Admin: Update media metadata
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        altText: z.string().optional(),
        usageContext: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return await cms.updateMediaAsset(id, data);
      }),
    
    // Admin: Delete media
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.deleteMediaAsset(input.id);
      }),
  }),

  // CMS Gallery Management
  gallery: router({
    // Public: Get active gallery items
    getActive: publicProcedure.query(async () => {
      return await cms.getActiveGalleryItems();
    }),
    
    // Admin: Get all gallery items
    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.getAllGalleryItems();
      }),
    
    // Admin: Create gallery item
    create: protectedProcedure
      .input(z.object({
        mediaAssetId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        displayOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.createGalleryItem(input);
      }),
    
    // Admin: Update gallery item
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        displayOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        const { id, ...data } = input;
        return await cms.updateGalleryItem(id, data);
      }),
    
    // Admin: Delete gallery item
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
        }
        return await cms.deleteGalleryItem(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
