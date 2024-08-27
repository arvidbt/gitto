import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const RepositoryFileSchema = z.object({
  repoId: z.string(),
  type: z.string(),
  size: z.number(),
  name: z.string(),
  path: z.string(),
  content: z.string().optional(),
  sha: z.string(),
});

export type RepositoryFile = z.infer<typeof RepositoryFileSchema>;
export type RepositoryLanguage = Record<string, number>;

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

    return res.map((item) => ({
      ...item,
      languages: item.languages as RepositoryLanguage,
    }));
  }),

  insertRepository: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        size: z.number().nonnegative(),
        languages: z.record(z.number()),
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
          languages: input.languages,
          userId: userId,
          size: input.size,
        })
        .returning({ id: repository.id })
        .onConflictDoNothing();
    }),

  insertContent: protectedProcedure
    .input(z.array(RepositoryFileSchema))
    .query(async ({ ctx, input }) => {
      await db.insert(files).values(input).onConflictDoNothing();
    }),
});
