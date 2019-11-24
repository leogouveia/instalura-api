const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../sequelize").models;
const router = express.Router();
const secret = require("../constants").secret;

router.post("/login", (req, res) => {
  const { login, senha, ...outros } = req.body;
  console.log(req.body);
  let usuario;
  return Usuario.findOne({
    where: {
      login
    }
  })
    .then(_usuario => {
      if (!_usuario) throw new Error("Usuário ou senha invalidos");
      usuario = _usuario;
      return bcrypt.compare(`${senha}.${secret}`, usuario.senha);
    })
    .then(match => {
      if (!match) throw new Error("Usuário ou senha invalidos");
      const token = jwt.sign(
        {
          data: {
            id: usuario.id,
            login: usuario.login
          }
        },
        secret,
        { expiresIn: "36h" }
      );
      return res.json({
        token,
        usuario: { login: usuario.login, urlFotoPerfil: usuario.urlFotoPerfil }
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(error);
    });
});

module.exports = router;
