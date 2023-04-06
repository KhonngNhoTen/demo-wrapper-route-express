const { Model, DataTypes, UUIDV4 } = require("sequelize");
const CasbinAuthorization = require("../configs/CasbinAuthorization");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const env = require("../configs/env");
/** @interface */
class User extends Model {
  static associate({ User }) {
    return User;
  }
  /**
   * Hàm tiến hành init table ứng với model vào DB
   * @param {import("sequelize").Sequelize} connection
   * @param {string|undefined} tableName
   */
  static loadModel(connection, tableName = undefined) {
    tableName = tableName || User.name;
    User.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
          defaultValue: md5("123456a@"),
        },
        name: {
          type: DataTypes.STRING,
        },
        idRole: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
      },
      {
        hooks: {
          /**
           * after create new User. Adding relationship between role and user into enforcer
           * @param {User} user
           */
          afterCreate: async (user) => {
            if (!CasbinAuthorization.getCasbinAuthorization()) await CasbinAuthorization.loadCasbinAuthorization();
            let casbin = CasbinAuthorization.getCasbinAuthorization();
            await casbin.context.addRoleForUser(user.id, user.idRole);
          },
        },
        sequelize: connection,
        tableName: tableName,
        paranoid: true,
      }
    );
  }

  /**
   * Trạng thái của tài khoản
   * @enum { number }
   */
  static USER_STATUS = {
    /** Mới tạo */
    CREATE: 1,
    /** Đang hoạt động */
    ACTIVE: 2,
    /** Ngưng hoạt động */
    CLOSE: 3,
    /** Được ẩn */
    HIDE: 4,
  };

  /**
   * Vai trò của tài khoản
   * @enum { number }
   */
  static ROLES = {
    STUDENT: 1,
    TEACHER: 2,
    ADMIN: 3,
  };

  getPublicInfo() {
    delete this.dataValues.password;
  }

  /**
   * Generate token with payload is idUser
   */
  async genToken() {
    const id = this.id;
    return new Promise((resolve) => {
      jwt.sign({ id }, env.SERVER.SECRET_KEY, { expiresIn: "1d" }, (error, payload) => {
        if (error) console.log(error);
        resolve(payload);
      });
    });
  }
}

class StructureUserModel extends User {
  id = 0;
  uid = "";
  email = "";
  password = "";
  name = "";
  status = 0;
  idRole = 0;
  token = "";

  createdAt = new Date();
  deleteAt = new Date();
  destroyTime = new Date();
}

module.exports = { StructureUserModel, User };
