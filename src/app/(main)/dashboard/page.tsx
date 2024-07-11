import { api } from "@/trpc/server";
import { auth } from "@/auth";
import { Nav } from "@/components/nav";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { repository } from "@/server/db/schema";
import { ActiveLinksTable } from "./tables/active-links/active-links";
import { UserRepositoriesTable } from "./tables/user-repositories/user-repositories";

export default async function Dashboard() {
  const session = await auth();
  const repos = await api.github.getUserRepositories({ username: "arvidbt" });
  const sharedRepos = await db.query.repository.findMany({
    where: eq(repository.userId, "45a9305a-ca1e-40eb-a7e9-dfd0213400b9"),
  });

  if (!session) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-github-primary">
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="flex min-h-screen w-full flex-col">
          <Nav />
          <main className="flex flex-1 flex-col gap-4 py-8 md:gap-8 ">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-5">
              <div className="md:col-span-3">
                <UserRepositoriesTable
                  session={session}
                  userRepos={repos}
                  activeLinks={sharedRepos}
                />
              </div>
              <div className="md:col-span-2">
                <ActiveLinksTable activeLinks={sharedRepos} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
