// models/User.js
const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");

const env = process.env.NODE_ENV || "development";
const sequelize = createSequelize(config[env]);
checkSquelize(sequelize, env);

const UserRole = sequelize.define(
  "UserRole",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "userrole",
    timestamps: false,
  }
);

UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
        foreignKey: "userId",
    });

    UserRole.belongsTo(models.Role, {
        foreignKey: "roleId",
    });
};

module.exports = UserRole;
