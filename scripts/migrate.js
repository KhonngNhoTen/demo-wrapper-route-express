const { connection } = require("../databases");
const { User } = require("../models");
(async () => {
  console.log("INIT DATA");
  await connection.sync({ force: true });
  const admin = await User.create({
    name: "admin",
    email: "admin@admin.com",
    password: require("md5")("123456a@"),
    idRole: User.ROLES.ADMIN,
  });
})();
