/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { signIn, signOut } from "@/auth";

export const authRouter = createTRPCRouter({
  signIn: publicProcedure.mutation(async () => {
    await signIn("github", { redirectTo: "/test", redirect: true });
  }),

  signOut: protectedProcedure.mutation(async () => {
    await signOut({ redirectTo: "/" });
  }),
});
