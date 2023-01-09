import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/reduxHooks'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'

export const App = () => {

  const user = useAppSelector(state=>state.user.user);

  return (
    <div>
      <div>
        {user?<h1>{`Hello ${user?.username}`}</h1>:<h1>Sorry, idk who are you</h1>}
      </div>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login/>} />
          <Route index path='/registration' element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
