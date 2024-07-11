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
});
