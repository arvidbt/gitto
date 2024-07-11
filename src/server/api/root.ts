import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { githubRouter } from "./routers/github";
import { authRouter } from "./routers/auth";
import { dbRouter } from "./routers/db";

export const appRouter = createTRPCRouter({
  github: githubRouter,
  auth: authRouter,
  db: dbRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
