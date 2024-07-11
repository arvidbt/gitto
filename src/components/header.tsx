/* eslint-disable @typescript-eslint/no-empty-function */
import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { SignIn } from "./signin";
import { auth } from "@/auth";
import { SignOut } from "./sign-out";

export default async function Header() {
  const session = await auth();

  return (
    <div className="border-b-2 border-github-foreground bg-github-primary">
      <div>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-x-6 px-4 py-10 xl:px-0">
          <h1 className="relative flex flex-row items-baseline text-lg font-semibold tracking-tighter md:text-xl">
            <div className="flex items-center justify-center gap-2 tracking-tighter">
              <Link
                href={session ? "/dashboard" : "/"}
                className=" flex items-center justify-center gap-2 text-4xl font-black tracking-tighter"
              >
                <div className="hidden md:block">{siteConfig.title}</div>
              </Link>
            </div>
          </h1>
          {session ? (
            <div className="flex flex-row gap-4">
              <SignOut />
            </div>
          ) : (
            <div>
              <div className="flex flex-row gap-2">
                <SignIn />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-x-4"></div>
      </div>
    </div>
  );
}
