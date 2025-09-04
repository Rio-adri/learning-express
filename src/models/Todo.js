const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");


const env = process.env.NODE_ENV || 'development';

const dbConfig = config[env];

const sequelize = createSequelize(dbConfig);

checkSquelize(sequelize, env);

// model definition
const Todo = sequelize.define('Todo', {
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'todos',
    timestamps: false
});

Todo.associations = (models) => {
    Todo.belongsTo(models.User, {
        foreignKey: 'owner',
        as: 'user'
    });
}

module.exports =  Todo 
