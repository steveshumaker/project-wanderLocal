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
  WHERE "user".id = ${req.user.id}
  ORDER BY experiences.id;`;

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

// get ALL experiences (search page)
router.get("/all", rejectUnauthenticated, (req, res) => {
  const QUERY = `SELECT *, experiences.id AS this_id FROM experiences
  ORDER BY experiences.id;`;

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
  const {
    exp_name,
    description,
    web_path,
    photo_path,
    location_desc,
    exp_tags,
  } = req.body;
  console.log(exp_tags);
  const user_id = req.user.id;

  const QUERY = `INSERT INTO experiences 
  (name, description, web_path, photo_path, user_id, location_desc, tags) 
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

  pool
    .query(QUERY, [
      exp_name,
      description,
      web_path,
      photo_path,
      user_id,
      location_desc,
      exp_tags,
    ])
    .then((result) => {
      const createdId = result.rows[0].id;
      // res.send(response).status(201);
      res.status(201).json({ id: createdId });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// update TODO - this looks like it can be cleaned up
router.put("/", rejectUnauthenticated, (req, res) => {
  let QUERY = "";
  if (
    req.body.favorite === true ||
    (req.body.favorite === false && !req.body.stars)
  ) {
    QUERY = `UPDATE experiences SET favorite=$1 WHERE id=$2;`;

    pool
      .query(QUERY, [!req.body.favorite, req.body.favId])
      .then((result) => res.sendStatus(200))
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else if (req.body.stars) {
    QUERY = `UPDATE experiences SET stars=$1, rating=$2, web_path=$3, photo_path=$4 WHERE id=$5;`;
    pool
      .query(QUERY, [
        req.body.stars,
        req.body.reviews,
        req.body.web_path,
        req.body.photo_path,
        req.body.dataId,
      ])
      .then((result) => res.sendStatus(200))
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    QUERY = `UPDATE experiences SET name=$1, description=$2, web_path=$3 WHERE id=$4;`;

    pool
      .query(QUERY, [
        req.body.name,
        req.body.description,
        req.body.web_path,
        req.body.id,
      ])
      .then((result) => res.sendStatus(200))
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }
});

// delete
router.delete("/", rejectUnauthenticated, (req, res) => {
  const idToDel = req.body.delId;
  const QUERY = `DELETE FROM experiences WHERE id=$1;`;

  pool
    .query(QUERY, [idToDel])
    .then((result) => res.sendStatus(200))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
