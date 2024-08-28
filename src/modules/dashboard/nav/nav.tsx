import Link from "next/link";

import { GitBranchPlus, User } from "lucide-react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SignOut } from "@/components/sign-out";
import { ApiStatusHoverCard } from "./api-status";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export async function Nav({ quotaUsage }: { quotaUsage: number }) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <Suspense fallback={<p>Loading nav</p>}>
      <header className="sticky top-0 flex h-16 w-full items-center gap-4 rounded-lg border border-github-foreground bg-github-secondary px-4 text-github-white md:px-6">
        <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-2">
          <Link
            href="/dashboard"
            className="flex  justify-center gap-2 text-lg font-semibold md:text-base"
          >
            <h1 className="text-xl font-black">Gitto</h1>
          </Link>
        </nav>

        <div className="flex w-full items-end justify-end gap-4 md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {session?.user.image && (
                  <AvatarImage src={session?.user?.image} />
                )}
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-github-secondary bg-github-primary text-github-white"
            >
              <DropdownMenuLabel>Github API</DropdownMenuLabel>
              <DropdownMenuItem className="focus:bg-github-foreground">
                <ApiStatusHoverCard />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-github-foreground" />
              <DropdownMenuLabel>Gitto Storage</DropdownMenuLabel>
              <DropdownMenuItem className="focus:bg-github-foreground">
                <Progress
                  value={quotaUsage}
                  max={1000}
                  className=" w-[22rem] bg-github-primary"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-github-foreground" />
              <DropdownMenuItem className="focus:bg-github-foreground">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-github-foreground" />
              <DropdownMenuItem className="focus:bg-github-foreground">
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </Suspense>
  );
}
