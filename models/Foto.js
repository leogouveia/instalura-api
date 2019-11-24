"use strict";

module.exports = (sequelize, DataTypes) => {
  console.log(sequelize.define);

  const Foto = sequelize.define(
    "foto",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  Foto.associate = ({ Usuario, Comentario }) => {
    Foto.Usuario = Foto.belongsTo(Usuario, { underscored: true });
    Foto.Comentarios = Foto.hasMany(Comentario, { underscored: true });
    Foto.belongsToMany(Usuario, {
      as: {
        singular: "curtidor",
        plural: "curtidores"
      },
      through: "curtidas",
      underscored: true
    });
  };

  return Foto;
};
