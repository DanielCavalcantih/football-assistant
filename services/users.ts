import { api } from "./api";
import { User, CreateUser, Login, LoginResponse } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  
  return response.data;
};

export const createUser = async (data: CreateUser): Promise<User> => {
  const response = await api.post("/users", data);
  
  return response.data;
};

export const login = async (data: Login): Promise<LoginResponse> => {
    const response = await api.post("/users/login", data);
    
    return response.data;
}

export const verifySession = async () => {
    const token = localStorage.getItem('token');

	const response = await api.get('/users/verify-token', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return response.data;
}
