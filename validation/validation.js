const Joi = require("joi");
module.exports = {
  Pet: {
    id: Joi.number().required(),
    name: Joi.string().required(),
  },
  User: {
    id: Joi.number().required().example(1),
    email: Joi.string().email().required().example("admin@admin.com"),
    password: Joi.string().required().example("123456a@"),
    name: Joi.string().required().example("User name"),
    idRole: Joi.number().required().example(3),
  },
};
