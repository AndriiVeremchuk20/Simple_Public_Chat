import { Button, Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { appUserAtom } from "../atom";
import { MakePost } from "../components/MakePost";
import { PostsList } from "../components/PostsList";
import { SearchBar } from "../components/SearchBar";
import { Token } from "../utils/token";

export const Home = () => {
  const [user, setUser] = useAtom(appUserAtom);

  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SearchBar />
      <Paper
        elevation={3}
        sx={{
          height: "100vh",
          width: "60vw",
          margin: "10vh 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          padding: "20px 0 0 0",
        }}
      >
        <MakePost />
        <PostsList/>
      </Paper>
    </Paper>
  );
};
