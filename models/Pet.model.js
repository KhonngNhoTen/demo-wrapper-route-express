const { Model, DataTypes, UUIDV4 } = require("sequelize");
const md5 = require("md5");
/** @interface */
class Pet extends Model {
  static associate({ Pet }) {
    return Pet;
  }
  /**
   * Hàm tiến hành init table ứng với model vào DB
   * @param {import("sequelize").Sequelize} connection
   * @param {string|undefined} tableName
   */
  static loadModel(connection, tableName = undefined) {
    tableName = tableName || Pet.name;
    Pet.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
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
  static Pet_STATUS = {
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
}

class StructurePetModel extends Pet {
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

module.exports = { StructurePetModel, Pet };
