const { Sequelize } = require("sequelize");

const createSequelize = ({ db, user, pass, host, port }) => {
  return new Sequelize(db, user, pass, {
    host,
    port,
    dialect: "postgres"
  });
};

module.exports = createSequelize;
