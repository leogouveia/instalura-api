const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Foto, Comentario, Usuario } = require("../sequelize").models;
const Sequelize = require("sequelize");

router.get("", (req, res) => {
  //TODO: implementar usuarioLogado
  const getFotos = async () => {
    const usuario = await Usuario.findByPk(1);
    const amigos = await usuario.getAmigos();
    const fotos = await Foto.findAll({
      where: {
        UsuarioId: {
          [Sequelize.Op.in]: amigos.map(amigo => amigo.id)
        }
      },
      include: [{ all: true }, { model: Comentario, include: [Usuario] }]
    });
    return fotos;
  };
  getFotos().then(fotos => {
    res.json(fotos);
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

  const curteFoto = async () => {
    const usuario = await Usuario.findByPk(usuarioLogado.id);
    const foto = await Foto.findByPk(idFoto);
    const curtidores = await foto.getCurtidores();

    if (_.find(curtidores, c => c.id == usuarioLogado.id)) {
      const teste = await foto.removeCurtidor(usuario);
    } else {
      await foto.addCurtidor(usuario);
    }
    return await foto.reload({
      include: [{ all: true }, { model: Comentario, include: [Usuario] }]
    });
  };
  curteFoto()
    .then(foto => {
      return res.json(foto);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send();
    });
});

router.post("/:idFoto/comentario", (req, res) => {
  const { idFoto } = req.params;
  const { texto } = req.body;

  //TODO: Implementar usuarioLogado
  const usuarioLogado = { id: 1 };

  return Foto.findByPk(idFoto)
    .then(foto => {
      return foto.createComentario({
        texto: texto,
        UsuarioId: usuarioLogado.id
      });
    })
    .then(() => {
      return Foto.findByPk(idFoto, {
        include: [{ all: true }, { model: Comentario, include: [Usuario] }]
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
