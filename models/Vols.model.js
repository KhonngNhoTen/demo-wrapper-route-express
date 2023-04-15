const { Model, DataTypes } = require("sequelize");

class Vols extends Model {
  static loadModel(connection, tableName = undefined) {
    Vols.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        idNovel: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize: connection,
        tableName: tableName ? tableName : "Vols",
        paranoid: true,
      }
    );

    return Vols;
  }

  /** @param {Object.<string, typeof Model>} param */
  static associate({ Vols, Novels, Chapters }) {
    Vols.belongsTo(Novels, {
      foreignKey: "idNovel",
    });
    Vols.hasMany(Chapters, {
      foreignKey: "idChapter",
    });
    return Vols;
  }
}

class VolsStructure extends Vols {
  id = 0;
  name = "";
  idNovel = 0;

  createdAt = new Date();
  deleteAt = new Date();
  deletedAt = new Date();
}

module.exports = VolsStructure;
