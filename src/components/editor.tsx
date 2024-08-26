"use server";

import { trpc } from "@/trpc/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { auth } from "@/auth";
import Link from "next/link";
import { RepositoryFile } from "@/server/api/routers/db";

type Props = {
  owner: string;
  repo: string;
};

export default async function Editor({ owner, repo }: Props) {
  const session = await auth();
  if (!session) {
    return null;
  }

  if (!session.user) {
    return null;
  }

  const repositoryResponse = await trpc.github.getRepository({
    owner: owner,
    repo: repo,
  });

  const repoSize = repositoryResponse.data.tree.reduce(
    (sum, file) => sum + (file.size ?? 0),
    0,
  );

  const [repoId] = await trpc.db.insertRepository({
    owner: owner,
    repo: repo,
    size: repoSize,
  });

  if (!repoId) {
    return null;
  }

  const repoContent = await Promise.all(
    repositoryResponse.data.tree.map(async (file) => {
      return {
        repoId: repoId.id,
        path: file.path!,
        type: file.type!,
        sha: file.sha!,
        size: file.size ?? 0,
        name: repo,
        content: await trpc.github.getEncodedFileContent({
          owner: owner,
          repo: repo,
          path: file.path!,
        }),
      };
    }),
  );

  await trpc.db.insertContent(repoContent);

  return (
    <div>
      <Card className="border-2 border-github-foreground bg-github-secondary text-github-white">
        <CardHeader>
          <CardTitle>Repository Created 🎉</CardTitle>
          <CardDescription className="text-github-accent">
            Repository is saved in our database. You can delete it whenever you
            want.
          </CardDescription>
          <Input
            className="border-2 border-github-foreground bg-github-secondary"
            defaultValue={`https://gitto.link/${owner}/${repo}`}
            disabled={true}
          />
          <Input
            className="border-2 border-github-foreground bg-github-secondary"
            defaultValue={repoId.id}
            disabled={true}
            itemRef=""
          />
          <CardContent>
            <Link href={"/dashboard"}>View</Link>
            <Link href={"/dashboard"}>Share</Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
