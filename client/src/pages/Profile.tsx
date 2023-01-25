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
  Drawer,
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
import { UsersList } from "../components/UsersList";
import { AppServises } from "../servises/API";
import { getSubscribedUsersResponse, Subscribe } from "../types/Subscribe";
import { User } from "../types/User";
import { chekSubscribed } from "../utils/chekSubscribed";
import { WaitPage } from "./WaitPage";

export const Profile = () => {
  const { id } = useParams();

  const [appUser] = useAtom(appUserAtom);
  const [userPosts, setUserPosts] = useAtom(postsListAtom);
  const [, setLikes] = useAtom(likedListAtom);

  const [currProfile, setCurrProfile] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Array<Subscribe>>([]);
  const [followers, setFollowers] = useState<Array<Subscribe>>([]);

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionsUsers, setSubscriptionsUsers] =
    useState<getSubscribedUsersResponse | null>(null);
  const [usersToShow, setUsersToShow] = useState<Array<User>>([]);
  const [showSudscribedUsers, setShowSubscrUsers] = useState<boolean>(false);

  const navigate = useNavigate();

  const getUserInfoMutation = useMutation(AppServises.getUserInfo, {
    onSuccess: (data) => {
      setCurrProfile(data.user);
      setUserPosts(data.posts);
      setLikes(data.likes);
      setSubscriptions(data.subscriptions);
      setFollowers(data.followers);

      setIsSubscribed(
        chekSubscribed((appUser as User)._id, data.user._id, data.followers)
      );
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const subscribeMutation = useMutation(AppServises.subscribeTo, {
    onSuccess: (data) => {
      setFollowers((prev) => [...prev, data]);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const unsubscribeMutation = useMutation(AppServises.unsubscribeTO, {
    onSuccess: (data) => {
      setFollowers((prev) => prev.filter((item) => item._id !== data.id));
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const getSubscribedUsers = useMutation(AppServises.getSubscribedUsers, {
    onSuccess: (data) => {
      console.log(data);
      setSubscriptionsUsers(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubscribeClick = useCallback(() => {
    if (currProfile) {
      if (isSubscribed) {
        unsubscribeMutation.mutate(currProfile._id);
        setIsSubscribed(false);
      } else {
        subscribeMutation.mutate(currProfile._id);
        setIsSubscribed(true);
      }
    }
  }, [currProfile, isSubscribed]);

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  const onSubscribersClick = useCallback(() => {
    setUsersToShow(
      subscriptionsUsers ? subscriptionsUsers.subscriptionsUsers : []
    );
    console.log(subscriptionsUsers);
    setShowSubscrUsers(true);
    
  }, [subscriptionsUsers]);

  const onFollowersClick = useCallback(() => {
    setUsersToShow(subscriptionsUsers ? subscriptionsUsers.followersUsers : []);
    setShowSubscrUsers(true);
  }, [subscriptionsUsers]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setShowSubscrUsers(false)
    };

  useEffect(() => {
    if (id) {
      getUserInfoMutation.mutate(id);
      getSubscribedUsers.mutate(id);
    } else if (appUser) {
      getUserInfoMutation.mutate(appUser._id);
      getSubscribedUsers.mutate(appUser._id);
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h5">
                Num posts: {userPosts.length}
              </Typography>

              <Box sx={{cursor: "pointer"}} onClick = {onSubscribersClick}>
                <Typography variant="h5">
                  Sudscribers: {subscriptions.length}{" "}
                </Typography>
              </Box>

              <Box sx={{cursor: "pointer"}} onClick={onFollowersClick}>
                <Typography variant="h5">Follow: {followers.length}</Typography>
              </Box>

              <Drawer
                anchor="bottom"
                open={showSudscribedUsers}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minHeight: "50vh",
                    maxHeight: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <UsersList users={usersToShow} />
                </Box>
              </Drawer>
            </Box>

            {currProfile?._id !== appUser?._id ? (
              <CardActions
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{ width: "80%", padding: "20px 3px" }}
                  onClick={onSubscribeClick}
                  variant={isSubscribed ? "outlined" : "contained"}
                >
                  {isSubscribed ? <PersonRemove /> : <PersonAdd />}
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
