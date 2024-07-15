"use client";

import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const codeRef = useRef<HTMLElement>(null);

  console.log(codeRef);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <pre>
      <code className={`language-${language}`} ref={codeRef}>
        {code}
      </code>
    </pre>
  );
};
