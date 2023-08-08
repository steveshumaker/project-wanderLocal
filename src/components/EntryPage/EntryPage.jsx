import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// MUI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";

// store

function EntryPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [tags, setTags] = useState([]);
  const [experienceToSend, setExperienceToSend] = useState({
    exp_name: "",
    description: "",
    location_desc: "",
    web_path: "",
    photo_path: "",
    exp_tags: [],
    user_id: "",
  });

  const sendExperience = (e) => {
    e.preventDefault();
    const updatedExperience = {
      ...experienceToSend,
      user_id: user.id,
      exp_tags: tags,
    };
    setExperienceToSend(updatedExperience);
    dispatch({ type: "ADD_USER_EXPERIENCE", payload: updatedExperience });
    history.push("/display");
  };

  const handleKeyPress = (e) => {
    if (e.key === "," || e.key === " ") {
      // handle the comma persisting
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleCancel = () => {
    history.push("/display");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            add.
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={(e) => sendExperience(e)}
          >
            <TextField
              margin="normal"
              fullWidth
              label="name."
              autoFocus
              value={experienceToSend.exp_name}
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  exp_name: e.target.value,
                });
              }}
              id="nameIn"
              type="text"
            />
            <TextField
              margin="normal"
              fullWidth
              label="city, state."
              value={experienceToSend.location_desc}
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  location_desc: e.target.value,
                });
              }}
              id="locIn"
              type="text"
            />
            <TextField
              margin="normal"
              fullWidth
              label="description."
              value={experienceToSend.description}
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  description: e.target.value,
                });
              }}
              id="descIn"
              type="text"
            />
            <TextField
              margin="normal"
              fullWidth
              label="url."
              value={experienceToSend.web_path}
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  web_path: e.target.value,
                });
              }}
              id="webPathIn"
              type="text"
            />
            <Input
              label="pics."
              // value={experienceToSend.photo_path}
              type="file"
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  photo_path: URL.createObjectURL(e.target.files[0]),
                });
              }}
              id="photoPathIn"
            />
            <TextField
              margin="normal"
              fullWidth
              label="tags."
              value={tags[-1]}
              onKeyDown={(e) => {
                handleKeyPress(e);
              }}
              id="tagsIn"
              type="text"
            />
            {tags.length > 0
              ? tags.map((tag) => {
                  return <Chip key={tag} label={tag} />; // give tags a key
                })
              : null}
            <Button
              color="success"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              type="submit"
            >
              Save
            </Button>
            <center>
              <Button
                color="error"
                onClick={handleCancel}
                variant="contained"
                sx={{ mb: 2, width: "18em" }}
              >
                Cancel
              </Button>
            </center>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default EntryPage;
