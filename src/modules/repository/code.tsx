"use client";

import { cn } from "@/lib/utils";
import useResizeObserver from "use-resize-observer";
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export function Code({ content, path }: { content: string; path: string }) {
  const { ref: refRoot } = useResizeObserver();

  function getFileExtension(): string {
    const parts = path.split(".");
    return parts.length > 1 ? parts.pop()! : "";
  }

  const codeRef = useRef<HTMLElement>(null);

  const highlightCode = () => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
      codeRef.current.setAttribute("data-highlighted", "yes");
    }
  };

  useEffect(() => {
    highlightCode();
  }, [content]);

  return (
    <div className="max-h-[83vh] min-h-[83vh] w-full overflow-scroll border-2 border-github-foreground bg-github-primary md:col-span-3">
      {content && (
        <div ref={refRoot} className={cn("max-h-[83vh] min-h-[83vh]")}>
          <pre>
            <code ref={codeRef} className={`language-${getFileExtension()}`}>
              {content}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
