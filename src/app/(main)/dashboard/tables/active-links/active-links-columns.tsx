"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { type ColumnDef } from "@tanstack/react-table";
import { Copy, Share, Trash } from "lucide-react";
import { toast } from "sonner";
import { type z } from "zod";
import { type repositorySelectSchema } from "@/server/db/schema";

export type RepositoryItem = z.infer<typeof repositorySelectSchema>;

export const getActiveLinksColumns: ColumnDef<RepositoryItem>[] = [
  {
    accessorKey: "name",
    header: ({}) => {
      return <p className="hidden">Links</p>;
    },
    cell: ({ row }) => {
      const tableData = row.original;

      return (
        <Card className="border-2 border-github-foreground bg-github-secondary py-0">
          <CardHeader>
            <CardTitle className="flex flex-row items-center justify-between gap-4 text-base text-github-white">
              {tableData.repositoryName}
              <div className="flex flex-row gap-4">
                <Button
                  className="p-0 text-github-white"
                  variant={"link"}
                  onClick={() => {
                    toast("Copied link");
                  }}
                >
                  <Share className="h-4 w-4" />
                </Button>
                <Button
                  className="p-0 text-github-destructive"
                  variant={"link"}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            {tableData.created && (
              <CardDescription>
                Link created {getTimeSinceUpdated(tableData.created)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="flew-row flex items-center justify-center gap-4">
              <Input
                className="border-2 border-github-foreground bg-github-secondary text-github-accent"
                disabled={true}
                type="password"
                defaultValue={tableData.id}
              />
              <Copy className="text-github-accent" />
            </div>
          </CardContent>
        </Card>
      );
    },
  },
];
