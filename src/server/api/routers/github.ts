/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { Octokit } from "octokit";
import { Octokit as Rest } from "@octokit/rest";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const octokit = new Octokit({
  auth: "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",
});
const octokitRest = new Rest({
  auth: "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",
});

export const githubRouter = createTRPCRouter({
  getRepository: protectedProcedure
    .input(z.object({ owner: z.string().min(1), repo: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const repoResponse = await octokitRest.repos.get({
        owner: input.owner,
        repo: input.repo,
      });

      // .request("GET /repos/{owner}/{repo}", {
      //   owner: input.owner,
      //   repo: input.repo,
      // });

      const defaultBranch = await octokitRest.repos.getBranch({
        owner: input.owner,
        repo: input.repo,
        branch: repoResponse.data.default_branch,
      });

      // .request(
      //   "GET /repos/{owner}/{repo}/branches/{branch}",
      //   {
      //     owner: input.owner,
      //     repo: input.repo,
      //     branch: repoResponse.data.default_branch,
      //   },
      // );

      const treeSha = defaultBranch.data.commit.commit.tree.sha;

      const tree = await octokit.request(
        "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
        {
          owner: input.owner,
          repo: input.repo,
          tree_sha: treeSha,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      return tree;
    }),

  getEncodedFileContent: protectedProcedure
    .input(
      z.object({
        path: z.string().min(1),
        owner: z.string().min(1),
        repo: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const encodedContent = await octokitRest.repos.getContent({
        owner: input.owner,
        repo: input.repo,
        path: input.path,
      });

      if (Array.isArray(encodedContent.data)) {
        throw new Error("The content is a directory, not a file");
      }

      if ("content" in encodedContent.data) {
        return encodedContent.data.content;
      }
    }),

  getUserRepositories: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const userRepos = await octokit.request("GET /user/repos");

      return userRepos;
    }),
});
