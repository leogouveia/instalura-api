"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define(
    "comentario",
    {
      texto: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true
    }
  );
  Comentario.associate = ({ Usuario }) => {
    Comentario.belongsTo(Usuario);
  };
  return Comentario;
};
