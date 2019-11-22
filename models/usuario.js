"use strict";

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    urlFotoPerfil: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Usuario.associate = ({ Comentario }) => {
    Usuario.hasMany(Comentario);
    Usuario.belongsToMany(Usuario, {
      as: "Amigos",
      through: "AmigosUsuarios"
    });
  };

  return Usuario;
};
