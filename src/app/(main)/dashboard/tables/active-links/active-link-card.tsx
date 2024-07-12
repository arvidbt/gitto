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
import { ArrowRight, Copy, Share, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteLink } from "./delete-action";
import { type RepositoryItem } from "./active-links-columns";
import { useMutation } from "@tanstack/react-query";
import { navigate } from "./redirect-action";
import { Suspense } from "react";
import Link from "next/link";

interface ActiveLinkCardProps {
  rowData: RepositoryItem;
}

export function ActiveLinkCard({ rowData }: ActiveLinkCardProps) {
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLink(id),
  });

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
          {/* <Button
            <Button
              className="p-0 text-github-destructive"
              variant={"link"}
              onClick={() =>
                deleteMutation.mutate(rowData.id, {
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSettled: () => navigate("/dashboard"),
                })
              }
            >
            </Button> */}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
