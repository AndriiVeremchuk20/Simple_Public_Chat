import { AppBar, Avatar, Button, Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { appUserAtom } from "../atom";
import { authServises } from "../servises/API";
import { User } from "../types/User";

export const Profile = () => {
  const { id } = useParams();
  const [user] = useAtom(appUserAtom);
  const [currUser, setCurrUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  const { mutate } = useMutation(authServises.getUserInfo, {
    onSuccess: (data) => {
      setCurrUser(data);
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
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar sx={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={onBackClick} sx={{ margin: "10px" }}>
          Back
        </Button>
      </AppBar>
      {
        
      }  
      <Paper elevation={3} sx={{ width: "60vw", margin: "10vh 0 0 0 "}}>
        <Card sx={{margin: "10px 10px", padding: "10px 10px"}}>
          <Avatar 
               alt={currUser?.username}
               src={currUser?.avatarUrl ?? ""}
               sx={{ width: "300px", height: "300px" }}
          />
          <CardContent>
            <Typography variant={"h4"}>{currUser?.username}</Typography>
            <Typography variant={"body1"} component={"a"} href={`mailto:${currUser?.email}`} >{currUser?.email}</Typography>
          </CardContent>
        </Card>
      </Paper>
    
    </Paper>
  );
};
