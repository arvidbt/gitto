"use client";

import { Tree, type TreeDataItem } from "@/components/ui/tree";
import { Folder, File, GitBranchPlus } from "lucide-react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Code } from "./code";
import { RepositoryBreadcrumbs } from "./repository-breadcrumbs";

interface Props {
  files: TreeDataItem[];
  repo: string;
}

export function Repository({ files, repo }: Props) {
  const [content, setContent] = useState<string | null>();
  const [path, setPath] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const selectFileTreeItem = (item: TreeDataItem) => {
    breadcrumbs.push(item?.name ?? "");
    if (item.type !== "tree") {
      setContent(Buffer.from(item.encodedContent!, "base64").toString());
    }
    setPath(item?.name ?? "");
    setBreadcrumbs(item.path.split("/"));
  };

  return (
    <Suspense fallback={<p>Loading</p>}>
      <div className="boxes flex min-h-screen min-w-full flex-col items-center justify-center bg-github-primary">
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-10">
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-col gap-4 py-8 md:gap-8">
              <header className="sticky top-0 flex h-16 items-center gap-4 rounded-lg border border-github-foreground bg-github-secondary px-4 text-github-white md:px-6">
                <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                  <Link href={"/dashboard"}>
                    <GitBranchPlus className="h-6 w-6" />
                  </Link>
                  <RepositoryBreadcrumbs
                    breadcrumbs={breadcrumbs}
                    repo={repo}
                  />
                </nav>
              </header>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
                <div className="max-h-[83vh] min-h-[83vh] w-full border-2 border-github-foreground bg-github-secondary md:col-span-1">
                  <Tree
                    data={files}
                    className="max-h-[83vh] min-h-[83vh] text-github-muted"
                    initialSlelectedItemId="app"
                    onSelectChange={(item) => selectFileTreeItem(item!)}
                    folderIcon={Folder}
                    itemIcon={File}
                  />
                </div>
                {content && <Code content={content} path={path} />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
