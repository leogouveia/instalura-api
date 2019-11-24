# Instalura

Este projeto foi baseado no [original](https://github.com/alberto-alura/instalura-api) feito pelo [Alberto Souza](https://github.com/alberto-alura) em Java ([Spring Boot](https://spring.io/projects/spring-boot)) e utilizado no curso de React ministrado pelo mesmo na [Alura](http://alura.com.br).

Para conhecer a formação de React do alura [clique aqui](https://www.alura.com.br/formacao-react).

O objetivo deste projeto foi portar o projeto original para NodeJS e Express. Além disso ao invés de utilizar o MySQL, foi utilizado o Sqlite3 como forma de deixar o projeto mais portavel, não sendo assim necessário instalar o MySQL na máquina do usuário.

## Iniciando

- Para executar o projeto:
  - cd instalura-api
  - npm install
  - npm run dev

O mesmo inicializará o servidor que poderá ser acessado pelo endereço http://localhost:8888

## Endpoint

| Endpoints                            | Uso                                                                                                    | Parametros                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /auth/login`                   | Realiza autenticação na aplicação, recebe um objeto contendo o token e os dados do usuário autenticado | **login** - String contendo login do usuário <br> **senha** - String contendo senha do usuário                                                                  |
| `GET /api/fotos`                     | Retorna lista com fotos dos amigos do usuário logado                                                   |                                                                                                                                                                 |
| `POST /api/fotos`                    | Cria foto enviada pelo usuário autenticado                                                             | **foto** - Arquivo com foto <br> **comentario** - String com comentário da foto                                                                                 |
| `DELETE /api/fotos/:idFoto`          | Deleta foto                                                                                            |                                                                                                                                                                 |
| `GET /api/fotos/:idFoto/curtida`     | Curte foto                                                                                             |                                                                                                                                                                 |
| `POST /api/fotos/:idFoto/comentario` | Comenta em foto                                                                                        | **text** - String com comentário.                                                                                                                               |
| `GET /api/fotos/usuario/:login`      | Retorna lista de fotos do usuário informado                                                            |                                                                                                                                                                 |
| `POST /usuarios`                     | Cria usuário                                                                                           | **login** - String contendo login do usuário <br> **senha** - String contendo senha do usuário <br> **urlFotoPefil** - String contendo url para foto do usuário |

### Prerequisitos

- Nodejs versão 8 ou superior.

## Construido com

- [ExpressJS](https://expressjs.com/pt-br/) - The web framework used
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Sequelize](https://sequelize.org/) - ORM
- Sqlite3
- Outros...

## Authors

- **Leo Gouveia** - [github](https://github.com/leogouveia/instalura-api)
- **Alberto** - [github](https://github.com/alberto-alura) - [alura](https://cursos.alura.com.br/user/alberto-souza)

Veja também a lista de [contribuidores](https://github.com/leogouveia/instalura-api/contributors) que participaram neste projeto.
