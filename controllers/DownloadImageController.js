const express = require("express");
const router = express.Router();

router.get("/api/public/:fotoId/stream", (req, res) => {
  //TODO: acha foto
  //TODO: retorna stream do binario da imagem
});

module.exports = router;
