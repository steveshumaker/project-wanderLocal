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
router.get("/all", (req, res) => {
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
  console.log("IN POST");
  const {
    exp_name,
    description,
    web_path,
    location_desc,
    exp_tags,
    photo_path,
  } = req.body;
  const user_id = req.user.id;
  const locationToAdd = location_desc.toLowerCase();

  const QUERY = `INSERT INTO experiences
  (name, description, web_path, user_id, location_desc, tags, photo_path)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`;

  pool
    .query(QUERY, [
      exp_name[0].toUpperCase() + exp_name.slice(1),
      description[0].toUpperCase() + description.slice(1),
      web_path,
      user_id,
      locationToAdd,
      exp_tags,
      photo_path,
    ])
    .then((result) => {
      const createdId = result.rows[0].id;
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
  // if this is a favorites toggle
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
    // if this is the external data update from the add experience saga
  } else if (req.body.stars) {
    QUERY = `UPDATE experiences SET stars=$1, rating=$2, web_path=$3, yelp_path=$4 WHERE id=$5;`;
    pool
      .query(QUERY, [
        req.body.stars,
        req.body.reviews,
        req.body.web_path,
        req.body.yelp_path,
        req.body.dataId,
      ])
      .then((result) => res.sendStatus(200))
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
    // if this is a normal edit
  } else {
    console.log("here");
    QUERY = `UPDATE experiences SET name=$1, description=$2, web_path=$3, location_desc=$4 WHERE id=$5;`;

    pool
      .query(QUERY, [
        req.body.name[0].toUpperCase() + req.body.name.slice(1),
        req.body.description[0].toUpperCase() + req.body.description.slice(1),
        req.body.web_path,
        req.body.loc_description,
        req.body.id,
      ])
      .then((result) => res.sendStatus(200))
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  }
});

router.put("/toggleExternal", rejectUnauthenticated, (req, res) => {
  QUERY = `UPDATE experiences SET toggle_external=$1 WHERE id=$2;`;
  pool
    .query(QUERY, [req.body.toggle_ext, req.body.expId])
    .then((result) => res.sendStatus(200))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
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
