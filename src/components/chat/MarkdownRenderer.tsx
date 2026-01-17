import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export const MarkdownRenderer = ({ content, className }: MarkdownRendererProps) => {
    return (
        <div className={cn("markdown-content", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Headings
                    h1: ({ children }) => (
                        <h1 className="text-2xl md:text-3xl font-bold mt-6 mb-4 gradient-text">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-xl md:text-2xl font-bold mt-5 mb-3 text-primary">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-accent">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-base md:text-lg font-semibold mt-3 mb-2">
                            {children}
                        </h4>
                    ),

                    // Paragraphs
                    p: ({ children }) => (
                        <p className="mb-3 leading-relaxed text-sm md:text-base">
                            {children}
                        </p>
                    ),

                    // Lists
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-3 space-y-1 ml-2 md:ml-4">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-3 space-y-1 ml-2 md:ml-4">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="text-sm md:text-base leading-relaxed">
                            {children}
                        </li>
                    ),

                    // Code blocks
                    code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        const inline = !props['data-inline'] && !language;

                        return !inline && language ? (
                            <div className="my-4 rounded-lg overflow-hidden">
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={language}
                                    PreTag="div"
                                    className="text-xs md:text-sm !bg-secondary/50 !p-4 overflow-x-auto"
                                    wrapLines={true}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code
                                className="bg-secondary/50 px-1.5 py-0.5 rounded text-xs md:text-sm font-mono text-accent"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    // Blockquotes
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground text-sm md:text-base">
                            {children}
                        </blockquote>
                    ),

                    // Links
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-accent underline transition-colors text-sm md:text-base"
                        >
                            {children}
                        </a>
                    ),

                    // Strong (bold)
                    strong: ({ children }) => (
                        <strong className="font-bold text-primary">
                            {children}
                        </strong>
                    ),

                    // Emphasis (italic)
                    em: ({ children }) => (
                        <em className="italic text-accent">
                            {children}
                        </em>
                    ),

                    // Horizontal rule
                    hr: () => (
                        <hr className="my-6 border-border" />
                    ),

                    // Tables
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                            <table className="min-w-full border-collapse border border-border text-sm md:text-base">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border border-border px-3 py-2 bg-secondary font-semibold text-left">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border border-border px-3 py-2">
                            {children}
                        </td>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
