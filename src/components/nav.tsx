import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { GitBranchPlus, User } from "lucide-react";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { SignOut } from "./sign-out";
import { CommandDialogMenu } from "./command-menu";
import { ApiStatusHoverCard } from "@/modules/dashboard/nav/api-status";

export async function Nav() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 rounded-lg border border-github-foreground bg-github-secondary px-4 text-github-white md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <GitBranchPlus className="h-6 w-6" />
        </Link>
      </nav>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ApiStatusHoverCard />
        <CommandDialogMenu />
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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
