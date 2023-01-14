import { Alert } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { appUserAtom } from "./atom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Registration } from "./pages/Registration";
import { WaitPage } from "./pages/WaitPage";
import { AppRoutes } from "./routes";
import { authServises } from "./servises/API";
import { PrivateRoute } from "./utils/PrivateRoute";

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useAtom(appUserAtom);

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    authServises.auth,
    {
      onSuccess: (data) => {
        setUser(data.user);
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


  // if (isError) {
  //   return <Alert variant="filled" severity="error">
  //     Error: {errorMessage}
  //   </Alert>;
  // }

  if (isLoading) {
    return <WaitPage />;
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {isSuccess && user ? (
          <Route
            index
            path={AppRoutes.home}
            element={
              <PrivateRoute
                redirectPath={AppRoutes.login}
                user={user}
                children={<Home />}
              />
            }
          ></Route>
        ) : (
          <>
            <Route index path={AppRoutes.login} element={<Login />} />
            <Route path={AppRoutes.registration} element={<Registration />} />
          </>
        )}
        <Route path={AppRoutes.noPage} element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
