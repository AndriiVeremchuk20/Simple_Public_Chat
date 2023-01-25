import { List, Paper } from "@mui/material";
import React from "react";
import { User } from "../types/User";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: Array<User>;
}

export const UsersList: React.FC<UserListProps> = ({ users }) => {
  return (
      <List
        sx={{
          width: "80%",
        }}
      >
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </List>
  );
};
