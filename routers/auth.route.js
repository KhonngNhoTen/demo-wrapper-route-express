const AuthController = require("../controllers/Auth.controller");
const { Mockup } = require("wrapper-route");
const { GroupRoute, SchemaValidation } = require("wrapper-route");
module.exports = new GroupRoute({
  tag: "Auth",
  authRequired: false,
  descriptionGroupRoute: "Every API for auth",
  routes: [
    {
      path: "POST /login",
      body: new SchemaValidation("User").attributes("email", "password"),
      handler: AuthController.login,
      response: { user: new Mockup("User").build(), token: "" },
    },
  ],
});
