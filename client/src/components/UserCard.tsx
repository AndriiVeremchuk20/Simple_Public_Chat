import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";
import { SubscribeButton } from "./SubscribeButton";

interface UserCatdProps {
  user: User;
}

export const UserCard: React.FC<UserCatdProps> = ({ user }) => {
  const navigate = useNavigate();

  const onCardClick = useCallback(() => {
    navigate(`/profile/${user._id}`, { replace: true });
  }, []);

  return (
    <>
      <ListItem
        sx={{
          "&:hover": {
            background: "#8a8a8a",
          },
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ width: "40%", display: "flex", flexDirection: "row" }}
          onClick={onCardClick}
        >
          <ListItemAvatar>
            <Avatar
              alt={user.username}
              src={user?.avatarUrl ?? ""}
              sx={{ width: "56", height: "56", margin: "0 10px 0 10px" }}
            />
          </ListItemAvatar>

          <ListItemText>
            <Typography variant="h4">{user.username}</Typography>
          </ListItemText>
        </Box>

        <Box>
            <SubscribeButton subscribeToUserId={user._id} />
         
        </Box>
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  );
};
