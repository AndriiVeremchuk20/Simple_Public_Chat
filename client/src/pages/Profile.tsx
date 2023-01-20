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
import { appUserAtom } from "../atom";
import { ChangeTheme } from "../components/ChangeTheme";
import { Footer } from "../components/Footer";
import { PostsList } from "../components/PostsList";
import { AppServises } from "../servises/API";
import { PostResponseData } from "../types/Post";
import { User } from "../types/User";

export const Profile = () => {
  const { id } = useParams();
  const [user] = useAtom(appUserAtom);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Array<PostResponseData>>([]);

  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  const { mutate } = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      setCurrUser(data.user);
      setUserPosts(data.posts);
    },
    onError: (error: any) => {},
  });

  useEffect(() => {
    if (id) {
      mutate(id);
    } else {
      setCurrUser(user);
    }
  }, []);

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
      <AppBar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Button onClick={onBackClick} sx={{ margin: "10px" }}>
          Back
        </Button>
        <ChangeTheme/>
      </AppBar>
      {}
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
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "80%",margin: "10px 10px", padding: "10px 10px" }}>
          <Avatar
            alt={currUser?.username}
            src={currUser?.avatarUrl ?? ""}
            sx={{ width: "300px", height: "300px" }}
          />
          <CardContent>
            <Typography variant={"h4"}>{currUser?.username}</Typography>
            <Typography
              variant={"body1"}
              component={"a"}
              href={`mailto:${currUser?.email}`}
            >
              {currUser?.email}
            </Typography>
          </CardContent>
        </Card>

        <PostsList posts={userPosts} redirect={false}/>
      </Paper>
    <Footer/>
    </Paper>
  );
};
