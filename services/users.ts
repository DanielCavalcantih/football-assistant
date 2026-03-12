import { api } from "./api";
import { User, CreateUser, Login, LoginResponse } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  console.log(response);
  
  return response.data;
};

export const createUser = async (data: CreateUser): Promise<User> => {
  const response = await api.post("/users", data);
  console.log(response);
  
  return response.data;
};

export const login = async (data: Login): Promise<LoginResponse> => {
    const response = await api.post("/users/login", data);
    console.log('LOGIN', response);
    
    return response.data;
}
