
import { MessageProps } from "@/types/messages";
import { useMemo } from "react";

const Message = ({ message, type }: MessageProps) => {
    const isUser = useMemo(() => type === 'USER', [type]);

    return (
        <div 
            className={
                `
                    ${isUser ? 'bg-gray-300' : ''} 
                    py-2 
                    px-4 
                    rounded-lg 
                    ${isUser ? 'self-end' : 'self-start' }
                    max-w-8/12
                `
            }
        >
            <p>{message}</p>
        </div>
    );
};

export default Message;
