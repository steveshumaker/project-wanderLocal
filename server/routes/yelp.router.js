const express = require("express");
const router = express.Router();

router.get("/:name", (req, res) => {
  const busName = req.params.name;

  console.log("FETCHING BUSINESS --> ", busName);
  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${busName}&limit=5&sort_by=best_match`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      },
    }
  )
    .then((response) => {
      jResponse = response.json();
      return jResponse;
    })
    .then((data) => {
      res.send(data).status(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
