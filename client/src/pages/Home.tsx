import { Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { likedListAtom, postsListAtom } from "../atom";
import { Footer } from "../components/Footer";
import { MakePost } from "../components/MakePost";
import { PostsList } from "../components/PostsList";
import { SearchBar } from "../components/SearchBar";
import { UpButton } from "../components/UpButton";
import { AppServises } from "../servises/API";
import { WaitPage } from "./WaitPage";

export const Home = () => {
  const [, setPosts] = useAtom(postsListAtom);
  const [, setLikes] = useAtom(likedListAtom);

  const { mutate, isLoading } = useMutation(AppServises.getPosts, {
    onSuccess: (data) => {
      setPosts(data.posts);
      setLikes(data.likes);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading) {
    return <WaitPage />;
  }

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
        <PostsList redirect={true} isRemovable={false} />
      </Paper>
      <UpButton />
      <Footer />
    </Paper>
  );
};
