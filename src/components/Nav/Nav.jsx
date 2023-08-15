import React from "react";
// import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// MUI
import AppBar from "@mui/material/AppBar";

import { Link as rLink } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import { Link } from "@mui/material";

// TODO - turn this into a hamburger menu

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <AppBar
        position="static"
        color="primary"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            component="a"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textDecoration: "none" }}
            href="/#about"
          >
            wanderLocal
          </Typography>
          <Typography
            component="a"
            onClick={() => {
              dispatch({ type: "FETCH_ALL_EXPERIENCES" });
            }}
            color="text.primary"
            href="/#search"
            sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
          >
            🔎
          </Typography>

          <nav>
            <div>
              {!user.id && (
                <Link
                  variant="button"
                  color="inherit"
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
                    color="inherit"
                    href="/#display"
                    sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
                  >
                    Home
                  </Link>
                  <Link
                    variant="button"
                    color="inherit"
                    href="/#entry"
                    sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
                  >
                    Add
                  </Link>
                  <Link
                    variant="button"
                    color="inherit"
                    href="/#favorites"
                    sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
                  >
                    ❤️
                  </Link>
                  <LogOutButton />
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
