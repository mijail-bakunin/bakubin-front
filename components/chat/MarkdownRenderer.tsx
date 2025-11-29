"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // BLOCK CODE
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              PreTag="div"
              language={match[1]}
              style={dracula}
              customStyle={{
                marginTop: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                padding: "16px",
                background: "#1e1e1e",
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              {...props}
              className="px-1 py-0.5 rounded bg-zinc-800 text-red-300"
            >
              {children}
            </code>
          );
        },

        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4 text-red-400">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mt-5 mb-3 text-red-400">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-4 mb-2 text-red-400">
            {children}
          </h3>
        ),

        // LISTS
        ul: ({ children }) => (
          <ul className="list-disc ml-6 my-3 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-6 my-3 space-y-1">{children}</ol>
        ),

        // QUOTES
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-red-700 pl-4 my-3 italic text-zinc-300">
            {children}
          </blockquote>
        ),

        // TABLES
        table: ({ children }) => (
          <table className="border border-zinc-700 my-4">{children}</table>
        ),
        th: ({ children }) => (
          <th className="border border-zinc-700 px-3 py-1 bg-zinc-900 text-red-300">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-zinc-700 px-3 py-1">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
