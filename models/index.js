const { connection } = require("../databases");
const loadModels = {
  User: require(`./User.model`),
  Pet: require(`./Pet.model`),
};
const TypeModel = {
  User: loadModels.User.StructureUserModel,
  Pet: loadModels.User.StructureUserModel,
};

/// config associattions
/** @type {TypeModel} */
let models = {};

const nameModels = Object.keys(loadModels);

// load model
for (let i = 0; i < nameModels.length; i++) {
  const model = loadModels[nameModels[i]][nameModels[i]];
  model.loadModel(connection);
  models[nameModels[i]] = model;
}
// load associate
for (let i = 0; i < nameModels.length; i++)
  if (models[nameModels[i]].associate) models[nameModels[i]] = models[nameModels[i]].associate(models);

// (async () => {
//   console.log("INIT DATA");
//   await connection.sync({ force: true });
//   const admin = await models.User.create({
//     name: "admin",
//     email: "admin@admin.com",
//     password: require("md5")("123456a@"),
//     idRole: models.User.ROLES.ADMIN,
//   });
// })();
module.exports = models;
