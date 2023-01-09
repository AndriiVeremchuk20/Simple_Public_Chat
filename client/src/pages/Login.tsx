import { Alert, Box, Button, CircularProgress, Paper, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { authServises } from '../servises/auth';
import { setUser } from '../store/userSlice';
import { LoginUser, User } from '../types/User';

export const Login = () => {
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch(); 
  const user = useAppSelector(state => state.user.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onChange",
  });

  const { mutate, isLoading, isError } = useMutation(authServises.login, {
    onSuccess: (data)=>{
      dispatch(setUser(data.user));
    }
    //Error .... 
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
    <Paper sx={styles.main}>
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
         {
          isLoading? <CircularProgress size={30}/>: <Button sx={styles.input} onClick={handleSubmit(onSubmit)}>Login</Button>
         }
         {
          isError?<Alert color='error'>Ops fucking server</Alert>:null
         }
      </Box>
    </Paper>
  )
}

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
