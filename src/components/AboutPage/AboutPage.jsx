import React from "react";
import { useEffect, useState } from "react";
// MUI
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "@mui/material";

function AboutPage() {
  // state for the image list and loading state
  const [imageList, setImageList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // client-side fetch to api that returns an array of image urls
  const getUrl = async () => {
    const promise = await fetch("/api/upload/random");
    const fetchedUrls = await promise.json();
    setImageList([...imageList, fetchedUrls]);
  };

  // on mount, ensure the api call completes
  useEffect(() => {
    getUrl();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <Grid container component="main" pt={5}>
      {!loaded ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={7} sx={{ overflowY: "scroll" }}>
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              variant="woven"
              cols={3}
              gap={8}
            >
              {imageList[0].map((item) => (
                <ImageListItem key={item.photo_path}>
                  <img
                    src={`${item.photo_path}?w=161&fit=crop&auto=format`}
                    srcSet={`${item.photo_path}?w=161&fit=crop&auto=format&dpr=2 2x`}
                    // alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar position="below" title={item.username} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={5}>
            <Card raised sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  I would like to extend a huge thank you to the Prime
                  instructors - Zac, Chris, and Peter. Thank you for letting me
                  bother you with my questions, and for helping us all over the
                  last five(!!) plus months.
                </Typography>
              </CardContent>
            </Card>
            <Card raised sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  A second huge thank you goes to my classmates - thanks for all
                  your help in and out of class; I'm thankful to be working with
                  such a great group of people.
                </Typography>
              </CardContent>
            </Card>
            <Card raised sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  A final thank you to my pup, Harley - thank you for dealing
                  with the reduced Tuesday and Wednesday walks.
                </Typography>
              </CardContent>
            </Card>
            <Card raised sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  Technologies used: PostgreSQL, Express, React, Node.js,
                  MaterialUI, AWS S3, JavaScript
                </Typography>
              </CardContent>
            </Card>
            <Card raised>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  If you're here and potentially considering an MBA - give{" "}
                  <Link
                    href="https://www.smartwithaheart.org/"
                    underline="hover"
                    target="blank"
                  >
                    Smart with a Heart
                  </Link>{" "}
                  a look!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default AboutPage;
