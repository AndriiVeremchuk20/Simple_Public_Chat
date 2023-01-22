import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { appUserAtom, likedListAtom, postsListAtom } from "../atom";
import { ChangeTheme } from "../components/ChangeTheme";
import { Footer } from "../components/Footer";
import { PostsList } from "../components/PostsList";
import { AppServises } from "../servises/API";
import { User } from "../types/User";
import { WaitPage } from "./WaitPage";

export const Profile = () => {
  const { id } = useParams();
  const [currProfile, setCurrProfile] = useState<User | null>(null);
  const [appUser] = useAtom(appUserAtom);
  const [, setUserPosts] = useAtom(postsListAtom);
  const [, setLikes] = useAtom(likedListAtom);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      console.log(data);
      setCurrProfile(data.user);
      setUserPosts(data.posts);
      setLikes(data.likes);
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
      mutate(id);
    }
    else if(appUser){
      mutate(appUser._id);
    }

  }, []);

  if (isLoading) {
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
        <Card sx={{ width: "80%", margin: "10px 10px", padding: "10px 10px" }}>
          <Avatar
            alt={currProfile?.username}
            src={currProfile?.avatarUrl ?? ""}
            sx={{ width: "300px", height: "300px" }}
          />
          <CardContent>
            <Typography variant={"h4"}>{currProfile?.username}</Typography>
            <Typography
              variant={"body1"}
              component={"a"}
              href={`mailto:${currProfile?.email}`}
            >
              {currProfile?.email}
            </Typography>
          </CardContent>
        </Card>
        <PostsList redirect={false} isRemovable={appUser?._id===currProfile?._id} />
      </Paper>
      <Footer />
    </Paper>
  );
};
