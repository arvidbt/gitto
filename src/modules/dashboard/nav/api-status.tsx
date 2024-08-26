import { trpc } from "@/trpc/server";
import { Suspense } from "react";

export async function ApiStatusHoverCard() {
  const data = await trpc.github.getUserRateLimit();
  function convert(t: number) {
    return ((t % 3600) / 60).toFixed(0);
  }

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <div className="flew-row flex min-w-fit flex-1 items-center justify-center gap-1 sm:flex-initial">
        <span className="font-semibold text-github-green">
          {data.data.rate.remaining}
        </span>
        API calls remaining. Resets in
        <span className="font-semibold">
          {convert(data.data.rate.reset ?? 0)}
        </span>
        minutes.
      </div>
    </Suspense>
  );
}
