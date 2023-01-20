import React from "react";
import { Box, styled, Typography } from "@mui/material";

export const Footer = () => {
  
    return (
    <MUIFooter>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Get Movie 🎬
        </Typography>
        <Typography variant="body2">Some text.</Typography>
      </Box>
      <Box>
        <Typography>follow us</Typography>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
            alt="instagram"
          />
          <Image
            src="https://cdn-icons-png.flaticon.com/128/3536/3536761.png"
            alt="redit"
          />
          <Image
            src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"
            alt="twiter"
          />
        </Box>
      </Box>
      <Box>
        <Typography>call us</Typography>
        <Typography component="a" href="tel:099-999-99-99">
          099-999-99-99
        </Typography>
      </Box>
    </MUIFooter>
  );
};

const MUIFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "8vh",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderTop: "solid 2px lightblue",
  padding: "0 0 10px 0",
  margin: "10px 0 0 0"
}));

const Image = styled("img")(({ theme }) => ({
  width: "20%",
  cursor: "pointer",
}));