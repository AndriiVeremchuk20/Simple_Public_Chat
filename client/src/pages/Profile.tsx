import { AppBar, Button, Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { appUserAtom } from "../atom";
import { ChangeTheme } from "../components/ChangeTheme";
import { Footer } from "../components/Footer";
import { PostsList } from "../components/PostsList";
import { ProfileUserCard } from "../components/ProfileUserCard";
import { AppServises } from "../servises/API";
import { Post } from "../types/Post";
import { Subscribe } from "../types/Subscribe";
import { User } from "../types/User";
import { WaitPage } from "./WaitPage";

export const Profile = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [user] = useAtom(appUserAtom);
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [subscribers, setSubscribers] = useState<Array<Subscribe>>([]);
  const [subscriptions, setSubscriptions] = useState<Array<Subscribe>>([]);

  const getUserInfoMutation = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      setProfile(data.user);
      setPosts(data.posts);
      setSubscribers(data.subscribers);
      setSubscriptions(data.subscriptions);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  useEffect(() => {
    if (id) {
      getUserInfoMutation.mutate(id);
    } else if (user) {
      getUserInfoMutation.mutate(user._id);
    }
  }, [id]);

  if (getUserInfoMutation.isLoading) {
    return <WaitPage />;
  }

  return (
    <Paper
      sx={{
        minHeight: "100vh",
        maxHeight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onBackClick} sx={{ margin: "10px" }}>
          Back
        </Button>
        <ChangeTheme />
      </AppBar>
      <Paper
        elevation={3}
        sx={{
          width: "60vw",
          margin: "10vh 0 0 0 ",
          minHeight: "100vh",
          maxHeight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {profile ? (
        <ProfileUserCard
          user={profile}
          posts={posts}
          subscribers={subscribers}
          subscriptions={subscriptions}
        />
      ) : null}

        <PostsList
          posts={posts}
          redirect={false}
          isRemovable={user?._id === profile?._id}
        />
      </Paper>
      <Footer />
    </Paper>
  );
};
