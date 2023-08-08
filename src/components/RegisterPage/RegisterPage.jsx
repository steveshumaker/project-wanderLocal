import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
// MUI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function RegisterPage() {
  const history = useHistory();

  return (
    <Grid container component="main" sx={{ mtheight: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        component={Paper}
        elevation={1}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <RegisterForm />

          <center>
            <Button
              type="button"
              sx={{ mt: 3, mb: 2, width: "12em" }}
              variant="contained"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          </center>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
