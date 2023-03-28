const { WrapperGroupRoute, SchemaValidator, Mockup } = require("wrapper-route");
module.exports = new WrapperGroupRoute({
  tag: "Auth",
  descriptionGroupRoute: "Authentication API",
  baseUrl: "/",
  routes: [
    {
      path: "/login",
      description: "Login API",
      body: new SchemaValidator("User").hide(["id", "name", "idRole"]),
      response: new Mockup("User").build(),
    },
  ],
});
