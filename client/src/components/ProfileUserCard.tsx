import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { AppServises } from "../servises/API";
import { Post } from "../types/Post";
import { getSubscribedUsersResponse, Subscribe } from "../types/Subscribe";
import { User } from "../types/User";
import { SubscribeButton } from "./SubscribeButton";
import { UsersList } from "./UsersList";

interface ProfileUserCardProps {
  user: User;
  subscribers: Array<Subscribe>;
  subscriptions: Array<Subscribe>;
  posts: Array<Post>;
}

export const ProfileUserCard: React.FC<ProfileUserCardProps> = ({
  user,
  subscribers,
  subscriptions,
  posts,
}) => {
  const [subscriptionsUsers, setSubscriptionsUsers] =
    useState<getSubscribedUsersResponse | null>(null);
  const [usersToShow, setUsersToShow] = useState<Array<User>>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false);

  const getSubscribedUsers = useMutation(AppServises.getSubscribedUsers, {
    onSuccess: (data) => {
      console.log(data);
      setSubscriptionsUsers(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubscriptionsClick = useCallback(() => {
    console.log(subscriptionsUsers)
    if (subscriptionsUsers)
      setUsersToShow(subscriptionsUsers.subscriptionsUsers);
    setShowUsers(true);
  }, [subscriptionsUsers]);

  const onSubscribersClick = useCallback(() => {
    if (subscriptionsUsers) setUsersToShow(subscriptionsUsers.subscribersUsers);
    setShowUsers(true);
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
      setShowUsers(open);
    };

  useEffect(() => {
    getSubscribedUsers.mutate(user._id);
  }, []);

  useEffect(()=>{console.log(subscriptionsUsers)}, [subscriptionsUsers])

  return (
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
          alt={user.username}
          src={user.avatarUrl ?? ""}
          sx={{ width: "300px", height: "300px" }}
        />
        <Typography variant={"h4"}>{user.username}</Typography>
        <Typography
          variant={"body1"}
          component={"a"}
          href={`mailto:${user.email}`}
        >
          {user.email}
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
          <Typography variant="h5">Posts: {posts.length}</Typography>

          <Box sx={{ cursor: "pointer" }} onClick={onSubscriptionsClick}>
            <Typography variant="h5">
              Subscriptions: {subscriptions.length}
            </Typography>
          </Box>

          <Box sx={{ cursor: "pointer" }} onClick={onSubscribersClick}>
            <Typography variant="h5">
              Subscribers: {subscribers.length}
            </Typography>
          </Box>

          <Drawer
            anchor="bottom"
            open={showUsers}
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

        <CardActions
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SubscribeButton subscribeToUserId={user._id} />
        </CardActions>
      </CardContent>
    </Card>
  );
};
