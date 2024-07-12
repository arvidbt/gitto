"use server";

import { api } from "@/trpc/server";
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

  const repositoryResponse = await api.github.getRepository({
    owner: owner,
    repo: repo,
  });

  const repoId = await db
    .insert(repository)
    .values({
      repositoryFullName: `${owner}/${repo}`,
      repositoryName: repo,
      repositoryOwner: owner,
      userId: "45a9305a-ca1e-40eb-a7e9-dfd0213400b9",
    })
    .returning({ id: repository.id })
    .onConflictDoNothing();

  if (repoId.length === 0) {
    redirect(`/${owner}/${repo}`);
  }

  const updatedTree = await Promise.all(
    repositoryResponse.data.tree.map(async (file) => {
      const encodedContent = await api.github.getEncodedFileContent({
        path: file.path ?? "",
        owner: owner,
        repo: repo,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { mode, size, url, path, sha, type } = file;

      return {
        name: path ?? "",
        sha: sha ?? "",
        type: type ?? "",
        encodedContent: encodedContent ?? "",
        repoId: repoId[0]?.id ?? "",
      };
    }),
  );

  await db.insert(files).values(updatedTree).onConflictDoNothing();

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
            defaultValue={repoId[0]?.id}
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
