import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export function RepositoryBreadcrumbs({
  repo,
  breadcrumbs,
}: {
  repo: string;
  breadcrumbs: string[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-base font-semibold text-github-sky">
          {repo}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs.map((breadcrumb, i) => (
          <>
            <BreadcrumbItem
              key={i}
              className={cn(
                "text-base font-semibold text-github-sky",
                breadcrumbs.length - 1 === i && "text-github-white",
              )}
            >
              {breadcrumb}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
