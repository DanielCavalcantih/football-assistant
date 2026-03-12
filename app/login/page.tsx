"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Toaster } from "@/components/ui/sonner";
import { FormInput } from "@/custom-components";
import { createUser, login } from "@/services/users";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import './login.css'

type LoginForm = {
    name: string;
    email: string;
    password: string;
};

enum FORM_TYPE {
    'login',
    'register'
}

const LoginPage = () => {
    const router = useRouter();
    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const [formType, setFormType] = useState(FORM_TYPE.login);

    const isLogin = useMemo(() => formType === FORM_TYPE.login, [formType]);

    const handleBack = () => {
        router.push("/");
    };

    const handleLogin = async (data: LoginForm) => {        
        try {
            const response = await login(data);
            if (response) {
                localStorage.setItem("token", response.access_token);
                toast('Usuário logado com sucesso!')
                router.push('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.detail;

                toast(message || "Erro na requisição");
            } else {
                toast("Erro inesperado");
            }
        }
    }

    const handleRegister = async (data: LoginForm) => {  
        try {
           const response =  await createUser(data);
           if (response) {
            toast('Usuário criado com sucesso!')
           }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.detail;

                toast(message || "Erro na requisição");
            } else {
                toast("Erro inesperado");
            }
        }      
    }

    return (
        <main className="login_container min-w-screen min-h-screen flex items-center justify-center">
            <div className="flex gap-8 justify-center items-center w-180 flex-col p-24 bg-white rounded-3xl">
                <h1 className="text-3xl font-bold">Assistente de Futebol</h1>

                <h2 className="text-2xl">{isLogin ? 'Entrar' : 'Registrar'}</h2>

                <form 
                    action="login" 
                    className="gap-8 flex w-full justify-center items-center flex-col"
                    onSubmit={handleSubmit(isLogin ? handleLogin : handleRegister)}
                >
                    <FieldGroup className="w-full">
                        {!isLogin && (
                            <FormInput 
                                control={control} 
                                className="w-full"
                                name="name" 
                                label="Nome" 
                                placeholder="Digite seu nome" 
                                required
                            />
                        )}

                        <FormInput 
                            control={control} 
                            name="email"
                            className="w-full"
                            label="E-mail" 
                            placeholder="Digite seu e-mail" 
                            required
                            type="email" 
                        />

                        <FormInput 
                            control={control} 
                            name="password" 
                            className="w-full"
                            label="Senha" 
                            placeholder="Digite sua senha" 
                            required 
                            type="password"
                        />
                    </FieldGroup>

                    <p>
                        {isLogin ? 'Ainda não possui conta?' : 'Já possui conta?' }
                        <span 
                            className="cursor-pointer text-blue-500" 
                            onClick={() => setFormType(isLogin ? FORM_TYPE.register : FORM_TYPE.login)}
                        >
                            {isLogin ? ' Cadastre-se' : ' Fazer login'}
                        </span>
                    </p>

                    <div className="flex gap-4">
                        <Button onClick={handleBack} variant="outline">Voltar</Button>
                        <Button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</Button>
                    </div>
                </form>
                <Toaster />
            </div>
        </main>
    );
};

export default LoginPage;

