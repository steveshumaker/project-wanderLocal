import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function RegisterForm() {
  // state, store, and hooks init
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="h1"
        variant="h4"
      >
        register.
      </Typography>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid gray",
        }}
      >
        {/* CHANGE THIS */}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="p">join the community!</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={registerUser}>
          {errors.registrationMessage && (
            <Typography component="h3" className="alert" role="alert">
              {errors.registrationMessage}
            </Typography>
          )}
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <Button
              color="success"
              type="submit"
              name="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterForm;
