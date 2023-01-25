import { Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import {
  appUserAtom,
  likedListAtom,
  postsListAtom,
  subscribersListAtom,
  subscriptionsListAtom,
} from "../atom";
import { Footer } from "../components/Footer";
import { MakePost } from "../components/MakePost";
import { PostsList } from "../components/PostsList";
import { SearchBar } from "../components/SearchBar";
import { UpButton } from "../components/UpButton";
import { AppServises } from "../servises/API";
import { Post } from "../types/Post";
import { WaitPage } from "./WaitPage";

export const Home = () => {
  const [user] = useAtom(appUserAtom);
  const [, setPosts] = useAtom(postsListAtom);
  const [, setLikes] = useAtom(likedListAtom);
  const [, setSubscribers] = useAtom(subscribersListAtom);
  const [, setSubscriptions] = useAtom(subscriptionsListAtom);

  const [allPosts, setAllPosts] = useState<Array<Post>>([]);

  const getUserDataMutation = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      setPosts(data.posts);
      setSubscriptions(data.subscriptions);
      setSubscribers(data.subscribers);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const getAllPostsMutation = useMutation(AppServises.getPosts, {
    onSuccess: (data) => {
      setAllPosts(data.posts);
      setLikes(data.likes);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getAllPostsMutation.mutate();
    if (user) getUserDataMutation.mutate(user._id);
  }, []);

  if (getAllPostsMutation.isLoading || getUserDataMutation.isLoading) {
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
        <PostsList posts={allPosts} redirect={true} isRemovable={false} />
      </Paper>
      <UpButton />
      <Footer />
    </Paper>
  );
};
