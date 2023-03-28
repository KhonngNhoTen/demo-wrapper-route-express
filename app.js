const express = require("express");
const app = express();
const CasbinAuthorization = require("./configs/CasbinAuthorization");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const handleResponseMiddleware = require("./middlewares/handle-response.middleware");
app.start = async (callBack) => {
  // RUN CONFIG
  await CasbinAuthorization.initCasbinAuthorization();

  const router = require("./routers");

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
