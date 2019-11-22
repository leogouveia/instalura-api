const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("olar");
});

router.use("/api/fotos", require("./controllers/FotosController"));
router.use("/auth", require("./controllers/AuthController"));
router.use("/usuarios", require("./controllers/UsuariosController"));

module.exports = router;
