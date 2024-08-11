const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<p>I am your favorite place</p>`);
});

router.get("/:placeId", (req, res) => {
  const { placeId } = req.params;
  res.send(`<p>I am your favorite place with id: ${placeId}</p>`);
});

router.post("/", (req, res) => {
  res.send(`<p>I am your favorite place</p>`);
});

router.put("/:placeId", (req, res) => {
  res.send(`<p>I am your favorite place</p>`);
});

router.delete("/:placeId", (req, res) => {
  res.send(`<p>I am your favorite place</p>`);
});

module.exports = router;
