import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/reduxHooks'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NoPage } from './pages/NoPage'
import { Registration } from './pages/Registration'
import { AppRoutes } from './routes'
import { PrivateRoute } from './utils/PrivateRoute'

export const App = () => {

  const user = useAppSelector(state=>state.user.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path={AppRoutes.login} element={<Login/>} />
          <Route path={AppRoutes.registration} element={<Registration/>} />
          <Route path={AppRoutes.home} element={<PrivateRoute redirectPath={AppRoutes.login} user={user} children={<Home/>}/>}>

          </Route>
          <Route path={AppRoutes.noPage} element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
