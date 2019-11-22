"use strict";
const Usuario = require("./Usuario");

module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define("Comentario", {
    texto: {
      type: DataTypes.STRING
    }
  });
  Comentario.associate = ({ Usuario }) => {
    Comentario.belongsTo(Usuario);
  };
  return Comentario;
};
