"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import Link from "next/link";
import { type RepositoryItem } from "./active-links-columns";

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
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
