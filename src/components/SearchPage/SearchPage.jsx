import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay";
import AlternateSearchPage from "../AlternateSearchPage/AlternateSearchPage";
// MUI
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";

function SearchPage() {
  const dispatch = useDispatch();

  // STATE
  // Access experiences from store
  const experiences = useSelector((store) => store.search);
  const finalTags = useSelector((store) => store.tags);

  // Search state
  const [search, setSearch] = useState([]);

  // Render state
  const [shouldRender, setShouldRender] = useState(false);

  // Alternate search state
  const [altState, setAltState] = useState(false);

  // Handling tag search
  const handleTagsChange = (event, newValue) => {
    setSearch(newValue);
  };

  // Page useEffect:
  // - On comp load:
  // - - dispatch actions to 1. fetch/set all experiences and 2.
  // fetch/set final tags list (now handling all logic on back end)
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_EXPERIENCES" });
    dispatch({ type: "FETCH_AND_SET_TAGS" });
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        experiences.
      </Typography>
      <Container align="center">
        {!altState ? (
          <Link
            color="text.secondary"
            underline="hover"
            onClick={() => setAltState(!altState)}
          >
            prefer to sort? click here.
          </Link>
        ) : (
          <Link
            color="text.secondary"
            underline="hover"
            onClick={() => setAltState(!altState)}
          >
            prefer the original view? click here.
          </Link>
        )}
      </Container>

      {altState ? (
        <AlternateSearchPage />
      ) : (
        <div>
          <CssBaseline />
          <main>
            <Box
              sx={{
                pt: 2,
                pb: 2,
              }}
            >
              <Container maxWidth="sm">
                <Autocomplete
                  sx={{ width: "500px" }}
                  multiple
                  id="tags-outlined"
                  options={finalTags}
                  getOptionLabel={(tag) => tag}
                  filterSelectedOptions
                  value={search}
                  onChange={handleTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="search."
                      placeholder="select tags that fit what you're looking for!"
                    />
                  )}
                />
              </Container>
            </Box>
            {search.length === 0 ? (
              <Container sx={{ py: 2 }} maxWidth="lg">
                <Grid container spacing={2}>
                  {experiences.map((experience) => {
                    return (
                      <Grid item key={experience.this_id} xs={18} sm={9} md={4}>
                        <ExperienceToDisplay
                          key={experience.this_id}
                          experience={experience}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Container>
            ) : (
              <Container sx={{ py: 1 }} maxWidth="md">
                <Grid container spacing={4}>
                  {experiences.map((experience) => {
                    // can probably set tags to default as empty
                    // and change this to a filter
                    for (let searchTerm of search) {
                      if (experience.tags) {
                        if (experience.tags.includes(searchTerm)) {
                          return (
                            <Grid
                              item
                              key={experience.this_id}
                              xs={18}
                              sm={9}
                              md={6}
                            >
                              <ExperienceToDisplay
                                key={experience.this_id}
                                experience={experience}
                              />
                            </Grid>
                          );
                        }
                      }
                    }
                  })}
                </Grid>
              </Container>
            )}
          </main>
        </div>
      )}
      {/* END ITEM DISPLAY */}
    </div>
  );
}

export default SearchPage;
