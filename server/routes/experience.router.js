const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// get
router.get("/", rejectUnauthenticated, (req, res) => {
  const QUERY = `SELECT * FROM experiences;`;

  pool
    .query(QUERY)
    .then((result) => {
      console.log('ROWS --> ', result.rows)
      res.send(result.rows).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// post

// update

// delete

module.exports = router;
