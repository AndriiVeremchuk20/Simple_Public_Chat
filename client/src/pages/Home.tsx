import { Button, Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import { appUserAtom, postsListAtom } from "../atom";
import { Footer } from "../components/Footer";
import { MakePost } from "../components/MakePost";
import { PostsList } from "../components/PostsList";
import { SearchBar } from "../components/SearchBar";
import { UpButton } from "../components/UpButton";
import { AppServises } from "../servises/API";
import { Token } from "../utils/token";

export const Home = () => {
  const [user, setUser] = useAtom(appUserAtom);

  const [posts, setPosts] = useAtom(postsListAtom);

  const { mutate, isLoading, isError } = useMutation(AppServises.getPosts, {
    onSuccess: (data) => {
      console.log(data);
      setPosts(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Paper
    square
      sx={{
        minHeight: "100vh",
        maxHeight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <Paper
        elevation={3}
        sx={{
          minHeight: "100vh",
          maxHeight: "auto",
          width: "60vw",
          margin: "10vh 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0 0 0",
        }}
      >
        <MakePost />
        <PostsList posts={posts} redirect={true}/>
      </Paper>
      <UpButton/>
      <Footer/>
    </Paper>
  );
};
