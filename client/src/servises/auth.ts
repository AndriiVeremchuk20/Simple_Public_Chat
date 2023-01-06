import axios from "axios";
import { LoginUser, User } from "../types/User";

//const PORT = 8080;
const API_URL = `http://localhost:8080`;

axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
})

export const authServises = {
  registerUser: async (newUser: User) => {
    await axios.post(API_URL + "/auth/registration", newUser)
    .then((r)=>{
      console.log(r.status);
      console.log(r.data);
    }).catch((e)=>{
      console.log(e)
    })
  },
  login: async (user: LoginUser) => {
    await axios.post(API_URL + "/auth/login", user)
    .then((r)=>{
      console.log(r.status);
    }).catch((e)=>{
      console.log(e)
    })
  },
  
};
