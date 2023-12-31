import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay";
// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function FavoritesPage() {
  // store and hook inits
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const experiences = useSelector((store) => store.experience);

  // filter experiences for only favorites that match the userID
  const favorites = experiences.filter((experience) => {
    return experience.favorite === true;
  });

  useEffect(() => {
    dispatch({ type: "FETCH_USER_EXPERIENCE" });
  }, []);

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
              {user.username}'s favorites.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Grid container spacing={2}>
            {favorites.map((experience) => {
              return (
                <Grid item key={experience.this_id} xs={18} sm={9} md={4}>
                  <ExperienceToDisplay experience={experience} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default FavoritesPage;
