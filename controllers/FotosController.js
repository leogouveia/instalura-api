const express = require("express");
const router = express.Router();

router.get("/api/fotos", (req, res) => {
  const { usuario } = req;
  //TODO: pegar lista de fotos dos amigos?
  // retornar listar
});
router.post("/api/fotos/:idFoto/curte", (req, res) => {
  const { idFoto } = req.params;
  const { usuario } = req;
  //TODO: acha foto pelo ID
  //TODO: atualiza status like da foto
  //TODO: retorna novo status;
});
router.delete("/api/fotos/:idFoto", (req, res) => {
  const { idFoto } = req.params;
  //TODO: verifica se foto existe e deleta;
  //TODO: retorna 200 se ok
});
router.post("/api/fotos/:idFoto/comentario", (req, res) => {
  const { idFoto } = req.params;

  //TODO: Adiciona comentario
  //TODO: adiciona comentario a foto do usuario
  //TODO: retorna comentario;
});

module.exports = router;
