import { List, Paper, Typography } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { postsListAtom } from "../atom";
import { PostCard } from "./PostCard";

interface PostslistProps {
  redirect: boolean;
  isRemovable: boolean;
}

export const PostsList: React.FC<PostslistProps> = ({
  redirect,
  isRemovable,
}) => {
  const [posts] = useAtom(postsListAtom);

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
