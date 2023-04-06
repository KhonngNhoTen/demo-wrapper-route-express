const router = require("express").Router();
const glob = require("glob");
const path = require("path");

const { WrapperRoute, TokenAuthentication } = require("wrapper-route");
const InitialSwaggerBuilder = require("../wrapper-route/Cores/InitialSwaggerBuilder");
const env = require("../configs/env");
const { User } = require("../models/User.model");

const casbinAuthorization = require("../configs/CasbinAuthorization").getCasbinAuthorization();

const initialSwaggerBuilder = new InitialSwaggerBuilder()
  .addTitle("API Demo wrapper route")
  .addVersion("1.2.0")
  .addDescription("This is guide using wrapper-route");

const wrapperRoute = new WrapperRoute({
  fileMockups: path.join(__dirname, "../mock/mockup.json"),
  fileValidations: path.join(__dirname, "../validation/validation.js"),
  initialSwagger: initialSwaggerBuilder,
  logging: true,
  securityRoute: {
    detailMiddleware: (req, res, next) => ({ req, res, next }),
    authentications: new TokenAuthentication(env.SERVER.SECRET_KEY, async (id) => await User.findByPk(id)),
    authorization: casbinAuthorization,
  },
});

async function main() {
  let groupRoute = [];
  glob
    .globSync(path.join(__dirname, "*.route.js").replace(/\\/g, "/"))
    // .map((e) => e.split("/").pop())
    .forEach(async (path) => {
      groupRoute.push(require(path));
    });

  await wrapperRoute.registry(groupRoute, router);
  return router;
}

module.exports = main;
