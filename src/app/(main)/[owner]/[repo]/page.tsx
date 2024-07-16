import { auth } from "@/auth";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { buildTree } from "./build";
import { Repository } from "@/modules/repository/repository";

export default async function Page({ params }: { params: { repo: string } }) {
  const session = await auth();
  const res = await db.query.repository.findFirst({
    where: and(
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

  return <Repository files={buildTree(storedFiles)} repo={params.repo} />;
}
