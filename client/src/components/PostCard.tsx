import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useCallback, useState } from "react";
import { Post } from "../types/Post";
import { dateToString } from "../utils/parseDate";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AppServises } from "../servises/API";
import { useAtom } from "jotai";
import { appUserAtom, likedListAtom } from "../atom";
import { isLiked, numLikes } from "../utils/likesInfo";
import { Delete } from "@mui/icons-material";
import { AppRoutes } from "../routes";

interface PostCardProps {
  post: Post;
  redirect: boolean;
  isRemovable: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  redirect,
  isRemovable,
}) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useAtom(likedListAtom);
  const [user] = useAtom(appUserAtom);
  const [numOfLikes, setNumOfLikes] = useState<number>(
    numLikes(post._id, likes)
  );

  const [isLike, setIsLike] = useState<boolean>(
    isLiked(user?._id, post._id, likes)
  );

  const likeMutation = useMutation(AppServises.likeIt, {
    onSuccess: (data) => {
      console.log(data);
      setLikes((state) => [data, ...state]);
    },
  });

  const removeLikeMutation = useMutation(AppServises.removeLike, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const removePostMutation = useMutation(AppServises.deletePost, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  const onAvatarClick = useCallback(() => {
    if (redirect) {
      if (user?._id === post.postedBy._id) navigate(AppRoutes.profile);
      else navigate(`/profile/${post.postedBy._id}`);
    }
  }, []);

  const onLikeClick = useCallback(() => {
    if (isLike) {
      removeLikeMutation.mutate(post._id);
      setIsLike(false);
      setNumOfLikes((prev) => (prev -= 1));
    } else {
      likeMutation.mutate(post._id);
      setIsLike(true);
      setNumOfLikes((prev) => (prev += 1));
    }
  }, [isLike]);

  const onRemovePostClick = useCallback(() => {
    removePostMutation.mutate(post._id);
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
          <Box sx={{ margin: "0 0 10px 10px" }}>
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
          }}
          onClick={onLikeClick}
        >
          {likeMutation.isLoading ? (
            <CircularProgress />
          ) : (
            <Badge badgeContent={numOfLikes}>
              {isLike ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "red" }} />
              )}
            </Badge>
          )}
        </ListItemButton>
        {isRemovable ? (
          <ListItemButton
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
            onClick={onRemovePostClick}
          >
            <Delete />
          </ListItemButton>
        ) : null}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
