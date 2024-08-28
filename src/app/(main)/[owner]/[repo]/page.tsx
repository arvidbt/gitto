import { auth } from "@/auth";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq, and, or } from "drizzle-orm";
import { buildTree } from "./build";
import { Repository } from "@/modules/repository/repository";
import { type RepositoryLanguage } from "@/server/api/routers/db";

export default async function Page({
  params,
}: {
  params: { repo: string; owner: string };
}) {
  const session = await auth();
  const res = await db.query.repository.findFirst({
    where: or(
      eq(repository.userId, session?.user.id ?? ""),
      eq(repository.repositoryName, params.repo),
    ),
  });

  if (!res) {
    return <div>no</div>;
  }

  const storedFiles = await db
    .select()
    .from(files)
    .where(eq(files.repoId, res.id));

  const languages = res.languages as RepositoryLanguage;

  return (
    <Repository
      files={buildTree(storedFiles)}
      repo={params.repo}
      languages={languages}
      user={{
        username: params.owner,
        name: session?.user.name ?? params.owner,
        image: session?.user.image ?? "",
      }}
    />
  );
}
