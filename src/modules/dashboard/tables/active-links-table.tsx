"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { type repositorySelectSchema } from "@/server/db/schema";
import { type z } from "zod";
import { Button } from "@/components/ui/button";
import { getActiveLinksColumns } from "./active-links-columns";
import { ActiveLinksDataTable } from "./active-links-data-tabel";

interface ActiveLinksTableProps {
  activeLinks: z.infer<typeof repositorySelectSchema>[];
}

export function ActiveLinksTable({ activeLinks }: ActiveLinksTableProps) {
  return (
    <>
      <div>
        <Card
          x-chunk="dashboard-01-chunk-5"
          className="border-2 border-github-foreground bg-github-secondary text-github-white md:col-span-2"
        >
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle className="text-xl">Active Links</CardTitle>
              <CardDescription>Access repositories with keys.</CardDescription>
            </div>
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
