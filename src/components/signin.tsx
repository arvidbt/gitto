import { auth, signIn } from "@/auth";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/dashboard", redirect: true });
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
