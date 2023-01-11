import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Registration } from "./pages/Registration";
import { AppRoutes } from "./routes";
import { authServises } from "./servises/API";
import { setUser } from "./store/userSlice";
import { PrivateRoute } from "./utils/PrivateRoute";

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    authServises.auth,
    {
      onSuccess: (data) => {
        dispatch(setUser(data.user));
      },
      onError: (error: any) => {
        const errorText = error.response.data.msg
          ? error.response.data.msg
          : error.message;
        setErrorMessage(errorText);
      },
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path={AppRoutes.login} element={<Login />} />
          <Route path={AppRoutes.registration} element={<Registration />} />
          <Route
            path={AppRoutes.home}
            element={
              <PrivateRoute
                redirectPath={AppRoutes.login}
                user={user}
                children={<Home />}
              />
            }
          ></Route>
          <Route path={AppRoutes.noPage} element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
