// models/Permission.js
const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");

const env = process.env.NODE_ENV || "development";
const sequelize = createSequelize(config[env]);
checkSquelize(sequelize, env);

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "permissions",
    timestamps: false,
  }
);

Permission.associate = (models) => {
  Permission.belongsToMany(models.Role, {
    through: "RolePermission",
    foreignKey: "permissionId",
    otherKey: "roleId",
  });
};

module.exports = Permission;
