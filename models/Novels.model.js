const { Model, DataTypes } = require("sequelize");

class Novels extends Model {
  /**
   * Hàm tiến hành init table ứng với model vào DB
   * @param {import("sequelize").Sequelize} connection
   * @param {string|undefined} tableName
   */
  static loadModel(connection, tableName = undefined) {
    Novels.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.TEXT("medium"),
        },
        author: {
          type: DataTypes.INTEGER,
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
        },
      },
      {
        sequelize: connection,
        tableName: tableName ? tableName : "Novels",
        paranoid: true,
      }
    );

    return Novels;
  }

  /** @param {Object.<string, typeof Model>} param */
  static associate({ Novels, Vols }) {
    Novels.hasMany(Vols, {
      foreignKey: "idNovel",
    });
    return Novels;
  }

  static STATUS_NOVEL = {
    CREATED: 1,
    PUBLIC: 2,
    WITHDRAWN: 3,
  };
}

class NovelsStructure extends Novels {
  id = 0;
  name = "";
  description = "";
  author = 0;
  tags = [""];

  createdAt = new Date();
  deleteAt = new Date();
  deletedAt = new Date();
}

module.exports = NovelsStructure;
