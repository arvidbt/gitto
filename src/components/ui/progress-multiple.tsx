import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressSegment = {
  value: number;
  color?: string;
};

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  segments: ProgressSegment[];
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, segments, ...props }, ref) => {
  const sortedSegments = segments.sort((a, b) => a.value - b.value);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-md bg-github-primary",
        className,
      )}
      {...props}
    >
      {sortedSegments.map((segment, index) => (
        <ProgressPrimitive.Indicator
          key={index}
          className={cn(
            "absolute h-full transition-all",
            segment.color ? segment.color : "bg-github-primary",
          )}
          style={{
            backgroundColor: segment.color,
            width: `${segment.value}%`,
            zIndex: sortedSegments.length - index,
            left: `${sortedSegments
              .slice(0, index)
              .reduce((acc, segment) => acc + segment.value, 0)}%`,
          }}
        />
      ))}
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
