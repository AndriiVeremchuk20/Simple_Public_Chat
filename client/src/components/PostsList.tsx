import { List, Paper, Typography } from "@mui/material";
import React from "react";
import { PostResponseData } from "../types/Post";
import { PostCard } from "./PostCard";

interface PostslistProps {
  posts: Array<PostResponseData>;
  redirect: boolean;
}

export const PostsList: React.FC<PostslistProps> = ({ posts, redirect}) => {
  return (
    <Paper elevation={2} sx={{ width: "80%", margin: "10px 0 0 0 " }}>
      <List>
        {posts ? (
          posts.map((post) => <PostCard key={post._id} post={post} redirect={redirect} />)
        ) : (
          <Typography variant="h3">No posts found</Typography>
        )}
      </List>
    </Paper>
  );
};
