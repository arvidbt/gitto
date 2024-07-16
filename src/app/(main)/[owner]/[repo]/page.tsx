import { auth } from "@/auth";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { buildTree } from "./build";
import { FileExplorer } from "@/modules/repository/file-explorer";

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

  const t = buildTree(storedFiles);

  return <FileExplorer files={t} repo={params.repo} />;
}
