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
import './home.css';

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
                toast('Erro ao buscar histórico de mensagens!')
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
            toast('Erro ao enviar mensagem!')
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
            toast('Erro ao limpar histórico de mensagens!')
            console.log(error);
        }
    }, [reset]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        router.push('/login');
    }, [router]);

    return (
        <>
            <main className="flex py-8 px-8 flex-col min-h-screen min-w-screen justify-between home_container">
                <div className="flex justify-between border border-white py-6 px-6 rounded-lg">
                    <h2 className="text-2xl text-white font-bold">Qual é o seu questionamento hoje? ⚽</h2>

                    <div className="flex gap-4">
                        <Button 
                            variant="outline" 
                            className="bg-transparent text-white font-bold" 
                            size="lg" 
                            onClick={handleClear}
                        >
                            Limpar histórico
                        </Button>
                        <Button variant="outline" size="lg" onClick={handleLogout}>
                            Sair
                        </Button>
                    </div>
                </div>

                {chatList.length > 0 ? (
                    <div className="flex flex-col max-h-[60vh] overflow-y-auto gap-4">
                        {chatList?.map(chat => <Message key={chat.id} chat={chat} />)}
                        {isLoading && <MessageLoading />}
                        <div ref={messagesEndRef} />
                    </div>
                ) : (
                    <div>
                        <h3 className="text-2xl font-bold text-center text-white">
                            Oque deseja saber sobre futebol?
                        </h3>
                    </div>
                )}

                <form 
                    onSubmit={handleSubmit(handleSendMessage)} 
                    className="flex w-6/14 self-center items-center gap-4 pt-3 pb-6 px-6 rounded-lg"
                >
                    <FormInput 
                        control={control}
                        name="message"
                        className="h-14 text-white"
                        placeholder="Pergunte alguma coisa sobre futebol"
                    />

                    <Button variant="outline" disabled={isLoading} className="mt-3 bg-transparent h-14 text-lg text-white" type="submit">
                        Enviar
                    </Button>
                </form>
            </main>
            <Toaster />
        </>
    );
};

export default Home;