
import { MessageProps } from "@/types/messages";
import { formatDate } from "@/utils/date";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Message = ({ chat }: MessageProps) => {
    const { type, message, created_at } = chat;
    const isUser = useMemo(() => type === 'USER', [type]);

    return (
        <div
            className={`
                ${isUser ? "border border-white text-white" : "text-white"}
                p-5
                rounded-2xl
                shadow-sm
                ${isUser ? "self-end" : "self-start"}
                max-w-[70%]
            `}
        >
            <div className="prose prose-sm max-w-none">
                <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({children}) => <h1 className="text-xl3 font-bold mb-3">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl2 font-semibold mt-4 mb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-semibold mt-3 mb-2">{children}</h3>,
                        p: ({children}) => <p className="mb-2 text-lg leading-relaxed">{children}</p>,
                        ul: ({children}) => <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>,
                        li: ({children}) => <li className="leading-relaxed">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                    }}
                >
                    {message}
                </ReactMarkdown>
            </div>

            {created_at && (
                <p className={`text-xs mt-6 ${isUser ? "text-end" : "text-start"}`}>
                    {formatDate(created_at)}
                </p>
            )}
        </div>
    );
};

export default Message;
