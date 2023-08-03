import React from "react";
// import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as rLink } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Link } from "@mui/material";

// TODO - turn this into a hamburger menu

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            wanderLocal
          </Typography>
          <nav>
            <div>
              {!user.id && (
                <Link
                  variant="button"
                  color="text.primary"
                  href="/#login"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Login / Register
                </Link>
              )}
              {user.id && (
                <>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/#user"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Home
                  </Link>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/#display"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Display
                  </Link>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/#entry"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Add
                  </Link>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/#favorites"
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    ❤️
                  </Link>
                  <Link
                    variant="button"
                    color="text.primary"
                    href="/#user"
                    sx={{ my: 1, mx: 1.5 }}
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                    }}
                  >
                    Log out
                  </Link>
                </>
              )}
            </div>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
