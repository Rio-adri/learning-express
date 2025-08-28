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

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.associations = (models) => {
    User.hasMany(models.Todo, {
        foreignKey: 'owner',
        as: 'todos',
        onDelete: 'CASCADE',
    });
};

module.exports = User;