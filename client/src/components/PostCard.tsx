import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useCallback } from "react";
import { PostResponseData } from "../types/Post";
import { dateToString } from "../utils/parseDate";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: PostResponseData;
  redirect: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, redirect }) => {
  const navigate = useNavigate();

  const onAvatarClick = useCallback(() => {
    if(redirect)
    navigate(`/profile/${post.postedBy._id}`);
  }, []);

  return (
    <>
      <ListItem
        sx={{ padding: "10px", "&:hover": { background: "rgba(1,1,1,.2)" } }}
      >
        <ListItemAvatar onClick={onAvatarClick} sx={{ margin: "0 10px" }}>
          <Avatar
            src={post.postedBy.avatarUrl ?? ""}
            style={{ width: "50px", height: "50px" }}
            alt={post.postedBy.username}
          />
        </ListItemAvatar>
        <ListItemText sx={{ width: "90%" }}>
          <Box sx={{margin: "0 0 10px 10px"}}>
            <Typography variant="h6">{post.postedBy.username}</Typography>
            <Typography sx={{ fontSize: "10px" }}>
              {dateToString(post.createdAt)}
            </Typography>
          </Box>
          <Typography variant="body2">{post.text}</Typography>
        </ListItemText>
        <ListItemButton
          sx={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            "&:hover": { background: "none" },
          }}
        >
          <FavoriteBorderIcon sx={{ color: "red" }} />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

/*
<Badge badgeContent={4} color="primary">
  <MailIcon color="action" />
</Badge>
*/
/*
    _id: string,
    userID: string,
    text: string,
    likes: number,
    createdAt: Date,
*/
