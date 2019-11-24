"use strict";

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "usuario",
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      urlFotoPerfil: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  Usuario.associate = ({ Comentario, Foto }) => {
    Usuario.hasMany(Comentario);
    Usuario.hasMany(Foto);
    Usuario.belongsToMany(Usuario, {
      as: "amigos",
      through: "amigos_usuarios",
      underscored: true
    });
  };

  return Usuario;
};
