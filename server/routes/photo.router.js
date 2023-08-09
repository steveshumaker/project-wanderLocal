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

  // if the file body is null (no photo provided)
  if (req.files === null) {
    res.json(null).status(200);

    // if a photo is provided, process and upload it
  } else {
    const imageData = req.files.image.data;
    const hash = req.files.image.md5;
    const imageKey = `images/${req.user.id}/${hash}`; // folder/file
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: imageKey, // folder/file
      Body: imageData, // image data to upload
    });

    // send back the md5 hash to store in the database
    s3Client.send(command).then((response) => {
      res.json(hash).status(200);
    });
  }
});

module.exports = router;
