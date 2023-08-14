import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
// MUI
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function LoginPage() {
  const history = useHistory();
  const [randomImage, setRandomImage] = useState("");

  // THIS CAN BE MOVED TO A UTILS DIR
  // functions that get all uploaded URLs then choose a random
  // one to display
  const getUrl = async () => {
    const promise = await fetch("/api/upload/random");
    const fetchedUrls = await promise.json();
    const path = getRandomPic(fetchedUrls);
    setRandomImage(path);
  };

  const getRandomPic = (paths) => {
    const idx = Math.floor(Math.random() * paths.length);
    return paths[idx].photo_path;
  };

  useEffect(() => {
    getUrl();
  }, []);

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
          backgroundImage: `url(${randomImage})`,
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
          <LoginForm />

          <center>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "12em" }}
              onClick={() => {
                history.push("/registration");
              }}
            >
              Register
            </Button>
          </center>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
