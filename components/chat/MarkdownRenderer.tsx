"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighterLib } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  return (
    <SyntaxHighlighterLib
      language={language}
      style={dracula}
      customStyle={{
        marginTop: "12px",
        marginBottom: "12px",
        borderRadius: "10px",
        padding: "16px",
        background: "#1a1a1a",
        fontSize: "0.9rem",
        boxShadow: "0 0 12px rgba(255,0,0,0.12)",
      }}
    >
      {children}
    </SyntaxHighlighterLib>
  );
}

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  const components: Components = {
    code(props) {
      const {
        inline,
        className,
        children,
        ...rest
      }: React.ComponentPropsWithoutRef<"code"> & {
        inline?: boolean;
        children?: React.ReactNode;
      } = props;

      const match = /language-(\w+)/.exec(className || "");

      if (!inline && match) {
        return (
          <CodeBlock language={match[1]}>
            {String(children).replace(/\n$/, "")}
          </CodeBlock>
        );
      }

      return (
        <code
          {...rest}
          className="px-1 py-0.5 rounded bg-zinc-800 text-red-300 text-[0.85rem]"
        >
          {children}
        </code>
      );
    },

    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mt-6 mb-4 text-red-400">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-5 mb-3 text-red-400">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-4 mb-2 text-red-400">{children}</h3>
    ),

    ul: ({ children }) => (
      <ul className="list-disc ml-6 my-3 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 my-3 space-y-1">{children}</ol>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-700 pl-4 my-3 italic text-zinc-300 bg-zinc-900/30 py-2 rounded-r">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <table className="border border-zinc-700 my-4 text-sm">{children}</table>
    ),
    th: ({ children }) => (
      <th className="border border-zinc-700 px-3 py-2 bg-zinc-900 text-red-300 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-zinc-700 px-3 py-2">{children}</td>
    ),
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
  