const express = require("express");
const { Usuario } = require("../sequelize").models;
const router = express.Router();

router.post("/usuarios", (req, res) => {
  const { login, password, ...outros } = req.body;
  return Usuario.create({ login, password }).then(() => {
    return res.status(201).send();
  });
});

module.exports = router;
