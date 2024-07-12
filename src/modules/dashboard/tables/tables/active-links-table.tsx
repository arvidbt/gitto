"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { getActiveLinksColumns } from "../columns/active-links-columns";
import { ActiveLinksDataTable } from "..";
import { type repositorySelectSchema } from "@/server/db/schema";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

interface ActiveLinksTableProps {
  activeLinks: z.infer<typeof repositorySelectSchema>[];
}

export function ActiveLinksTable({ activeLinks }: ActiveLinksTableProps) {
  const utils = api.useUtils();
  // utils.db.invalidate()
  return (
    <>
      <div>
        <Card
          x-chunk="dashboard-01-chunk-5"
          className="border-2 border-github-foreground bg-github-secondary text-github-white md:col-span-2"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Active Links</CardTitle>
              <CardDescription>Access repositories with keys.</CardDescription>
            </div>
            <Button className="ml-auto h-9 gap-2 bg-purple-500 hover:bg-purple-500/80">
              <span className="hidden md:flex">Manage Keys</span>
              <KeyRound className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="grid">
            <ActiveLinksDataTable
              data={activeLinks}
              columns={getActiveLinksColumns}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
