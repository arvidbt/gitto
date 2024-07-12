"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type z } from "zod";
import { type repositorySelectSchema } from "@/server/db/schema";
import { ActiveLinkCard } from "./active-link-card";

export type RepositoryItem = z.infer<typeof repositorySelectSchema>;

export const getActiveLinksColumns: ColumnDef<RepositoryItem>[] = [
  {
    accessorKey: "name",
    header: ({}) => {
      return <p className="hidden">Links</p>;
    },
    cell: ({ row }) => {
      const tableData = row.original;

      return <ActiveLinkCard rowData={tableData} />;
    },
  },
];
