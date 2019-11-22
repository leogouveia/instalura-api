const express = require("express");
const bcrypt = require("bcrypt");
const { Usuario } = require("../sequelize").models;
const secret = require("../constants").secret;

const router = express.Router();

router.post("/", (req, res) => {
  const { login, senha, urlFotoPerfil, ...outros } = req.body;
  console.log({
    body: req.body
  });
  return bcrypt
    .hash(`${"123456"}.${senha}`, 10)
    .then(senhaHasheada =>
      Usuario.create({ login, senha: senhaHasheada, urlFotoPerfil })
    )
    .then(usuario => {
      return res.status(201).json({
        login: usuario.login,
        urlFotoPerfil: usuario.urlFotoPerfil
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
