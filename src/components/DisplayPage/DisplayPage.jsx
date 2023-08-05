import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay.jsx";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function DisplayPage() {
  // init dispatch
  const dispatch = useDispatch();

  // fetch user's experiences on page load
  // TODO - this should happen after a succesful login
  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);

  // pulls the experiences array from the store
  const experiences = useSelector((store) => store.experience);

  const user = useSelector((store) => store.user);

  return (
    <div>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {user.username}'s experiences.
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              ❤️ to favorite!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {experiences.map((experience) => {
              return (
                <Grid item key={experience.this_id} xs={18} sm={9} md={6}>
                  <ExperienceToDisplay
                    key={experience.this_id}
                    experience={experience}
                    userId={user.id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default DisplayPage;
