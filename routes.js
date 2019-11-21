const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("olar");
});

router.get("/usuarios", (req, res) => {
  return res.send();
});
module.exports = router;
