import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React from "react";

export const WaitPage = () => {
  return (
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        <CircularProgress size={130} />
        <Typography variant={"h3"} mt={"40px"}>
          Wait..
        </Typography>
      </Box>
    </Paper>
  );
};
