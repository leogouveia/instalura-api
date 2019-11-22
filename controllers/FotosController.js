const express = require("express");
const router = express.Router();
const { Foto, Comentario, Usuario } = require("../sequelize").models;
const Sequelize = require("sequelize");

router.get("", (req, res) => {
  //TODO: implementar usuarioLogado
  let usuario;
  return Usuario.findByPk(1, { include: ["Amigos"] })
    .then(_usuario => {
      usuario = _usuario;
      return Foto.findAll({
        where: {
          UsuarioId: {
            [Sequelize.Op.in]: _usuario.Amigos.map(amigo => amigo.id)
          }
        }
      });
    })
    .then(fotos => {
      return res.json(fotos);
    });
  //TODO: pegar lista de fotos dos amigos?
  // retornar listar
});

router.post("", (req, res) => {
  //TODO: upload foto
  return res.send();
});

router.delete("/:idFoto", (req, res) => {
  const { idFoto } = req.params;
  return Foto.findByPk(idFoto)
    .then(foto => {
      if (!foto) {
        throw new Error("Foto não encontrada...");
      }
      return foto.destroy();
    })
    .catch(err => {
      console.error(err);
      return res.status(404).send();
    })
    .then(() => {
      return res.status(200).send();
    });
});

router.get("/:idFoto/curtida", (req, res) => {
  const { idFoto } = req.params;
  //TODO: Implementar usuarioLogado
  const usuarioLogado = { id: 1 };

  let foto;
  return Foto.findByPk(idFoto)
    .then(_foto => {
      foto = _foto;
      return Usuario.findByPk(2);
    })
    .then(usuario => {
      return foto.addCurtidor(usuario);
    })
    .then(() => {
      return Foto.findByPk(idFoto, { include: ["Curtidores"] });
    })
    .then(foto => res.json(foto));
});

router.post("/:idFoto/comentario", (req, res) => {
  const { idFoto } = req.params;
  console.log(req.body);
  const { texto } = req.body;
  //TODO: Implementar usuarioLogado
  const usuarioLogado = { id: 1 };

  return Foto.findByPk(idFoto)
    .then(foto => {
      return foto.createComentario({
        text: texto,
        UsuarioId: usuarioLogado.id
      });
    })
    .then(() => {
      return Foto.findByPk(idFoto, {
        include: [Comentario]
      });
    })
    .then(foto => {
      return res.json(foto);
    });
});

router.get("/usuario/:UsuarioId", (req, res) => {
  const { UsuarioId } = req.params;
  return Foto.findAll({
    where: { UsuarioId }
  }).then(fotos => {
    return res.json(fotos);
  });
});

module.exports = router;
