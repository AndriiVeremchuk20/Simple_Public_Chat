import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const Logo = () => {
  return (
    <Box m={1} width={"30%"} sx={{display: {sm: 'none', xs: "none", lg: "block"}}}>
        <Typography component={"a"} href={"/"} sx={{textDecoration: "none",color: "white"}} variant='h3'>📬 Postman</Typography>
    </Box>
  )
}
