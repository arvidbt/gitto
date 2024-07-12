import { api } from "@/trpc/server";
import { auth } from "@/auth";
import { Nav } from "@/components/nav";
import { UserRepositoriesTable, ActiveLinksTable } from "@/modules/dashboard";
import { doGetActiveLinks } from "@/server/actions/do-get-active-links";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await auth();
  const repos = await api.github.getUserRepositories({ username: "arvidbt" });

  const activeLinks = await doGetActiveLinks();
  if (!session) {
    return null;
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="flex min-h-screen w-full flex-col">
            <Nav />
            <main className="flex flex-1 flex-col gap-4 py-8 md:gap-8 ">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
                <div className="md:col-span-2">
                  <UserRepositoriesTable
                    userRepos={repos}
                    activeLinks={activeLinks}
                  />
                </div>
                <div className="md:col-span-2">
                  <ActiveLinksTable activeLinks={activeLinks} />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
