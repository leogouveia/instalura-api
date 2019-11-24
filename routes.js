const express = require("express");
const authMiddleware = require("./auth_middleware");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("olar");
});

router.use("/files/fotos", express.static("uploads"));

router.use("/auth", require("./controllers/AuthController"));

router.use(
  "/api/fotos",
  authMiddleware,
  require("./controllers/FotosController")
);

router.use("/usuarios", require("./controllers/UsuariosController"));

module.exports = router;
