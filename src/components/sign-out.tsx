import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirect: false });
        const session = await auth();

        return redirect(session?.user.name ?? "/");
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}
