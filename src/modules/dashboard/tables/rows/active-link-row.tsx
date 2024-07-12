"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { ArrowRight } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { type RepositoryItem } from "../columns/active-links-columns";
// import { Button } from "@/components/ui/button";
// import { api } from "@/trpc/react";

interface ActiveLinkCardProps {
  rowData: RepositoryItem;
}

export function ActiveLinkRow({ rowData }: ActiveLinkCardProps) {
  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => deleteLink(id),
  // });

  //   const utils = api.useUtils();

  //   const invalidateDatabaseQueries = () => {
  //     utils.db.invalidate();
  //   };

  return (
    <Card className="border-2 border-github-foreground bg-github-secondary py-0">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between gap-4 text-base text-github-white">
          <div>
            <p className="text-github-white">{rowData.repositoryName}</p>
            <p className="text-xs font-medium text-github-accent">
              Created {getTimeSinceUpdated(rowData.created ?? new Date())}
            </p>
          </div>
          <Link href={`/${rowData.repositoryOwner}/${rowData.repositoryName}`}>
            <ArrowRight className="h-4 w-4 text-github-white hover:text-github-highlight" />
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
