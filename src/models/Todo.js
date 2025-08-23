const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");


const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = createSequelize(dbConfig);

(async () => {
    try {
      await sequelize.authenticate();
      console.log(`Koneksi ke PostgreSQL (${env}) berhasil!`);
    } catch (error) {
      console.error("Gagal konek ke database:", error);
    }
})();

// model definition
const Todo = sequelize.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
    }
}, {
    tableName: 'todos',
    timestamps: false
});

module.exports = { Todo }
