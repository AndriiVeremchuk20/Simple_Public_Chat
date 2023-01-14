import axios from "axios";
import { LoginUser, RegistrationUser } from "../types/User";
import { Token } from "../utils/token";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}`;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const register = async (newUser: RegistrationUser) => {
  const response = await client.post<any>("/auth/registration", newUser);
  return response.data;
};

const login = async (user: LoginUser) => {
  const response = await client.post<any>("/auth/login", user);
  const { data } = response;

  Token.Set(data.token);
  console.log(response.data);

  return response.data;
};

const auth = async () => {
  const token = Token.Get();
  const response = await client.get<any>("auth/auth", {
    headers: { Authorization: token },
  });

  const { data } = response;
  Token.Set(data.token);

  return response.data;
};

const deleteAccount = async () => {
  const token = Token.Get();
  const response = await client.delete<any>("auth/user", {
    headers: { Authorization: token },
  });

  return response.data;
};

export const authServises = {
  register,
  login,
  auth,
  deleteAccount,
};
