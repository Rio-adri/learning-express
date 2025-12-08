// models/User.js
const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");

const env = process.env.NODE_ENV || "development";
const sequelize = createSequelize(config[env]);
checkSquelize(sequelize, env);

const RolePermission = sequelize.define(
  "RolePermission",
  {
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rolepermissions",
    timestamps: false,
  }
);

RolePermission.associate = (models) => {
    RolePermission.belongsTo(models.Role, {
        foreignKey: "roleId",
    });

    RolePermission.belongsTo(models.Permission, {
        foreignKey: "permissionId",
    });
};

module.exports = RolePermission;
