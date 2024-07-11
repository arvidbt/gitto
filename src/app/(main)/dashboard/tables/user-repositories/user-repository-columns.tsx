"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UserRepositoryColumnProps = {
  id: number;
  name: string;
  description: string | null;
  updated_at: string | null;
  html_url: string;
  language: string | null;
  full_name: string;
  visibility: string | undefined;
  active: boolean;
};

export const getUserRepositoryColumns: ColumnDef<UserRepositoryColumnProps>[] =
  [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const tableData = row.original;

        return (
          <div className="flex flex-row items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <span
                    className={cn(
                      "flex h-2 w-2 rounded-full ",
                      tableData.active
                        ? " bg-github-green"
                        : "bg-github-foreground",
                    )}
                  ></span>
                </TooltipTrigger>
                <TooltipContent className="border-2 border-github-foreground bg-github-secondary">
                  <p className="text-github-white">
                    <span className="text-github-sky">{tableData.name} </span>
                    {tableData.active
                      ? "has an active link."
                      : "does not have an active link."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Link
              href={tableData.html_url}
              target="_blank"
              className="decoration-github-sky hover:underline"
            >
              <div className="text-left text-base font-bold text-github-sky">
                {tableData.name}
              </div>
            </Link>
            <div
              className={cn(
                "hidden text-sm capitalize text-muted-foreground md:inline",
              )}
            >
              {tableData.visibility}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "last_updated",
      header: () => <div className="text-right">Last Updated</div>,
      cell: ({ row }) => {
        const tableData = row.original;

        return (
          <div className="text-right text-xs font-medium text-github-muted">
            {tableData.updated_at && (
              <p>{getTimeSinceUpdated(new Date(tableData.updated_at))}</p>
            )}
          </div>
        );
      },
    },
  ];
