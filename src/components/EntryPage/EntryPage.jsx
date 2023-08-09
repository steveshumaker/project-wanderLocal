import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { readAndCompressImage } from "browser-image-resizer";
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

  // Selected image file name
  const [fileName, setFileName] = useState("");
  // Selected file type
  const [fileType, setFileType] = useState("");
  // Selected image file
  const [selectedFile, setSelectedFile] = useState();
  // tags state
  const [tags, setTags] = useState([]);
  // overall experience state
  const [experienceToSend, setExperienceToSend] = useState({
    exp_name: "",
    description: "",
    location_desc: "",
    web_path: "",
    exp_tags: [],
    photo_path: "",
  });

  // submit button handling
  const sendExperience = async (e) => {
    e.preventDefault();

    // send the photo to S3 as a formData object
    // if no selected file, send a null formData
    const formData = new FormData();
    if (selectedFile !== undefined) {
      formData.append("image", selectedFile);
    } else {
      formData.append("image", null);
    }
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    // receive the md5 (also the filename)
    const responseData = await response.json();

    // update the payload to include the photopath (md5)
    const updatedExperience = {
      ...experienceToSend,
      photo_path: `https://wanderlocal-images.s3.amazonaws.com/images/${user.id}/${responseData}`,
      exp_tags: tags,
    };

    // update the state of the sent experience
    setExperienceToSend(updatedExperience);

    // dispatch action to add experience
    dispatch({ type: "ADD_USER_EXPERIENCE", payload: updatedExperience });
    history.push("/display");
  };

  // function that handles adding a tag to the tag state
  // TODO - add tooltip to tell user to separate by spacebar
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

  // handle photo file change
  const onFileChange = async (event) => {
    // Access the selected file
    const fileToUpload = event.target.files[0];

    // Resize and compress the image. Remove this if using something other
    // than an image upload.
    const copyFile = new Blob([fileToUpload], {
      type: fileToUpload.type,
      name: fileToUpload.name,
    });
    const resizedFile = await readAndCompressImage(copyFile, {
      quality: 1.0, // 100% quality
      maxHeight: 1000, // max height of the image
    });

    // Limit to specific file types.
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      // Resizing the image removes the name, store it in a separate variable
      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      // Save the resized file
      setSelectedFile(resizedFile);

      // ------ TODO ----- image preview
      // Create a URL that can be used in an img tag for previewing the image
      // setImagePreview(URL.createObjectURL(resizedFile));
    } else {
      alert("Please select an image");
    }
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
            <Input
              onMouseEnter={() => console.log("test")}
              placeholder="test"
              label="pics."
              type="file"
              onChange={onFileChange}
              id="photoPathIn"
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
