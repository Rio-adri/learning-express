const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSequelize = require("../utils/checkSequelize.js");


const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = createSequelize(dbConfig);

checkSequelize(sequelize, env);

// model definition
const Authentication = sequelize.define('Authentication', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'authentications',
    timestamps: false,
});

module.exports =  Authentication;
