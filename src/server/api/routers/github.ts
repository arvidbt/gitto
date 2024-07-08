/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { Octokit } from "octokit";
import { Octokit as Rest } from "@octokit/rest";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const githubRouter = createTRPCRouter({
  getRepository: protectedProcedure
    .input(z.object({ owner: z.string().min(1), repo: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const octokit = new Octokit({
        auth: ctx.session?.accessToken,
      });
      const octokitRest = new Rest({
        auth: ctx.session?.accessToken,
      });

      const repoResponse = await octokitRest.repos.get({
        owner: input.owner,
        repo: input.repo,
      });

      const defaultBranch = await octokitRest.repos.getBranch({
        owner: input.owner,
        repo: input.repo,
        branch: repoResponse.data.default_branch,
      });

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
      const octokitRest = new Rest({
        auth: ctx.session?.accessToken,
      });

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

  getUserRepositories: protectedProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const octokit = new Octokit({
        auth: ctx.session?.accessToken,
      });

      const userRepos = await octokit.request("GET /user/repos", {
        type: "all",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      return userRepos;
    }),
});
