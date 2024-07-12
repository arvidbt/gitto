"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useGetApiStatus } from "@/hooks/use-get-api-status";
import { Suspense } from "react";

export function ApiStatusHoverCard() {
  const { data } = useGetApiStatus();
  function convert(t: number) {
    return ((t % 3600) / 60).toFixed(0);
  }

  const apiRateData = data?.data;

  return (
    <Suspense fallback={<p>Loading....</p>}>
      <div className="flew-row ml-auto flex min-w-fit flex-1 items-center justify-center gap-2 sm:flex-initial">
        <HoverCard>
          <HoverCardTrigger className="flew-row flex min-w-fit flex-1 items-center justify-center gap-2">
            <p className="text-sm font-bold text-github-green">
              {apiRateData?.rate.remaining}{" "}
            </p>
            <p className="text-github-accent">/</p>
            <p className="text-xs font-semibold text-github-muted/50">
              {apiRateData?.rate.limit}
            </p>
          </HoverCardTrigger>
          <HoverCardContent>
            You got {apiRateData?.rate.remaining} calls remaining towards
            Githubs API. This will reset in{" "}
            {convert(apiRateData?.rate.reset ?? 0)} minutes.
          </HoverCardContent>
        </HoverCard>
      </div>
    </Suspense>
  );
}
