/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { type TreeDataItem } from "@/components/ui/tree";
import { trpc } from "@/trpc/server";

const GithubNodeSchema = z.object({
  name: z.string().optional(),
  sha: z.string().optional(),
  type: z.string().optional(),
  size: z.number().optional(),
  url: z.string().optional(),
  path: z.string().optional(),
  encodedContent: z.string().optional(),
  repoId: z.string().optional(),
});

export type GithubNode = z.infer<typeof GithubNodeSchema>;

function generateId(name: string, parentId: string | null): string {
  return parentId ? `${parentId}/${name}` : name;
}

export async function buildTree(
  items: GithubNode[],
  owner: string,
  repo: string,
): Promise<TreeDataItem[] | undefined> {
  const root: TreeDataItem = {
    id: "root",
    name: "root",
    children: [],
    type: "tree",
  };

  console.log(items);
  for (const item of items) {
    console.log(item);
    const parts = item.path.split("/");
    let currentNode = root;
    let parentId: string | null = null;

    for (const [index, part] of parts.entries()) {
      if (!currentNode.children) {
        currentNode.children = [];
      }

      let node = currentNode.children.find((child) => child.name === part);

      if (!node) {
        const id = generateId(part, parentId);
        node = {
          id: id,
          name: part,
          type: index === parts.length - 1 ? item.type : "tree",
          children: [],
        };

        if (node.type !== "tree") {
          node.encodedContent = await trpc.github.getEncodedFileContent({
            owner: owner,
            repo: repo,
            path: item.path,
          });
        }

        currentNode.children.push(node);
      }

      parentId = node.id;
      currentNode = node;
    }
  }

  return root.children;
}
