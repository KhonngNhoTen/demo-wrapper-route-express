const express = require("express");
const app = express();
const CasbinAuthorization = require("./configs/CasbinAuthorization");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const handleResponseMiddleware = require("./middlewares/handle-response.middleware");
const { connection } = require("./databases");
// Set up application
app.awake = async () => {
  // load adapter authorization
  await CasbinAuthorization.loadCasbinAuthorization();

  // check connect database
  try {
    await connection.authenticate();
    console.log("Connect database successfully!!");
  } catch (error) {
    console.error(error);
    console.error("Connect database fail");
  }
};

app.start = async (callBack) => {
  await app.awake();

  // RUN CONFIG
  const router = await require("./routers/index")();

  const swaggerDocument = require("./swagger-out.json");

  // INSERT MIDDLEWARE
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/", router);

  app.use(handleResponseMiddleware);

  await callBack();
};

module.exports = app;
