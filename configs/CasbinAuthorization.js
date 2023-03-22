const { CasbinAuthorization } = require("wrapper-route").Authorization;
const { SequelizeAdapter } = require("casbin-sequelize-adapter");
const env = require("./env");

/** @type {CasbinAuthorization} */
let casbinAuthorization;
async function initCasbinAuthorization() {
  const adapter = await SequelizeAdapter.newAdapter(
    {
      username: env.DATABASE.DB_USER,
      password: env.DATABASE.DB_PASS,
      database: env.DATABASE.DB_NAME,
      dialect: "postgres",
      host: env.DATABASE.HOST,
      port: env.DATABASE.PORT,
      pool: {
        max: 100,
        min: 1,
        idle: 1000,
      },
      tableName: "CasbinRule",
      logging: false,
    },
    true
  );
  casbinAuthorization = new CasbinAuthorization(adapter);
}

function getCasbinAuthorization() {
  return casbinAuthorization;
}

module.exports = { initCasbinAuthorization, getCasbinAuthorization };
