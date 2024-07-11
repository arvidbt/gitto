import { db } from "@/server/db";
import { files, repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const res = await db.query.repository.findFirst({
    where: eq(repository.id, "6ca57d36-6b1e-4dce-afea-47e285090f0b"),
  });

  console.log(res);

  const res2 = await db.query.files.findMany({
    where: eq(files.repoId, res?.id ?? ""),
  });

  console.log(res2);
  return <div></div>;
}
