import { auth } from "@/auth";
import { db } from "@/server/db";
import { repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getActiveLinks() {
  const session = auth();
  await db.query.repository.findMany({
    where: eq(repository.userId, "45a9305a-ca1e-40eb-a7e9-dfd0213400b9"),
  });
}
