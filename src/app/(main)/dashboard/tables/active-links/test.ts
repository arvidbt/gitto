import { db } from "@/server/db";
import { repository } from "@/server/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  id: string;
};

export async function deleteRow({ id }: Props) {
  await db.delete(repository).where(eq(repository.id, id));
}
