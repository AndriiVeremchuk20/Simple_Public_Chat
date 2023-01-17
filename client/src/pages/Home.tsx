import { Button, Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { appUserAtom } from "../atom";
import { MakePost } from "../components/MakePost";
import { SearchBar } from "../components/SearchBar";
import { Token } from "../utils/token";

export const Home = () => {
  const [user, setUser] = useAtom(appUserAtom);

  return (
    <Paper sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center"}}>
      <SearchBar />
      <Paper elevation={3} sx={{ height: "100vh", width: "60vw" }}>
        <MakePost />
      </Paper>
    </Paper>
  );
};
