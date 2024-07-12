import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  redirectUrl: string;
  revalidateLayout: "page" | "layout";
}

export async function doRevalidateThenRedirect({
  redirectUrl,
  revalidateLayout,
}: Props) {
  revalidatePath(redirectUrl, revalidateLayout);
  return redirect(redirectUrl);
}
