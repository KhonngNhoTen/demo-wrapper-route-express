const { User } = require("../models");
const env = require("../configs/env");
const { ConfigWrapper } = require("wrapper-route");
const { DefaultAuthentication } = require("wrapper-route").Authentication;
const router = require("express").Router();
const CasbinAuthorization = require("../configs/CasbinAuthorization");
const path = require("path");
const glob = require("glob");
ConfigWrapper.config({
  initSwagger: {
    info: {
      description: "API Document",
      title: "API Demo Express",
      version: "1.0.0",
    },
  },
  fileMock: path.join(__dirname, "../mock/mockup.json"),
  fileSchemaValidation: path.join(__dirname, "../validation/validation.js"),
  routerSecurity: {
    getDetailRoute: (req, res, next) => {
      return {
        req,
        res,
        next,
      };
    },
    authenticate: new DefaultAuthentication(env.SERVER.SECRET_KEY, async (id) => await User.findByPk(id)),
    authorize: CasbinAuthorization.getCasbinAuthorization(),
  },
  onError: (error, req, res, next) => {
    res.status(error.code ? error.code : 500).json(error);
  },
});

const routes = glob.globSync("routers/*.route.js").map((e) => e.split("/").pop());
for (let i = 0; i < routes.length; i++) {
  ConfigWrapper.instance.registry(router, require(`./${routes[i]}`));
}

ConfigWrapper.instance.finish();

module.exports = router;
