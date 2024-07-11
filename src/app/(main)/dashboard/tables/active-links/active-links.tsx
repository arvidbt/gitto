"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getActiveLinksColumns } from "./active-links-columns";
import { type repositorySelectSchema } from "@/server/db/schema";
import { type z } from "zod";
import { ActiveLinksDataTable } from "./active-links-data-table";
interface SharedLinksCardProps {
  activeLinks: z.infer<typeof repositorySelectSchema>[];
}

export function ActiveLinksTable({ activeLinks }: SharedLinksCardProps) {
  return (
    <div>
      <Card
        x-chunk="dashboard-01-chunk-5"
        className="border-2 border-github-foreground bg-github-secondary text-github-white md:col-span-2"
      >
        <CardHeader>
          <CardTitle>Active Links</CardTitle>
          <CardDescription>
            Repositories that are accessible with password.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid">
          <ActiveLinksDataTable
            data={activeLinks}
            columns={getActiveLinksColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
}
