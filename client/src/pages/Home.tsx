import { Paper } from '@mui/material';
import React from 'react'
import { MakePost } from '../components/MakePost';
import { useAppSelector } from '../hooks/reduxHooks'

export const Home = () => {

    const user = useAppSelector(state => state.user.user);

    return (
    <Paper sx={styles.main}>
      <MakePost/>
    </Paper>
  )
}

const styles =  {
  main: {
    height: "100vh",
    width: "100vw",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
}
