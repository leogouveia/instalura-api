"use strict";
const jwt = require("jsonwebtoken");

function getTokenString(token) {
  if (typeof token != "string") return;
  if (token.startsWith("Bearer ")) {
    return token.slice(7, token.length);
  }
  return;
}

function checkToken(token, secret) {
  const decoded = jwt.verify(token, secret);
  if (!decoded.data) {
    throw new Error("Assinatura do token invalida");
  }

  return decoded.data;
}

module.exports = (req, res, next) => {
  const secret = require("./constants").secret;
  const token = getTokenString(req.headers["x-auth-token"]);
  if (!token) {
    return res.status(403).send("Bearer token não recebido");
  }

  try {
    req.usuarioLogado = checkToken(token, secret);
  } catch (error) {
    console.error(error);
    return res.status(412).json(error);
  } finally {
    next();
  }
};
