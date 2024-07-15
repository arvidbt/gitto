import { auth } from "@/auth";
import { buildTree } from "@/lib/create-file-tree";
import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";

export default async function Page({ params }: { params: { repo: string } }) {
  const session = await auth();
  const res = await db.query.repository.findFirst({
    where: and(
      eq(repository.userId, session?.user.id ?? ""),
      eq(repository.repositoryName, params.repo),
    ),
  });

  console.log(res);

  const res2 = await db.query.files.findMany({
    where: eq(files.repoId, res?.id ?? ""),
  });

  console.log(res2);

  return <div></div>;
}
