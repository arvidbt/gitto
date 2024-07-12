"use server";

import { api } from "@/trpc/server";

export async function doGetActiveLinks() {
  const res = await api.db.getActiveLinks();
  console.log("test");
  return res;
}
