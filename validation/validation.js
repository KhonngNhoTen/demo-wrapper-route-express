const Joi = require("joi");
module.exports = {
  Pet: {
    id: Joi.number().required(),
    name: Joi.string().required(),
  },
  User: {
    id: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    idRole: Joi.number().required(),
  },
};
