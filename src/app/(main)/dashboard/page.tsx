import { trpc } from "@/trpc/server";
import { auth } from "@/auth";
import { ActiveLinksTable } from "@/modules/dashboard";
import { Suspense } from "react";
import { Nav } from "@/modules/dashboard/nav/nav";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return null;
  }

  const repos = await trpc.github.getUserRepositories({ username: "arvidbt" });
  const activeLinks = await trpc.db.getActiveLinks();

  const totalUsage = activeLinks.reduce(
    (sum, link) => sum + (link.size ?? 0),
    0,
  );

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="boxes flex w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="flex min-h-screen w-full flex-col">
            <Nav quotaUsage={parseInt((totalUsage / 1000).toFixed(0))} />
            <main className="flex flex-1 flex-col gap-4 py-8 md:gap-8 ">
              <div className="w-full gap-4 md:gap-8 ">
                <div className="min-w-[340px] md:min-w-[720px] lg:min-w-[980px] xl:min-w-[1280px]">
                  <ActiveLinksTable
                    activeLinks={activeLinks}
                    userRepos={repos}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
