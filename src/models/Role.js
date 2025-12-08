// models/Role.js
const { DataTypes } = require("sequelize");
const createSequelize = require("../utils/sequlize.js");
const config = require("../../config/config.js");
const checkSquelize = require("../utils/checkSequelize.js");

const env = process.env.NODE_ENV || "development";
const sequelize = createSequelize(config[env]);
checkSquelize(sequelize, env);

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

Role.associate = (models) => {
  Role.belongsToMany(models.User, {
    through: models.UserRole,
    foreignKey: "roleId",
    otherKey: "userId",
    as: "users",
  });

  Role.belongsToMany(models.Permission, {
    through: models.RolePermission,
    foreignKey: "roleId",
    otherKey: "permissionId",
    as: "permissions",
  });
};

module.exports = Role;
