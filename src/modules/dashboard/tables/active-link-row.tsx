"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTimeSinceUpdated } from "@/utils/time-since-updated";
import { ArrowRight, Settings, Share, Trash } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { type RepositoryItem } from "./active-links-columns";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChartComponent } from "@/components/test-chart";

interface ActiveLinkCardProps {
  rowData: RepositoryItem;
}

export function ActiveLinkRow({ rowData }: ActiveLinkCardProps) {
  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => deleteLink(id),
  // });

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
      <CardContent>
        <Sheet>
          <SheetTrigger>
            <Settings className="h-4 w-4 text-github-white" />
          </SheetTrigger>
          <SheetContent className="min-w-min border-github-foreground bg-github-primary">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold text-github-sky">
                Gitto Repository
              </SheetTitle>
            </SheetHeader>

            <div>
              <h1 className="font-bold">Repository Insights</h1>
              <h2 className="text-sm text-github-white">
                Repository page views since {rowData.created?.toDateString()}
              </h2>
              <ChartComponent />
            </div>

            <Card className="rounded-md border border-github-destructive bg-github-secondary text-github-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Danger Zone</CardTitle>
                <CardDescription>
                  Deletion of Gitto repository is{" "}
                  <span className="font-bold">final</span>. Once deleted, shared
                  links will no longer work.
                </CardDescription>
              </CardHeader>
              <CardContent className="rounded-md  bg-github-secondary"></CardContent>
            </Card>
          </SheetContent>
        </Sheet>

        <h2>Test</h2>
        <Share className="h-4 w-4 text-github-white" />
      </CardContent>
    </Card>
  );
}
