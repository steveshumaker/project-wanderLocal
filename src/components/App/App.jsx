import React, { useEffect } from "react";
// routing imports
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// page imports
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DisplayPage from "../DisplayPage/DisplayPage";
import EntryPage from "../EntryPage/EntryPage";
import FavoritesPage from "../FavoritesPage/FavoritesPage";
import SearchPage from "../SearchPage/SearchPage";
// MUI
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  // MUI theme options
  const themeOptions = {
    palette: {
      type: "light",
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#d4002b",
      },
      error: {
        main: "#f44336",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          },
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

            <ProtectedRoute exact path="/display">
              <DisplayPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/favorites">
              <FavoritesPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/entry">
              <EntryPage />
            </ProtectedRoute>

            {/* HELPER CONDITIONAL LOGIN */}
            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/display" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /display page
                <Redirect to="/display" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /display page
                <Redirect to="/display" />
              ) : (
                // Otherwise, show the Landing page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/search">
              <SearchPage />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
