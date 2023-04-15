const { Model, DataTypes } = require("sequelize");

class Chapters extends Model {
    static loadModel(connection, tableName = undefined) {
        Chapters.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                },
                idVol: {
                    type: DataTypes.INTEGER,
                },
                content: {
                    type: DataTypes.TEXT,
                },
            },
            {
                sequelize: connection,
                tableName: tableName || "Chapters",
                paranoid: true,
            }
        );

        return Chapters;
    }

    /** @param {Object.<string, typeof Model>} param */
    static associate({ Chapters, Vols }) {
        Chapters.belongsTo(Vols, {
            foreignKey: "idVol",
        });
        return Chapters;
    }
}

class ChaptersStructure extends Chapters {
    id = 0;
    name = "";
    idVol = 0;
    content = "";

    createdAt = new Date();
    deleteAt = new Date();
    deletedAt = new Date();
}

module.exports = ChaptersStructure;
