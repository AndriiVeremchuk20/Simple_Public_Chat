import axios from "axios";
import { PostRequestBody, PostResponseData } from "../types/Post";
import { LoginUser, RegistrationUser, responseSearchType, User } from "../types/User";
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

const searchUsers = async (searchText: string) => {
  const token = Token.Get();
  const response = await client.get<responseSearchType>(`auth/search?username=${searchText}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

const getUserInfo = async (userID: string) => {
  const token = Token.Get();
  const response = await client.get<{user: User, posts: Array<PostResponseData>}>(`auth/user/${userID}`, {
    headers: { Authorization: token },
  });
  return response.data;
}

const makePost = async (postBody: PostRequestBody) => {
  const token = Token.Get();
  const response = await client.post<any>("posts/new", postBody, 
  {
    headers: { Authorization: token },
  }
  );
  return response.data;
}

const getPosts = async () => {
  const token = Token.Get();
  const response = await client.get<Array<PostResponseData>>("posts/", 
  {
    headers: { Authorization: token },
  });

  return response.data;
}

export const AppServises = {
  register,
  login,
  auth,
  deleteAccount,
  searchUsers,
  getUserInfo,
  makePost,
  getPosts,
};
