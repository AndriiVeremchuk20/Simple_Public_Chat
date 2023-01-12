import { Paper } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react'
import { appUserAtom } from '../atom';
import { MakePost } from '../components/MakePost';

export const Home = () => {

  const [user, setUser] = useAtom(appUserAtom);

    return (
    <Paper sx={styles.main}>
      <div>
        Hello mr {user?.username}
      </div>
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
