import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { User } from "../types/User";


//onclick redirect to profile page and set _id into query params (rrd v6);
//on profile page get id from url query params and mutate data from server
//if into id (query param) id curren user, redirect to your page  

interface UserAutoCompleteCardProps {
  user: Omit<User, "password" | "id"| "createdAt">;
}

export const UserAutoCompleteCatd: React.FC<UserAutoCompleteCardProps> = ({
  user,
}) => {



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "auto",
        padding: "5px 10px",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={user.username}
        src={user.avatarUrl ?? ""}
        sx={{ width: "35", height: "35", margin: "5px" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"body1"}>{user.username}</Typography>
        <Typography variant={"body2"}>{user.email}</Typography>
      </Box>
    </Box>
  );
};