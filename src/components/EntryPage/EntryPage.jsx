import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// store

function EntryPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [experienceToSend, setExperienceToSend] = useState({
    exp_name: "",
    description: "",
    location_desc: "",
    web_path: "",
    photo_path: "",
    user_id: "",
  });

  const sendExperience = (e) => {
    e.preventDefault();
    setExperienceToSend({ ...experienceToSend, user_id: user.id });
    dispatch({ type: "ADD_USER_EXPERIENCE", payload: experienceToSend });
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
              label="Experience name"
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
              label="Give your experience a description"
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
              label="City, State"
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
              label="URL"
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
            <TextField
              margin="normal"
              fullWidth
              label="Add a pic!"
              value={experienceToSend.photo_path}
              onChange={(e) => {
                setExperienceToSend({
                  ...experienceToSend,
                  photo_path: e.target.value,
                });
              }}
              id="photoPathIn"
              type="text"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
              type="submit"
            >
              Save
            </Button>
            <center>
              <Button variant="contained" sx={{ mb: 2, width: "18em" }}>
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
