import { api } from "./api";

export const getMessages = async () => {
    const token = localStorage.getItem('token');

    const response = await api.get("/chat", { 
        headers: {
            Authorization: `Bearer ${token}`
        } 
    });
    
    return response.data;
};

export const sendMessage = async ({ message }: { message: string }) => {
    const token = localStorage.getItem('token');

    const response = await api.post("/chat", { message }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data;
};

export const clearMessages = async () => {
    const token = localStorage.getItem('token');
    
    const response = await api.delete("/chat", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data;
}
