import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { BrowserRouter, redirect, Route, Routes } from "react-router-dom";
import { appUserAtom } from "./atom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Registration } from "./pages/Registration";
import { AppRoutes } from "./routes";
import { authServises } from "./servises/API";
import { User } from "./types/User";
import { PrivateRoute } from "./utils/PrivateRoute";

export const App = () => {

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useAtom(appUserAtom);
  
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    authServises.auth,
    {
      onSuccess: (data) => {
        console.log(data.user);
        setUser(data.user as User);
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
      <div>
        Current user is {user?.username}
      </div>
      <BrowserRouter>
        <Routes>
         <Route
            index={!!user}
            path={AppRoutes.home}
            element={
              <PrivateRoute
                redirectPath={AppRoutes.login}
                user={user}
                children={<Home />}
              />
            }
          ></Route>
          <Route path={AppRoutes.login} element={<Login />} />
          <Route path={AppRoutes.registration} element={<Registration />} />
          <Route path={AppRoutes.noPage} element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
