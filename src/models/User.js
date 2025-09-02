const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");



const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = createSequelize(dbConfig);

checkSquelize(sequelize, env);

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