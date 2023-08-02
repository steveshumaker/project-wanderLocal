import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay.jsx";
// MUI
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

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

  return (
    <div>
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
            Username Placeholder
          </Typography>
        </Container>
      </Box>


          {experiences.map((experience) => {
            return (
              <ExperienceToDisplay
                key={experience.this_id}
                experience={experience}
              />
            );
          })}

    </div>
  );
}

export default DisplayPage;
