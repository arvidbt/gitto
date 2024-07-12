"use server";

import { api } from "@/trpc/server";

export async function doGetApiStatus() {
  const res = await api.github.getUserRateLimit();
  return res;
}
