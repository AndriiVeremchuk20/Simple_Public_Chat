import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { appUserAtom } from "./atom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Profile } from "./pages/Profile";
import { Registration } from "./pages/Registration";
import { WaitPage } from "./pages/WaitPage";
import { AppRoutes } from "./routes";
import { AppServises } from "./servises/API";
import { Token } from "./utils/token";

export const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user, setUser] = useAtom(appUserAtom);

  const { mutate, isLoading, isSuccess } = useMutation(AppServises.auth, {
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: (error: any) => {
      const errorText = error.response.data.msg
        ? error.response.data.msg
        : error.message;
      setErrorMessage(errorText);
      Token.Remove();
    },
  });

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
          <>
            <Route index path={AppRoutes.home} element={<Home />} />
            <Route path={AppRoutes.profile} element={<Profile />} />
            <Route path={AppRoutes.profileId} element={<Profile />} />
          </>
        ) : (
          <>
            <Route path={AppRoutes.login} element={<Login />} />
            <Route path={AppRoutes.registration} element={<Registration />} />
          </>
        )}
        <Route path={AppRoutes.noPage} element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};
