import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { postsListAtom } from "../atom";
import { AppServises } from "../servises/API";
import { PostRequestBody } from "../types/Post";

export const MakePost = () => {
  const [,setPosts] = useAtom(postsListAtom);
  const [postText, setPostText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const onInput = useCallback(
    (e: { target: { value: string } }) => {
      setPostText(e.target.value);
    },
    [postText]
  );

  const { mutate, isError, isLoading } = useMutation(AppServises.makePost, {
    onSuccess: (data) => {
      setShowSuccessMessage(true);
      setTimeout(()=>{
        setShowSuccessMessage(false);
      }, 700);
      console.log(data);
      setPosts((posts) => [ data.post, ...posts]);
      setPostText("");
    },
    onError: (error: any) => {
      const errorText = error.response.data.msg
        ? error.response.data.msg
        : error.message;
      setErrorMessage(errorText);
      console.log(error);
    },
  });

  const onPostClick = useCallback(() => {
    const requestBody: PostRequestBody = {
      text: postText,
    };
    mutate(requestBody);
  }, [postText]);

  return (
    <Paper
      elevation={2}
      sx={{
        width: "80%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        magrin: "50px, 0 0 0",
        padding: "10px",
      }}
    >
      {showSuccessMessage ? <Alert color="success">Post created</Alert> : null}

      <Typography variant="h5">Type your post 📝</Typography>
      <TextareaAutosize
        onChange={onInput}
        value={postText}
        style={{
          width: "90%",
          alignSelf: "center",
          height: "10vh",
          borderRadius: "10px",
          fontSize: "20px",
          padding: "10px",
          margin: "10px 0 10px 0",
          resize: "vertical",
          fontFamily: "serif",
        }}
        placeholder={"Tell everyone"}
        maxRows={10}
      />
      <Button
        sx={{ alignSelf: "end" }}
        variant="contained"
        onClick={onPostClick}
      >
        {isLoading ? <CircularProgress size={15} /> : "Post"}
      </Button>
      {isError ? <Alert color="error">{errorMessage}</Alert> : null}
    </Paper>
  );
};
