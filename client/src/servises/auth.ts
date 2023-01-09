import axios from "axios";
import { LoginUser, RegistrationUser, User} from "../types/User";

//const PORT = 8080;
const API_URL = `http://localhost:8080`;
const token = "token";

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
  
  localStorage.setItem(token, data.token);
  console.log(response.data);
  
  return response.data;
};

const auth = async () => {
  //const response = await client.get();

};

export const authServises = {
  register,
  login,
};
