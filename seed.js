"use strict";
const bcrypt = require("bcrypt");
const secret = require("./constants").secret;

module.exports = async ({ Usuario, Foto }) => {
  const geraUsuariosEAmigos = async () => {
    const hashedPwd = await bcrypt.hash(`${"123456"}.${secret}`, 12);
    const alberto = await Usuario.create({
      login: "alberto",
      senha: hashedPwd,
      urlFotoPerfil:
        "https://pbs.twimg.com/profile_images/645140943130202112/3bs4Db2Z_400x400.jpg"
    });
    const rafael = await Usuario.create({
      login: "rafael",
      senha: hashedPwd,
      urlFotoPerfil:
        "https://olhardigital.com.br/uploads/acervo_imagens/2015/02/r16x9/20150219125722_1200_675.jpg"
    });
    const vitor = await Usuario.create({
      login: "vitor",
      senha: hashedPwd,
      urlFotoPerfil:
        "https://biomania.com.br/images/materias/2264/3798585923594400768.jpg"
    });
    await alberto.addAmigo(rafael);
    await alberto.addAmigo(vitor);
    await rafael.addAmigo(vitor);
    await vitor.addAmigo(alberto);
    return [alberto, rafael, vitor];
  };

  const geraFotos = usuarioId => {
    return Promise.all([
      Foto.create({
        url:
          "https://www.fatosdesconhecidos.com.br/wp-content/uploads/2018/02/thomas-edison-1.jpg",
        comentario: "Wow que legal!",
        usuarioId
      }),
      Foto.create({
        url:
          "https://www.investors.com/wp-content/uploads/2016/03/LSpic_Franklin_031816_pd.jpg",
        comentario: "Isso é bom demais!",
        usuarioId
      })
    ]);
  };

  const popularBanco = async () => {
    const usuarios = await geraUsuariosEAmigos();
    return Promise.all(usuarios.map(usuario => geraFotos(usuario.id)));
  };

  const quantidadeUsuarios = await Usuario.count();

  if (quantidadeUsuarios > 0) {
    console.log("Tabelas já populadas");
    return;
  }
  popularBanco();
};
