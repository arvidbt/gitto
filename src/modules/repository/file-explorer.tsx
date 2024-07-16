"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tree, type TreeDataItem } from "@/components/ui/tree";
import { cn } from "@/lib/utils";
import { Folder, File, GitBranchPlus } from "lucide-react";
import { Suspense, useState } from "react";
import useResizeObserver from "use-resize-observer";
import Highlight from "react-highlight";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";

interface Props {
  files: TreeDataItem[];
  repo: string;
}

export function FileExplorer({ files, repo }: Props) {
  const [content, setContent] = useState<string | null>();
  const [path, setPath] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const { ref: refRoot } = useResizeObserver();

  function getFileExtension(): string {
    const parts = path.split(".");
    return parts.length > 1 ? parts.pop()! : "";
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex min-h-screen min-w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-10">
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-col gap-4 py-8 md:gap-8 ">
              <header className="sticky top-0 flex h-16 items-center gap-4 rounded-lg border border-github-foreground bg-github-secondary px-4 text-github-white md:px-6">
                <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                  <Link href={"/dashboard"}>
                    <GitBranchPlus className="h-6 w-6" />
                  </Link>
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
                              breadcrumbs.length - 1 === i &&
                                "text-github-white",
                            )}
                          >
                            {breadcrumb}
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                        </>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </nav>
              </header>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
                <div className="max-h-[83vh] min-h-[83vh] w-full border-2 border-github-foreground bg-github-secondary md:col-span-1">
                  <Tree
                    data={files}
                    className="max-h-[83vh] min-h-[83vh] text-github-muted"
                    initialSlelectedItemId="app"
                    onSelectChange={(item) => {
                      if (item) {
                        breadcrumbs.push(item?.name ?? "");
                        setContent(
                          item && item.type === "tree"
                            ? content
                            : Buffer.from(
                                item?.encodedContent ??
                                  "Could not load file content",
                                "base64",
                              ).toString() ?? "",
                        );
                        setPath(item?.name ?? "");
                        setBreadcrumbs(item.path.split("/"));
                      }
                    }}
                    folderIcon={Folder}
                    itemIcon={File}
                  />
                </div>
                <div className="max-h-[83vh] min-h-[83vh] w-full overflow-scroll border-2 border-github-foreground bg-github-primary md:col-span-3">
                  {content && (
                    <div
                      ref={refRoot}
                      className={cn("max-w-[ max-h-[84vh] min-h-[84vh]")}
                    >
                      <CodeBlock code={content} language={getFileExtension()} />
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
