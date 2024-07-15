"use client";

import { CodeBlock } from "@/components/code-block";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tree, type TreeDataItem } from "@/components/ui/tree";
import { cn } from "@/lib/utils";
import { Folder, File, GitBranchPlus } from "lucide-react";
import { Suspense, useState } from "react";
import useResizeObserver from "use-resize-observer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  files: TreeDataItem[];
}

export function FileExplorer({ files }: Props) {
  const [content, setContent] = useState<string | null>();
  const [path, setPath] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const { ref: refRoot, width, height } = useResizeObserver();

  function getFileExtension(): string {
    const parts = path.split(".");
    return parts.length > 1 ? parts.pop()! : "";
  }

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex min-w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-10">
          <div className="flex w-full flex-col">
            <main className="flex flex-col gap-4 py-8 md:gap-8 ">
              <header className="sticky top-0 flex h-16 items-center gap-4 rounded-lg border border-github-foreground bg-github-secondary px-4 text-github-white md:px-6">
                <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                  <GitBranchPlus className="h-6 w-6" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      {breadcrumbs.map((breadcrumb, i) => (
                        <>
                          <BreadcrumbItem
                            key={i}
                            className="text-base font-semibold text-github-sky"
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
                <div className="w-full border-2 border-github-foreground bg-github-secondary md:col-span-1">
                  <Tree
                    data={files}
                    className="text-github-muted"
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
                <div className="w-full border-2 border-github-foreground bg-github-primary md:col-span-3">
                  {content && (
                    <div ref={refRoot} className={cn("overflow-hidden")}>
                      <ScrollArea style={{ width, height }}>
                        <CodeBlock
                          code={content}
                          language={getFileExtension()}
                        />
                      </ScrollArea>
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
