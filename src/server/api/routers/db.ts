/* eslint-disable @typescript-eslint/no-unsafe-return */

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { db } from "@/server/db";
import { repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const dbRouter = createTRPCRouter({
  deleteLink: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await db.delete(repository).where(eq(repository.id, input.id));
    }),

  getActiveLinks: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await db.query.repository.findMany({
      where: eq(repository.userId, "45a9305a-ca1e-40eb-a7e9-dfd0213400b9"),
    });

    return res;
  }),
});
