"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const Model = Sequelize.Model;
class Usuario extends Model {}
Usuario.init(
  {
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },
    urlFotoPerfil: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Usuario"
  }
);
Usuario.sync({ force: true }).then(() => {
  return User.bulkCreate([
    {
      login: "alots",
      senha: "123456",
      urlFotoPerfil:
        "https://s3.amazonaws.com/loa-production-23ffs35gui41a/writers/images/000/000/187/big/lincoln_abraham_WD.jpg?1458837750"
    },
    {
      login: "rafael",
      senha: "123456",
      urlFotoPerfil:
        "https://olhardigital.com.br/uploads/acervo_imagens/2015/02/r16x9/20150219125722_1200_675.jpg"
    },
    {
      login: "vitor",
      senha: "123456",
      urlFotoPerfil:
        "https://biomania.com.br/images/materias/2264/3798585923594400768.jpg"
    }
  ]);
});
module.exports = Usuario;
