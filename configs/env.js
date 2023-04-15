require("dotenv").config();

module.exports = {
    DATABASE: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT, undefined),
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        DB_PASS: process.env.DB_PASS,
        LOGGING: process.env.DB_LOGGING === "true",
    },
    SERVER: {
        SECRET_KEY: process.env.SECRET_KEY,
    },
};
