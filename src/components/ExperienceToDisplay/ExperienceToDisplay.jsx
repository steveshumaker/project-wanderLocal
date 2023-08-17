import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
//MUI
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Input from "@mui/material/Input";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

function ExperienceToDisplay({ experience, userId }) {
  // local states for editing
  const [editToSend, setEditToSend] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [checked, setChecked] = useState(experience.toggle_external);

  const user = useSelector((store) => store.user);

  // init dispatch
  const dispatch = useDispatch();

  const isEditing = experience.this_id === editingId;

  // handles the save button click; cancel handled in jsx
  const sendUpdate = (id) => {
    setEditingId(null);
    dispatch({ type: "UPDATE_EXPERIENCE", payload: editToSend });
  };

  // updates the local state after edit button is clicked
  const handleEditClick = (experience) => {
    setEditingId(experience.this_id);
    setEditToSend({
      id: experience.this_id,
      name: experience.name,
      description: experience.description,
      loc_description: experience.location_desc,
      web_path: experience.web_path,
    });
  };

  // handles the delete button click
  const handleDeleteClick = (id) => {
    dispatch({ type: "DELETE_EXPERIENCE", payload: { delId: id } });
  };

  // toggle functionality for favorite button
  const handleFavoriteClick = (experience) => {
    console.log("favoriting id: ", experience.this_id);
    dispatch({
      type: "UPDATE_EXPERIENCE",
      payload: { favId: experience.this_id, favorite: experience.favorite },
    });
  };

  // toggle functionality for external toggle
  const handleChange = (event) => {
    const updatedToggle = !checked;
    setChecked(updatedToggle);
    dispatch({
      type: "UPDATE_SHOW_EXTERNAL",
      payload: {
        expId: experience.this_id,
        toggle_ext: updatedToggle,
      },
    });
  };

  return (
    <div key={experience.this_id}>
      {isEditing ? (
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={
              experience.photo_path === null
                ? experience.yelp_path
                : experience.photo_path
            }
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography>{experience.name}</Typography>
            <Input
              fullWidth
              value={editToSend.description}
              onChange={(e) => {
                setEditToSend({
                  ...editToSend,
                  description: e.target.value,
                });
              }}
            />
            <Input
              fullWidth
              value={editToSend.loc_description}
              onChange={(e) => {
                setEditToSend({
                  ...editToSend,
                  loc_description: e.target.value,
                });
              }}
            />{" "}
            <Input
              fullWidth
              value={editToSend.web_path}
              onChange={(e) => {
                setEditToSend({
                  ...editToSend,
                  web_path: e.target.value,
                });
              }}
            />
            <Button
              color="success"
              onClick={() => sendUpdate(experience.this_id)}
            >
              Save
            </Button>
            <Button color="warning" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={
              experience.photo_path === null
                ? experience.yelp_path
                : experience.photo_path
            }
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h3">
              {experience.name}
              {experience.favorite ? <span> ❤️</span> : null}
            </Typography>
            <Divider />

            <Typography variant="overline" sx={{ ml: "1px" }}>
              {experience.location_desc}
            </Typography>
            <Typography variant="body2" sx={{ my: "1px", ml: "1px" }}>
              {experience.description}
            </Typography>
            <Divider />
            {experience.user_id === user.id ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>hide.</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                />
                <Typography>show.</Typography>
              </Stack>
            ) : null}
            {experience.rating && checked ? (
              <Typography sx={{ my: "1px", ml: "1px" }}>
                Reviews: {experience.rating}
              </Typography>
            ) : null}

            {experience.stars && checked ? (
              <img src={`/yelp_images/small_${Number(experience.stars)}.png`} />
            ) : null}
            {experience.web_path && checked ? (
              <Typography sx={{ my: "1px", ml: "1px" }}>
                <Link target="_blank" href={experience.web_path}>
                  <img
                    style={{ height: "1.25rem" }}
                    src="yelp_images/yelp_logo.png"
                  />
                </Link>
              </Typography>
            ) : checked ? (
              <Typography sx={{ my: "1px", ml: "1px" }}>
                <Link
                  target="_blank"
                  href={`https://www.google.com/search?q=${experience.name}${experience.location_desc}`}
                >
                  <img
                    style={{ height: "1.25rem" }}
                    src="yelp_images/google_png.png"
                  />
                </Link>
              </Typography>
            ) : (
              <Typography />
            )}
            <Divider sx={{ mb: ".5rem" }} />

            {experience.tags ? (
              experience.tags.map((tag) => {
                return (
                  <Chip
                    sx={{ mx: "1px", my: "1px" }}
                    color={"primary"}
                    variant="outlined"
                    key={tag}
                    label={tag}
                  />
                );
              })
            ) : (
              <Typography />
            )}
          </CardContent>
          <Divider />

          {experience.user_id === user.id ? (
            <CardActions>
              <Button
                onClick={() => handleFavoriteClick(experience)}
                size="small"
              >
                ❤️
              </Button>
              <Button onClick={() => handleEditClick(experience)} size="small">
                Edit
              </Button>
              <Button
                color="error"
                onClick={() => handleDeleteClick(experience.this_id)}
                size="small"
              >
                Delete
              </Button>
            </CardActions>
          ) : null}
        </Card>
      )}
    </div>
  );
}

export default ExperienceToDisplay;
