"use client";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { FormInput, Message, MessageLoading } from "@/custom-components";
import { clearMessages, getMessages, sendMessage } from "@/services/chat";
import { MessageType } from "@/types/messages";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Home = () => {
    const router = useRouter();
    const [chatList, setChatList] = useState<MessageType[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            message: ""
        }
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatList]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages();
                setChatList(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = useCallback(async (data: { message: string }) => {
        setIsLoading(true);
        const draft = [...chatList, { message: data.message, type: 'USER' }]
        setChatList(draft);

        try {
            const response = await sendMessage(data);

            if (response) {
                const response = await getMessages();
                setChatList(response);
                reset();
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }, [chatList, reset]);

    const handleClear = useCallback(async () => {
        try {
            const response = await clearMessages();
            if (response) {
                const response = await getMessages();
                setChatList(response);
                reset();
                toast('Seu histórido de mensagens foi deletado!')
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }, [reset]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        router.push('/login');
    }, [router]);

    return (
        <>
            <main className="flex py-16 px-16 flex-col h-screen justify-between">
                <div className="flex justify-between">
                    <h2 className="text-2xl">Faça sua pergunta</h2>

                    <div className="flex gap-4">
                        <Button variant="outline" size="lg" onClick={handleClear}>
                            Limpar histórico
                        </Button>
                        <Button variant="outline" size="lg" onClick={handleLogout}>
                            Sair
                        </Button>
                    </div>

                </div>

                {chatList.length > 0 ? (
                    <div className="flex flex-col max-h-[70vh] overflow-y-auto gap-4">
                        {chatList?.map(item => <Message key={item.id} message={item.message} type={item.type} />)}
                        {isLoading && <MessageLoading />}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl text-center">Oque deseja saber sobre futebol?</h3>
                    </div>
                )}

                <form onSubmit={handleSubmit(handleSendMessage)} className="flex w-6/14 self-center items-center gap-4">
                    <FormInput 
                        control={control}
                        name="message"
                        placeholder="Pergunte alguma coisa sobre futebol"
                    />

                    <Button disabled={isLoading} className="mt-3" type="submit">
                        Enviar
                    </Button>
                </form>
            </main>
            <Toaster />
        </>
    );
};

export default Home;