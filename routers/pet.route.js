const { WrapperGroupRoute, Mockup, SchemaValidator } = require("wrapper-route");
const PetController = require("../controllers/Pet.controller");
module.exports = new WrapperGroupRoute({
  baseUrl: "/pet",
  descriptionGroupRoute: "Every API for pet",
  tag: "Pet",
  routes: [
    {
      description: "Get list pet",
      path: "GET /",
      query: {
        pagination: true,
        name: "Pet name",
      },
      response: { pets: [new Mockup("Pet").build()] },
      permissions: ["3"],
      handler: PetController.list,
    },
    {
      description: "Create new pet",
      path: "POST /",
      body: new SchemaValidator("Pet").hide("id"),
      response: new Mockup("Pet").build(),
      handler: PetController.create,
      permissions: ["3"],
    },
    {
      authRequire: false,
      description: "Detail a pet",
      path: "GET /:idPet",
      parameters: { idPet: 1 },
      response: new Mockup("Pet").build(),
      handler: PetController.detail,
      permissions: ["3"],
    },
    {
      description: "Update a pet",
      path: "PUT /:idPet",
      parameters: { idPet: 1 },
      response: new Mockup("Pet").build(),
      handler: PetController.update,
      permissions: ["3"],
    },
    {
      description: "Deletet a pet",
      path: "DELETE /:idPet",
      parameters: { idPet: 1 },
      response: { msg: "Ok" },
      handler: PetController.delete,
      permissions: ["3"],
    },
  ],
});
