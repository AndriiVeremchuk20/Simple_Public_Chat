import React, { useCallback, useState } from "react";
import { Alert, Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { authServises } from "../servises/auth";
import { RegistrationUser, User } from "../types/User";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../routes";

export const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationUser>({
    mode: "onChange",
  });

  const { mutate, isLoading, isError, error } = useMutation(authServises.register, {
    onSuccess: (data) => {
      navigate(AppRoutes.login);
    },
    onError: (error: any)=>{
  
    },
  });

  const onSubmit: SubmitHandler<RegistrationUser> = useCallback((data) => {
    const newUser = {
      ...data
    }
    mutate(newUser);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Paper style={styles.main}>
      <Box sx={styles.form}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              sx={styles.input}
              required
              error={!!error}
              type={"text"}
              label="Username"
              onChange={onChange}
              value={value}
              variant="outlined"
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
            sx={styles.input}
              required
              error={!!error}
              type={"email"}
              label="Email"
              onChange={onChange}
              value={value}
              variant="outlined"
              helperText={error ? error.message : null}
            />
          )}
        />

        <Controller
          name="avatarUrl"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
            sx={styles.input}
              type={"text"}
              label="Avatal"
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
            rules={{ required: "Password required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                required
              sx={styles.input}
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
        <Button onClick={handleSubmit(onSubmit)}>Reg🤝🏼</Button>
        
        {
          isError?<Alert color="error">{error.response.data.msg?error.response.data.msg:error.message}</Alert>:null
        }

        <Link to={AppRoutes.login}>Login</Link>
        
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
}
