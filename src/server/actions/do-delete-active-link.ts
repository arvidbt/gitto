import { api } from "@/trpc/server";

interface Props {
  activeLinkId: string;
}

export async function doDeleteActiveLink({ activeLinkId }: Props) {
  await api.db.deleteLink({ id: activeLinkId });
}
