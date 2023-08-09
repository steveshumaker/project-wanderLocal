const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

// AWS declarations
const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// post
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("IN POST");

  // const QUERY = `INSERT INTO experiences
  // (name, description, web_path, photo_path, user_id, location_desc, tags)
  // VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;
  const imageData = req.files.image.data;
  const imageKey = `images/${req.user.id}`; // folder/file
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: imageKey, // folder/file
    Body: imageData, // image data to upload
  });

  s3Client.send(command);

  // pool
  //   .query(QUERY, [
  //     exp_name,
  //     description,
  //     web_path,
  //     photo_path,
  //     user_id,
  //     location_desc,
  //     exp_tags,
  //   ])
  //   .then((result) => {
  //     const createdId = result.rows[0].id;
  //     // res.send(response).status(201);
  //     res.status(201).json({ id: createdId });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.sendStatus(500);
  //   });
});

module.exports = router;
