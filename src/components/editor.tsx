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
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { redirect } from "next/navigation";

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

  const [repoId] = await db
    .insert(repository)
    .values({
      repositoryFullName: `${owner}/${repo}`,
      repositoryName: repo,
      repositoryOwner: owner,
      userId: session.user.id,
    })
    .returning({ id: repository.id })
    .onConflictDoNothing();

  if (!repoId) {
    return null;
  }

  const updatedTree = await Promise.all(
    repositoryResponse.data.tree.map(async (file) => {
      return {
        path: file.path!,
        mode: file.mode!,
        type: file.type!,
        sha: file.sha!,
        size: file.size ?? 0,
        url: file.url!,
        name: repo,
        encodedContent:
          (await trpc.github.getEncodedFileContent({
            path: file.path ?? "",
            owner: owner,
            repo: repo,
          })) ?? "",
        repoId: repoId.id,
      };
    }),
  );

  console.log(updatedTree);

  await trpc.db.insertContent(updatedTree);

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
