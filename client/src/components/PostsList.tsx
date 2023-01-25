import { List, Paper, Typography } from "@mui/material";
import React from "react";
import { Post } from "../types/Post";
import { PostCard } from "./PostCard";

interface PostslistProps {
  posts: Array<Post>;
  redirect: boolean;
  isRemovable: boolean;
}

export const PostsList: React.FC<PostslistProps> = ({
  posts,
  redirect,
  isRemovable,
}) => {

  return (
    <Paper elevation={2} sx={{ width: "80%", margin: "15px 0 15px 0 " }}>
      <List>
        {posts ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              redirect={redirect}
              isRemovable={isRemovable}
            />
          ))
        ) : (
          <Typography variant="h3">No posts found</Typography>
        )}
      </List>
    </Paper>
  );
};
