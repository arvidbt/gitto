import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { trpc } from "@/trpc/server";
import { Suspense } from "react";

export async function ApiStatusHoverCard() {
  const data = await trpc.github.getUserRateLimit();
  function convert(t: number) {
    return ((t % 3600) / 60).toFixed(0);
  }

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <div className="flew-row ml-auto flex min-w-fit flex-1 items-center justify-center gap-2 sm:flex-initial">
        <HoverCard>
          <HoverCardTrigger className="flew-row flex min-w-fit flex-1 items-center justify-center gap-2">
            <p className="text-sm font-bold text-github-green">
              {data.data.rate.remaining}{" "}
            </p>
            <p className="text-github-accent">/</p>
            <p className="text-xs font-semibold text-github-muted/50">
              {data.data.rate.limit}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            You got {data.data.rate.remaining} calls remaining towards Githubs
            API. This will reset in {convert(data.data.rate.reset ?? 0)}{" "}
            minutes.
          </HoverCardContent>
        </HoverCard>
      </div>
    </Suspense>
  );
}
