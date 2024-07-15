/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const ContentTreeItemSchema = z.object({
  name: z.string(),
  sha: z.string(),
  type: z.string(),
  size: z.number(),
  url: z.string(),
  path: z.string(),
  encodedContent: z.string().nullable(),
  repoId: z.string(),
});

export const dbRouter = createTRPCRouter({
  deleteLink: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await db.delete(repository).where(eq(repository.id, input.id));
    }),

  getActiveLinks: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const res = await db.query.repository.findMany({
      where: eq(repository.userId, userId),
    });

    return res;
  }),

  insertRepository: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return await db
        .insert(repository)
        .values({
          repositoryFullName: `${input.owner}/${input.repo}`,
          repositoryName: input.repo,
          repositoryOwner: input.owner,
          userId: userId,
        })
        .returning({ id: repository.id })
        .onConflictDoNothing();
    }),

  insertContent: protectedProcedure
    .input(z.array(ContentTreeItemSchema))
    .query(async ({ ctx, input }) => {
      await db.insert(files).values(input).onConflictDoNothing();
    }),
});
