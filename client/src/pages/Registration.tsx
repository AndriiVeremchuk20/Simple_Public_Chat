import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { authServises } from "../servises/auth";
import { User } from "../types/User";

type user = Omit<User, "createdAt">;

export const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<user>({
    mode: "onChange",
  });

  const { mutate, isLoading, isSuccess, isError, error } = useMutation(authServises.registerUser, {
    onSuccess: (data) => {
      console.log(data);
      const message = "success";
      alert(message);
    },
    onError: ()=>{
      alert("there was an error")
    },
    onSettled: ()=>{
      queryClient.invalidateQueries('create');
    }
  });


  const onSubmit: SubmitHandler<user> = useCallback((data) => {
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
      <Box
        flexDirection={"column"}
        display="flex"
        justifyContent={"space-around"}
        height={"40vh"}
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
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
              type={"text"}
              label="Avatal"
              onChange={onChange}
              value={value}
              variant="outlined"
              helperText={error ? error.message : null}
            />
          )}
        />

        <Box>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password required" }}
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
        <Button onClick={handleSubmit(onSubmit)}>Reg🤝🏼</Button>
      </Box>
    </Paper>
  );
};

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
