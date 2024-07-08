"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const RepositoryTableSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  updated_at: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
});

export type RepositoryItem = z.infer<typeof RepositoryTableSchema>;

export const columns: ColumnDef<RepositoryItem>[] = [
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
        <>
          <Link
            href={tableData.html_url}
            target="_blank"
            className="decoration-github-sky hover:underline"
          >
            <div className="text-github-sky text-left text-lg font-bold">
              {tableData.name}
            </div>
          </Link>
          <div className={cn("hidden text-sm text-muted-foreground md:inline")}>
            {tableData.language}
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "last_updated",
    header: () => <div className="text-right">Last Updated</div>,
    cell: ({ row }) => {
      const tableData = row.original;

      return (
        <div className="text-github-muted text-right text-xs font-medium">
          {tableData.updated_at && (
            <p>{getTimeSinceUpdated(new Date(tableData.updated_at))}</p>
          )}
        </div>
      );
    },
  },
];
