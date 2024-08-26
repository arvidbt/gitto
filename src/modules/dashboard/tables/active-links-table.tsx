"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type repositorySelectSchema } from "@/server/db/schema";
import { type z } from "zod";
import { getActiveLinksColumns } from "./active-links-columns";
import { ActiveLinksDataTable } from "./active-links-data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderSymlink } from "lucide-react";
import { SelectForm } from "./create-link-select-form";
import { type UserRepositories } from "@/server/api/routers/github";

interface ActiveLinksTableProps {
  activeLinks: z.infer<typeof repositorySelectSchema>[];
  userRepos: UserRepositories;
}

export function ActiveLinksTable({
  activeLinks,
  userRepos,
}: ActiveLinksTableProps) {
  return (
    <>
      <div>
        <Card
          x-chunk="dashboard-01-chunk-5"
          className="border-2 border-github-foreground bg-github-secondary text-github-white md:col-span-2"
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <div className="grid gap-2">
              <CardTitle className="text-xl">Active Links</CardTitle>
              <CardDescription>Access repositories with keys.</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger className="ml-auto h-9 gap-1 rounded-md bg-github-green px-3 text-github-white hover:bg-github-green/80">
                <div className="flex flex-row items-center justify-center gap-2">
                  <p className="hidden text-sm font-semibold md:block">
                    Create Gitto link
                  </p>
                  <FolderSymlink className="h-4 w-4" />
                </div>
              </DialogTrigger>
              <DialogContent className="border-github-foreground bg-github-secondary">
                <DialogHeader>
                  <DialogTitle>Create Repository Link</DialogTitle>
                  <DialogDescription>
                    Select the repository you want to create a link for.
                  </DialogDescription>
                </DialogHeader>
                <SelectForm
                  data={userRepos.data
                    .filter(
                      (repo) =>
                        !activeLinks.some(
                          (activeLink) =>
                            activeLink.repositoryFullName === repo.full_name,
                        ),
                    )
                    .map(({ id, full_name, name }) => ({
                      id,
                      full_name,
                      name,
                    }))}
                />
              </DialogContent>
            </Dialog>
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
