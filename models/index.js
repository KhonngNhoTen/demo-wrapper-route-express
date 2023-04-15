const { Model } = require("sequelize");
const { connection } = require("../databases");

const ModelStructures = {
  User: require(`./Users.model`),
  Novels: require("./Novels.model"),
  Vols: require("./Vols.model"),
  Chapters: require("./Chapters.model"),
};

/** @type {ModelStructures} */
let models = {};

const keys = Object.keys(ModelStructures);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];

  if (!ModelStructures[key].parent) throw Error(`Model ${key}.parent not define`);
  models[key] = ModelStructures[key].parent;
  models[key].loadModel(connection);
}

// setup associates
for (let i = 0; i < keys.length; i++) {
  if (models[keys[i]].associate) {
    models[keys[i]].associate(models);
  }
}

module.exports = models;
