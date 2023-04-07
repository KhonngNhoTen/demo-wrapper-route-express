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
    await user.update({ token });
    next({ user, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

AuthController.logout = async (req, res, next) => {
  try {
    console.log(res.account);
    await User.update({ token: "" }, { where: { id: res.account.id } });
    next({ msg: "Ok" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = AuthController;
