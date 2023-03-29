const md5 = require("md5");
const { User } = require("../models");

const AuthController = {};
AuthController.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: md5(req.body.password),
      },
    });
    const token = await user.genToken();
    next({ user, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = AuthController;
