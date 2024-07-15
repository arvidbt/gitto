"use client";

import { CodeBlock } from "@/components/code-block";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tree, type TreeDataItem } from "@/components/ui/tree";
import { cn } from "@/lib/utils";
import { Folder, File } from "lucide-react";
import { Suspense, useState } from "react";
import useResizeObserver from "use-resize-observer";

interface Props {
  files: TreeDataItem[];
}

export function FileExplorer({ files }: Props) {
  const [content, setContent] = useState<string | null>();
  const [path, setPath] = useState("");

  const { ref: refRoot, width, height } = useResizeObserver();

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="flex min-w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-10">
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 py-8 md:gap-8 ">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
                <div className="w-full border-2 border-github-foreground bg-github-secondary md:col-span-1">
                  <Tree
                    data={files}
                    className="text-github-muted"
                    initialSlelectedItemId="app"
                    onSelectChange={(item) => {
                      setContent(
                        item && item.type === "tree"
                          ? null
                          : Buffer.from(
                              item?.encodedContent ??
                                "Could not load file content",
                              "base64",
                            ).toString() ?? "",
                      );
                      setPath(item?.name ?? "nonooon");
                    }}
                    folderIcon={Folder}
                    itemIcon={File}
                  />
                </div>
                <div className="w-full border-2 border-github-foreground bg-github-primary md:col-span-3">
                  {content && (
                    <div ref={refRoot} className={cn("overflow-hidden")}>
                      <ScrollArea style={{ width, height }}>
                        <CodeBlock code={content} language="typescript" />
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
