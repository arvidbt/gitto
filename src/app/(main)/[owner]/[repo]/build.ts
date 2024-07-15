import { type TreeDataItem } from "@/components/ui/tree";

interface StoredFile {
  id: number;
  name: string;
  path: string;
  type: string;
  encodedContent: string | null;
  sha: string;
  repoId: string;
}

export function buildTree(data: StoredFile[]): TreeDataItem[] {
  const map: Record<string, StoredFile[]> = {};

  // Group items by their parent directory
  data.forEach((item) => {
    const parts = item.path.split("/");
    const name = parts.pop()!;
    const parent = parts.join("/") || "/";

    if (!map[parent]) {
      map[parent] = [];
    }

    map[parent].push({ ...item, name });
  });

  // Recursively build the tree structure
  function buildNode(path: string): TreeDataItem[] {
    return map[path].map((item) => ({
      id: item.id.toString(),
      name: item.name,
      path: item.path,
      type: item.type,
      encodedContent: item.encodedContent ?? undefined,
      children: map[item.path] ? buildNode(item.path) : undefined,
    }));
  }

  return buildNode("/");
}
