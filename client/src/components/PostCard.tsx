import { ListItem, ListItemText } from '@mui/material';
import React from 'react'
import { PostResponseData } from '../types/Post'

interface PostCardProps {
    post: PostResponseData;
}

export const PostCard: React.FC<PostCardProps> = ({post}) => {
  
  return (
    <ListItem>

        <ListItemText>
            {post.text}
        </ListItemText>

    </ListItem>
  )
}

/*
    _id: string,
    userID: string,
    text: string,
    likes: number,
    createdAt: Date,
*/