import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const NoPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onRefreshClick = useCallback(() => {
    navigate(0);
  }, [navigate]);

  return (
    <Paper style={styles.main}>
      <Box alignItems={"center"}>
        <Typography sx={styles.text}>404 😵</Typography>

        <Alert
          sx={styles.alert}
          variant="outlined"
          color="error"
        >{`Path '${pathname}' does not exist`}</Alert>
        <ButtonGroup sx={styles.buttons}>
          <Button variant="outlined" onClick={onBackClick}>
            Back
          </Button>
          <Button variant="outlined" onClick={onRefreshClick}>
            Refresh
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
};

const styles = {
  main: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: "120px",
  },
  alert: {
    fontSize: "20px",
    width: "100%",
  },
  buttons: {
    margin: "10px 0 ",
  },
};
