import { Box, Button, Paper, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import { authServises } from '../servises/auth';
import { LoginUser } from '../types/User';

export const Login = () => {
  
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation(authServises.login, {
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


  const onSubmit: SubmitHandler<LoginUser> = useCallback((data) => {
    const user = {
      ...data
    }
    mutate(user);
  }, []);

  const onButtonClick = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Paper>
      <Box>

      <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
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
        <Button onClick={handleSubmit(onSubmit)}>Login</Button>
      </Box>
    </Paper>
  )
}
