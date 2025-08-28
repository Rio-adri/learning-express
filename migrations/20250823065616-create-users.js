'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async(t) => {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          }
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fullname: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      }, { transaction: t });
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async(t) => {
      await queryInterface.dropTable('users', { transaction: t });
    });
  }
};
