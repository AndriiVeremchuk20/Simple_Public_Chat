import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'

export const App = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Login/>} />
          <Route index path='/registration' element={<Registration/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
