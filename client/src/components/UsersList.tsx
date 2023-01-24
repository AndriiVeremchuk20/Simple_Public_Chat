import { List, Paper } from "@mui/material";
import React from "react";
import { User } from "../types/User";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: Array<User>;
}

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Paper>
      <List
        sx={{
          "&:hover": {
            background: "rgda(1,1,1,.3)",
          },
        }}
      >
        {users.map((user) => (
          <>
            <UserCard key={user._id} user={user} />
          </>
        ))}
      </List>
    </Paper>
  );
};
