import { AppBar } from '@mui/material'
import React from 'react'
import { Logo } from './Logo'
import { Search } from './Search';
import { UserInfo } from './UserInfo';


export const SearchBar = () => {
  return (
    <AppBar sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <Logo/>
      <Search/>
      <UserInfo/>
    </AppBar>
  )
};

