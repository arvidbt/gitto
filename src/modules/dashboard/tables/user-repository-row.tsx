import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

type UserRepositoryRowData = {
  id: number;
  name: string;
  description: string | null;
  updated_at: string | null;
  html_url: string;
  language: string | null;
  full_name: string;
  visibility: string | undefined;
  active: boolean;
};

interface UserRepositoryRowProps {
  rowData: UserRepositoryRowData;
}

export function UserRepositoryRow({ rowData }: UserRepositoryRowProps) {
  return (
    <div className="flex flex-row items-center gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <span
              className={cn(
                "flex h-2 w-2 rounded-full ",
                rowData.active ? " bg-github-green" : "bg-github-foreground",
              )}
            ></span>
          </TooltipTrigger>
          <TooltipContent className="border-2 border-github-foreground bg-github-secondary">
            <p className="text-github-white">
              <span className="text-github-sky">{rowData.name} </span>
              {rowData.active
                ? "has an active link."
                : "does not have an active link."}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Link
        href={rowData.html_url}
        target="_blank"
        className="decoration-github-sky hover:underline"
      >
        <div className="text-left text-base font-bold text-github-sky">
          {rowData.name}
        </div>
      </Link>
      <div
        className={cn(
          "hidden text-sm capitalize text-muted-foreground md:inline",
        )}
      >
        {rowData.visibility}
      </div>
    </div>
  );
}
