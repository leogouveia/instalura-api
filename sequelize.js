"use strinct";

const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const seed = require("./seed");

const dbConfig = require("./constants").config.db;

const sequelize = new Sequelize(dbConfig);

let models = {};

const modelsDir = path.join(__dirname, "models");

const files = fs.readdirSync(modelsDir);

files.forEach(file => {
  const fileUri = path.join(modelsDir, file);
  const m = sequelize.import(fileUri);
  _.merge(models, { [_.capitalize(m.name)]: m });
});

const associateModel = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object" && !key.associate) {
      associateModel(obj[key]);
    } else if (obj[key].associate) {
      obj[key].associate(models);
    }
  });
};

associateModel(models);

sequelize.sync({ force: true }).then(() => seed(models));

module.exports = {
  sequelize,
  models
};
