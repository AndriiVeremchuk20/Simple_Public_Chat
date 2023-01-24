import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

interface UserCatdProps {
    user: User;
}

export const UserCard: React.FC<UserCatdProps> = ({user}) => {
  
    const navigate = useNavigate();
  
    const onCardClick = useCallback(
      () => {
        navigate(`profile/${user._id}`);
      },
      [],
    )
    

    return (
      <>
      <ListItem onClick={onCardClick}>
        <ListItemAvatar >
            <Avatar 
             alt={user.username}
             src={user?.avatarUrl ?? ""}
             sx={{ width: "56", height: "56", margin: "0 10px 0 10px" }}
           />           
        </ListItemAvatar>

        <ListItemText>
            <Typography variant='h4'> 
            {user.username}
            </Typography>
        </ListItemText>
    </ListItem>
            <Divider variant="inset" component="li" />
      </>
  )
}
