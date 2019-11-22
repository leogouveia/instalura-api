"use strict";

module.exports = (sequelize, DataTypes) => {
  console.log(sequelize.define);

  const Foto = sequelize.define(
    "Foto",
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
    {}
  );

  Foto.associate = ({ Usuario, Comentario }) => {
    Foto.Usuario = Foto.belongsTo(Usuario);
    Foto.Comentarios = Foto.hasMany(Comentario);
    Foto.belongsToMany(Usuario, {
      as: {
        singular: "Curtidor",
        plural: "Curtidores"
      },
      through: "Curtidas"
    });
  };

  return Foto;
};
