const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// get
router.get("/", rejectUnauthenticated, (req, res) => {
  const QUERY = `SELECT *, experiences.id AS this_id FROM experiences
  JOIN "user" ON "user".id = experiences.user_id
  WHERE "user".id = ${req.user.id};`;

  pool
    .query(QUERY)
    .then((result) => {
      res.send(result.rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// post
router.post("/", rejectUnauthenticated, (req, res) => {
  const { exp_name, description, web_path, photo_path } = req.body;
  const user_id = req.user.id;
  const QUERY = `INSERT INTO experiences 
  (name, description, web_path, photo_path, user_id) 
  VALUES ($1, $2, $3, $4, $5);`;

  pool
    .query(QUERY, [exp_name, description, web_path, photo_path, user_id])
    .then(res.sendStatus(201))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// update

// delete

module.exports = router;
