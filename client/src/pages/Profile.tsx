import { PersonAdd, PersonRemove } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { appUserAtom, likedListAtom, postsListAtom, subscriptionsListAtom } from "../atom";
import { ChangeTheme } from "../components/ChangeTheme";
import { Footer } from "../components/Footer";
import { PostsList } from "../components/PostsList";
import { AppServises } from "../servises/API";
import { User } from "../types/User";
import { WaitPage } from "./WaitPage";

export const Profile = () => {
  const { id } = useParams();
  const [appUser] = useAtom(appUserAtom);
  const [userPosts, setUserPosts] = useAtom(postsListAtom);
  const [, setLikes] = useAtom(likedListAtom);
  const [subscriptions, setSubscriptions] = useAtom(subscriptionsListAtom);
  const [currProfile, setCurrProfile] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const navigate = useNavigate();

  const getUserInfoMutation = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      setCurrProfile(data.user);
      setUserPosts(data.posts);
      setLikes(data.likes);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const subscribeMutation = useMutation(AppServises.subscribeTo, {
    onSuccess: (data)=>{
      console.log(data);
    }
    
  })

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  useEffect(() => {
    if (id) {
      getUserInfoMutation.mutate(id);
    } else if (appUser) {
      getUserInfoMutation.mutate(appUser._id);
    }
  }, []);

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
        <Card
          sx={{
            width: "80%",
            margin: "10px 10px",
            padding: "10px 10px",
            display: "flex",
          }}
        >
          <CardMedia
            sx={{
              width: "40%",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={currProfile?.username}
              src={currProfile?.avatarUrl ?? ""}
              sx={{ width: "300px", height: "300px" }}
            />
            <Typography variant={"h4"}>{currProfile?.username}</Typography>
            <Typography
              variant={"body1"}
              component={"a"}
              href={`mailto:${currProfile?.email}`}
            >
              {currProfile?.email}
            </Typography>
          </CardMedia>
          <CardContent
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{width: "100%", display: "flex", justifyContent: "space-around"}}>
            <Typography variant="h5">Num posts: {userPosts.length}</Typography>
            <Typography variant="h5">Sudscribers: </Typography>
            <Typography variant="h5">Follow: </Typography>
            </Box>

            {currProfile?._id !== appUser?._id ? (
              <CardActions sx={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button sx={{width: "80%", padding: "20px 3px"}}>
                  {
                    isSubscribed?<PersonRemove/>:<PersonAdd/>
                  }
                </Button>
              </CardActions>
            ) : null}
          </CardContent>
        </Card>

        <PostsList
          redirect={false}
          isRemovable={appUser?._id === currProfile?._id}
        />
      </Paper>
      <Footer />
    </Paper>
  );
};

///import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
