import { Avatar, Box, Typography } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { appUserAtom } from "../atom";

export const UserInfo = () => {
  const [user] = useAtom(appUserAtom);

  return (
    <Box sx={{
        width: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 10px"
         }}>
      <Typography variant="h5" mr={2}>{user?.username}</Typography>
      <Avatar alt={user?.username} src={user?.avatarUrl??""} sx={{width: "56", height: "56"}} />
    </Box>
  );
};
