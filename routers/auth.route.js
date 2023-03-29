const AuthController = require("../controllers/Auth.controller");
const { WrapperGroupRoute, SchemaValidator, Mockup } = require("wrapper-route");
module.exports = new WrapperGroupRoute({
  tag: "Auth",
  descriptionGroupRoute: "Authentication API",
  baseUrl: "/",
  routes: [
    {
      authRequire: false,
      path: "POST /login",
      description: "Login API",
      body: new SchemaValidator("User").hide(["id", "name", "idRole"]),
      response: { user: new Mockup("User").build(), token: "string jwt" },
      handler: AuthController.login,
    },
  ],
});
