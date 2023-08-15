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

function AboutPage() {
  const [imageList, setImageList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getUrl = async () => {
    const promise = await fetch("/api/upload/random");
    const fetchedUrls = await promise.json();
    setImageList([...imageList, fetchedUrls]);
  };

  useEffect(() => {
    getUrl();
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
    console.log(imageList);
  }, []);

  return (
    <Grid container component="main" pt={5}>
      {!loaded ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={7}>
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
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid item xs={5}>
            <Card sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  I would like to extend a huge thank you to the Prime
                  instructors - Zac, Chris, and Peter. Thank you for letting me
                  bother you with my questions.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: "10px" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  A second huge thank you goes to my classmates - thanks for all
                  your help in and out of class; I'm thankful to be working with
                  such a great group of people.
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: 14 }} color="text.primary">
                  A final thank you to my pup, Harley - thank you for dealing
                  with the reduced Tuesday and Wednesday walks.
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
