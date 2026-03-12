export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}