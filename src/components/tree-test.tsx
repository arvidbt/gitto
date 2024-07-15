// "use client";

// import * as React from "react";
// import { Tree, type TreeDataItem } from "@/components/ui/tree";
// import { Workflow, Folder } from "lucide-react";
// import { CodeBlock } from "./code-block";

// type Props = {
//   data: TreeDataItem[];
// };

// export function TreeTest({ data }: Props) {
//   const [content, setContent] = React.useState<string | null>();

//   return (
//     <div className="min-h-screen gap-12">
//       <div className="flex min-h-full space-x-2">
// <Tree
//   data={data}
//   className="h-[460px] w-full flex-shrink-0 border-[1px]"
//   initialSlelectedItemId="app"
//   onSelectChange={(item) =>
//     setContent(
//       item && item.type === "tree"
//         ? null
//         : Buffer.from(item?.encodedContent, "base64").toString() ?? "",
//     )
//   }
//   folderIcon={Folder}
//   itemIcon={Workflow}
// />
//       </div>
//       {content && <CodeBlock code={content} language="javascript"></CodeBlock>}
//     </div>
//   );
// }
