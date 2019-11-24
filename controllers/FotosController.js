const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Foto, Comentario, Usuario } = require("../sequelize").models;
const Sequelize = require("sequelize");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
});
const upload = multer({ storage });

router.get("", (req, res) => {
  const usuarioLogado = req.usuarioLogado;

  const getFotos = async () => {
    const usuario = await Usuario.findByPk(usuarioLogado.id);
    const amigos = await usuario.getAmigos();
    const fotos = await Foto.findAll({
      where: {
        usuarioId: {
          [Sequelize.Op.in]: amigos.map(amigo => amigo.id)
        }
      },
      order: [
        ["updatedAt", "desc"],
        ["createdAt", "asc"]
      ],
      include: [{ all: true }, { model: Comentario, include: [Usuario] }]
    });
    return fotos;
  };
  getFotos().then(fotos => {
    res.json(fotos);
  });
});

router.post("", upload.single("foto"), (req, res) => {
  const usuarioLogado = req.usuarioLogado;
  Foto.create({
    url: `http://localhost:8888/files/fotos/${req.file.filename}`,
    comentario: "olar",
    usuarioId: usuarioLogado.id
  });
  return res.send();
});

router.delete("/:idFoto", (req, res) => {
  const usuarioLogado = req.usuarioLogado;
  const { idFoto } = req.params;
  return Foto.findOne({
    id: idFoto,
    usuarioId: usuarioLogado.id
  })
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

  const usuarioLogado = req.usuarioLogado;

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
      include: [
        { all: true },
        { model: Comentario, as: "comentarios", include: [Usuario] }
      ]
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

  const usuarioLogado = req.usuarioLogado;

  return Foto.findByPk(idFoto)
    .then(foto => {
      return foto.createComentario({
        texto: texto,
        usuarioId: usuarioLogado.id
      });
    })
    .then(() => {
      return Foto.findByPk(idFoto, {
        include: [
          { all: true },
          { model: Comentario, as: "comentarios", include: [Usuario] }
        ]
      });
    })
    .then(foto => {
      return res.json(foto);
    });
});

router.get("/usuario/:login", (req, res) => {
  const { login } = req.params;
  return Usuario.findOne({ where: { login } })
    .then(usuario => {
      if (!usuario) return null;
      return usuario.getFotos({
        order: [
          ["updatedAt", "DESC"],
          ["createdAt", "DESC"]
        ],
        include: [
          { all: true },
          { model: Comentario, as: "comentarios", include: [Usuario] }
        ]
      });
    })
    .then(fotos => {
      if (!fotos) return res.status(404).send();
      return res.json(fotos);
    });
});

module.exports = router;
