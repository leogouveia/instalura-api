module.exports = ({ Usuario, Foto }) => {
  const geraUsuariosEAmigos = () => {
    let alberto;
    let rafael;
    let vitor;
    return Usuario.create({
      login: "alots",
      senha: "123456",
      urlFotoPerfil:
        "https://s3.amazonaws.com/loa-production-23ffs35gui41a/writers/images/000/000/187/big/lincoln_abraham_WD.jpg?1458837750"
    })
      .then(usr => {
        alberto = usr;
        return Usuario.create({
          login: "rafael",
          senha: "123456",
          urlFotoPerfil:
            "https://olhardigital.com.br/uploads/acervo_imagens/2015/02/r16x9/20150219125722_1200_675.jpg"
        });
      })
      .then(usr => {
        rafael = usr;
        return Usuario.create({
          login: "vitor",
          senha: "123456",
          urlFotoPerfil:
            "https://biomania.com.br/images/materias/2264/3798585923594400768.jpg"
        });
      })
      .then(usr => {
        vitor = usr;
        return Promise.all([
          alberto.addAmigo(rafael),
          alberto.addAmigo(vitor),
          rafael.addAmigo(vitor),
          vitor.addAmigo(alberto)
        ]);
      })
      .then(() => {
        return [alberto, rafael, vitor];
      });
  };

  const geraFotos = UsuarioId => {
    return Promise.all([
      Foto.create({
        url:
          "https://www.fatosdesconhecidos.com.br/wp-content/uploads/2018/02/thomas-edison-1.jpg",
        comentario: "Wow que legal!",
        UsuarioId
      }),
      Foto.create({
        url:
          "https://www.investors.com/wp-content/uploads/2016/03/LSpic_Franklin_031816_pd.jpg",
        comentario: "Isso é bom demais!",
        UsuarioId
      })
    ]);
  };

  const popular = () =>
    geraUsuariosEAmigos().then(usuarios => {
      return Promise.all(usuarios.map(usuario => geraFotos(usuario.id)));
    });
  Usuario.count().then(total => {
    if (total > 0) {
      console.log("Tabelas já populadas");
      return;
    }
    popular();
  });
};
