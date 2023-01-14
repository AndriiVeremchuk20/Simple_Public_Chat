import { Button, Paper } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { appUserAtom } from "../atom";
import { MakePost } from "../components/MakePost";
import { SearchBar } from "../components/SearchBar";
import { Token } from "../utils/token";

export const Home = () => {
  const [user, setUser] = useAtom(appUserAtom);

  const onLogoutClick = useCallback(() => {
    setUser(null);
    Token.Remove();
    console.log(user, "Logout Complete");
  }, []);

  return (
    <Paper sx={styles.main}>
      <SearchBar/>
      <div>
        Hello mr {user?.username}
        <Button onClick={onLogoutClick}> Logout </Button>
      </div>
      <MakePost />
    </Paper>
  );
};

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
};
