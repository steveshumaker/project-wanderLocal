import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay";
// MUI
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function SearchPage() {
  const dispatch = useDispatch();
  // STATE

  // Access experiences from store
  const experiences = useSelector((store) => store.search);

  // Search state
  const [search, setSearch] = useState([]);

  // Tags state
  const [tagList, setTagList] = useState([]);

  // Render state
  const [shouldRender, setShouldRender] = useState(false);

  // Tags array manipulation - flatten and remove dupes
  const flatTags = tagList.flat();
  const finalTags = [...new Set(flatTags)];

  // Handling tag search
  const handleTagsChange = (event, newValue) => {
    setSearch(newValue);
  };

  // Page useEffect:
  // - On comp load:
  // - - for tags: create 2d tags array
  // - - for search: TODO
  useEffect(() => {
    console.log("PAGE LOADED");
    // Set the tag list on page load
    dispatch({ type: "FETCH_ALL_EXPERIENCES" });
    setTimeout(() => {
      
    }, 1000);
    if (experiences.length > 0) {
      experiences.map((experience) => {
        if (experience.tags !== null) {
          setTagList((oldTags) => [...oldTags, experience.tags]);
        }
      });
    }
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* ITEM DISPLAY */}

      <div>
        <CssBaseline />
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 2,
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
                experiences.
              </Typography>
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
                  <TextField {...params} label="search." placeholder="tags." />
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
      {/* END ITEM DISPLAY */}
    </div>
  );
}

export default SearchPage;
