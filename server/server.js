const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const experienceRouter = require("./routes/experience.router");
const ratingRouter = require("./routes/yelp.router");
const photoRouter = require("./routes/photo.router");

// Express middleware
app.use(express.json());
app.use(fileUpload());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
// auth
app.use("/api/user", userRouter);
// add/update/delete experiences
app.use("/api/experience", experienceRouter);
// update experiences with yelp data
app.use("/api/rating", ratingRouter);
// post and get photos from S3
app.use("/api/upload", photoRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
