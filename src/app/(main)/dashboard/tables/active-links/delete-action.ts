"use server";

import { api } from "@/trpc/server";

export async function deleteLink(id: string) {
  await api.db.deleteLink({ id: id });
}
