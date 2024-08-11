const express = require("express");
const { validateBody } = require("../../middlewares");

const schema = require("../../schemas");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`<p>Hello, we are users!</p>`);
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`<p>Hello, I am user ${userId}!</p>`);
});

router.post("/", validateBody(schema.addUserSchema), (req, res) => {
  res.send(`<p>Hello, we are users!</p>`);
});

router.put("/:userId", (req, res) => {
  res.send(`<p>Hello, we are users!</p>`);
});

router.delete("/:userId", (req, res) => {
  res.send("User is deleted");
});

module.exports = router;
