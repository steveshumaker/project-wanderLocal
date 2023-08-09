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
app.use("/api/user", userRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/upload", photoRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 8002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
