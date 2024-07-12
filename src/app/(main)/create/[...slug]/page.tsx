import { auth } from "@/auth";
import Editor from "@/components/editor";
import { Nav } from "@/components/nav";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Repository({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();

  const owner = params.slug[0];
  const repo = params.slug[1];

  if (!owner || !repo) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-github-secondary">
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="flex min-h-screen w-full flex-col">
          <Nav />
          <main className="flex flex-1 flex-col gap-4 py-8 md:gap-8 ">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Suspense
                fallback={
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                }
              >
                <Editor owner={owner} repo={repo} />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
