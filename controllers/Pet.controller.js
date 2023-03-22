const ApiError = require("../libs/Errors");
const { Pet } = require("../models");

const PetController = {};
PetController.list = async (req, res, next) => {
  const condition = req.query.name ? { name: req.query.name } : {};
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = (page - 1) * limit;
  const pets = await Pet.findAll({
    where: condition,
    limit,
    offset,
  });

  next({ pets });
};

PetController.detail = async (req, res, next) => {
  try {
    const idPet = req.params.idPet;
    const pet = await Pet.findByPk(idPet);
    if (!pet) throw new ApiError("Not found User", 400);

    next({ pet });
  } catch (error) {
    next(error);
  }
};

PetController.create = async (req, res, next) => {
  try {
    const pet = await Pet.create(req.body);

    next({ pet });
  } catch (error) {
    next(error);
  }
};

PetController.update = async (req, res, next) => {
  try {
    const idPet = req.params.idPet;
    const pet = await Pet.findByPk(idPet);
    if (!pet) throw new ApiError("Not found User", 400);

    await pet.update(req.body);
    next({ pet });
  } catch (error) {
    next(error);
  }
};
PetController.delete = async (req, res, next) => {
  try {
    const pet = await Pet.destroy(req.body);

    next({ msg: "Ok" });
  } catch (error) {
    next(error);
  }
};

module.exports = PetController;
