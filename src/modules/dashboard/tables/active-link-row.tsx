"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import Link from "next/link";
import { type RepositoryItem } from "./active-links-columns";
import {
  ArrowUpRightFromSquare,
  MoreHorizontal,
  Share,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface ActiveLinkCardProps {
  rowData: RepositoryItem;
}

export function ActiveLinkRow({ rowData }: ActiveLinkCardProps) {
  return (
    <Card className="border-2 border-github-foreground bg-github-secondary py-0">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between gap-4 text-base text-github-white">
          <div>
            <Link
              href={`/${rowData.repositoryOwner}/${rowData.repositoryName}`}
            >
              <div className="flex flex-row items-center">
                <p className="group text-github-sky hover:text-github-highlight">
                  {rowData.repositoryName}
                </p>
              </div>
            </Link>
            <p className="text-xs font-medium text-github-accent">
              Created {getTimeSinceUpdated(rowData.created ?? new Date())}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-github-foreground"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-github-accent" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-2 border-github-foreground bg-github-secondary text-github-white"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="flex flex-row items-center gap-2">
                <ArrowUpRightFromSquare />
                View on GitHub
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-2">
                <Share />
                Share Link
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center gap-2">
                <Trash className="text-github-destructive" />
                Delete Gitto Repository
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
