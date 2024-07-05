import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { githubRouter } from "./routers/github";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  github: githubRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
