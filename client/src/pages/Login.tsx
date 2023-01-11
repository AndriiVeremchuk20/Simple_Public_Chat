import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useAppDispatch } from "../hooks/reduxHooks";
import { authServises } from "../servises/API";
import { setUser } from "../store/userSlice";
import { LoginUser } from "../types/User";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes";
import { Token } from "../utils/token";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const formScheme = Yup.object().shape({
    password: Yup.string()
      .required("password is required")
      .min(4, "Min password lenght 4")
      .max(12, "Max password lenght 4"),
    username: Yup.string()
      .required("username is reqiured")
      .min(4, "Min length for username 4"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onChange",
    resolver: yupResolver(formScheme),
  });

  const { mutate, isLoading, isError, error } = useMutation(
    authServises.login,
    {
      onSuccess: (data) => {
        dispatch(setUser(data.user));
        navigator(AppRoutes.home);
      },
      onError: (error: any) => {
        const errorText = error.response.data.msg
          ? error.response.data.msg
          : error.message;
        setErrorMessage(errorText);

        Token.Remove();
      },
    }
  );

  const onSubmit: SubmitHandler<LoginUser> = useCallback((data) => {
    const user = {
      ...data,
    };
    mutate(user);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Paper sx={styles.main}>
      <Box sx={styles.form}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={styles.input}
              error={!!error}
              required
              type={"text"}
              label="Username"
              onChange={onChange}
              value={value}
              variant="outlined"
              helperText={error ? error.message : null}
            />
          )}
        />

        <Box sx={styles.inputPassword}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
                error={!!error}
                type={showPassword ? "text" : "password"}
                label="Password"
                onChange={onChange}
                value={value}
                variant="outlined"
                helperText={error ? error.message : null}
              />
            )}
          />
          <Button onClick={onButtonClick}>{showPassword ? "🫣" : "😶‍🌫️"}</Button>
        </Box>
        <Button sx={styles.input} onClick={handleSubmit(onSubmit)}>
          {isLoading ? <CircularProgress size={30} /> : "Login"}
        </Button>

        {isError ? <Alert color="error">{errorMessage}</Alert> : null}
        <Link to={AppRoutes.registration}>Registration</Link>
      </Box>
    </Paper>
  );
};

const styles = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "solid black 3px",
    borderRadius: "5px",
    padding: "20px",
  },
  input: {
    width: "100%",
    margin: "5px",
  },
  inputPassword: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
