import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderSymlink } from "lucide-react";
import { getUserRepositoryColumns } from "./user-repository-columns";
import { type repositorySelectSchema } from "@/server/db/schema";
import { type UserRepositories } from "@/server/api/routers/github";
import { type z } from "zod";
import { UserRepositoryDataTable } from "./user-repository-data-table";
import { SelectForm } from "./create-link-select-form";

interface UserRepositoriesProps {
  activeLinks: z.infer<typeof repositorySelectSchema>[];
  userRepos: UserRepositories;
}

export function UserRepositoriesTable({
  activeLinks,
  userRepos,
}: UserRepositoriesProps) {
  const repos = userRepos.data.map(
    ({
      id,
      name,
      description,
      updated_at,
      html_url,
      language,
      full_name,
      visibility,
    }) => ({
      id,
      name,
      description,
      updated_at,
      html_url,
      language,
      full_name,
      visibility,
      active: activeLinks.some(
        (activeLink) => activeLink.repositoryFullName === full_name,
      ),
    }),
  );

  return (
    <Card
      className="border-2 border-github-foreground bg-github-secondary text-github-white md:col-span-3"
      x-chunk="dashboard-01-chunk-4"
    >
      <CardHeader className="flex flex-row items-center gap-10">
        <div className="grid gap-2">
          <CardTitle className="text-xl">Github Repositories</CardTitle>
          <CardDescription>
            {" "}
            All your repositories, public and private.
          </CardDescription>
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
      <CardContent>
        {userRepos.data && (
          <UserRepositoryDataTable
            data={repos}
            columns={getUserRepositoryColumns}
          />
        )}
      </CardContent>
    </Card>
  );
}
