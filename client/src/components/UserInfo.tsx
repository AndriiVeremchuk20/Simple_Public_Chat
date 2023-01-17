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
import { useNavigate } from "react-router-dom";
import { appUserAtom } from "../atom";
import { AppRoutes } from "../routes";
import { authServises } from "../servises/API";
import { Token } from "../utils/token";

export const UserInfo = () => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [user, setUser] = useAtom(appUserAtom);
  const navigate = useNavigate();

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

  const handleProfileClick = useCallback(() => {
    navigate(AppRoutes.profile);
  }, []);

  return (
    <>
      <Button
        sx={{
          width: "15%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
          margin: "0 10px",
        }}
        onClick={handleOpenMenuClick}
      >
        <Avatar
          alt={user?.username}
          src={user?.avatarUrl ?? ""}
          sx={{ width: "56", height: "56", margin: "0 10px 0 10px" }}
        />
        <Typography variant="h5">{user?.username}</Typography>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorMenu}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
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
