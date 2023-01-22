import axios from "axios";
import { Like, LikeRequestBody, Post, PostRequestBody, PostResponseData } from "../types/Post";
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
  const response = await client.get<{user: User, posts: Array<Post>, likes:Array<Like>}>(`auth/user/${userID}`, {
    headers: { Authorization: token },
  });
  return response.data;
}

const makePost = async (postBody: PostRequestBody) => {
  const token = Token.Get();
  const response = await client.post<Post>("posts/post", postBody, 
  {
    headers: { Authorization: token },
  }
  );
  return response.data;
}

const getPosts = async () => {
  const token = Token.Get();
  const response = await client.get<PostResponseData>("posts/",
  {
    headers: { Authorization: token },
  });

  return response.data;
}

const deletePost = async (id: string) => {
  const token = Token.Get();
  const response = await client.delete<PostResponseData>(`posts/post/${id}`, 
  {
    headers: { Authorization: token },
  });
  
  return response.data;  
}

const likeIt = async (postId: string) => {
  const token = Token.Get();
  const body: LikeRequestBody = {
    postId: postId
  }
  const response = await client.post<Like>("posts/likePost",body, 
  {
    headers: { Authorization: token },
  });
  
  return response.data;
}

const removeLike = async (postId: string) => {
  const token = Token.Get();
  const response = await client.delete<any>(`posts/likePost/${postId}`, 
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
  deletePost,
  likeIt,
  removeLike,
};
