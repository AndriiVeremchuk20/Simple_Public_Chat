import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import React from 'react'

interface SpinnerProps {
    size: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return (
    <Paper style={styles.main}>
        <Box alignItems={"center"}>
        <CircularProgress size={size} /> 
        <Typography variant='h1'>Wait..</Typography>
        </Box>
    </Paper>
  )
};

const styles = {
    main: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}
