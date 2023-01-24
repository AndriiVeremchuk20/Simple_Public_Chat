import { Fab, Typography } from "@mui/material";
import React, { useCallback } from "react";

export const UpButton = () => {
  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Fab
      sx={{
        display: "absolute",
        position: "fixed",
        top: "90%",
        right: "18%",
        width: "0",
      }}
      onClick={onClick}
    >
      <Typography variant="h2">👆</Typography>
    </Fab>
  );
};
