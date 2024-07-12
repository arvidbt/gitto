"use client";

import { Button } from "@/components/ui/button";

import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { UserRepositoryRow } from "./user-repository-row";

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

        return <UserRepositoryRow rowData={tableData} />;
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
