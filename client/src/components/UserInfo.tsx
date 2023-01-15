import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { appUserAtom } from "../atom";
import { authServises } from "../servises/API";
import { Token } from "../utils/token";

export const UserInfo = () => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [user, setUser] = useAtom(appUserAtom);

  const { mutate, isLoading, isSuccess } = useMutation(
    authServises.deleteAccount,
    {
      onError: (error: any) => {
        const errorText = error.response.data.msg
          ? error.response.data.msg
          : error.message;
        alert(errorText);
      },
      onSuccess: () => {
        setTimeout(() => {
          setUser(null);
          Token.Remove();
        }, 700);
      },
    }
  );

  const handleOpenMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorMenu(event.currentTarget);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorMenu(null);
  }, []);

  const handleLogoutClick = useCallback(() => {
    setUser(null);
    Token.Remove();
  }, []);

  const handleDeleteAccountClick = useCallback(() => {
    mutate();
  }, []);

  return (
    <>
      <Button
        sx={{
          width: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 10px",
        }}
        onClick={handleOpenMenuClick}
      >
        <Typography variant="h5" mr={2}>
          {user?.username}
        </Typography>
        <Avatar
          alt={user?.username}
          src={user?.avatarUrl ?? ""}
          sx={{ width: "56", height: "56" }}
        />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorMenu}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        <MenuItem onClick={handleDeleteAccountClick}>
          {isSuccess ? (
            <Alert color={"success"}>Account deleted success</Alert>
          ) : isLoading ? (
            <CircularProgress size={20} />
          ) : (
            "Delete account"
          )}
        </MenuItem>
      </Menu>
    </>
  );
};
