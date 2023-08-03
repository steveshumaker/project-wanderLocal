import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import ExperienceToDisplay from "../ExperienceToDisplay/ExperienceToDisplay";
// MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

function SearchPage() {
  const experiences = useSelector((store) => store.experience);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState([]);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    experiences.map((experience) => {
      if (experience.tags !== null) {
        setTagList((oldTags) => [...oldTags, experience.tags]);
      }
    });
  }, []);

  const flatTags = tagList.flat();
  const finalTags = [...new Set(flatTags)];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {finalTags.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* {finalTags.map((tag) => {
        return <span>{tag} </span>;
      })}
      <input type="text" /> */}
      <div>
        <Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>Left</Button>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </Fragment>
      </div>
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
                experiences.
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
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}

export default SearchPage;
