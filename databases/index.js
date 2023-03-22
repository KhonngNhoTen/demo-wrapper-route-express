const { Sequelize } = require("sequelize");
const env = require("../configs/env");

const pool = new Sequelize(
  env.DATABASE.DB_NAME,
  env.DATABASE.DB_USER,
  env.DATABASE.DB_PASS,
  {
    dialect: "postgres",
    port: env.DATABASE.PORT,
    host: env.DATABASE.HOST,
    logging: env.DATABASE.LOGGING,
    pool: {
      max: 100,
      min: 1,
      idle: 1000,
    },
  }
);

async () => {
  try {
    await pool.authenticate();
    console.log("Connect database successfully!!");
  } catch (error) {
    console.error(error);
    console.error("Connect database fail");
  }
};

module.exports = {
  connection: pool,
};
